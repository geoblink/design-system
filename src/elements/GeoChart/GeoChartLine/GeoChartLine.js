/// <reference types='d3' />

import _ from 'lodash'

import {
  DIMENSIONS
} from '../GeoChartAxis/GeoChartAxis'

import {
  isDimensionAxis
} from '../GeoChartUtils/barsUtils'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * @enum {GeoChart.InterpolationTypes}
 */
export const INTERPOLATION_TYPES = {
  'd3.curveLinear': d3.curveLinear,
  'd3.curveStepBefore': d3.curveStepBefore,
  'd3.curveStepAfter': d3.curveStepAfter,
  'd3.curveBasis': d3.curveBasis,
  'd3.curveBasisOpen': d3.curveBasisOpen,
  'd3.curveBasisClosed': d3.curveBasisClosed,
  'd3.curveBundle': d3.curveBundle,
  'd3.curveCardinal': d3.curveCardinal,
  'd3.curveCardinalOpen': d3.curveCardinalOpen,
  'd3.curveCardinalClosed': d3.curveCardinalClosed,
  'd3.curveNatural': d3.curveNatural
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-line-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-line-group geo-chart-line-group--${singleGroupOptions.id}`
    )

  groups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  const updatedGroups = groups
  const allGroups = newGroups.merge(updatedGroups)

  allGroups.each(function (singleGroupOptions, i) {
    renderSingleGroup(newGroups, updatedGroups, singleGroupOptions, globalOptions)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} group
 * @param {GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 */
function renderSingleGroup (newGroups, updatedGroups, singleGroupOptions, globalOptions) {
  const lineBaseClass = 'geo-chart-line-element'
  const isDimensionHorizontalAxis = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)

  const axisForDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.horizontal : singleGroupOptions.axis.vertical
  const axisForNormalDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.vertical : singleGroupOptions.axis.horizontal

  const xScale = isDimensionHorizontalAxis ? axisForDimension.scale.axisScale : axisForNormalDimension.scale.axisScale
  const yScale = isDimensionHorizontalAxis ? axisForNormalDimension.scale.axisScale : axisForDimension.scale.axisScale

  const initialLine = d3.line()
    .x((d, i) => {
      const valueForScale = isDimensionHorizontalAxis
        ? d[singleGroupOptions.axis.horizontal.keyForValues]
        : singleGroupOptions.axis.horizontal.scale.valueForOrigin
      return xScale(valueForScale)
    })
    .y((d, i) => {
      const valueForScale = isDimensionHorizontalAxis
        ? singleGroupOptions.axis.vertical.scale.valueForOrigin
        : d[singleGroupOptions.axis.vertical.keyForValues]
      return yScale(valueForScale)
    })

  const line = d3.line()
    .x((d, i) => {
      return xScale(d[singleGroupOptions.axis.horizontal.keyForValues])
    })
    .y((d, i) => {
      return yScale(d[singleGroupOptions.axis.vertical.keyForValues])
    })
    .curve(singleGroupOptions.interpolationFn)

  const margin = globalOptions.chart.margin
  const overlayWidth = globalOptions.chart.size.width - margin.right - margin.left
  const overlayHeight = globalOptions.chart.size.height - margin.top - margin.bottom
  const focusGroup = getFocusGroup()

  newGroups
    .append('rect')
    .attr('class', 'overlay')
    .attr('width', overlayWidth > 0 ? overlayWidth : 0)
    .attr('height', overlayHeight > 0 ? overlayHeight : 0)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseover', () => focusGroup.style('display', null))
    .on('mouseout', () => focusGroup.style('display', 'none'))
    .on('mousemove', positionTooltip)

  const newPaths = newGroups
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', '#000')
    .attr('d', initialLine(singleGroupOptions.lineData))

  const updatedPaths = updatedGroups
    .selectAll(`path.${lineBaseClass}`)

  const allPaths = newPaths.merge(updatedPaths)

  allPaths
    .attr('stroke-width', singleGroupOptions.lineWidth)
    .attr('class', getLineCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('d', line(singleGroupOptions.lineData))

  function getLineCssClasses (d, i) {
    const defaultClasses = [
      lineBaseClass,
      `geo-chart-line-element--${i}`,
      `geo-chart-line-element--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, lineBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }

  function getFocusGroup () {
    var focus = newGroups.append('g')
      .attr('class', 'focus')
      .style('display', 'none')

    focus.append('line')
      .attr('class', 'x-hover-line hover-line')
      .attr('stroke-width', '2px')
      .attr('stroke', '#000')

    focus.append('line')
      .attr('class', 'y-hover-line hover-line')
      .attr('stroke-width', '2px')
      .attr('stroke', '#000')

    focus.append('circle')
      .attr('r', 4)

    focus.append('text')
      .attr('x', 15)
      .attr('dy', '.31em')

    return focus
  }

  function positionTooltip () {
    const mouseCoord = singleGroupOptions.dimension === DIMENSIONS.horizontal ? 0 : 1
    const x0 = xScale.invert(d3.mouse(this)[mouseCoord])
    const bisect = d3.bisector((d) => d[axisForDimension.keyForValues]).left
    const i = bisect(singleGroupOptions.lineData, x0, 1)
    const d0 = singleGroupOptions.lineData[i - 1]
    const d1 = singleGroupOptions.lineData[i]
    const d = x0 - d0[axisForDimension.keyForValues] > d1[axisForDimension.keyForValues] - x0 ? d1 : d0
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      handleHorizontalTooltipPositioning(d)
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      handleVerticalTooltipPositioning(d)
    }
  }

  function handleHorizontalTooltipPositioning (d) {
    focusGroup.attr('transform', `translate(${xScale(d[axisForDimension.keyForValues])}, ${yScale(d[axisForNormalDimension.keyForValues])})`)
    focusGroup.select('text').text(() => singleGroupOptions.tooltip)
    focusGroup.select('.x-hover-line').attr('y1', overlayHeight - yScale(d[axisForNormalDimension.keyForValues]) + margin.bottom)
    focusGroup.select('.x-hover-line').attr('y2', overlayHeight - yScale(axisForNormalDimension.scale.valueForOrigin) + margin.bottom)
  }

  function handleVerticalTooltipPositioning (d) {
    focusGroup.attr('transform', `translate(${xScale(d[axisForNormalDimension.keyForValues])}, ${yScale(d[axisForDimension.keyForValues])})`)
    focusGroup.select('text').text(() => singleGroupOptions.tooltip)
    focusGroup.select('.y-hover-line').attr('x1', 0)
    focusGroup.select('.y-hover-line').attr('x2', overlayWidth - xScale(d[axisForNormalDimension.keyForValues]) + margin.left)
  }
}
