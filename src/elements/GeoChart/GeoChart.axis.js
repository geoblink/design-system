/// <reference types="d3" />

import * as d3 from 'd3'
import { POSITIONS, getOriginXTranslation, getOriginYTranslation } from './GeoChart.positioning'

/**
 * @template Domain
 * @callback AddAxisFunction
 * @param {GeoChart.AxisConfig<Domain>} options
 */

/**
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

    const axis = getAxisForPositionAndScale(options.position, options.scale.axisScale)
      .ticks(options.ticks)

    const xTranslation = getOriginXTranslation(
      options.position,
      options.chart.size,
      options.chart.margin
    )
    const yTranslation = getOriginYTranslation(
      options.position,
      options.chart.size,
      options.chart.margin
    )

    const dominantBaselineForPosition = {
      [POSITIONS.top]: 'baseline',
      [POSITIONS.bottom]: 'hanging',
      [POSITIONS.verticallyCenteredInTheMiddle]: 'baseline',
      [POSITIONS.left]: null,
      [POSITIONS.right]: null,
      [POSITIONS.horizontallyCenteredInTheMiddle]: null
      // TODO: Add position "anchoredToScale" which will render the axis in the position of the origin value of given scale
    }

    const textAnchorForPosition = {
      [POSITIONS.top]: null,
      [POSITIONS.bottom]: null,
      [POSITIONS.verticallyCenteredInTheMiddle]: null,
      [POSITIONS.left]: 'end',
      [POSITIONS.right]: 'start',
      [POSITIONS.horizontallyCenteredInTheMiddle]: 'end'
      // TODO: Add position "anchoredToScale" which will render the axis in the position of the origin value of given scale
    }

    group.attr('transform', `translate(${xTranslation}, ${yTranslation})`)
    group
      .transition()
      .duration(options.chart.animationsDurationInMilliseconds)
      .call(axis)
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
 * @param {GeoChart.AxisPosition} position
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

  console.warn(`GeoChart (axis) [component] :: Tried to get axis for unknown position: ${position}`)
}
