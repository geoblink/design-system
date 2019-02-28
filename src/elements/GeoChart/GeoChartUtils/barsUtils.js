const _ = require('lodash')

/**
 * @enum {GeoChart.BarDimension}
 */
const DIMENSIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

const DEFAULT_WIDTH = 10

/**
 * Returns the position of given value in given axis.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {number}
 */
export function getItemValueAtAxis (axisConfig, singleItem) {
  const rawValue = singleItem[axisConfig.keyForValues]
  return axisConfig.scale.axisScale(rawValue)
}

/**
 * Returns the span (width or height) of given value in given axis, also
 * considering if there's a width overriden.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @param {GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @param {object} keysConfig
 * @param {string} keysConfig.keyForWidth
 * @param {string} keysConfig.keyForNaturalWidth
 * @return {number}
 */
export function getItemSpanAtAxis (axisConfig, singleItem, options, { keyForWidth, keyForNaturalWidth }) {
  if (!isDimensionAxis(axisConfig, options) && isForced(options, keyForWidth)) return options[keyForWidth]
  if (isScaleBand(axisConfig.scale.axisScale)) {
    const widthForOneNaturalUnit = axisConfig.scale.axisScale.bandwidth()
    const naturalUnitsForWidth = isDimensionAxis(axisConfig, options)
      ? 1
      : _.get(options, keyForNaturalWidth, 1)
    return widthForOneNaturalUnit * naturalUnitsForWidth
  }

  const positionAtAxisOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = getItemValueAtAxis(axisConfig, singleItem)

  return Math.abs(getSpanEndPoint() - getSpanOriginPoint())

  function getSpanOriginPoint () {
    if (!isDimensionAxis(axisConfig, options)) {
      if (isForced(options, keyForNaturalWidth)) {
        return getItemValueAtAxis(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) - options[keyForNaturalWidth] / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue - _.get(options, keyForWidth, DEFAULT_WIDTH) / 2
    }

    return positionAtAxisOrigin
  }

  function getSpanEndPoint () {
    if (!isDimensionAxis(axisConfig, options)) {
      if (isForced(options, keyForNaturalWidth)) {
        return getItemValueAtAxis(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) + options[keyForNaturalWidth] / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue + _.get(options, keyForWidth, DEFAULT_WIDTH) / 2
    }

    return positionAtValue
  }
}

/**
 * @param {any} [options]
 * @param {string} [key]
 * @return {boolean}
 */
function isForced (options, key) {
  return _.isFinite(_.get(options, key))
}

/**
 * @template Domain
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
export function isDimensionAxis (axisConfig, options) {
  if (!options) return false

  const axisForDimension = {
    [DIMENSIONS.horizontal]: options.axis.horizontal,
    [DIMENSIONS.vertical]: options.axis.vertical
  }

  return axisForDimension[options.dimension] === axisConfig
}

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} options
 * @param {object} singleItem
 * @return {boolean}
 */
function isBarAxisLengthIncreasing (axisConfig, singleItem) {
  const originPosition = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const valuePosition = getItemValueAtAxis(axisConfig, singleItem)
  return originPosition <= valuePosition
}

/**
 * @template Domain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @param {object} keysConfig
 * @param {string} keysConfig.keyForNormalOffset
 * @param {string} keysConfig.keyForNaturalNormalOffset
 * @return {number}
 */
export function getTranslationForNormalAxisFactory (options, { keyForNormalOffset, keyForNaturalNormalOffset }) {
  return function (normalAxis, singleItem) {
    // By default we don't want to add any additional translation to be bars
    // apart from the one required to position it respect to their value in the
    // normal axis
    const naturalNormalOffset = isForced(options, keyForNaturalNormalOffset)
      ? options.naturalNormalOffset
      : 0
    const positionOfItemValue = getItemValueAtAxis(normalAxis, singleItem)

    if (isScaleBand(normalAxis.scale.axisScale)) {
      const normalOffset = isForced(options, keyForNormalOffset)
        ? options[keyForNormalOffset]
        : naturalNormalOffset * normalAxis.scale.axisScale.bandwidth()

      return positionOfItemValue + normalOffset
    }

    if (isForced(options, keyForNormalOffset)) return positionOfItemValue + options[keyForNormalOffset]

    return getItemValueAtAxis(normalAxis, {
      [normalAxis.keyForValues]: _.get(singleItem, normalAxis.keyForValues) + naturalNormalOffset
    })
  }
}

/**
 * @template Domain
 * @callback getTranslationForNormalAxis
 * @param {GeoChart.AxisConfig<Domain>} normalAxis
 * @param {object} singleItem
 * @returns {number}
 */

/**
 * @template Domain
 * @callback GetOriginPositionAtAxis
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @returns {number}
 */

/**
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @param {object} params
 * @param {string} params.keyForWidth
 * @param {string} params.keyForNaturalWidth
 * @param {getTranslationForNormalAxis<HorizontalDomain | VerticalDomain>} params.getTranslationForNormalAxis
 * @param {string} params.componentName
 * @param {GetOriginPositionAtAxis<HorizontalDomain | VerticalDomain>} params.getOriginPositionAtAxis
 * @returns {Function}
 */
export function getItemTranslationFactory (options, {
  keyForWidth,
  keyForNaturalWidth,
  getTranslationForNormalAxis,
  componentName,
  getOriginPositionAtAxis
}) {
  return function (singleItem, index) {
    const horizontalAxis = options.axis.horizontal
    const verticalAxis = options.axis.vertical

    const originHorizontalPosition = getOriginPositionAtAxis(horizontalAxis, singleItem)
    const originVerticalPosition = getOriginPositionAtAxis(verticalAxis, singleItem)

    const valueHorizontalSpan = getItemSpanAtAxis(horizontalAxis, singleItem, options, {
      keyForWidth,
      keyForNaturalWidth
    })
    const valueVerticalSpan = getItemSpanAtAxis(verticalAxis, singleItem, options, {
      keyForWidth,
      keyForNaturalWidth
    })

    const isBarHorizontalLengthIncreasing = isBarAxisLengthIncreasing(horizontalAxis, singleItem)
    const isBarVerticalLengthIncreasing = isBarAxisLengthIncreasing(verticalAxis, singleItem)

    const horizontalAxisTranslationForDimension = {
      [DIMENSIONS.horizontal]: isBarHorizontalLengthIncreasing
        ? originHorizontalPosition
        : originHorizontalPosition - valueHorizontalSpan,
      [DIMENSIONS.vertical]: getTranslationForNormalAxis(horizontalAxis, singleItem)
    }

    const verticalAxisTranslationForDimension = {
      [DIMENSIONS.horizontal]: getTranslationForNormalAxis(verticalAxis, singleItem),
      [DIMENSIONS.vertical]: isBarVerticalLengthIncreasing
        ? originVerticalPosition
        : originVerticalPosition - valueVerticalSpan
    }

    const horizontalAxisTranslation = horizontalAxisTranslationForDimension[options.dimension]
    const verticalAxisTranslation = verticalAxisTranslationForDimension[options.dimension]

    if (!_.isFinite(horizontalAxisTranslation)) {
      throw new Error(`GeoChart (${componentName}) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.scale.valueForOrigin}»).`)
    }

    if (!_.isFinite(verticalAxisTranslation)) {
      throw new Error(`GeoChart (${componentName}) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.scale.valueForOrigin}»).`)
    }

    return {
      x: horizontalAxisTranslation,
      y: verticalAxisTranslation
    }
  }
}
