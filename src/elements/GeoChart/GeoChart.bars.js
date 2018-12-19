/// <reference types="d3" />

import './GeoChart.axis'

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
  const getTransformFunctions = {}

  return function (options) {
    const group = groups[options.id] || d3Instance
      .append('g')
      .attr('class', `geo-chart-bars-group geo-chart-bars-group--${options.id} geo-chart-bars-group--${options.dimension}`)
    groups[options.id] = group

    const getWidth = (d, i) => getAxisScaledSpan(options.axis.horizontal, d)
    const getHeight = (d, i) => getAxisScaledSpan(options.axis.vertical, d)

    const getTransform = getTransformFunctions[options.id] || getSingleItemTransformFactory(options)
    getTransformFunctions[options.id] = getTransform

    const bars = group
      .selectAll('rect.geo-chart-bar')
      .data(options.data)

    bars
      .enter()
      .append('rect')
      .attr('class', (d, i) => `geo-chart-bar geo-chart-bar--value-${d.value} geo-chart-bar geo-chart-bar--${i} geo-chart-bar--${options.dimension}`)
      .attr('transform', getTransform)
      .attr('width', getWidth)
      .attr('height', getHeight)

    bars
      .exit()
      .remove()
  }
}

/**
 * @callback GetTransformFunction
 * @param {object} singleItem
 * @param {number} index
 */

/**
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @returns {GetTransformFunction}
 */
function getSingleItemTransformFactory (options) {
  return function (singleItem, index) {
    const horizontalAxis = options.axis.horizontal
    const verticalAxis = options.axis.vertical

    const originHorizontalPosition = horizontalAxis.scale.axisScale(horizontalAxis.scale.valueForOrigin)
    const originVerticalPosition = verticalAxis.scale.axisScale(verticalAxis.scale.valueForOrigin)

    const valueHorizontalPosition = getAxisScaledValue(horizontalAxis, singleItem)
    const valueVerticalPosition = getAxisScaledValue(verticalAxis, singleItem)

    const valueHorizontalSpan = getAxisScaledSpan(horizontalAxis, singleItem)
    const valueVericalSpan = getAxisScaledSpan(verticalAxis, singleItem)

    const isBarHorizontalLengthIncreasing = originHorizontalPosition < valueHorizontalPosition
    const isBarVerticalLengthIncreasing = originVerticalPosition < valueVerticalPosition

    const horizontalAxisTranslationForDimension = {
      [DIMENSIONS.horizontal]: isBarHorizontalLengthIncreasing
        ? originHorizontalPosition
        : originHorizontalPosition - valueHorizontalSpan,
      [DIMENSIONS.vertical]: getAxisScaledValue(options.axis.horizontal, singleItem)
    }

    const verticalAxisTranslationForDimension = {
      [DIMENSIONS.horizontal]: getAxisScaledValue(options.axis.vertical, singleItem),
      [DIMENSIONS.vertical]: isBarVerticalLengthIncreasing
        ? originVerticalPosition
        : originVerticalPosition - valueVericalSpan
    }

    const horizontalAxisTranslation = horizontalAxisTranslationForDimension[options.dimension]
    const verticalAxisTranslation = verticalAxisTranslationForDimension[options.dimension]

    return `translate(${horizontalAxisTranslation}, ${verticalAxisTranslation})`
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
  const rawValue = singleItem[axisConfig.id]
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
