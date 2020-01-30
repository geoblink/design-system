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

  const clickedDot = {
    indexSingleGroup: null,
    indexDot: null,
    color: null
  }

  allGroups.each(function (singleGroupOptions, i) {
    const group = d3.select(this)
    renderSingleGroup(group, d3TipInstance, i, clickedDot, singleGroupOptions, globalOptions, d3Instance)
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
 * @param {number} index
 * @param {object} clickedDot
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 */

function renderSingleGroup (group, d3TipInstance, index, clickedDot, singleGroupOptions, globalOptions, d3Instance) {
  const singleDotBaseClass = 'geo-chart-scatter-plot__dot'

  _.each(singleGroupOptions.data, (dot, i) => {
    dot.index = i
    dot.isSelected = false
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
    .attr('r', (d, i) => {
      return singleGroupOptions.groupKey
        ? radiusScale(d[singleGroupOptions.groupKey])
        : _.defaultTo(singleGroupOptions.getRadius(d, i), DEFAULT_RADIUS)
    })
    .style('fill', (d, i) => _.defaultTo(singleGroupOptions.getFillColor(d, i), DEFAULT_FILL_COLOR))
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

  function handleMouseOver (d, i) {
    if (d.isSelected) return

    d3.select(this)
      .style('fill', 'white')
      .style('stroke', (d, i) => _.defaultTo(singleGroupOptions.getFillColor(d, i), DEFAULT_FILL_COLOR))
      .style('stroke-width', '3')
  }

  function handleMouseOut (d, i) {
    if (d.isSelected) return

    d3.select(this)
      .style('fill', (d, i) => _.defaultTo(singleGroupOptions.getFillColor(d, i), DEFAULT_FILL_COLOR))
      .style('stroke', 'white')
      .style('stroke-width', '2')
  }

  function getPreviouslySelectedDot () {
    const filter = _.filter(singleGroupOptions.data, (dot) => {
      return dot.isSelected
    })
    return filter[0]
  }

  function handleClick (d, i) {
    if (!singleGroupOptions.onDotClick) return
    const previouslySelectedDot = getPreviouslySelectedDot()
    const isAlreadyClickedDot = d.isSelected

    if (!previouslySelectedDot) {
      const color = _.defaultTo(singleGroupOptions.getFillColor(d, i), DEFAULT_FILL_COLOR)
      clickedStyle(d3.select(this), color)
      d.isSelected = true

      return singleGroupOptions.onDotClick(d, i)
    } else if (isAlreadyClickedDot) {
      const color = _.defaultTo(singleGroupOptions.getFillColor(d, i), DEFAULT_FILL_COLOR)
      unclickedStyle(d3.select(this), color)
      d.isSelected = false

      return singleGroupOptions.onDotClick(null, null)
    } else if (!!previouslySelectedDot && !isAlreadyClickedDot) {
      const dotToUnclick = d3Instance
        .select(`.geo-chart-scatter-plot-group--${singleGroupOptions.id} .geo-chart-scatter-plot__dot--${previouslySelectedDot.index}`)
      const colorPreviousDot = _.defaultTo(singleGroupOptions.getFillColor(previouslySelectedDot, previouslySelectedDot.index), DEFAULT_FILL_COLOR)
      unclickedStyle(dotToUnclick, colorPreviousDot)

      _.each(singleGroupOptions.data, (dot) => {
        dot.isSelected = false
      })

      const colorNewDot = _.defaultTo(singleGroupOptions.getFillColor(d, i), DEFAULT_FILL_COLOR)
      clickedStyle(d3.select(this), colorNewDot)
      d.isSelected = true

      return singleGroupOptions.onDotClick(d, i)
    }
  }

  function clickedStyle (element, color) {
    element
      .style('stroke', '#9B9B9B')
      .style('stroke-opacity', 0.8)
      .style('stroke-width', '3')
      .style('fill', color)

    element
      .enter()
      .append('circle')
      .style('fill', color)
      .attr('r', (d, i) => {
        return singleGroupOptions.groupKey
          ? radiusScale(d[singleGroupOptions.groupKey])
          : _.defaultTo(singleGroupOptions.getRadius(d, i), DEFAULT_RADIUS)
      })
  }

  function unclickedStyle (element, color) {
    element
      .style('fill', color)
      .style('stroke', 'white')
      .style('stroke-width', '2')
      .style('stroke-opacity', '1')
  }
}
