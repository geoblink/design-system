/// <reference types='d3' />

import _ from 'lodash'

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
  const scatterPlotBaseClass = 'geo-chart-scatter-plot-group'
  const groups = d3Instance
    .selectAll(`g.${scatterPlotBaseClass}`)
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `${scatterPlotBaseClass} ${scatterPlotBaseClass}--${singleGroupOptions.id}`
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
    renderSingleGroup(group, d3TipInstance, singleGroupOptions, globalOptions, d3Instance)
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
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 */

function renderSingleGroup (group, d3TipInstance, singleGroupOptions, globalOptions, d3Instance) {
  const singleDotBaseClass = 'geo-chart-scatter-plot__dot'

  _.each(singleGroupOptions.data, (dot, i) => {
    dot.index = i
    dot.isClicked = false
  })

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
    .attr('r', 0)
    .style('opacity', 0)
    .attr('cx', getCircleCoordinatesFactory('cx'))
    .attr('cy', getCircleCoordinatesFactory('cy'))

  const updatedDots = dots
  const allDots = newDots.merge(updatedDots)

  allDots
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)
    .on('click', handleClick)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('stroke', 'white')
    .style('stroke-width', '2')
    .attr('r', (d) => {
      return singleGroupOptions.groupKey
        ? radiusScale(d[singleGroupOptions.groupKey])
        : _.defaultTo(singleGroupOptions.getRadius(d, d.index), DEFAULT_RADIUS)
    })
    .style('fill', (d, i) => _.defaultTo(singleGroupOptions.getFillColor(d, d.index), DEFAULT_FILL_COLOR))
    .attr('cx', getCircleCoordinatesFactory('cx'))
    .attr('cy', getCircleCoordinatesFactory('cy'))
    .style('opacity', 1)

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
      `${singleDotBaseClass}--${i}`,
      `${singleDotBaseClass}--${singleGroupOptions.mainDimension}`
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

  function handleMouseOver (d, i) {
    if (d.isClicked) return

    d3.select(this)
      .style('fill', 'white')
      .style('stroke', (d) => _.defaultTo(singleGroupOptions.getFillColor(d, d.index), DEFAULT_FILL_COLOR))
      .style('stroke-width', '3')
  }

  function handleMouseOut (d, i) {
    if (d.isClicked) return

    d3.select(this)
      .style('fill', (d) => _.defaultTo(singleGroupOptions.getFillColor(d, d.index), DEFAULT_FILL_COLOR))
      .style('stroke', 'white')
      .style('stroke-width', '2')
  }

  function getPreviouslyClickedDot () {
    return _.first(_.filter(singleGroupOptions.data, 'isClicked'))
  }

  function handleClick (d, i) {
    if (!_.isFunction(singleGroupOptions.onDotClick)) return

    if (d.isClicked) {
      unclickedStyle(d3.select(this), d)
      return singleGroupOptions.onDotClick(null, null, null)
    }

    const previouslyClickedDot = getPreviouslyClickedDot()
    if (previouslyClickedDot) {
      const dotToUnclick = d3Instance
        .select(`.geo-chart-scatter-plot-group--${singleGroupOptions.id} .${singleDotBaseClass}--${previouslyClickedDot.index}`)
      unclickedStyle(dotToUnclick, previouslyClickedDot)
    }

    const clickedDot = d3.select(this)
    const dotCoordinates = [parseFloat(clickedDot.attr('cx')), parseFloat(clickedDot.attr('cy'))]
    clickedStyle(clickedDot, d)
    return singleGroupOptions.onDotClick(d, d.index, dotCoordinates)
  }

  function clickedStyle (element, d) {
    const color = _.defaultTo(singleGroupOptions.getFillColor(d, d.index), DEFAULT_FILL_COLOR)
    d.isClicked = true
    element
      .style('fill', color)
      .style('stroke', '#9B9B9B')
      .style('stroke-width', '8')
      .style('stroke-opacity', '0.4')
      .classed('is-clicked', true)
  }

  function unclickedStyle (element, d) {
    const color = _.defaultTo(singleGroupOptions.getFillColor(d, d.index), DEFAULT_FILL_COLOR)
    d.isClicked = false
    element
      .style('fill', color)
      .style('stroke', 'white')
      .style('stroke-width', '2')
      .style('stroke-opacity', '1')
      .classed('is-clicked', false)
  }
}
