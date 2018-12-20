/// <reference types="d3" />

import _ from 'lodash'
import * as d3 from 'd3'

export const DIMENSIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

export const POSITIONS = {
  bottom: 'bottom',
  top: 'top',
  left: 'left',
  right: 'right',
  verticallyCenteredInTheMiddle: 'verticallyCenteredInTheMiddle',
  horizontallyCenteredInTheMiddle: 'horizontallyCenteredInTheMiddle',
  anchoredToScale: 'anchoredToScale'
}

export const SIMPLE_POSITIONS = {
  [POSITIONS.bottom]: POSITIONS.bottom,
  [POSITIONS.top]: POSITIONS.top,
  [POSITIONS.left]: POSITIONS.left,
  [POSITIONS.right]: POSITIONS.right,
  [POSITIONS.verticallyCenteredInTheMiddle]: POSITIONS.verticallyCenteredInTheMiddle,
  [POSITIONS.horizontallyCenteredInTheMiddle]: POSITIONS.horizontallyCenteredInTheMiddle
}

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
      .attr('class', `geo-chart-axis geo-chart-axis-${options.id} geo-chart-axis--${options.position.type}`)
    groups[options.id] = group

    const axis = getAxisForPositionAndScale(options.position, options.scale.axisScale)

    const tickCount = _.get(options, 'ticks.count')
    if (_.isFinite(tickCount)) {
      axis.ticks(tickCount)
    }

    const tickFormat = _.get(options, 'ticks.format')
    if (tickFormat) {
      axis.tickFormat(tickFormat)
    }

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

    const dimension = getAxisDimension(options.position)

    const dominantBaselineForPosition = {
      [POSITIONS.top]: 'baseline',
      [POSITIONS.bottom]: 'hanging',
      [POSITIONS.verticallyCenteredInTheMiddle]: 'baseline',
      [POSITIONS.left]: 'middle',
      [POSITIONS.right]: 'middle',
      [POSITIONS.horizontallyCenteredInTheMiddle]: 'middle',
      [POSITIONS.anchoredToScale]: dimension === DIMENSIONS.vertical ? 'middle' : null
    }

    const textAnchorForPosition = {
      [POSITIONS.top]: 'middle',
      [POSITIONS.bottom]: 'middle',
      [POSITIONS.verticallyCenteredInTheMiddle]: 'middle',
      [POSITIONS.left]: 'end',
      [POSITIONS.right]: 'start',
      [POSITIONS.horizontallyCenteredInTheMiddle]: 'end',
      [POSITIONS.anchoredToScale]: dimension === DIMENSIONS.horizontal ? 'middle' : null
    }

    const tickGroups = group
      .transition()
      .duration(options.chart.animationsDurationInMilliseconds)
      .attr('transform', `translate(${xTranslation}, ${yTranslation})`)
      .call(axis)
      .selectAll('g.tick')
      .attr('class', `tick geo-chart-axis-tick--${options.position.type}`)

    const textGroups = tickGroups
      .selectAll('text')

    const labelTransform = _.get(options, 'ticks.labelTransform')
    if (labelTransform) {
      textGroups
        .attr('transform', (d, i) => labelTransform(d, i, {
          canvasSize: options.chart.size,
          chartMargin: options.chart.margin,
          absolutePosition: {
            x: xTranslation,
            y: yTranslation
          }
        }))
    }

    textGroups
      .attr('dominant-baseline', dominantBaselineForPosition[options.position.type])
      .attr('text-anchor', textAnchorForPosition[options.position.type])
      .attr('dx', null)
      .attr('dy', null)
  }
}

/**
 * @template Domain
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @param {d3.AxisScale<Domain>} scale
 * @returns {d3.Axis<Domain>}
 */
function getAxisForPositionAndScale (position, scale) {
  switch (position.type) {
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
    case POSITIONS.anchoredToScale: {
      const axisDimension = getAxisDimension(position)
      return axisDimension === DIMENSIONS.horizontal
        ? d3.axisBottom(scale)
        : d3.axisLeft(scale)
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get axis for unknown position: ${position.type}`, position)
}

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @return {GeoChart.AxisDimension}
 */
export function getAxisDimension (position) {
  switch (position.type) {
    case POSITIONS.top:
    case POSITIONS.bottom:
    case POSITIONS.verticallyCenteredInTheMiddle:
      return DIMENSIONS.horizontal
    case POSITIONS.left:
    case POSITIONS.right:
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return DIMENSIONS.vertical
    case POSITIONS.anchoredToScale: {
      const anchoredAxisPosition = getAxisDimension(position.relativeAxisPosition)
      return anchoredAxisPosition === DIMENSIONS.horizontal
        ? DIMENSIONS.vertical
        : DIMENSIONS.horizontal
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get axis dimension for unknown position: ${position.type}`, position)
}

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} margin
 * @returns {string}
 */
export function getOriginXTranslation (position, svgSize, margin) {
  switch (position.type) {
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
    case POSITIONS.anchoredToScale: {
      const dimension = getAxisDimension(position)

      switch (dimension) {
        case DIMENSIONS.horizontal:
          return 0
        case DIMENSIONS.vertical:
          return position.scale.axisScale(position.value)
      }

      console.warn(`GeoChart (axis) [component] :: Tried to get X Translation for unknown dimension: ${dimension}`, position)
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get X Translation for unknown position: ${position.type}`, position)
}

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} [margin]
 * @returns {string}
 */
export function getOriginYTranslation (position, svgSize, margin) {
  switch (position.type) {
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
    case POSITIONS.anchoredToScale: {
      const dimension = getAxisDimension(position)

      switch (dimension) {
        case DIMENSIONS.horizontal:
          return position.scale.axisScale(position.value)
        case DIMENSIONS.vertical:
          return 0
      }

      console.warn(`GeoChart (axis) [component] :: Tried to get Y Translation for unknown dimension: ${dimension}`, position)
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get Y Translation for unknown position: ${position.type}`, position)
}
