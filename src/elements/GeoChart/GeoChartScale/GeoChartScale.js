/// <reference types="d3" />

import _ from 'lodash'

import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'
import * as scaleUtils from '../GeoChartUtils/scaleUtils'

/**
 * @typedef {import('d3').ScaleBand} d3.ScaleBand
 */

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

export const DEFAULT_LOGARITHMIC_SCALE_BASE = 10

/**
 * @typedef {object} AxisConfig
 * @property {string} id
 * @property {dimensionUtils.DIMENSIONS_2D} dimension
 * @property {GeoChart.ScaleConfig} scale
 */

/**
 * @param {AxisConfig} axisConfig
 * @param {{size: GeoChart.Size, margin: GeoChart.Margin}} chart
 * @return {{ axisScale: GeoChart.AxisScale, valueForOrigin: string | number }}
 */
export function getNewScale (axisConfig, chart) {
  const scaleConfig = axisConfig.scale

  const horizontalRangeEnd = chart.size.width - chart.margin.right
  const verticalRangeEnd = chart.size.height - chart.margin.bottom

  const rangeStartForDimension = {
    [dimensionUtils.DIMENSIONS_2D.horizontal]: chart.margin.left,
    [dimensionUtils.DIMENSIONS_2D.vertical]: chart.margin.top
  }

  const rangeEndForDimension = {
    [dimensionUtils.DIMENSIONS_2D.horizontal]: horizontalRangeEnd,
    [dimensionUtils.DIMENSIONS_2D.vertical]: verticalRangeEnd
  }

  const axisScale = scaleFactory(scaleConfig)

  axisScale.range([
    rangeStartForDimension[axisConfig.dimension],
    rangeEndForDimension[axisConfig.dimension]
  ])

  const paddingInner = _.get(scaleConfig, 'padding.inner')
  if (_.isFinite(paddingInner)) {
    (/** @type {d3.ScaleBand} */ (axisScale)).paddingInner(paddingInner)
  }

  const paddingOuter = _.get(scaleConfig, 'padding.outer')
  if (_.isFinite(paddingOuter)) {
    (/** @type {d3.ScaleBand} */ (axisScale)).paddingOuter(paddingOuter)
  }

  if ('start' in scaleConfig.domain && 'end' in scaleConfig.domain) {
    axisScale.domain([scaleConfig.domain.start, scaleConfig.domain.end])
  } else if (_.isArray(scaleConfig.domain)) {
    // IntelliSense automatically infers that axisScale is a
    // `ScaleContinuousNumeric` even though it might be a `ScaleBand`
    axisScale.domain((/** @type {number[]} */ (scaleConfig.domain)))
  } else {
    throw new Error(`GeoChart (scale) [component] :: Wrong domain config for scale of axis ${axisConfig.id}`)
  }

  return {
    axisScale,
    valueForOrigin: scaleConfig.valueForOrigin
  }
}

/**
 * @param {GeoChart.ScaleConfig} scaleConfig
 * @returns {GeoChart.AxisScale}
 */
function scaleFactory (scaleConfig) {
  switch (scaleConfig.type) {
    case scaleUtils.SCALE_TYPES.linear:
      return d3.scaleLinear()
    case scaleUtils.SCALE_TYPES.logarithmic: {
      const scale = d3.scaleLog()
      scale.base(_.get(scaleConfig, 'base', DEFAULT_LOGARITHMIC_SCALE_BASE))
      return scale
    }
    case scaleUtils.SCALE_TYPES.categorical:
      return d3.scaleBand()
  }

  throw new Error(`GeoChart (scale) [component] :: Trying to get scale of unknown type: ${scaleConfig.type}`)
}
