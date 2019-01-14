/// <reference types="d3" />

import _ from 'lodash'

import { wrapTextTagsForWidthFactory, wrapTextSegmentsForCSSClasses } from './GeoChartText'

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
 * @template Domain
 * @callback AddAxisFunction
 * @param {GeoChart.AxisConfig<Domain>} options
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @returns {AddAxisFunction}
 */
export function factory (d3Instance) {
  const groups = {}
  const wrapTextForWidthCache = {}

  return function (options) {
    const group = getOrSetValue(groups, options.id, () => {
      const defaultGroupCSSClasses = [
        `geo-chart-axis geo-chart-axis-${options.id}`,
        `geo-chart-axis--${options.position.type}`
      ]

      const getGroupCSSClasses = _.isFunction(options.cssClasses)
        ? (...args) => options.cssClasses(defaultGroupCSSClasses, ...args).join(' ')
        : defaultGroupCSSClasses.join(' ')

      return d3Instance
        .append('g')
        .attr('class', getGroupCSSClasses)
    })

    const drawingEnvironment = getDrawingEnvironment(options)
    const axis = getAxis(options)

    const tickCount = _.get(options, 'ticks.count')
    const isTickCountForced = _.isFinite(tickCount)
    if (isTickCountForced) {
      axis.ticks(tickCount)
    }

    const tickFormat = _.get(options, 'ticks.format')
    if (tickFormat) {
      axis.tickFormat(tickFormat)
    }

    const isShowingTicks = (isTickCountForced && tickCount > 0) || _.isNil(tickCount)

    if (!isShowingTicks) {
      axis
        .tickValues([])
        .tickSize(0)
    }

    const getLabelMaxWidth = _.get(options, 'ticks.label.maxWidth')
    const labelMaxWidth = _.isFunction(getLabelMaxWidth)
      ? getLabelMaxWidth(drawingEnvironment)
      : 0
    const isLabelWidthLimited = labelMaxWidth > 0 && isShowingTicks
    const isAnimated = !isLabelWidthLimited && options.chart.animationsDurationInMilliseconds > 0

    const animatedGroup = isAnimated
      ? group
        .transition()
        .duration(options.chart.animationsDurationInMilliseconds)
      : group

    const forcedTickCSSClasses = ['tick']
    const defaultTickCSSClasses = [`geo-chart-axis-tick--${options.position.type}`]
    const getTickCSSClasses = _.isFunction(_.get(options, 'ticks.cssClasses'))
      ? (...args) => [...forcedTickCSSClasses, ...options.ticks.cssClasses(defaultTickCSSClasses, ...args)].join(' ')
      : [...forcedTickCSSClasses, ...defaultTickCSSClasses].join(' ')

    const tickGroups = animatedGroup
      .attr('transform', `translate(${drawingEnvironment.absolutePosition.x}, ${drawingEnvironment.absolutePosition.y})`)
      .call(axis)
      .selectAll('g.tick')
      .attr('class', getTickCSSClasses)

    const textGroups = tickGroups.selectAll(':scope > text')

    if (isLabelWidthLimited) {
      if (tickFormat) {
        const tickValuesOfScale = axis.tickValues() || options.scale.axisScale.domain()
        const tickTextsAndCSSClasses = _.map(tickValuesOfScale, (value, index) => {
          if (_.isFunction(tickFormat)) return tickFormat(value, index)
          return value
        })

        textGroups.call(wrapTextSegmentsForCSSClasses, tickTextsAndCSSClasses, labelMaxWidth)
      } else {
        const wrapTextForWidth = getOrSetValue(
          wrapTextForWidthCache,
          options.id,
          wrapTextTagsForWidthFactory
        )

        textGroups.call(wrapTextForWidth, labelMaxWidth)
      }
    }
  }
}

function getOrSetValue (object, key, fallbackGenerator) {
  const value = _.get(object, key) || fallbackGenerator()
  _.set(object, key, value)
  return value
}

/**
 * @param {GeoChart.AxisConfig<Domain>} options
 * @returns {GeoChart.DrawingEnvironment}
 */
function getDrawingEnvironment (options) {
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

  const drawingEnvironment = {
    canvasSize: options.chart.size,
    chartMargin: options.chart.margin,
    absolutePosition: {
      x: xTranslation,
      y: yTranslation
    }
  }

  return drawingEnvironment
}

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} options
 * @returns {d3.Axis<Domain>}
 */
function getAxis (options) {
  const { position, scale: { axisScale: scale } } = options

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
  }

  console.warn(`GeoChart (axis) [component] :: Tried to get axis for unknown position: ${position.type}`, options)
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
