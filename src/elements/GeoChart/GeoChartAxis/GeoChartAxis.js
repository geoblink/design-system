/// <reference types="d3" />

import _ from 'lodash'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

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
  anchoredToAxis: 'anchoredToAxis'
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
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {GeoChart.AxisConfig<Domain>} singleAxisOptions
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

  const labelData = _.get(singleAxisOptions, 'label.content') ? [singleAxisOptions.label.content] : []
  if (labelData.length) {
    const labels = group
      .selectAll(`text.geo-chart-axis-label--${singleAxisOptions.position.type}`)
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
}

/**
 * @param {GeoChart.AxisConfig<Domain>} singleAxisOptions
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
  const isTickCountForced = _.isFinite(tickCount)
  if (isTickCountForced) {
    d3Axis.ticks(tickCount)
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
      case POSITIONS.top:
        return d3.axisTop(scale)
      case POSITIONS.bottom:
        return d3.axisBottom(scale)
      case POSITIONS.verticallyCenteredInTheMiddle:
        return d3.axisTop(scale)
      case POSITIONS.left:
        return d3.axisLeft(scale)
      case POSITIONS.right:
        return d3.axisRight(scale)
      case POSITIONS.horizontallyCenteredInTheMiddle:
        return d3.axisLeft(scale)
      case POSITIONS.anchoredToAxis: {
        const axisDimension = getAxisDimension(position)
        return axisDimension === DIMENSIONS.horizontal
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
    case POSITIONS.anchoredToAxis: {
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
function getOriginXTranslation (position, svgSize, margin) {
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
    case POSITIONS.anchoredToAxis:
      const dimension = getAxisDimension(position)

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

/**
 * @template RelativeScaleDomain
 * @param {GeoChart.AxisPosition<RelativeScaleDomain>} position
 * @param {GeoChart.Size} svgSize
 * @param {GeoChart.Margin} [margin]
 * @returns {string}
 */
function getOriginYTranslation (position, svgSize, margin) {
  switch (position.type) {
    case POSITIONS.top:
      return margin.top
    case POSITIONS.bottom:
      return svgSize.height - margin.bottom
    case POSITIONS.verticallyCenteredInTheMiddle:
      return (svgSize.height + margin.top - margin.bottom) / 2
    case POSITIONS.left:
    case POSITIONS.right:
    case POSITIONS.horizontallyCenteredInTheMiddle:
      return 0
    case POSITIONS.anchoredToAxis:
      const dimension = getAxisDimension(position)

      switch (dimension) {
        case DIMENSIONS.horizontal:
          return position.scale.axisScale(position.value)
        case DIMENSIONS.vertical:
          return 0
      }

      console.warn(`GeoChart (axis) [component] :: Tried to get Y Translation for unknown dimension: ${dimension}`, position)

      return null
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
    case POSITIONS.bottom:
    case POSITIONS.anchoredToAxis:
      label
        .attr('x', (axesSize.width / 2) + (axesMargin.left - axesMargin.right) / 2)
        .attr('dy', '' + axesMargin.bottom - labelExtraOffset - offset)
        .style('text-anchor', 'middle')
      break
    case POSITIONS.top:
      label
        .attr('x', '' + axesSize.width)
        .attr('dy', '' + (-axesMargin.top))
      break
    case POSITIONS.left:
      label
        .attr('x', '' + (-axesSize.height / 2))
        .attr('dy', '' + (-axesMargin.left / 2 + offset))
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
      break
    case POSITIONS.right:
      label
        .attr('x', '' + (globalAxesConfig.chart))
        .attr('dy', '' + (-axesMargin.right + DEFAULT_LINE_HEIGHT))
        .attr('transform', 'rotate(90)')
      break
    default:
      console.error(`Unknown position ${axisType}`)
      break
  }
}
