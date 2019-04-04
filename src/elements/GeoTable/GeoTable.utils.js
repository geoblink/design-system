/// <reference types="vue" />
import _ from 'lodash'

/**
 * @template CellElement
 * @typedef {object} CellSizingConfig
 * @property {boolean} ignoreContentWidth
 * @property {boolean} growingDisabled
 * @property {number} [columnMinWidth]
 * @property {number} [columnMaxWidth]
 * @property {number} [columnWidth]
 * @property {CellElement} element
 */

/**
 * @template CellElement
 * @typedef {Array<CellSizingConfig<CellElement>>} RowSizingConfig
 */

/**
 * @template TableContainerElement
 * @template CellElement
 * @typedef {object} TableSizingConfig
 * @property {Array<RowSizingConfig<CellElement>>} rowsSizingConfig
 * @property {TableContainerElement} tableContainerElement
 */

/**
 * @typedef {number} TableSingleCellWidth
 */

/**
 * @typedef {TableSingleCellWidth[]} TableWidths
 */

/**
 * @typedef {object} ColumnSizeRequirements
 * @property {boolean} growingDisabled
 * @property {number} maxWidth
 * @property {number} minWidth
 * @property {number} width
 * @property {number} rawContentWidth Width required to show the content of the widest cell in this column
 * @property {number} contentWidth Width required to show the content of the widest cell in this column, ignoring content of those cells with `ignoreContentWidth`
 */

/**
 * @template ElementType
 * @callback GetElementWidth
 * @param {ElementType} element
 * @return {number}
 */

/**
 * @template TableContainerElement
 * @template CellElement
 * @param {Array<RowSizingConfig<CellElement>>} rowsSizingConfig
 * @param {GetElementWidth<CellElement>} getElementContentWidth
 * @return {ColumnSizeRequirements[]}
 */
export function getColumnSizeRequirements (rowsSizingConfig, getElementContentWidth) {
  /** @type {ColumnSizeRequirements[]} */
  const columnsSizeRequirements = {}

  for (const singleRowSettings of rowsSizingConfig) {
    for (let columnIndex = 0; columnIndex < singleRowSettings.length; columnIndex++) {
      const singleCellSettings = singleRowSettings[columnIndex]

      /** @type {ColumnSizeRequirements} */
      const currentColumnSizeRequirements = columnsSizeRequirements[columnIndex] || {
        growingDisabled: false,
        maxWidth: null,
        minWidth: null,
        width: null,
        rawContentWidth: 0,
        contentWidth: 0
      }

      currentColumnSizeRequirements.growingDisabled = _.defaultTo(
        singleCellSettings.growingDisabled,
        currentColumnSizeRequirements.growingDisabled
      )

      // We want to keep the lowest maximum as it's compatible with all the
      // maximum widths set
      currentColumnSizeRequirements.maxWidth = _.defaultTo(_.min([
        singleCellSettings.columnMaxWidth,
        currentColumnSizeRequirements.maxWidth
      ]), null)

      // We want to keep the highest minimum as it's compatible with all the
      // minimum widths set
      currentColumnSizeRequirements.minWidth = _.defaultTo(_.max([
        singleCellSettings.columnMinWidth,
        currentColumnSizeRequirements.minWidth
      ]), null)

      if (!_.isNil(singleCellSettings.columnWidth)) {
        const isWidthForced = !_.isNil(currentColumnSizeRequirements.width)
        const isWidthDifferentThanForced = currentColumnSizeRequirements.width !== singleCellSettings.columnWidth
        /*
         We should check if we are forcing a different width here, if we set a
         width for a column in a cell and a different one in another row's cell
         then we should warn the user about it as it might lead to unexpected
         results since it's a restriction impossible to satisfy
         */
        if (isWidthForced && isWidthDifferentThanForced) {
          console.warn(`GeoTable [component] :: different widths have been set for the same column: ${currentColumnSizeRequirements.width} and ${singleCellSettings.columnWidth}. The last one will used.`)
        }

        currentColumnSizeRequirements.width = singleCellSettings.columnWidth
      }

      // We want to keep the greatest contentWidth as all the content fits
      // in it as long as the header name is not truncatable
      const contentWidth = getElementContentWidth(singleCellSettings.element)

      currentColumnSizeRequirements.rawContentWidth = _.defaultTo(_.max([
        currentColumnSizeRequirements.rawContentWidth,
        contentWidth
      ]), 0)

      if (!singleCellSettings.ignoreContentWidth) {
        currentColumnSizeRequirements.contentWidth = _.defaultTo(_.max([
          currentColumnSizeRequirements.contentWidth,
          contentWidth
        ]), 0)
      }

      columnsSizeRequirements[columnIndex] = currentColumnSizeRequirements
    }
  }

  return columnsSizeRequirements
}

/**
 * @param {ColumnSizeRequirements} columnSizeRequirements
 * @return {TableWidths}
 */
export function getInitialTableWidthDistribution (columnSizeRequirements) {
  return _.map(columnSizeRequirements, function (currentColumnSizeRequirements) {
    if (_.isFinite(currentColumnSizeRequirements.width)) return currentColumnSizeRequirements.width

    const min = _.defaultTo(currentColumnSizeRequirements.minWidth, Number.NEGATIVE_INFINITY)
    const max = _.defaultTo(currentColumnSizeRequirements.maxWidth, Number.POSITIVE_INFINITY)
    const width = _.clamp(currentColumnSizeRequirements.contentWidth, min, max)

    return width
  })
}

/**
 * @template TableContainerElement
 * @template CellElement
 * @param {TableSizingConfig<TableContainerElement, CellElement>} tableSizingConfig
 * @param {GetElementWidth<CellElement>} getElementContentWidth
 * @return {TableWidths}
 */
export function getAutomaticColumnsWidth (tableSizingConfig, getElementContentWidth) {
  const columnsSettings = getColumnSizeRequirements(tableSizingConfig.rowsSizingConfig, getElementContentWidth)
  // Once we have the settings and content width we have to compute a first
  // width proposal respecting minimum and maximum and using forced width
  // (if set)
  const initialTableWidthDistribution = getInitialTableWidthDistribution(columnsSettings)

  // We know the width of the cells but we need the width of the table's
  // container so we know if we need horizontal scroll or if there's extra
  // width that should be divided into the columns
  const tableContainerWidth = getElementContentWidth(tableSizingConfig.tableContainerElement)
  const tableContentWidth = _.sum(initialTableWidthDistribution)

  const tableWidthDistributionFillingParent = getTableWidthDistributionFillingParent(
    columnsSettings,
    initialTableWidthDistribution,
    {
      contentWidth: tableContentWidth,
      containerWidth: tableContainerWidth
    }
  )

  return tableWidthDistributionFillingParent
}

/**
 * @typedef {object} UnsaturatedColumnConfig
 * @property {number} index
 * @property {number} rawContentWidth
 * @property {number} contentWidth
 * @property {number} remainingWidthUntilReachingMaximum
 * @property {boolean} isRawContentEntirelyVisible
 */

/**
 * @param {ColumnSizeRequirements[]} columnsSettings
 * @param {TableWidths} initialColumnsWidths
 * @param {object} tableSettings
 * @param {number} tableSettings.containerWidth
 * @param {number} tableSettings.contentWidth
 * @return {TableWidths}
 */
export function getTableWidthDistributionFillingParent (columnsSettings, initialColumnsWidths, { containerWidth, contentWidth }) {
  /** @type {TableWidths} */
  const resultingColumnsWidths = [...initialColumnsWidths]

  // If we have more space than required we have to divide the remaining
  // space between the columns using automatic width, so we don't mess with
  // any column that has a fixed width (or maximum or minimum)
  const initialWidthToBeDistributed = containerWidth - contentWidth

  if (initialWidthToBeDistributed < 0) return resultingColumnsWidths

  // We first distribute width evenly among columns which raw content is wider
  // than currently assigned width.

  const remainingWidthAfterAdjustingPriorityColumns = distributeWidth(
    _.reject(
      getSortedUnsaturatedColumnsConfig(columnsSettings, resultingColumnsWidths),
      'isRawContentEntirelyVisible'
    ),
    initialWidthToBeDistributed
  )

  // Then we get remaining unsaturated columns and attempt to distribute
  // space evenly among them.

  const remainingTableWidth = distributeWidth(
    getSortedUnsaturatedColumnsConfig(columnsSettings, resultingColumnsWidths),
    remainingWidthAfterAdjustingPriorityColumns
  )

  if (remainingTableWidth > 0) {
    console.warn('GeoTable [component] :: could not redistribute extra space between table columns without breaking limits on their maximum - or explicit - width')
  }

  return resultingColumnsWidths

  function distributeWidth (columns, width) {
    while (columns.length && width > 0) {
      const result = getColumnsWidthDistribution(columns, width)

      for (const columnIndex of Object.keys(result.columnsWidths)) {
        resultingColumnsWidths[columnIndex] += result.columnsWidths[columnIndex]
      }

      width = result.remainingWidth
      columns = result.remainingColumns
    }

    return width
  }
}

/**
 * @param {ColumnSizeRequirements[]} columnsSettings
 * @param {TableWidths} columnsWidths
 * @return {UnsaturatedColumnConfig[]}
 */
export function getSortedUnsaturatedColumnsConfig (columnsSettings, columnsWidths) {
  const unsaturatedColumnsSettings = _.map(
    columnsSettings,
    (singleColumn, index) => getUnsaturatedColumnsConfig(singleColumn, index, columnsWidths)
  )

  return _.sortBy(_.filter(unsaturatedColumnsSettings), 'remainingWidthUntilReachingMaximum')
}

/**
 * @param {ColumnSettings} columnSettings
 * @param {TableWidths} columnsWidths
 * @return {UnsaturatedColumnConfig}
 */
export function getUnsaturatedColumnsConfig (columnSettings, index, columnsWidths) {
  const {
    growingDisabled,
    width,
    maxWidth,
    rawContentWidth,
    contentWidth
  } = columnSettings

  const currentWidth = columnsWidths[index]

  if (growingDisabled) return null

  const remainingWidthUntilReachingMaximum = _.isNil(maxWidth)
    ? Number.MAX_VALUE
    : maxWidth - currentWidth

  const isUsingAutomaticColumnWidth =
    _.isNil(width) &&
    remainingWidthUntilReachingMaximum > 0

  if (!isUsingAutomaticColumnWidth) return null

  const isRawContentEntirelyVisible = rawContentWidth <= currentWidth

  return {
    index,
    rawContentWidth,
    contentWidth,
    isRawContentEntirelyVisible,
    remainingWidthUntilReachingMaximum: Math.min(
      remainingWidthUntilReachingMaximum,
      isRawContentEntirelyVisible
        ? Number.MAX_VALUE
        : rawContentWidth - currentWidth
    )
  }
}

/**
 * @param {Vue} vueComponent
 * @param {object} overrideSettings
 * @param {boolean} overrideSettings.overridenIgnoreContentWidth
 * @param {boolean} overrideSettings.overridenGrowingDisabled
 * @return {CellSizingConfig}
 */
export function getVueComponentColumnSizingSettings (vueComponent, {
  overridenIgnoreContentWidth,
  overridenGrowingDisabled
} = {}) {
  const ignoreContentWidth = _.isNil(overridenIgnoreContentWidth)
    ? vueComponent.ignoreContentWidth
    : overridenIgnoreContentWidth

  const growingDisabled = _.isNil(overridenGrowingDisabled)
    ? vueComponent.growingDisabled
    : overridenGrowingDisabled

  return {
    ignoreContentWidth,
    growingDisabled,
    columnMinWidth: vueComponent.columnMinWidth,
    columnMaxWidth: vueComponent.columnMaxWidth,
    columnWidth: vueComponent.columnWidth,
    element: vueComponent.$el
  }
}

/**
 * @param {UnsaturatedColumnConfig[]} columns Columns sorted ascendingly by `remainingWidthUntilReachingMaximum`
 * @param {number} width
 * @returns {{remainingColumns: UnsaturatedColumnConfig[], remainingWidth: number, columnsWidths: TableWidths}}
 */
export function getColumnsWidthDistribution (columns, width) {
  let remainingWidth = width

  const remainingColumns = []
  const columnsWidths = {}

  const maximumSingleColumnWidthIncrease = _.first(columns).remainingWidthUntilReachingMaximum
  const singleColumnWidthIncrease = Math.min(
    Math.max(
      Math.floor(
        _.min([
          width / columns.length,
          maximumSingleColumnWidthIncrease
        ])
      ),
      // Maybe there's not enough free space to give all columns at least
      // 1px more of space. If this happens it's better to add 1px column
      // by column until we run out of pixels.
      1
    ),
    width
  )

  for (const columnSettings of columns) {
    if (remainingWidth === 0) {
      remainingColumns.push(_.assign({}, columnSettings))
      continue
    }

    const columnIndex = columnSettings.index

    const remainingWidthUntilReachingMaximum = columnSettings.remainingWidthUntilReachingMaximum - singleColumnWidthIncrease
    if (remainingWidthUntilReachingMaximum > 0) {
      remainingColumns.push(_.assign({}, columnSettings, {
        remainingWidthUntilReachingMaximum
      }))
    }

    columnsWidths[columnIndex] = singleColumnWidthIncrease
    remainingWidth -= singleColumnWidthIncrease
  }

  return {
    remainingColumns,
    remainingWidth,
    columnsWidths
  }
}
