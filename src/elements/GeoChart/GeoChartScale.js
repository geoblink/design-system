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
  categorical: 'categorical'
}

const scaleFactoryForType = {
  [SCALE_TYPES.linear]: d3.scaleLinear,
  [SCALE_TYPES.categorical]: d3.scaleBand
}

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

  const horizontalSpaceAvailable = chart.size.width - chart.margin.right
  const verticalSpaceAvailable = chart.size.height - chart.margin.bottom

  const rangeStartForDimension = {
    [DIMENSIONS.horizontal]: chart.margin.left,
    [DIMENSIONS.vertical]: chart.margin.top
  }

  const rangeEndForDimension = {
    [DIMENSIONS.horizontal]: horizontalSpaceAvailable,
    [DIMENSIONS.vertical]: verticalSpaceAvailable
  }

  const scaleFactory = scaleFactoryForType[scaleConfig.type]
  if (!scaleFactory) {
    throw new Error(`GeoChart (scale) [component] :: Trying to get scale of unknown type: ${scaleConfig.type}`)
  }

  const axisScale = scaleFactory()

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
