/// <reference types="d3" />

import _ from 'lodash'

import * as ChartAxis from '../GeoChartAxis/GeoChartAxis'
import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'

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
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.SingleAxisGuidelinesGroupConfig<Domain, RelativeScaleDomain>>} guidelinesOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
export function render (d3Instance, guidelinesOptions, globalOptions) {
  const baseGuidelinesCSSClass = 'geo-chart-guidelines'
  const groups = d3Instance
    .selectAll(`g.${baseGuidelinesCSSClass}`)
    .data(guidelinesOptions)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', getGuidelinesCSSClasses)

  const updatedGroups = groups
  const allGroups = newGroups.merge(updatedGroups)

  groups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  allGroups
    .attr('class', getGuidelinesCSSClasses)

  allGroups.each(function (singleAxisGuidelinesOptions, i) {
    const group = d3.select(this)
    renderSingleAxisGuidelines(group, singleAxisGuidelinesOptions, globalOptions)
  })

  function getGuidelinesCSSClasses (singleGuidelinesOptions, i) {
    const defaultGroupCSSClasses = [
      baseGuidelinesCSSClass,
      `geo-chart-guidelines-${singleGuidelinesOptions.id}`
    ]

    const customCSSClasses = _.isFunction(singleGuidelinesOptions.cssClasses)
      ? singleGuidelinesOptions.cssClasses(defaultGroupCSSClasses)
      : defaultGroupCSSClasses

    return _.uniq([...customCSSClasses, baseGuidelinesCSSClass]).join(' ')
  }
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} group
 * @param {GeoChart.SingleAxisGuidelinesGroupConfig<Domain, RelativeScaleDomain>} singleAxisGuidelinesOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleAxisGuidelines (group, singleAxisGuidelinesOptions, globalOptions) {
  const axisConfigForGuidelines = getAxisConfigForGuidelines(singleAxisGuidelinesOptions.axisConfig)

  const drawingEnvironment = ChartAxis.getDrawingEnvironment(axisConfigForGuidelines, globalOptions)
  const axis = ChartAxis.getAxis(axisConfigForGuidelines)

  const guidelinesCount = _.get(singleAxisGuidelinesOptions, 'guidelines.count')
  const isLineCountForced = _.isFinite(guidelinesCount)
  if (isLineCountForced) {
    axis.ticks(guidelinesCount)
  }

  const tickSize = getTickSize(axisConfigForGuidelines.position, globalOptions.chart.size, globalOptions.chart.margin)

  axis
    .tickSize(tickSize)
    .tickFormat('')

  group
    .attr('transform', `translate(${drawingEnvironment.absolutePosition.x}, ${drawingEnvironment.absolutePosition.y})`)

  const animatedGroup = group
  animatedGroup
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .call(axis)
    .selectAll('g.tick')
    .attr('class', getGuidelineCSSClasses)

  const displayOuterLines = _.get(singleAxisGuidelinesOptions, 'guidelines.outerLines')
  if (displayOuterLines) {
    group.select('.domain').style('stroke-width', 1)
  } else {
    group.select('.domain').style('stroke-width', 0)
  }

  function getGuidelineCSSClasses (d, i) {
    const forcedTickCSSClasses = ['tick']
    const defaultGuidelineCSSClasses = ['geo-chart-guideline', `geo-chart-guideline--${axisConfigForGuidelines.position.type}`]
    const getGuidelinesCSSClasses = _.isFunction(_.get(singleAxisGuidelinesOptions, 'guidelines.cssClasses'))
      ? [...forcedTickCSSClasses, ...singleAxisGuidelinesOptions.guidelines.cssClasses(defaultGuidelineCSSClasses, d, i)].join(' ')
      : [...forcedTickCSSClasses, ...defaultGuidelineCSSClasses].join(' ')

    return getGuidelinesCSSClasses
  }

  function getAxisConfigForGuidelines (axisConfig) {
    return {
      position: {
        type: getGuidelinesPosition(axisConfig)
      },
      scale: axisConfig.scale,
      ticks: axisConfig.ticks
    }
  }
}

/**
 * @template Domain
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisConfig<Domain, RelativeScaleDomain>} singleAxisOptions
 * @returns {string}
 */
function getGuidelinesPosition (singleAxisOptions) {
  switch (singleAxisOptions.position.type) {
    case axisUtils.POSITIONS.top:
    case axisUtils.POSITIONS.bottom:
    case axisUtils.POSITIONS.verticallyCenteredInTheMiddle:
      return axisUtils.POSITIONS.bottom

    case axisUtils.POSITIONS.left:
    case axisUtils.POSITIONS.right:
    case axisUtils.POSITIONS.horizontallyCenteredInTheMiddle:
      return axisUtils.POSITIONS.left

    case axisUtils.POSITIONS.anchoredToAxis: {
      const anchoredAxis = (/** @type {GeoChart.AxisPositionConfigRelative<RelativeScaleDomain>} */(singleAxisOptions.position))
      const anchoredAxisPosition = ChartAxis.getAxisDimension(anchoredAxis.relativeAxisPosition)
      return anchoredAxisPosition === dimensionUtils.DIMENSIONS_2D.horizontal
        ? axisUtils.POSITIONS.left
        : axisUtils.POSITIONS.bottom
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get axis dimension for unknown position: ${singleAxisOptions.position.type}`, singleAxisOptions.position)
}

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} [margin]
 * @returns {number}
 */
function getTickSize (position, svgSize, margin) {
  switch (position.type) {
    case axisUtils.POSITIONS.bottom:
      return -svgSize.height + margin.top + margin.bottom
    case axisUtils.POSITIONS.left:
      return -svgSize.width + margin.right + margin.left
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get X Translation for unknown position: ${position.type}`, position)

  return null
}
