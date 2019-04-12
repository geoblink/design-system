/// <reference types='d3' />

import _ from 'lodash'

import {
  DIMENSIONS,
  getDrawingEnvironment
} from '../GeoChartAxis/GeoChartAxis'

import {
  isDimensionAxis
} from '../GeoChartUtils/barsUtils'
import { setupTooltipEventListeners } from '../GeoChartUtils/GeoChartTooltip'

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

const lineBaseClass = 'geo-chart-line-element'
const hoverCircleBaseClass = 'geo-chart-line-element__hover-circle'
const FOCUS_GROUP_DEFAULT_CLASS = 'hover-overlay__focus'
const DEFAULT_HOVER_CIRCLE_RADIUS = 4
const DEFAULT_LINE_WIDTH = 2
const DEFAULT_INTERPOLATION_FUNCTION = INTERPOLATION_TYPES['d3.curveLinear']
/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 */
export function render (d3Instance, d3TipInstance, options, globalOptions) {
  d3Instance
    .selectAll(`g.${FOCUS_GROUP_DEFAULT_CLASS}`)
    .remove()

  const groups = d3Instance
    .selectAll('g.geo-chart-line-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-line-group geo-chart-line-group--${singleGroupOptions.id}`
    )

  newGroups.each(function (singleGroupOptions, i) {
    const group = d3.select(this)
    group
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('class', getLineCssClassesFactory(singleGroupOptions))
      .attr('d', getInitialLine(singleGroupOptions))
  })

  const newFocusGroups = d3Instance
    .append('g')
    .attr('class', FOCUS_GROUP_DEFAULT_CLASS)
    .style('display', 'none')

  newFocusGroups
    .append('line')
    .attr('class', 'hover-line')
    .attr('stroke-width', '2px')
    .attr('stroke', '#000')

  const focusGroup = d3Instance.selectAll(`g.${FOCUS_GROUP_DEFAULT_CLASS}`)
  d3Instance
    .on('mouseover', () => focusGroup.style('display', null))
    .on('mouseout', () => focusGroup.style('display', 'none'))
    .on('mousemove', positionTooltipFactory(d3TipInstance, options, globalOptions, {
      focusGroup
    }))

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
    renderSingleGroup(d3Instance, group, singleGroupOptions, globalOptions)
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
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} group
 * @param {GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 */
function renderSingleGroup (d3Instance, group, singleGroupOptions, globalOptions) {
  const isDimensionHorizontalAxis = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
  const axisForDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.horizontal : singleGroupOptions.axis.vertical
  const axisForNormalDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.vertical : singleGroupOptions.axis.horizontal
  const xScale = isDimensionHorizontalAxis ? axisForDimension.scale.axisScale : axisForNormalDimension.scale.axisScale
  const yScale = isDimensionHorizontalAxis ? axisForNormalDimension.scale.axisScale : axisForDimension.scale.axisScale

  const line = d3.line()
    .x((d, i) => {
      return xScale(d[singleGroupOptions.axis.horizontal.keyForValues])
    })
    .y((d, i) => {
      return yScale(d[singleGroupOptions.axis.vertical.keyForValues])
    })
    .curve(singleGroupOptions.interpolationFn || DEFAULT_INTERPOLATION_FUNCTION)

  group
    .selectAll(`path.${lineBaseClass}`)
    .attr('stroke-width', singleGroupOptions.lineWidth || DEFAULT_LINE_WIDTH)
    .attr('class', getLineCssClassesFactory(singleGroupOptions))
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('d', line(singleGroupOptions.lineData))
}

function positionTooltipFactory (d3TipInstance, options, globalOptions, {
  focusGroup
}) {
  return function () {
    const firstGroupOptions = options[0]
    const {
      axisForDimension,
      axisForNormalDimension,
      mouseCoord
    } = {
      [DIMENSIONS.horizontal]: {
        axisForDimension: firstGroupOptions.axis.horizontal,
        axisForNormalDimension: firstGroupOptions.axis.vertical,
        mouseCoord: 0
      },
      [DIMENSIONS.vertical]: {
        axisForDimension: firstGroupOptions.axis.vertical,
        axisForNormalDimension: firstGroupOptions.axis.horizontal,
        mouseCoord: 1
      }
    }[firstGroupOptions.dimension]

    const mainDimensionValue = axisForDimension.scale.axisScale.invert(d3.mouse(this)[mouseCoord])
    const getNearestIndexInMainAxisDomain = d3.bisector((d) => d[axisForDimension.keyForValues]).right

    const closestItems = _.flatMap(options, function (singleGroupOptions) {
      const index = getNearestIndexInMainAxisDomain(singleGroupOptions.lineData, mainDimensionValue, 1)
      const leadingItem = singleGroupOptions.lineData[index - 1]
      const trailingItem = singleGroupOptions.lineData[index]
      const leadingDistance = Math.abs(_.get(leadingItem, axisForDimension.keyForValues, Number.MAX_VALUE) - mainDimensionValue)
      const trailingDistance = Math.abs(_.get(trailingItem, axisForDimension.keyForValues, Number.MAX_VALUE) - mainDimensionValue)
      const leadingObject = leadingItem && {
        item: leadingItem,
        distance: leadingDistance,
        normalValue: axisForNormalDimension.scale.axisScale(leadingItem[axisForNormalDimension.keyForValues]),
        mainValue: axisForDimension.scale.axisScale(leadingItem[axisForDimension.keyForValues]),
        singleGroupOptions
      }
      const trailingObject = trailingItem && {
        item: trailingItem,
        distance: trailingDistance,
        normalValue: axisForNormalDimension.scale.axisScale(trailingItem[axisForNormalDimension.keyForValues]),
        mainValue: axisForDimension.scale.axisScale(trailingItem[axisForDimension.keyForValues]),
        singleGroupOptions
      }

      if (leadingObject && trailingObject) {
        if (leadingDistance === trailingDistance) return [leadingObject, trailingObject]
      }

      return trailingDistance < leadingDistance
        ? trailingObject && [trailingObject]
        : leadingObject && [leadingObject]
    })
    const closestItem = _.minBy(closestItems, 'distance')
    if (!closestItem) return
    const linesWithData = _.filter(closestItems, { mainValue: closestItem.mainValue })

    const { absolutePosition } = getDrawingEnvironment(axisForDimension, globalOptions)
    const lineForMainAxis = {
      normalValue: firstGroupOptions.dimension === DIMENSIONS.horizontal
        ? absolutePosition.y
        : absolutePosition.x
    }
    const lowestAndHighestValuesInLines = d3.extent([...linesWithData, lineForMainAxis], (d, i) => d.normalValue)
    const lowestNormalAxisValue = lowestAndHighestValuesInLines[0]
    const highestNormalAxisValue = lowestAndHighestValuesInLines[1]

    const { x1, y1, x2, y2, xTranslation, yTranslation } = {
      [DIMENSIONS.horizontal]: {
        x1: null,
        y1: lowestNormalAxisValue,
        x2: null,
        y2: highestNormalAxisValue,
        xTranslation: closestItem.mainValue,
        yTranslation: 0
      },
      [DIMENSIONS.vertical]: {
        x1: lowestNormalAxisValue,
        y1: null,
        x2: highestNormalAxisValue,
        y2: null,
        xTranslation: 0,
        yTranslation: closestItem.mainValue
      }
    }[firstGroupOptions.dimension]

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

    const updatedCircles = circles
    const allCircles = newCircles.merge(updatedCircles)

    allCircles
      .attr('class', getHoverCirclesCssClasses)
      .attr('r', (d) => d.singleGroupOptions.hoverCircleRadius || DEFAULT_HOVER_CIRCLE_RADIUS)
      .attr('cx', (d) => getCircleCoordinates(d, firstGroupOptions.dimension).cx)
      .attr('cy', (d) => getCircleCoordinates(d, firstGroupOptions.dimension).cy)
      .each(function (d) {
        const circle = d3.select(this)
        setupTooltipEventListeners(circle, d3TipInstance, d.singleGroupOptions.tooltip)
        circle
          .on('mouseover', (d, i) => {
            circle
              .transition()
              .duration(100)
              .attr('stroke-width', d.singleGroupOptions.lineWidth)
          })
          .on('mouseout', (d) => {
            circle
              .transition()
              .duration(100)
              .attr('stroke-width', null)
          })
      })

    function getCircleCoordinates (datum, dimension) {
      const circleCoordinates = {
        [DIMENSIONS.horizontal]: {
          cx: 0,
          cy: axisForNormalDimension.scale.axisScale(datum.item[axisForNormalDimension.keyForValues])
        },
        [DIMENSIONS.vertical]: {
          cx: axisForNormalDimension.scale.axisScale(datum.item[axisForNormalDimension.keyForValues]),
          cy: 0
        }
      }
      return circleCoordinates[dimension]
    }

    focusGroup.attr('transform', `translate(${xTranslation}, ${yTranslation})`)
    focusGroup
      .select('.hover-line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
  }
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @return {d3.Line<HorizontalDomain | VerticalDomain>}
 */
function getInitialLine (singleGroupOptions) {
  const isDimensionHorizontalAxis = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)

  const axisForDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.horizontal : singleGroupOptions.axis.vertical
  const axisForNormalDimension = isDimensionHorizontalAxis ? singleGroupOptions.axis.vertical : singleGroupOptions.axis.horizontal

  const xScale = isDimensionHorizontalAxis ? axisForDimension.scale.axisScale : axisForNormalDimension.scale.axisScale
  const yScale = isDimensionHorizontalAxis ? axisForNormalDimension.scale.axisScale : axisForDimension.scale.axisScale
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
  return initialLine
}

function getLineCssClassesFactory (singleGroupOptions) {
  return function (d, i) {
    const defaultClasses = [
      lineBaseClass,
      `geo-chart-line-element--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, lineBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

function getHoverCirclesCssClasses (d, i) {
  const defaultClasses = [
    hoverCircleBaseClass,
    `geo-chart-focus-group-element__hover-circle--${i}`,
    `geo-chart-focus-group-element__hover-circle--${d.singleGroupOptions.dimension}`
  ]

  if (d.singleGroupOptions.cssClasses) {
    const customClasses = d.singleGroupOptions.cssClasses(defaultClasses, d.item, i)
    return _.uniq([...customClasses, hoverCircleBaseClass]).join(' ')
  }

  return defaultClasses.join(' ')
}
