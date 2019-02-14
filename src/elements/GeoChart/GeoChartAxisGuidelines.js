/// <reference types="d3" />

import _ from 'lodash'
import * as ChartAxis from './GeoChartAxis'

const POSITIONS = ChartAxis.POSITIONS
const DIMENSIONS = ChartAxis.DIMENSIONS

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
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.SingleAxisGuidelinesGroupConfig<Domain, RelativeScaleDomain>>} guidelinesOptions
 * @param {GeoChart.AxisGuidelinesGroupsGlobalConfig} globalOptions
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
 * @param {GeoChart.AxisGuidelinesGroupsGlobalConfig} globalOptions
 */
function renderSingleAxisGuidelines (group, singleAxisGuidelinesOptions, globalOptions) {
  const axisOptionsForGuidelines = singleAxisGuidelinesOptions.axisConfig
  axisOptionsForGuidelines.position.type = getGuidelinesPosition(axisOptionsForGuidelines)

  const drawingEnvironment = ChartAxis.getDrawingEnvironment(axisOptionsForGuidelines, globalOptions)
  const axis = ChartAxis.getAxis(axisOptionsForGuidelines)

  const guidelinesCount = _.get(singleAxisGuidelinesOptions, 'guidelines.count')
  const isLineCountForced = _.isFinite(guidelinesCount)
  const tickCount = _.get(axisOptionsForGuidelines, 'ticks.count')
  const isTickCountForced = _.isFinite(tickCount)
  if (isTickCountForced || isLineCountForced) {
    const forcedCount = isLineCountForced ? guidelinesCount : tickCount
    axis.ticks(forcedCount)
  }

  const tickSize = getTickSize(axisOptionsForGuidelines.position, globalOptions.chart.size, globalOptions.chart.margin)

  axis
    .tickSize(tickSize)
    .tickFormat('')

  const isAnimated = globalOptions.chart.animationsDurationInMilliseconds > 0

  const animatedGroup = isAnimated
    ? group
      .transition()
      .duration(globalOptions.chart.animationsDurationInMilliseconds)
    : group

  animatedGroup
    .attr('transform', `translate(${drawingEnvironment.absolutePosition.x}, ${drawingEnvironment.absolutePosition.y})`)
    .call(axis)
    .selectAll('g.tick')
    .attr('class', getGuidelineCSSClasses)

  const displayOuterLines = _.get(singleAxisGuidelinesOptions, 'guidelines.outerLines')
  if (displayOuterLines) {
    animatedGroup.select('.domain').style('stroke-width', 1)
  } else {
    animatedGroup.select('.domain').style('stroke-width', 0)
  }

  function getGuidelineCSSClasses (d, i) {
    const forcedTickCSSClasses = ['tick']
    const defaultGuidelineCSSClasses = ['geo-chart-guideline', `geo-chart-guideline--${axisOptionsForGuidelines.position.type}`]
    const getGuidelinesCSSClasses = _.isFunction(_.get(axisOptionsForGuidelines, 'guidelines.cssClasses'))
      ? (...args) => [...forcedTickCSSClasses, ...axisOptionsForGuidelines.guidelines.cssClasses(defaultGuidelineCSSClasses, ...args)].join(' ')
      : [...forcedTickCSSClasses, ...defaultGuidelineCSSClasses].join(' ')

    return getGuidelinesCSSClasses
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
    case POSITIONS.top:
    case POSITIONS.bottom:
    case POSITIONS.verticallyCenteredInTheMiddle:
      return POSITIONS.bottom
    case POSITIONS.left:
    case POSITIONS.right:
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return POSITIONS.left
    case POSITIONS.anchoredToAxis: {
      const anchoredAxisPosition = ChartAxis.getAxisDimension(singleAxisOptions.position.relativeAxisPosition)
      return anchoredAxisPosition === DIMENSIONS.horizontal
        ? POSITIONS.left
        : POSITIONS.bottom
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
    case POSITIONS.top:
    case POSITIONS.bottom:
    case POSITIONS.verticallyCenteredInTheMiddle:
      return -svgSize.height + margin.top + margin.bottom
    case POSITIONS.left:
      return -svgSize.width + margin.right + margin.left
    case POSITIONS.right:
      return -svgSize.width + margin.right + margin.left
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return margin.left + (svgSize.width - margin.left - margin.right) / 2
    case POSITIONS.anchoredToAxis:
      const dimension = ChartAxis.getAxisDimension(position)

      switch (dimension) {
        case DIMENSIONS.horizontal:
          return 0
        case DIMENSIONS.vertical:
          return position.scale.axisScale(position.value)
      }

      console.warn(`GeoChart (axis) [component] :: Tried to get X Translation for unknown dimension: ${dimension}`, position)

      return null
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get X Translation for unknown position: ${position.type}`, position)

  return null
}
