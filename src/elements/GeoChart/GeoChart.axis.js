/// <reference types="d3" />

import _ from 'lodash'
import * as d3 from 'd3'

/**
 * @typedef AxisPosition
 * @readonly
 * @enum {string}
 */
export const POSITIONS = {
  bottom: 'bottom',
  top: 'top',
  left: 'left',
  right: 'right',
  verticallyCenteredInTheMiddle: 'verticallyCenteredInTheMiddle',
  horizontallyCenteredInTheMiddle: 'horizontallyCenteredInTheMiddle'
}

/**
 * @typedef {Object} Margin
 * @param {Number} left
 * @param {Number} right
 * @param {Number} top
 * @param {Number} bottom
 */

/**
 * @typedef {Object} Size
 * @param {Number} height
 * @param {Number} width
 */

/**
 * @template Domain
 * @typedef {Object} AxisConfig
 * @property {String} id
 * @property {Number} ticks
 * @property {AxisPosition} position
 * @property {d3.AxisScale<Domain>} domain
 * @property {Size} chartSize
 * @property {Margin} chartMargin
 */

/**
 * @callback AddAxisFunction
 * @param {AxisConfig<Domain>} options
 */

/**
 * @template Domain
 * @param {d3.Selection<any, any, null, undefined>} d3Instance
 * @returns {AddAxisFunction}
 */
export function addAxisFactory (d3Instance) {
  const groups = {}

  return function (options) {
    const group = groups[options.id] || d3Instance
      .append('g')
      .attr('class', `geo-chart-axis geo-chart-axis-${options.id} geo-chart-axis--${options.position}`)
    groups[options.id] = group

    const axis = getAxisForPositionAndScale(options.position, options.scale)
      .ticks(options.ticks)

    const xTranslation = getAxisXTranslation(
      options.position,
      options.chartSize,
      options.chartMargin
    )
    const yTranslation = getAxisYTranslation(
      options.position,
      options.chartSize,
      options.chartMargin
    )

    const dominantBaselineForPosition = {
      [POSITIONS.top]: 'baseline',
      [POSITIONS.bottom]: 'hanging',
      [POSITIONS.verticallyCenteredInTheMiddle]: 'baseline',
      [POSITIONS.left]: null,
      [POSITIONS.right]: null,
      [POSITIONS.horizontallyCenteredInTheMiddle]: null
    }

    const textAnchorForPosition = {
      [POSITIONS.top]: null,
      [POSITIONS.bottom]: null,
      [POSITIONS.verticallyCenteredInTheMiddle]: null,
      [POSITIONS.left]: 'end',
      [POSITIONS.right]: 'start',
      [POSITIONS.horizontallyCenteredInTheMiddle]: 'end'
    }

    group.attr('transform', `translate(${xTranslation}, ${yTranslation})`)
    group.call(axis)
      .selectAll('g.tick')
      .attr('class', `tick geo-chart-axis-tick--${options.position}`)
      .selectAll('text')
      .attr('dominant-baseline', dominantBaselineForPosition[options.position])
      .attr('text-anchor', textAnchorForPosition[options.position])
      .attr('dx', null)
      .attr('dy', null)
  }
}

/**
 * @template Domain
 * @param {AxisPosition} position
 * @param {d3.AxisScale<Domain>} scale
 * @returns {d3.Axis<Domain>}
 */
function getAxisForPositionAndScale (position, scale) {
  switch (position) {
    case POSITIONS.top:
      return d3.axisTop(scale)
    case POSITIONS.bottom:
      return d3.axisBottom(scale)
    case POSITIONS.verticallyCenteredInTheMiddle:
      return d3.axisTop(scale) // TODO: Implement this properly
    case POSITIONS.left:
      return d3.axisLeft(scale)
    case POSITIONS.right:
      return d3.axisRight(scale)
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return d3.axisLeft(scale) // TODO: Implement this properly
  }

  console.warn(`[GeoChart.axis] Tried to get axis for unknown position: ${position}`)
}

/**
 * @param {AxisPosition} position
 * @param {Size} svgSize
 * @param {Margin} margin
 * @returns {String}
 */
function getAxisXTranslation (position, svgSize, margin) {
  switch (position) {
    case POSITIONS.top:
    case POSITIONS.bottom:
    case POSITIONS.verticallyCenteredInTheMiddle:
      return 0
    case POSITIONS.left:
      return margin.left
    case POSITIONS.right:
      return svgSize.width - margin.right
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return margin.left + (svgSize.width - margin.left - margin.right) / 2
  }

  console.warn(`[GeoChart.axis] Tried to get X Translation for unknown position: ${position}`)
}

/**
 * @param {AxisPosition} position
 * @param {Size} svgSize
 * @param {Margin} [margin]
 * @returns {String}
 */
function getAxisYTranslation (position, svgSize, margin) {
  switch (position) {
    case POSITIONS.top:
      return margin.top
    case POSITIONS.bottom:
      return svgSize.height - margin.bottom
    case POSITIONS.verticallyCenteredInTheMiddle:
      return (svgSize.height - margin.top - margin.bottom) / 2
    case POSITIONS.left:
    case POSITIONS.right:
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return 0
  }

  console.warn(`[GeoChart.axis] Tried to get X Translation for unknown position: ${position}`)
}
