/// <reference types="d3" />

import _ from 'lodash'
import * as d3 from 'd3'

import { POSITIONS } from './GeoChart.positioning'

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
 * @property {GeoChart.AxisPosition} position
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

  const rangeStartForPosition = {
    [POSITIONS.top]: chart.margin.left,
    [POSITIONS.bottom]: chart.margin.left,
    [POSITIONS.verticallyCenteredInTheMiddle]: chart.margin.left,
    [POSITIONS.left]: chart.margin.top,
    [POSITIONS.right]: chart.margin.top,
    [POSITIONS.horizontallyCenteredInTheMiddle]: chart.margin.top
  }

  const rangeEndForPosition = {
    [POSITIONS.top]: horizontalSpaceAvailable,
    [POSITIONS.bottom]: horizontalSpaceAvailable,
    [POSITIONS.verticallyCenteredInTheMiddle]: horizontalSpaceAvailable,
    [POSITIONS.left]: verticalSpaceAvailable,
    [POSITIONS.right]: verticalSpaceAvailable,
    [POSITIONS.horizontallyCenteredInTheMiddle]: verticalSpaceAvailable
  }

  const scaleFactory = scaleFactoryForType[scaleConfig.type]
  if (scaleFactory) {
    const scale = scaleFactory()

    scale.range([
      rangeStartForPosition[axisConfig.position],
      rangeEndForPosition[axisConfig.position]
    ])

    const paddingInner = _.get(scaleConfig, 'padding.inner')
    if (_.isFinite(paddingInner)) {
      scale.paddingInner(paddingInner)
    }

    const paddingOuter = _.get(scaleConfig, 'padding.outer')
    if (_.isFinite(paddingOuter)) {
      scale.paddingOuter(paddingOuter)
    }

    if ('start' in scaleConfig.domain && 'end' in scaleConfig.domain) {
      scale.domain([scaleConfig.domain.start, scaleConfig.domain.end])
    } else if (_.isArray(scaleConfig.domain)) {
      scale.domain(scaleConfig.domain)
    } else {
      console.error(`GeoChart (scale) [component] :: Wrong domain config for scale of axis ${axisConfig.id}`, scaleConfig)
    }

    return {
      axisScale: scale,
      valueForOrigin: scaleConfig.valueForOrigin
    }
  }

  console.error(`GeoChart (scale) [component] :: Trying to get scale of unknown type: ${scaleConfig.type}`, scaleConfig)
}
