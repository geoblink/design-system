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
 * @typedef {{[key: string]: d3.CurveGenerator}} INTERPOLATION_TYPES
 */
export const INTERPOLATION_TYPES = {
  curveLinear: d3.curveLinear,
  curveStepBefore: d3.curveStepBefore,
  curveStepAfter: d3.curveStepAfter,
  curveBasis: d3.curveBasis,
  curveBasisOpen: d3.curveBasisOpen,
  curveBasisClosed: d3.curveBasisClosed,
  curveBundle: d3.curveBundle,
  curveCardinal: d3.curveCardinal,
  curveCardinalOpen: d3.curveCardinalOpen,
  curveCardinalClosed: d3.curveCardinalClosed,
  curveNatural: d3.curveNatural
}

const lineBaseClass = 'geo-chart-line-element'
const hoverCircleBaseClass = 'geo-chart-line-element__hover-circle'
const FOCUS_GROUP_DEFAULT_CLASS = 'hover-overlay__focus'
const DEFAULT_HOVER_CIRCLE_RADIUS = 4
const DEFAULT_LINE_WIDTH = 2
const DEFAULT_INTERPOLATION_FUNCTION = INTERPOLATION_TYPES.curveLinear
const DEFAULT_INTERACTIVE_ON_HOVER = true
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
export function render (d3Instance, d3TipInstance, options, globalOptions) {
  d3Instance
    .selectAll(`g.${FOCUS_GROUP_DEFAULT_CLASS}`)
    .remove()

  const groups = d3Instance
    .selectAll('g.geo-chart-line-group')
    .data(options, (singleGroupOptions, i) => {
      return _.isNil(singleGroupOptions.groupKey)
        ? i
        : singleGroupOptions.groupKey
    })

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-line-group geo-chart-line-group--${singleGroupOptions.id}`
    )

  const newFocusGroups = d3Instance
    .append('g')
    .classed(`${FOCUS_GROUP_DEFAULT_CLASS} focus-group--hidden`, true)

  newFocusGroups
    .append('line')
    .attr('class', 'hover-line')

  groups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  newGroups.each(function (singleGroupOptions, i) {
    const group = d3.select(this)
    group
      .append('path')
      .attr('class', getLineCssClassesFactory(singleGroupOptions))
      .attr('d', getInitialLine(singleGroupOptions))
  })

  const updatedGroups = groups
  const allGroups = newGroups.merge(updatedGroups)

  allGroups.each(function (singleGroupOptions, i) {
    const group = d3.select(this)
    renderSingleGroup(d3Instance, d3TipInstance, group, singleGroupOptions, options, globalOptions)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Tooltip<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {d3.Selection<SVGElement, Datum, PElement, PDatum>} group
 * @param {GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {Array<GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleGroup (d3Instance, d3TipInstance, group, singleGroupOptions, options, globalOptions) {
  const isDimensionHorizontalAxis = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
  const axisForMainDimension = isDimensionHorizontalAxis
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical
  const axisForNormalDimension = isDimensionHorizontalAxis
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal
  const xScale = isDimensionHorizontalAxis
    ? axisForMainDimension.scale.axisScale
    : axisForNormalDimension.scale.axisScale
  const yScale = isDimensionHorizontalAxis
    ? axisForNormalDimension.scale.axisScale
    : axisForMainDimension.scale.axisScale

  const invertFunction = _.isFunction(axisForMainDimension.scale.axisScale.invert)
    ? axisForMainDimension.scale.axisScale.invert
    : invertFunctionFactory(axisForMainDimension)

  const focusGroup = d3Instance.selectAll(`g.${FOCUS_GROUP_DEFAULT_CLASS}`)
  if (_.defaultTo(singleGroupOptions.isInteractiveOnHover, DEFAULT_INTERACTIVE_ON_HOVER)) {
    d3Instance
      .on('mouseover', () => focusGroup.classed('focus-group--hidden', false))
      .on('mouseout', () => focusGroup.classed('focus-group--hidden', true))
      .on('mousemove', positionTooltipFactory(d3TipInstance, options, globalOptions, {
        axisForMainDimension,
        axisForNormalDimension,
        focusGroup,
        invertFunction
      }))
  }

  const line = d3.line()
    .x((d, i) => {
      const bandwidth = xScale.bandwidth ? xScale.bandwidth() / 2 : 0
      return xScale(d[singleGroupOptions.axis.horizontal.keyForValues]) + bandwidth
    })
    .y((d, i) => {
      return yScale(d[singleGroupOptions.axis.vertical.keyForValues])
    })
    .curve(_.defaultTo(singleGroupOptions.interpolationFn, DEFAULT_INTERPOLATION_FUNCTION))

  group
    .selectAll(`path.${lineBaseClass}`)
    .attr('stroke-width', _.defaultTo(singleGroupOptions.lineWidth, DEFAULT_LINE_WIDTH))
    .attr('class', getLineCssClassesFactory(singleGroupOptions))
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('d', line(singleGroupOptions.data))
}

/**
 * @callback InvertFunction
 * @param {any} item
 * @returns {number}
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @template MainDimensionDomain
 * @template NormalDimensionDomain
 * @param {d3.Tooltip<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {Object} params
 * @param {*} params.focusGroup
 * @param {InvertFunction} params.invertFunction
 * @param {GeoChart.AxisConfig<MainDimensionDomain>} params.axisForMainDimension
 * @param {GeoChart.AxisConfig<NormalDimensionDomain>} params.axisForNormalDimension
 */
function positionTooltipFactory (d3TipInstance, options, globalOptions, {
  focusGroup,
  invertFunction,
  axisForMainDimension,
  axisForNormalDimension
}) {
  return function () {
    const mouseCoords = d3.mouse(this)
    const closestItems = _.flatMap(options, (singleGroupOptions) => {
      const mousePoint = singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.horizontal
        ? mouseCoords[0]
        : mouseCoords[1]

      return getCoordClosestItems({
        axisForMainDimension,
        axisForNormalDimension,
        singleGroupOptions,
        mousePoint,
        invertFunction
      })
    })

    const closestItem = _.minBy(closestItems, 'distance')
    if (!closestItem) return
    const linesWithData = (/** @type {ItemWithDimensionPositioningInfo<HorizontalDomain, VerticalDomain>[]} */ (_.filter(closestItems, { mainValue: closestItem.mainValue })))
    setHoverCircles(d3TipInstance, focusGroup, linesWithData)

    const lineForMainAxis = {
      normalValue: getMainAxisNormalDimensionValueInPx(options, globalOptions)
    }
    const mainDimension = options[0].mainDimension
    const [
      lowestNormalAxisValue,
      highestNormalAxisValue
    ] = d3.extent([...linesWithData, lineForMainAxis], (d, i) => d.normalValue)
    const coordsForDimension = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: {
        x1: null,
        y1: lowestNormalAxisValue,
        x2: null,
        y2: highestNormalAxisValue,
        xTranslation: closestItem.mainValue,
        yTranslation: 0
      },
      [dimensionUtils.DIMENSIONS_2D.vertical]: {
        x1: lowestNormalAxisValue,
        y1: null,
        x2: highestNormalAxisValue,
        y2: null,
        xTranslation: 0,
        yTranslation: closestItem.mainValue
      }
    }[mainDimension]
    setHoverLine(focusGroup, coordsForDimension)
  }
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {Array<GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function getMainAxisNormalDimensionValueInPx (options, globalOptions) {
  const {
    axisForMainDimension
  } = {
    [dimensionUtils.DIMENSIONS_2D.horizontal]: {
      axisForMainDimension: options[0].axis.horizontal
    },
    [dimensionUtils.DIMENSIONS_2D.vertical]: {
      axisForMainDimension: options[0].axis.vertical
    }
  }[options[0].mainDimension]
  const { absolutePosition } = getDrawingEnvironment(axisForMainDimension, globalOptions)
  return options[0].mainDimension === dimensionUtils.DIMENSIONS_2D.horizontal
    ? absolutePosition.y
    : absolutePosition.x
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Tooltip<GElement, Datum, PElement, PDatum>} d3TipInstance
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} focusGroup
 * @param {object} linesWithData
 */
function setHoverCircles (d3TipInstance, focusGroup, linesWithData) {
  const circles = focusGroup
    .selectAll(`circle.${hoverCircleBaseClass}`)
    .data(linesWithData)

  circles
    .exit()
    .remove()

  const newCircles = circles
    .enter()
    .append('circle')
    .attr('cursor', 'pointer')
    .attr('stroke-width', (d) => d.singleGroupOptions.lineWidth)

  const updatedCircles = circles
  const allCircles = newCircles.merge(updatedCircles)

  allCircles
    .attr('class', getHoverCirclesCssClasses)
    .attr('r', (d) => _.defaultTo(d.singleGroupOptions.hoverCircleRadius, DEFAULT_HOVER_CIRCLE_RADIUS))
    .attr('cx', getCircleCoordinatesFactory('cx'))
    .attr('cy', getCircleCoordinatesFactory('cy'))
    .each(setupCircleEventsFactory(d3TipInstance))
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} focusGroup
 * @param {object} coords
 * @param {number} coords.xTranslation
 * @param {number} coords.yTranslation
 * @param {number} coords.x1
 * @param {number} coords.x2
 * @param {number} coords.y1
 * @param {number} coords.y2
 */
function setHoverLine (focusGroup, { xTranslation, yTranslation, x1, x2, y1, y2 }) {
  focusGroup.attr('transform', `translate(${xTranslation}, ${yTranslation})`)
  focusGroup
    .select('.hover-line')
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2)
}

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisForMainDimension
 * @return {InvertFunction}
 */
function invertFunctionFactory (axisForMainDimension) {
  const domain = axisForMainDimension.scale.axisScale.domain()
  const range = axisForMainDimension.scale.axisScale.range()
  const scale = d3.scaleQuantize().domain(range).range(domain)
  return function (x) {
    return scale(x)
  }
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @typedef {Object} ItemWithDimensionPositioningInfo
 * @property {[number, number]} item
 * @property {number} distance
 * @property {any} normalValue
 * @property {any} mainValue
 * @property {GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 */

/**
 * @template MainDimensionDomain
 * @template NormalDimensionDomain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {object} params
 * @param {GeoChart.AxisConfig<MainDimensionDomain>} params.axisForMainDimension
 * @param {GeoChart.AxisConfig<NormalDimensionDomain>} params.axisForNormalDimension
 * @param {number} params.mousePoint
 * @param {GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>} params.singleGroupOptions
 * @param {InvertFunction} params.invertFunction
 * @returns {ItemWithDimensionPositioningInfo<HorizontalDomain, VerticalDomain>[]}
*/
function getCoordClosestItems ({ axisForMainDimension, axisForNormalDimension, mousePoint, singleGroupOptions, invertFunction }) {
  const mainDimensionValue = invertFunction(mousePoint)
  const mainDimensionValueInAxis = axisForMainDimension.scale.axisScale(mainDimensionValue)
  const getNearestIndexInMainAxisDomain = d3.bisector((d) => d[axisForMainDimension.keyForValues]).right
  const index = getNearestIndexInMainAxisDomain(singleGroupOptions.data, mainDimensionValue, 1)
  const leadingItem = singleGroupOptions.data[index - 1]
  const trailingItem = singleGroupOptions.data[index]
  const leadingDistance = _.get(leadingItem, axisForMainDimension.keyForValues, Number.MAX_VALUE)
  const trailingDistance = _.get(trailingItem, axisForMainDimension.keyForValues, Number.MAX_VALUE)
  const leadingDistanceValue = Math.abs(axisForMainDimension.scale.axisScale(leadingDistance) - mainDimensionValueInAxis)
  const trailingDistanceValue = Math.abs(axisForMainDimension.scale.axisScale(trailingDistance) - mainDimensionValueInAxis)
  const bandwidth = axisForMainDimension.scale.axisScale.bandwidth ? axisForMainDimension.scale.axisScale.bandwidth() / 2 : 0

  if (!leadingItem && !trailingItem) return

  const leadingObject = leadingItem && {
    item: leadingItem,
    distance: leadingDistanceValue,
    normalValue: axisForNormalDimension.scale.axisScale(leadingItem[axisForNormalDimension.keyForValues]),
    mainValue: axisForMainDimension.scale.axisScale(leadingItem[axisForMainDimension.keyForValues]) + bandwidth,
    singleGroupOptions
  }

  const trailingObject = trailingItem && {
    item: trailingItem,
    distance: trailingDistanceValue,
    normalValue: axisForNormalDimension.scale.axisScale(trailingItem[axisForNormalDimension.keyForValues]),
    mainValue: axisForMainDimension.scale.axisScale(trailingItem[axisForMainDimension.keyForValues]) + bandwidth,
    singleGroupOptions
  }

  if (!leadingItem) {
    return [trailingObject]
  } else if (!trailingItem) {
    return [leadingObject]
  }

  if (leadingDistanceValue === trailingDistanceValue) return [leadingObject, trailingObject]

  return trailingDistanceValue < leadingDistanceValue
    ? [trailingObject]
    : [leadingObject]
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @callback GetCircleCoordinates
 * @param {{item: object, singleGroupOptions: GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>}} d
 */

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {'cx' | 'cy'} coordinate
 * @return {GetCircleCoordinates<HorizontalDomain, VerticalDomain>}
 */
function getCircleCoordinatesFactory (coordinate) {
  return function (d) {
    const axisForNormalDimension = d.singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.horizontal
      ? d.singleGroupOptions.axis.vertical
      : d.singleGroupOptions.axis.horizontal
    return getCircleCoordinates(d, d.singleGroupOptions.mainDimension, axisForNormalDimension)[coordinate]
  }
}

/**
 * @template Domain
 * @param {{item: object}} datum
 * @enum {GeoChart.BarDimension} dimension
 * @param {GeoChart.AxisConfig<Domain>} axisForNormalDimension
 */
function getCircleCoordinates (datum, dimension, axisForNormalDimension) {
  const circleCoordinates = {
    [dimensionUtils.DIMENSIONS_2D.horizontal]: {
      cx: 0,
      cy: axisForNormalDimension.scale.axisScale(datum.item[axisForNormalDimension.keyForValues])
    },
    [dimensionUtils.DIMENSIONS_2D.vertical]: {
      cx: axisForNormalDimension.scale.axisScale(datum.item[axisForNormalDimension.keyForValues]),
      cy: 0
    }
  }
  return circleCoordinates[dimension]
}

/**
 * @callback SetupCircleEvents
 * @param {object} d
 */
/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Tooltip<GElement, Datum, PElement, PDatum>} d3TipInstance
 * @return {SetupCircleEvents}
 */
function setupCircleEventsFactory (d3TipInstance) {
  return function (d) {
    const circle = d3.select(this)
    setupTooltipEventListeners(circle, d3TipInstance, d.singleGroupOptions.tooltip)
  }
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @return {string}
 */
function getInitialLine (singleGroupOptions) {
  const isDimensionHorizontalAxis = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)

  const axisForMainDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.horizontal : singleGroupOptions.axis.vertical
  const axisForNormalDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.vertical : singleGroupOptions.axis.horizontal

  const xScale = isDimensionHorizontalAxis ? axisForMainDimension.scale.axisScale : axisForNormalDimension.scale.axisScale
  const yScale = isDimensionHorizontalAxis ? axisForNormalDimension.scale.axisScale : axisForMainDimension.scale.axisScale
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
    .curve(_.defaultTo(singleGroupOptions.interpolationFn, DEFAULT_INTERPOLATION_FUNCTION))

  return initialLine(singleGroupOptions.data)
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 */
function getLineCssClassesFactory (singleGroupOptions) {
  return function (d, i) {
    const defaultClasses = [
      lineBaseClass,
      `geo-chart-line-element--${singleGroupOptions.mainDimension}`
    ]

    const customClasses = _.isFunction(singleGroupOptions.cssClasses)
      ? singleGroupOptions.cssClasses(defaultClasses, d, i)
      : defaultClasses

    return _.uniq([...customClasses, lineBaseClass]).join(' ')
  }
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {{singleGroupOptions: GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>, item: Object}} d
 * @param {number} i
 */
function getHoverCirclesCssClasses (d, i) {
  const defaultClasses = [
    hoverCircleBaseClass,
    `geo-chart-focus-group-element__hover-circle--${i}`,
    `geo-chart-focus-group-element__hover-circle--${d.singleGroupOptions.mainDimension}`
  ]

  const customClasses = _.isFunction(d.singleGroupOptions.cssClasses)
    ? d.singleGroupOptions.cssClasses(defaultClasses, d.item, i)
    : defaultClasses

  return _.uniq([...customClasses, hoverCircleBaseClass]).join(' ')
}
