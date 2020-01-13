/// <reference types='d3' />

import _ from 'lodash'

import { getDrawingEnvironment } from '../GeoChartAxis/GeoChartAxis'

import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'

import { setupTooltipEventListeners } from '../GeoChartUtils/GeoChartTooltip'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @typedef {import('d3').Selection<GElement, Datum, PElement, PDatum>} d3.Selection
 */

/**
 * @template Domain
 * @typedef {import('d3').Line<Domain>} d3.Line
 */

/**
 * @typedef {import('d3').CurveGenerator} d3.CurveGenerator
 */

/**
 * @template GElement
 * @template Datum
 * @typedef {import('d3').ValueFn<GElement, Datum, void>} d3.ValueFn
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @typedef {Object} d3.Tooltip<GElement, Datum, PElement, PDatum>
 * @property {d3.ValueFn<GElement, Datum>} show
 * @property {d3.ValueFn<GElement, Datum>} hide
 * @property {Function} offset
 * @property {Function} html
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Tooltip<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */

const DEFAULT_RADIUS = 1.5
const DEFAULT_FILL_COLOR = '#69b3a2'

export function render (d3Instance, d3TipInstance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-scatter-plot-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-scatter-plot-group geo-chart-scatter-plot-group--${singleGroupOptions.id}`
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
    renderSingleGroup(group, d3TipInstance, singleGroupOptions, globalOptions)
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
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */

function renderSingleGroup (group, d3TipInstance, singleGroupOptions, globalOptions) {
  const singleDotBaseClass = 'geo-chart-scatter-plot__dot'

  const radiusScale = d3.scaleSqrt()
    .domain(d3.extent(singleGroupOptions.data, d => d[singleGroupOptions.groupKey]))
    .range([1, 16])

  const dots = group
    .selectAll(`circle.${singleDotBaseClass}`)
    .data(singleGroupOptions.data)

  const newDots = dots
    .enter()
    .append('circle')
    .attr('class', getSingleDotCSSClasses)
    .attr('cursor', 'pointer')
    .style('fill', _.defaultTo(singleGroupOptions.fillColor, DEFAULT_FILL_COLOR))
    .attr('r', 0)
    .style('opacity', 0)
    .attr('cx', getCircleCoordinatesFactory('cx'))
    .attr('cy', getCircleCoordinatesFactory('cy'))

  const updatedDots = dots
  updatedDots
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('r', d => {
      return singleGroupOptions.groupKey
        ? radiusScale(d[singleGroupOptions.groupKey])
        : _.defaultTo(singleGroupOptions.radius, DEFAULT_RADIUS)
    })
    .style('opacity', 1)

  const allDots = newDots.merge(updatedDots)

  dots
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('r', 0)
    .style('opacity', 0)
    .remove()

  setupTooltipEventListeners(allDots, d3TipInstance, singleGroupOptions.tooltip)

  function getSingleDotCSSClasses (d, i) {
    const defaultClasses = [
      singleDotBaseClass,
      `geo-chart-scatter-plot__dot--${i}`,
      `geo-chart-scatter-plot__dot--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, singleDotBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }

  /**
   * @template HorizontalDomain
   * @template VerticalDomain
   * @param {'cx' | 'cy'} coordinate
   * @return {GetCircleCoordinates<HorizontalDomain, VerticalDomain>}
   */
  function getCircleCoordinatesFactory (coordinate) {
    return function (d) {
      const axisForNormalDimension = singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.horizontal
        ? singleGroupOptions.axis.vertical
        : singleGroupOptions.axis.horizontal
      const axisForDimension = singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.horizontal
        ? singleGroupOptions.axis.horizontal
        : singleGroupOptions.axis.vertical
      return getCircleCoordinates(d, singleGroupOptions.mainDimension, axisForDimension, axisForNormalDimension)[coordinate]
    }
  }

  /**
   * @template Domain
   * @param {{item: object}} datum
   * @enum {GeoChart.BarDimension} dimension
   * @param {GeoChart.AxisConfig<Domain>} axisForNormalDimension
   */
  function getCircleCoordinates (datum, dimension, axisForDimension, axisForNormalDimension) {
    const circleCoordinates = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: {
        cx: axisForDimension.scale.axisScale(datum[axisForDimension.keyForValues]),
        cy: axisForNormalDimension.scale.axisScale(datum[axisForNormalDimension.keyForValues])
      },
      [dimensionUtils.DIMENSIONS_2D.vertical]: {
        cx: axisForNormalDimension.scale.axisScale(datum[axisForNormalDimension.keyForValues]),
        cy: axisForDimension.scale.axisScale(datum[axisForDimension.keyForValues])
      }
    }
    return circleCoordinates[dimension]
  }
}
