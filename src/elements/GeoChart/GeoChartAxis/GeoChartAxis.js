/// <reference path="../GeoChart.d.ts" />

import _ from 'lodash'

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
 * @template Domain
 * @typedef {import('d3').Axis<Domain>} d3.Axis
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.AxisConfig<Domain, RelativeScaleDomain>>} axesOptions
 * @param {GeoChart.GlobalAxesConfig} globalAxesConfig
 */
export function render (d3Instance, axesOptions, globalAxesConfig) {
  const baseAxisCSSClass = 'geo-chart-axis'
  const axisGroups = d3Instance
    .selectAll(`g.${baseAxisCSSClass}`)
    .data(axesOptions)

  const newAxisGroups = axisGroups
    .enter()
    .append('g')
    .attr('class', getAxisCSSClasses)

  const updatedAxisGroups = axisGroups
  const allAxisGroups = newAxisGroups.merge(updatedAxisGroups)

  axisGroups
    .exit()
    .transition()
    .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  allAxisGroups
    .attr('class', getAxisCSSClasses)

  allAxisGroups.each(function (singleAxisOptions, i) {
    const group = d3.select(this)
    renderSingleAxis(group, singleAxisOptions, globalAxesConfig)
  })

  function getAxisCSSClasses (singleAxisOptions, i) {
    const defaultGroupCSSClasses = [
      baseAxisCSSClass,
      `geo-chart-axis-${singleAxisOptions.id}`,
      `geo-chart-axis--${singleAxisOptions.position.type}`
    ]

    const customCSSClasses = _.isFunction(singleAxisOptions.cssClasses)
      ? singleAxisOptions.cssClasses(defaultGroupCSSClasses)
      : defaultGroupCSSClasses

    return _.uniq([...customCSSClasses, baseAxisCSSClass]).join(' ')
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
 * @param {GeoChart.AxisConfig<Domain, RelativeScaleDomain>} singleAxisOptions
 * @param {GeoChart.GlobalAxesConfig} globalAxesConfig
 */
function renderSingleAxis (group, singleAxisOptions, globalAxesConfig) {
  const drawingEnvironment = getDrawingEnvironment(singleAxisOptions, globalAxesConfig)
  const axis = getAxis(singleAxisOptions)

  const isAnimated = globalAxesConfig.chart.animationsDurationInMilliseconds > 0

  const animatedGroup = isAnimated
    ? group
      .transition()
      .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    : group

  const forcedTickCSSClasses = ['tick']
  const defaultTickCSSClasses = [`geo-chart-axis-tick--${singleAxisOptions.position.type}`]
  const getTickCSSClasses = _.isFunction(_.get(singleAxisOptions, 'ticks.cssClasses'))
    ? (...args) => [...forcedTickCSSClasses, ...singleAxisOptions.ticks.cssClasses(defaultTickCSSClasses, ...args)].join(' ')
    : [...forcedTickCSSClasses, ...defaultTickCSSClasses].join(' ')

  const labelContent = _.get(singleAxisOptions, 'label.content')
  const labelData = _.filter([labelContent], d => !_.isNil(d))

  if (labelData.length) {
    const labels = group
      .selectAll('text.geo-chart-axis-label')
      .data(labelData)

    const newLabels = labels
      .enter()
      .append('text')
      .attr('class', `geo-chart-axis-label geo-chart-axis-label--${singleAxisOptions.position.type}`)

    const updatedLabels = labels
    const allLabels = newLabels.merge(updatedLabels)

    positionLabel(allLabels, singleAxisOptions, globalAxesConfig)

    allLabels.text((d, i) => d)

    labels
      .exit()
      .remove()
  }

  animatedGroup
    .attr('transform', `translate(${drawingEnvironment.absolutePosition.x}, ${drawingEnvironment.absolutePosition.y})`)
    .call(axis)
    .selectAll('g.tick')
    .attr('class', getTickCSSClasses)
    .each(function (elem) {
      const tickGroup = d3.select(this)
      const textElem = tickGroup.select('text')
      positionTickHtmlLabel(tickGroup, textElem, elem, singleAxisOptions, globalAxesConfig)
    })
}

/**
 * @template Domain
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisConfig<Domain, RelativeScaleDomain>} singleAxisOptions
 * @param {GeoChart.GlobalAxesConfig} globalAxesConfig
 * @returns {GeoChart.DrawingEnvironment}
 */
export function getDrawingEnvironment (singleAxisOptions, globalAxesConfig) {
  const xTranslation = getOriginXTranslation(
    singleAxisOptions.position,
    globalAxesConfig.chart.size,
    globalAxesConfig.chart.margin
  )
  const yTranslation = getOriginYTranslation(
    singleAxisOptions.position,
    globalAxesConfig.chart.size,
    globalAxesConfig.chart.margin
  )

  const drawingEnvironment = {
    canvasSize: globalAxesConfig.chart.size,
    chartMargin: globalAxesConfig.chart.margin,
    absolutePosition: {
      x: xTranslation,
      y: yTranslation
    }
  }

  return drawingEnvironment
}

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} singleAxisOptions
 * @returns {d3.Axis<Domain>}
 */
export function getAxis (singleAxisOptions) {
  const { position, scale: { axisScale: scale } } = singleAxisOptions

  const d3Axis = getD3Axis()

  const tickCount = _.get(singleAxisOptions, 'ticks.count')
  const isForcedCustomizedTick = _.get(singleAxisOptions, 'ticks.forceTickCount')
  const isTickCountForced = _.isFinite(tickCount)

  if (isTickCountForced) {
    if (!isForcedCustomizedTick || tickCount === 1) {
      d3Axis.ticks(tickCount)
    } else {
      const axisDomain = scale.domain()
      const tickToDisplay = createCustomizedTickArray(_.first(axisDomain), _.last(axisDomain), tickCount)
      d3Axis.tickValues(tickToDisplay)
    }
  }

  const tickFormat = _.get(singleAxisOptions, 'ticks.format')
  if (tickFormat) {
    d3Axis.tickFormat(tickFormat)
  }

  const isShowingTicks = (isTickCountForced && tickCount > 0) || _.isNil(tickCount)

  if (!isShowingTicks) {
    d3Axis
      .tickValues([])
      .tickSize(0)
  }

  return d3Axis

  function getD3Axis () {
    switch (position.type) {
      case axisUtils.POSITIONS.top:
        return d3.axisTop(scale)

      case axisUtils.POSITIONS.bottom:
        return d3.axisBottom(scale)

      case axisUtils.POSITIONS.verticallyCenteredInTheMiddle:
        return d3.axisTop(scale)

      case axisUtils.POSITIONS.left:
        return d3.axisLeft(scale)

      case axisUtils.POSITIONS.right:
        return d3.axisRight(scale)

      case axisUtils.POSITIONS.horizontallyCenteredInTheMiddle:
        return d3.axisLeft(scale)

      case axisUtils.POSITIONS.anchoredToAxis: {
        const axisDimension = getAxisDimension(position)
        return axisDimension === dimensionUtils.DIMENSIONS_2D.horizontal
          ? d3.axisBottom(scale)
          : d3.axisLeft(scale)
      }

      default:
        console.warn(`GeoChart (axis) [component] :: Tried to get axis for unknown position: ${position.type}`, singleAxisOptions)
    }
  }
}

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @return {dimensionUtils.DIMENSIONS_2D}
 */
export function getAxisDimension (position) {
  switch (position.type) {
    case axisUtils.POSITIONS.top:
    case axisUtils.POSITIONS.bottom:
    case axisUtils.POSITIONS.verticallyCenteredInTheMiddle:
      return dimensionUtils.DIMENSIONS_2D.horizontal

    case axisUtils.POSITIONS.left:
    case axisUtils.POSITIONS.right:
    case axisUtils.POSITIONS.horizontallyCenteredInTheMiddle:
      return dimensionUtils.DIMENSIONS_2D.vertical

    case axisUtils.POSITIONS.anchoredToAxis: {
      const relativeAxisPosition = (/** @type {GeoChart.AxisPositionConfigRelative<RelativeScaleDomain>} */ (position))
      const anchoredAxisPosition = getAxisDimension(relativeAxisPosition.relativeAxisPosition)

      return anchoredAxisPosition === dimensionUtils.DIMENSIONS_2D.horizontal
        ? dimensionUtils.DIMENSIONS_2D.vertical
        : dimensionUtils.DIMENSIONS_2D.horizontal
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get axis dimension for unknown position: ${position.type}`, position)
}

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} margin
 * @returns {number}
 */
function getOriginXTranslation (position, svgSize, margin) {
  switch (position.type) {
    case axisUtils.POSITIONS.top:
    case axisUtils.POSITIONS.bottom:
    case axisUtils.POSITIONS.verticallyCenteredInTheMiddle:
      return 0

    case axisUtils.POSITIONS.left:
      return margin.left

    case axisUtils.POSITIONS.right:
      return svgSize.width - margin.right

    case axisUtils.POSITIONS.horizontallyCenteredInTheMiddle:
      return margin.left + (svgSize.width - margin.left - margin.right) / 2

    case axisUtils.POSITIONS.anchoredToAxis: {
      const dimension = getAxisDimension(position)

      switch (dimension) {
        case dimensionUtils.DIMENSIONS_2D.horizontal:
          return 0
        case dimensionUtils.DIMENSIONS_2D.vertical: {
          const relativeAxisPosition = (/** @type {GeoChart.AxisPositionConfigRelative<RelativeScaleDomain>} */ (position))
          return relativeAxisPosition.scale.axisScale(relativeAxisPosition.value)
        }
      }

      console.warn(`GeoChart (axis) [component] :: Tried to get X Translation for unknown dimension: ${dimension}`, position)

      return null
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get X Translation for unknown position: ${position.type}`, position)

  return null
}

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} [margin]
 * @returns {number}
 */
function getOriginYTranslation (position, svgSize, margin) {
  switch (position.type) {
    case axisUtils.POSITIONS.top:
      return margin.top

    case axisUtils.POSITIONS.bottom:
      return svgSize.height - margin.bottom

    case axisUtils.POSITIONS.verticallyCenteredInTheMiddle:
      return (svgSize.height + margin.top - margin.bottom) / 2

    case axisUtils.POSITIONS.left:
    case axisUtils.POSITIONS.right:
    case axisUtils.POSITIONS.horizontallyCenteredInTheMiddle:
      return 0

    case axisUtils.POSITIONS.anchoredToAxis: {
      const dimension = getAxisDimension(position)

      switch (dimension) {
        case dimensionUtils.DIMENSIONS_2D.horizontal: {
          const relativeAxisPosition = (/** @type {GeoChart.AxisPositionConfigRelative<RelativeScaleDomain>} */ (position))
          return relativeAxisPosition.scale.axisScale(relativeAxisPosition.value)
        }
        case dimensionUtils.DIMENSIONS_2D.vertical:
          return 0
      }

      console.warn(`GeoChart (axis) [component] :: Tried to get Y Translation for unknown dimension: ${dimension}`, position)

      return null
    }
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get Y Translation for unknown position: ${position.type}`, position)

  return null
}

function positionLabel (label, singleAxisOptions, globalAxesConfig) {
  const offset = _.get(singleAxisOptions, 'label.offset', 0)
  const axisType = singleAxisOptions.position.type
  const labelExtraOffset = 20
  const DEFAULT_LINE_HEIGHT = 18
  const axesMargin = globalAxesConfig.chart.margin
  const axesSize = globalAxesConfig.chart.size

  switch (axisType) {
    case axisUtils.POSITIONS.bottom:
    case axisUtils.POSITIONS.anchoredToAxis:
      label
        .attr('x', (axesSize.width / 2) + (axesMargin.left - axesMargin.right) / 2)
        .attr('dy', `${axesMargin.bottom - labelExtraOffset - offset}`)
        .style('text-anchor', 'middle')
      break

    case axisUtils.POSITIONS.top:
      label
        .attr('x', `${axesSize.width}`)
        .attr('dy', `${-axesMargin.top}`)
      break

    case axisUtils.POSITIONS.left:
      label
        .attr('x', `${-axesSize.height / 2}`)
        .attr('dy', `${-axesMargin.left / 2 + offset}`)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
      break

    case axisUtils.POSITIONS.right:
      label
        .attr('x', `${axesSize.width}`)
        .attr('dy', `${-axesMargin.right + DEFAULT_LINE_HEIGHT}`)
        .attr('transform', 'rotate(90)')
      break

    default:
      console.error(`Unknown position ${axisType}`)
      break
  }
}

export function createCustomizedTickArray (firstOfDomain, lastOfDomain, tickCount) {
  const domainRange = Math.abs(firstOfDomain - lastOfDomain)
  const ticksStep = domainRange / (tickCount - 1)
  const tickToDisplay = _.map(_.times(tickCount), (id) => {
    return _.round(firstOfDomain < lastOfDomain
      ? firstOfDomain + (ticksStep * id)
      : firstOfDomain - (ticksStep * id)
    , 3)
  })
  return tickToDisplay
}

function positionTickHtmlLabel (group, text, content, singleAxisOptions, globalAxesConfig) {
  let foreignElem = group.select('foreignObject')
  const height = 15
  const xValue = text.attr('x')
  const tickLineSpace = Math.abs(xValue)
  switch (singleAxisOptions.position.type) {
    case axisUtils.POSITIONS.left: {
      if (foreignElem.empty()) foreignElem = createForeignElem()
      const width = globalAxesConfig.chart.margin.left - tickLineSpace
      foreignElem.attr('width', width)
      foreignElem.attr('x', xValue - width)
      foreignElem.attr('y', -height / 2)
      const div = foreignElem.select('div')
      div.attr('class', 'geo-trimmed-content geo-chart-axis-text--left')
      break
    }
    case axisUtils.POSITIONS.right: {
      if (foreignElem.empty()) foreignElem = createForeignElem()
      const width = globalAxesConfig.chart.margin.right - tickLineSpace
      foreignElem.attr('width', width)
      foreignElem.attr('x', xValue)
      foreignElem.attr('y', -height / 2)
      const div = foreignElem.select('div')
      div.attr('class', 'geo-trimmed-content geo-chart-axis-text--right')
      break
    }
    default:
      // we keep the top and bottom axis as it is
      break
  }

  function createForeignElem () {
    text.attr('style', 'visibility: hidden')
    group.append('foreignObject')
      .attr('height', height)
      .append('xhtml:div')
      .append('span')
      .attr('class', 'geo-trimmed-content__content')
      .html(content)
    return group.select('foreignObject')
  }
}
