/// <reference types="d3" />

import './GeoChartAxis'

/**
 * @enum {GeoChart.BarDimension}
 */
export const DIMENSIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

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

    const getWidth = (d, i) => getAxisScaledSpan(options.axis.horizontal, d)
    const getHeight = (d, i) => getAxisScaledSpan(options.axis.vertical, d)

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

    const valueHorizontalSpan = getAxisScaledSpan(horizontalAxis, singleItem)
    const valueVericalSpan = getAxisScaledSpan(verticalAxis, singleItem)

    const isBarHorizontalLengthIncreasing = isBarAxisLengthIncreasing(horizontalAxis, singleItem)
    const isBarVerticalLengthIncreasing = isBarAxisLengthIncreasing(verticalAxis, singleItem)

    const horizontalAxisTranslationForDimension = {
      [DIMENSIONS.horizontal]: isBarHorizontalLengthIncreasing
        ? originHorizontalPosition
        : originHorizontalPosition - valueHorizontalSpan,
      [DIMENSIONS.vertical]: getAxisScaledValue(horizontalAxis, singleItem)
    }

    const verticalAxisTranslationForDimension = {
      [DIMENSIONS.horizontal]: getAxisScaledValue(verticalAxis, singleItem),
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
 * Returns the span (width or height) of given value in given axis.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {number}
 */
function getAxisScaledSpan (axisConfig, singleItem) {
  if (axisConfig.scale.axisScale.bandwidth) return axisConfig.scale.axisScale.bandwidth()

  const positionAtOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = getAxisScaledValue(axisConfig, singleItem)

  return Math.abs(positionAtValue - positionAtOrigin)
}
