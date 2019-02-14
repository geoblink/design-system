module.exports = {
  getItemSpanAtAxis,
  getHighlightedItemSpanAtAxis,
  getBarTranslationFactory,
  getSingleSegmentTranslationFactory,
  getHighlightedSegmentTranslationFactory,
  isDimensionAxis
}

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
function getItemValueAtAxis (axisConfig, singleItem) {
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
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {number}
 */
function getItemSpanAtAxis (axisConfig, singleItem, options) {
  if (!isDimensionAxis(axisConfig, options) && isWidthForced(options)) return options.width

  if (isScaleBand(axisConfig.scale.axisScale)) {
    const widthForOneNaturalUnit = axisConfig.scale.axisScale.bandwidth()
    const naturalUnitsForWidth = !isDimensionAxis(axisConfig, options)
      ? _.get(options, 'naturalWidth', 1)
      : 1
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
function isNaturalWidthForced (options) {
  return _.isFinite(_.get(options, 'naturalWidth'))
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
function isNaturalHighlightedWidthForced (options) {
  return _.isFinite(_.get(options, 'naturalHighlightedWidth'))
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
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @returns {GetTranslationFunction}
 */
function getBarTranslationFactory (options) {
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
      throw new Error(`GeoChart (bar) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.scale.valueForOrigin}»).`)
    }

    if (!_.isFinite(verticalAxisTranslation)) {
      throw new Error(`GeoChart (bar) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.scale.valueForOrigin}»).`)
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
      throw new Error(`GeoChart (bar) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.scale.valueForOrigin}»).`)
    }

    if (!_.isFinite(verticalAxisTranslation)) {
      throw new Error(`GeoChart (bar) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.scale.valueForOrigin}»).`)
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
      throw new Error(`GeoChart (bar) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.scale.valueForOrigin}»).`)
    }

    if (!_.isFinite(verticalAxisTranslation)) {
      throw new Error(`GeoChart (bar) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.scale.valueForOrigin}»).`)
    }

    return {
      x: horizontalAxisTranslation,
      y: verticalAxisTranslation
    }
  }
}
