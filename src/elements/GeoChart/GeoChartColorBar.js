/// <reference types="d3" />

import _ from 'lodash'

import './GeoChartAxis'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * @enum {GeoChart.BarDimension}
 */
export const DIMENSIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

export const DEFAULT_WIDTH = 10

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.ColorBarGroupsGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-color-bar-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-color-bar-group geo-chart-color-bar-group--${singleGroupOptions.id} geo-chart-color-bar-group--${singleGroupOptions.dimension}`
    )

  groups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  const updatedGroups = groups
  const allGroups = newGroups.merge(updatedGroups)

  allGroups.each(function (singleGroupOptions, i) {
    const group = d3.select(this)
    renderSingleGroup(group, singleGroupOptions, globalOptions)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.ColorBarGroupsGlobalConfig} globalOptions
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions) {
  const axisForNormalDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  const getTranslation = getSingleItemTranslationFactory(singleGroupOptions)
  const getSegmentTranslation = getSingleSegmentTranslationFactory(singleGroupOptions)
  const getHighlightedSegmentTranslation = getHighlightedSegmentTranslationFactory(singleGroupOptions)

  const colorBarBaseClass = 'geo-chart-color-bar'
  const segmentBaseClass = 'geo-chart-color-bar__segment'
  const highlightedSegmentBaseClass = 'geo-chart-color-bar__highlighted-segment'

  const getSegmentWidth = (d, i) => {
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      // TODO: log error if invalid range
      return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions)
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      // TODO: log error if not scale band
      return getItemSpanAtAxis(axisForNormalDimension, {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
      }, singleGroupOptions)
    }
  }
  const getSegmentHeight = (d, i) => {
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      // TODO: log error if not scale band
      return getItemSpanAtAxis(axisForNormalDimension, {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
      }, singleGroupOptions)
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      // TODO: log error if invalid range
      return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions)
    }
  }

  const getNewSegmentInitialWidth = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return 0
      case DIMENSIONS.vertical:
        return getSegmentWidth(d, i)
    }
  }
  const getNewSegmentInitialHeight = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getSegmentHeight(d, i)
      case DIMENSIONS.vertical:
        return 0
    }
  }

  const getHighlightedSegmentWidth = (d, i) => {
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      // TODO: log error if invalid range
      return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions)
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      // TODO: log error if not scale band
      return getHighlightedItemSpanAtAxis(axisForNormalDimension, {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
      }, singleGroupOptions)
    }
  }
  const getHighlightedSegmentHeight = (d, i) => {
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      // TODO: log error if not scale band
      return getHighlightedItemSpanAtAxis(axisForNormalDimension, {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
      }, singleGroupOptions)
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      // TODO: log error if invalid range
      return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions)
    }
  }

  const getNewHighlightedSegmentInitialWidth = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return 0
      case DIMENSIONS.vertical:
        return getHighlightedSegmentWidth(d, i)
    }
  }
  const getNewHighlightedSegmentInitialHeight = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getHighlightedSegmentHeight(d, i)
      case DIMENSIONS.vertical:
        return 0
    }
  }

  // ColorBar container positioning
  const colorBar = group
    .selectAll(`g.${colorBarBaseClass}`)
    .data([{
      [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
      [axisForDimension.keyForValues]: axisForDimension.scale.valueForOrigin
    }])

  const newColorBar = colorBar
    .enter()
    .append('g')
    .attr('class', getSingleBarCSSClasses)

  newColorBar
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getColorBarTransform)

  newColorBar
    .append('g')
    .attr('class', 'geo-chart-color-bar__segment-container')

  newColorBar
    .append('g')
    .attr('class', 'geo-chart-color-bar__highlighted-segment-container')

  const updatedColorBar = colorBar
  const allColorBars = updatedColorBar.merge(newColorBar)

  allColorBars
    .attr('class', getSingleBarCSSClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getColorBarTransform)

  colorBar
    .exit()
    .remove()

  // Color bar Segments positioning
  const segments = colorBar
    .select('g.geo-chart-color-bar__segment-container')
    .selectAll(`rect.${segmentBaseClass}`)
    .data(_.map(axisForDimension.scale.axisScale.domain(), (d) => {
      return {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
        [axisForDimension.keyForValues]: d
      }
    }))

  const newSegments = segments
    .enter()
    .append('rect')
    .attr('class', getSegmentBarCSSClasses)
    .attr('transform', getNewSegmentInitialTransform)
    .attr('stroke-width', '1px')
    .attr('width', getNewSegmentInitialWidth)
    .attr('height', getNewSegmentInitialHeight)

  const updatedSegments = segments
  const allSegments = updatedSegments.merge(newSegments)

  allSegments
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('class', getSegmentBarCSSClasses)
    .attr('transform', getSegmentTransform)
    .attr('stroke-width', '1px')
    .attr('width', getSegmentWidth)
    .attr('height', getSegmentHeight)

  segments
    .exit()
    .remove()

  // Color bar highlighted segments
  const highlightedSegments = colorBar
    .select('g.geo-chart-color-bar__highlighted-segment-container')
    .selectAll(`rect.${highlightedSegmentBaseClass}`)
    .data(_.map(singleGroupOptions.data, (d) => {
      return {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
        [axisForDimension.keyForValues]: d[axisForDimension.keyForValues]
      }
    }))

  const newHighlightedSegments = highlightedSegments
    .enter()
    .append('rect')
    .attr('class', getHighlightedSegmentBarCSSClasses)
    .attr('transform', getNewHighlightedSegmentInitialTransform)
    .attr('width', getNewHighlightedSegmentInitialWidth)
    .attr('height', getNewHighlightedSegmentInitialHeight)
    .attr('stroke', 'black')
    .attr('stroke-width', '1px')

  const updatedHighlightedSegments = highlightedSegments
  const allHighlightedSegments = newHighlightedSegments.merge(updatedHighlightedSegments)

  allHighlightedSegments
    .attr('class', getHighlightedSegmentBarCSSClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getHighlightedSegmentTransform)
    .attr('width', getHighlightedSegmentWidth)
    .attr('height', getHighlightedSegmentHeight)
    .attr('stroke', 'black')
    .attr('stroke-width', '1px')

  highlightedSegments
    .exit()
    .remove()

  // Color bar items translation functions
  function getColorBarTransform (d, i) {
    const translation = getTranslation(d, i)
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      return `translate(0, ${translation.y})`
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      return `translate(${translation.x}, 0)`
    }
  }
  function getSegmentTransform (d, i) {
    const translation = getSegmentTranslation(d, i)
    return `translate(${translation.x}, ${translation.y})`
  }
  function getNewSegmentInitialTransform (d, i) {
    const translation = getSegmentTranslation(d, i)
    const originTranslation = getSegmentTranslation({
      [axisForDimension.keyForValues]: axisForDimension.scale.valueForOrigin,
      [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
    }, i)
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      return `translate(${originTranslation.x}, ${translation.y})`
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      return `translate(${translation.x}, ${originTranslation.y})`
    }
  }
  function getHighlightedSegmentTransform (d, i) {
    const translation = getHighlightedSegmentTranslation(d, i)
    return `translate(${translation.x}, ${translation.y})`
  }
  function getNewHighlightedSegmentInitialTransform (d, i) {
    const translation = getHighlightedSegmentTranslation(d, i)
    const originTranslation = getHighlightedSegmentTranslation({
      [axisForDimension.keyForValues]: axisForDimension.scale.valueForOrigin,
      [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
    }, i)
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      return `translate(${originTranslation.x}, ${translation.y})`
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      return `translate(${translation.x}, ${originTranslation.y})`
    }
  }

  //
  /**
   * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} options
   * @returns {GetTranslationFunction}
   */
  function getSingleSegmentTranslationFactory (options) {
    return function (singleItem, index) {
      const horizontalAxis = options.axis.horizontal
      const verticalAxis = options.axis.vertical

      const originHorizontalPosition = horizontalAxis.scale.axisScale(singleItem[horizontalAxis.keyForValues])
      const originVerticalPosition = verticalAxis.scale.axisScale(singleItem[verticalAxis.keyForValues])

      const valueHorizontalSpan = getItemSpanAtAxis(horizontalAxis, singleItem, options)
      const valueVerticalSpan = getItemSpanAtAxis(verticalAxis, singleItem, options)

      const isBarHorizontalLengthIncreasing = isBarAxisLengthIncreasing(horizontalAxis, singleItem)
      const isBarVerticalLengthIncreasing = isBarAxisLengthIncreasing(verticalAxis, singleItem)

      const horizontalAxisTranslationForDimension = {
        [DIMENSIONS.horizontal]: isBarHorizontalLengthIncreasing
          ? originHorizontalPosition
          : originHorizontalPosition - valueHorizontalSpan,
        [DIMENSIONS.vertical]: 0
      }

      const verticalAxisTranslationForDimension = {
        [DIMENSIONS.horizontal]: 0,
        [DIMENSIONS.vertical]: isBarVerticalLengthIncreasing
          ? originVerticalPosition
          : originVerticalPosition - valueVerticalSpan
      }

      const horizontalAxisTranslation = horizontalAxisTranslationForDimension[options.dimension]
      const verticalAxisTranslation = verticalAxisTranslationForDimension[options.dimension]

      if (!_.isFinite(horizontalAxisTranslation)) {
        throw new Error(`GeoChart (Color bars) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.valueForOrigin}»).`)
      }

      if (!_.isFinite(verticalAxisTranslation)) {
        throw new Error(`GeoChart (Color bars) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.valueForOrigin}»).`)
      }

      return {
        x: horizontalAxisTranslation,
        y: verticalAxisTranslation
      }
    }
  }

  /**
   * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} options
   * @returns {GetTranslationFunction}
   */
  function getHighlightedSegmentTranslationFactory (options) {
    return function (singleItem, index) {
      const horizontalAxis = options.axis.horizontal
      const verticalAxis = options.axis.vertical

      const originHorizontalPosition = horizontalAxis.scale.axisScale(singleItem[horizontalAxis.keyForValues])
      const originVerticalPosition = verticalAxis.scale.axisScale(singleItem[verticalAxis.keyForValues])

      const horizontalHighlightedElementOffset = isWidthForced(options)
        ? (options.highlightedWidth - options.width) / 2
        : (horizontalAxis.scale.axisScale(options.naturalHighlightedWidth) - horizontalAxis.scale.axisScale(options.naturalWidth)) / 2

      const verticalHighlightedElementOffset = isWidthForced(options)
        ? (options.highlightedWidth - options.width) / 2
        : (verticalAxis.scale.axisScale(options.naturalHighlightedWidth) - verticalAxis.scale.axisScale(options.naturalWidth)) / 2

      const valueHorizontalSpan = getHighlightedItemSpanAtAxis(horizontalAxis, singleItem, options)
      const valueVerticalSpan = getHighlightedItemSpanAtAxis(verticalAxis, singleItem, options)

      const isBarHorizontalLengthIncreasing = isBarAxisLengthIncreasing(horizontalAxis, singleItem)
      const isBarVerticalLengthIncreasing = isBarAxisLengthIncreasing(verticalAxis, singleItem)

      const horizontalAxisTranslationForDimension = {
        [DIMENSIONS.horizontal]: isBarHorizontalLengthIncreasing
          ? originHorizontalPosition
          : originHorizontalPosition - valueHorizontalSpan,
        [DIMENSIONS.vertical]: 0 - horizontalHighlightedElementOffset
      }

      const verticalAxisTranslationForDimension = {
        [DIMENSIONS.horizontal]: 0 - verticalHighlightedElementOffset,
        [DIMENSIONS.vertical]: isBarVerticalLengthIncreasing
          ? originVerticalPosition
          : originVerticalPosition - valueVerticalSpan
      }

      const horizontalAxisTranslation = horizontalAxisTranslationForDimension[options.dimension]
      const verticalAxisTranslation = verticalAxisTranslationForDimension[options.dimension]

      if (!_.isFinite(horizontalAxisTranslation)) {
        throw new Error(`GeoChart (Color bars) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.valueForOrigin}»).`)
      }

      if (!_.isFinite(verticalAxisTranslation)) {
        throw new Error(`GeoChart (Color bars) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.valueForOrigin}»).`)
      }

      return {
        x: horizontalAxisTranslation,
        y: verticalAxisTranslation
      }
    }
  }
  /**
   * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} options
   * @returns {GetTranslationFunction}
   */
  function getSingleItemTranslationFactory (options) {
    return function (singleItem, index) {
      const horizontalAxis = options.axis.horizontal
      const verticalAxis = options.axis.vertical

      const originHorizontalPosition = horizontalAxis.scale.axisScale(horizontalAxis.scale.valueForOrigin)
      const originVerticalPosition = verticalAxis.scale.axisScale(verticalAxis.scale.valueForOrigin)

      const valueHorizontalSpan = getItemSpanAtAxis(horizontalAxis, singleItem, options)
      const valueVerticalSpan = getItemSpanAtAxis(verticalAxis, singleItem, options)

      const isBarHorizontalLengthIncreasing = isBarAxisLengthIncreasing(horizontalAxis, singleItem)
      const isBarVerticalLengthIncreasing = isBarAxisLengthIncreasing(verticalAxis, singleItem)

      // By default we don't want to add any additional translation to be bars
      // apart from the one required to position it respect to their value in the
      // normal axis
      const naturalNormalOffset = isNaturalNormalOffsetForced(options)
        ? options.naturalNormalOffset
        : 0

      const horizontalAxisTranslationForDimension = {
        [DIMENSIONS.horizontal]: isBarHorizontalLengthIncreasing
          ? originHorizontalPosition
          : originHorizontalPosition - valueHorizontalSpan,
        [DIMENSIONS.vertical]: getTranslationForAxisNormalToDimension(horizontalAxis, singleItem)
      }

      const verticalAxisTranslationForDimension = {
        [DIMENSIONS.horizontal]: getTranslationForAxisNormalToDimension(verticalAxis, singleItem),
        [DIMENSIONS.vertical]: isBarVerticalLengthIncreasing
          ? originVerticalPosition
          : originVerticalPosition - valueVerticalSpan
      }

      const horizontalAxisTranslation = horizontalAxisTranslationForDimension[options.dimension]
      const verticalAxisTranslation = verticalAxisTranslationForDimension[options.dimension]

      if (!_.isFinite(horizontalAxisTranslation)) {
        throw new Error(`GeoChart (Color bars) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.valueForOrigin}»).`)
      }

      if (!_.isFinite(verticalAxisTranslation)) {
        throw new Error(`GeoChart (Color bars) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.valueForOrigin}»).`)
      }

      return {
        x: horizontalAxisTranslation,
        y: verticalAxisTranslation
      }

      /**
       * @template Domain
       * @param {GeoChart.AxisConfig<Domain>} normalAxis
       * @param {object} singleItem
       */
      function getTranslationForAxisNormalToDimension (normalAxis, singleItem) {
        const positionOfItemValue = getItemValueAtAxis(normalAxis, singleItem)

        if (isScaleBand(normalAxis.scale.axisScale)) {
          const normalOffset = isNormalOffsetForced(options)
            ? options.normalOffset
            : naturalNormalOffset * normalAxis.scale.axisScale.bandwidth()

          return positionOfItemValue + normalOffset
        }

        if (isNormalOffsetForced(options)) return positionOfItemValue + options.normalOffset

        return getItemValueAtAxis(normalAxis, {
          [normalAxis.keyForValues]: _.get(singleItem, normalAxis.keyForValues) + naturalNormalOffset
        })
      }
    }
  }

  // CSS getClasses() Functions
  function getSingleBarCSSClasses (d, i) {
    const defaultClasses = [
      colorBarBaseClass,
      `geo-chart-color-bar--${i}`,
      `geo-chart-color-bar--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, colorBarBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }

  function getSegmentBarCSSClasses (d, i) {
    const defaultClasses = [
      segmentBaseClass,
      `geo-chart-color-bar__segment--${i}`,
      `geo-chart-color-bar__segment--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, segmentBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }

  function getHighlightedSegmentBarCSSClasses (d, i) {
    const highlightedSegmentIndex = _.indexOf(singleGroupOptions.axis.horizontal.scale.axisScale.domain(), d[axisForDimension.keyForValues])
    const defaultClasses = [
      highlightedSegmentBaseClass,
      `geo-chart-color-bar__highlighted-segment--${highlightedSegmentIndex}`,
      `geo-chart-color-bar__highlighted-segment--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, highlightedSegmentBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

/**
 * Returns the span (width or height) of given value in given axis, also
 * considering if there's a width overriden.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @param {GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {number}
 */
function getHighlightedItemSpanAtAxis (axisConfig, singleItem, options) {
  if (!isDimensionAxis(axisConfig, options) && isHighlightedWidthForced(options)) return options.highlightedWidth
  if (isScaleBand(axisConfig.scale.axisScale)) {
    const highlightedWidthForOneNaturalUnit = axisConfig.scale.axisScale.bandwidth()
    const naturalUnitsForWidth = isDimensionAxis(axisConfig, options)
      ? 1
      : _.get(options, 'naturalHighlightedWidth', 1)
    return highlightedWidthForOneNaturalUnit * naturalUnitsForWidth
  }

  const positionAtAxisOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = getItemValueAtAxis(axisConfig, singleItem)

  return Math.abs(getSpanEndPoint() - getSpanOriginPoint())

  function getSpanOriginPoint () {
    if (!isDimensionAxis(axisConfig, options)) {
      if (isNaturalHighlightedWidthForced(options)) {
        return getItemValueAtAxis(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) - options.naturalHighlightedWidth / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue - _.get(options, 'width', DEFAULT_WIDTH) / 2
    }

    return positionAtAxisOrigin
  }

  function getSpanEndPoint () {
    if (!isDimensionAxis(axisConfig, options)) {
      if (isNaturalHighlightedWidthForced(options)) {
        return getItemValueAtAxis(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) + options.naturalHighlightedWidth / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue + _.get(options, 'width', DEFAULT_WIDTH) / 2
    }

    return positionAtValue
  }
}
/**
 * Returns the span (width or height) of given value in given axis, also
 * considering if there's a width overriden.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @param {GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {number}
 */
function getItemSpanAtAxis (axisConfig, singleItem, options) {
  if (!isDimensionAxis(axisConfig, options) && isWidthForced(options)) return options.width
  if (isScaleBand(axisConfig.scale.axisScale)) {
    const widthForOneNaturalUnit = axisConfig.scale.axisScale.bandwidth()
    const naturalUnitsForWidth = isDimensionAxis(axisConfig, options)
      ? 1
      : _.get(options, 'naturalWidth', 1)
    return widthForOneNaturalUnit * naturalUnitsForWidth
  }

  const positionAtAxisOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = getItemValueAtAxis(axisConfig, singleItem)

  return Math.abs(getSpanEndPoint() - getSpanOriginPoint())

  function getSpanOriginPoint () {
    if (!isDimensionAxis(axisConfig, options)) {
      if (isNaturalWidthForced(options)) {
        return getItemValueAtAxis(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) - options.naturalWidth / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue - _.get(options, 'width', DEFAULT_WIDTH) / 2
    }

    return positionAtAxisOrigin
  }

  function getSpanEndPoint () {
    if (!isDimensionAxis(axisConfig, options)) {
      if (isNaturalWidthForced(options)) {
        return getItemValueAtAxis(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) + options.naturalWidth / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue + _.get(options, 'width', DEFAULT_WIDTH) / 2
    }

    return positionAtValue
  }
}

// COLOR BAR HELPER FUNCTIONS

/**
 * @template Domain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.AxisScale<Domain>} axisScale
 * @returns {boolean}
 * @see https://github.com/d3/d3-scale#scaleBand
 */
function isScaleBand (axisScale) {
  return !!axisScale.bandwidth
}

/**
 * @template Domain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isDimensionAxis (axisConfig, options) {
  if (!options) return false

  const axisForDimension = {
    [DIMENSIONS.horizontal]: options.axis.horizontal,
    [DIMENSIONS.vertical]: options.axis.vertical
  }

  return axisForDimension[options.dimension] === axisConfig
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isWidthForced (options) {
  return _.isFinite(_.get(options, 'width'))
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isHighlightedWidthForced (options) {
  return _.isFinite(_.get(options, 'highlightedWidth'))
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isNaturalWidthForced (options) {
  return _.isFinite(_.get(options, 'naturalWidth'))
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isNaturalHighlightedWidthForced (options) {
  return _.isFinite(_.get(options, 'naturalHighlightedWidth'))
}

/**
 * Returns the position of given value in given axis.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {number}
 */
function getItemValueAtAxis (axisConfig, singleItem) {
  const rawValue = singleItem[axisConfig.keyForValues]
  return axisConfig.scale.axisScale(rawValue)
}

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} options
 * @param {object} singleItem
 */
function isBarAxisLengthIncreasing (axisConfig, singleItem) {
  const originHorizontalPosition = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const valueHorizontalPosition = getItemValueAtAxis(axisConfig, singleItem)
  return originHorizontalPosition <= valueHorizontalPosition
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isNormalOffsetForced (options) {
  return _.isFinite(_.get(options, 'normalOffset'))
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isNaturalNormalOffsetForced (options) {
  return _.isFinite(_.get(options, 'naturalNormalOffset'))
}
