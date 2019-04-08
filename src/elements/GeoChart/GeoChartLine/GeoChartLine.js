/// <reference types="d3" />

import _ from 'lodash'

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
    const group = d3.select(this)
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
  const axisForDimension = singleGroupOptions.axis.horizontal
  const axisForNormalDimension = singleGroupOptions.axis.vertical
  const lineBaseClass = 'geo-chart-line-element'
  const xScale = axisForDimension.scale.axisScale
  const yScale = axisForNormalDimension.scale.axisScale
  const initialLine = d3.line()
    .x((d, i) => {
      return xScale(d[axisForDimension.keyForValues])
    })
    .y((d, i) => {
      return yScale(axisForNormalDimension.scale.valueForOrigin)
    })
    .curve(singleGroupOptions.interpolationFn)

  const line = d3.line()
    .x((d, i) => {
      return xScale(d[axisForDimension.keyForValues])
    })
    .y((d, i) => {
      return yScale(d[axisForNormalDimension.keyForValues])
    })
    .curve(singleGroupOptions.interpolationFn)

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
}
