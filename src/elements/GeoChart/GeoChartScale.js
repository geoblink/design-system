/// <reference types="d3" />

import _ from 'lodash'

import { DIMENSIONS } from './GeoChartAxis'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * @enum {GeoChart.ScaleType}
 */
export const SCALE_TYPES = {
  linear: 'linear',
  logarithmic: 'logarithmic',
  categorical: 'categorical'
}

export const DEFAULT_LOGARITHMIC_SCALE_BASE = 10

/**
 * @typedef BandScalePadding
 * @property {number} [outer]
 * @property {number} [inner]
 */

/**
 * @typedef {object} ScaleNumericalRangeDomain
 * @property {number} start
 * @property {number} end
 */

/**
 * @typedef {object} ScaleConfig
 * @property {GeoChart.ScaleType} type
 * @property {number|string} valueForOrigin
 * @property {ScaleNumericalRangeDomain | string[] | number[]} domain
 * @property {BandScalePadding} [padding]
 */

/**
 * @typedef {object} AxisConfig
 * @property {string} id
 * @property {GeoChart.AxisDimension} dimension
 * @property {ScaleConfig} scale
 */

/**
 * @param {AxisConfig} axisConfig
 * @param {ScaleOptions} options
 * @param {{size: GeoChart.Size, margin: GeoChart.Margin}} chart
 * @return {d3.ScaleLinear|null}
 */
export function getNewScale (axisConfig, chart) {
  const scaleConfig = axisConfig.scale

  const horizontalRangeEnd = chart.size.width - chart.margin.right
  const verticalRangeEnd = chart.size.height - chart.margin.bottom

  const rangeStartForDimension = {
    [DIMENSIONS.horizontal]: chart.margin.left,
    [DIMENSIONS.vertical]: chart.margin.top
  }

  const rangeEndForDimension = {
    [DIMENSIONS.horizontal]: horizontalRangeEnd,
    [DIMENSIONS.vertical]: verticalRangeEnd
  }

  const axisScale = scaleFactory(scaleConfig)

  axisScale.range([
    rangeStartForDimension[axisConfig.dimension],
    rangeEndForDimension[axisConfig.dimension]
  ])

  const paddingInner = _.get(scaleConfig, 'padding.inner')
  if (_.isFinite(paddingInner)) {
    axisScale.paddingInner(paddingInner)
  }

  const paddingOuter = _.get(scaleConfig, 'padding.outer')
  if (_.isFinite(paddingOuter)) {
    axisScale.paddingOuter(paddingOuter)
  }

  if ('start' in scaleConfig.domain && 'end' in scaleConfig.domain) {
    axisScale.domain([scaleConfig.domain.start, scaleConfig.domain.end])
  } else if (_.isArray(scaleConfig.domain)) {
    axisScale.domain(scaleConfig.domain)
  } else {
    throw new Error(`GeoChart (scale) [component] :: Wrong domain config for scale of axis ${axisConfig.id}`)
  }

  return {
    axisScale,
    valueForOrigin: scaleConfig.valueForOrigin
  }
}

/**
 * @param {ScaleConfig} scaleConfig
 * @returns {d3.AxisScale}
 */
function scaleFactory (scaleConfig) {
  switch (scaleConfig.type) {
    case SCALE_TYPES.linear:
      return d3.scaleLinear()
    case SCALE_TYPES.logarithmic: {
      const scale = d3.scaleLog()
      scale.base(scaleConfig.base || DEFAULT_LOGARITHMIC_SCALE_BASE)
      return scale
    }
    case SCALE_TYPES.categorical:
      return d3.scaleBand()
  }

  throw new Error(`GeoChart (scale) [component] :: Trying to get scale of unknown type: ${scaleConfig.type}`)
}
