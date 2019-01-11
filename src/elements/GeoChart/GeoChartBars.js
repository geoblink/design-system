/// <reference types="d3" />

import _ from 'lodash'

import './GeoChartAxis'

/**
 * @enum {GeoChart.BarDimension}
 */
export const DIMENSIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

export const DEFAULT_WIDTH = 10

/**
 * @callback AddBarGroupFunction
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} options
 */

/**
 * @param {d3.Selection<any, any, null, undefined>} d3Instance
 * @returns {AddBarGroupFunction}
 */
export function addBarGroupFactory (d3Instance) {
  const groups = {}

  return function (options) {
    const group = groups[options.id] || d3Instance
      .append('g')
      .attr('class', `geo-chart-bars-group geo-chart-bars-group--${options.id} geo-chart-bars-group--${options.dimension}`)
    groups[options.id] = group

    const getWidth = (d, i) => getAxisScaledSpan(options.axis.horizontal, d, options)
    const getHeight = (d, i) => getAxisScaledSpan(options.axis.vertical, d, options)

    const getTranslation = getSingleItemTranslationFactory(options)

    const bars = group
      .selectAll('rect.geo-chart-bar')
      .data(options.data)

    bars
      .enter()
      .append('rect')
      .attr('class', (d, i) => `geo-chart-bar geo-chart-bar--${i} geo-chart-bar--${options.dimension}`)
      .attr('transform', getTransform)
      .attr('width', getWidth)
      .attr('height', getHeight)

    bars
      .transition()
      .duration(options.chart.animationsDurationInMilliseconds)
      .attr('transform', getTransform)
      .attr('width', getWidth)
      .attr('height', getHeight)

    bars
      .exit()
      .remove()

    function getTransform (d, i) {
      const translation = getTranslation(d, i)
      return `translate(${translation.x}, ${translation.y})`
    }
  }
}

/**
 * @callback GetTranslationFunction
 * @param {object} singleItem
 * @param {number} index
 */

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} options
 * @param {object} singleItem
 */
function isBarAxisLengthIncreasing (axisConfig, singleItem) {
  const originHorizontalPosition = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const valueHorizontalPosition = getAxisScaledValue(axisConfig, singleItem)
  return originHorizontalPosition < valueHorizontalPosition
}

/**
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @returns {GetTranslationFunction}
 */
function getSingleItemTranslationFactory (options) {
  return function (singleItem, index) {
    const horizontalAxis = options.axis.horizontal
    const verticalAxis = options.axis.vertical

    const originHorizontalPosition = horizontalAxis.scale.axisScale(horizontalAxis.scale.valueForOrigin)
    const originVerticalPosition = verticalAxis.scale.axisScale(verticalAxis.scale.valueForOrigin)

    const valueHorizontalSpan = getAxisScaledSpan(horizontalAxis, singleItem, options)
    const valueVericalSpan = getAxisScaledSpan(verticalAxis, singleItem, options)

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
        : originVerticalPosition - valueVericalSpan
    }

    const horizontalAxisTranslation = horizontalAxisTranslationForDimension[options.dimension]
    const verticalAxisTranslation = verticalAxisTranslationForDimension[options.dimension]

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
      const positionOfItemValue = getAxisScaledValue(normalAxis, singleItem)

      if (isScaleBand(normalAxis.scale.axisScale)) {
        const normalOffset = isNormalOffsetForced(options)
          ? options.normalOffset
          : naturalNormalOffset * normalAxis.scale.axisScale.bandwidth()

        return positionOfItemValue + normalOffset
      }

      if (isNormalOffsetForced(options)) return positionOfItemValue + options.normalOffset

      return getAxisScaledValue(normalAxis, {
        [normalAxis.keyForValues]: _.get(singleItem, normalAxis.keyForValues) + naturalNormalOffset
      })
    }
  }
}

/**
 * Returns the position of given value in given axis.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {number}
 */
function getAxisScaledValue (axisConfig, singleItem) {
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
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {number}
 */
function getAxisScaledSpan (axisConfig, singleItem, options) {
  if (isDimensionAxis(axisConfig, options) && isWidthForced(options)) return options.width

  if (isScaleBand(axisConfig.scale.axisScale)) {
    const widthForOneNaturalUnit = axisConfig.scale.axisScale.bandwidth()
    const naturalUnitsForWidth = isDimensionAxis(axisConfig, options)
      ? _.get(options, 'naturalWidth', 1)
      : 1
    return widthForOneNaturalUnit * naturalUnitsForWidth
  }

  const positionAtAxisOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = getAxisScaledValue(axisConfig, singleItem)

  return Math.abs(getSpanTargetPoint() - getSpanOriginPoint())

  function getSpanOriginPoint () {
    if (isDimensionAxis(axisConfig, options)) {
      if (isNaturalWidthForced(options)) {
        return getAxisScaledValue(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) - options.naturalWidth / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue - _.get(options, 'width', DEFAULT_WIDTH / 2)
    }

    return positionAtAxisOrigin
  }

  function getSpanTargetPoint () {
    if (isDimensionAxis(axisConfig, options)) {
      if (isNaturalWidthForced(options)) {
        return getAxisScaledValue(axisConfig, {
          [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) + options.naturalWidth / 2
        })
      }

      // By default bars will have a width of 10px in non-band scales so they
      // start 5px below the anchor point.
      return positionAtValue + _.get(options, 'width', DEFAULT_WIDTH / 2)
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
 * Returns the span (width or height) of given value in given axis.
 *
 * @template Domain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isDimensionAxis (axisConfig, options) {
  if (!options) return false

  const axisForDimension = {
    [DIMENSIONS.horizontal]: options.axis.vertical,
    [DIMENSIONS.vertical]: options.axis.horizontal
  }

  return axisForDimension[options.dimension] === axisConfig
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isWidthForced (options) {
  return _.isFinite(_.get(options, 'width'))
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isNaturalWidthForced (options) {
  return _.isFinite(_.get(options, 'naturalWidth'))
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isNormalOffsetForced (options) {
  return _.isFinite(_.get(options, 'normalOffset'))
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @return {boolean}
 */
function isNaturalNormalOffsetForced (options) {
  return _.isFinite(_.get(options, 'naturalNormalOffset'))
}
