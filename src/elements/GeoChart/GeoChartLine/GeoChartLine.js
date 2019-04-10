/// <reference types='d3' />

import _ from 'lodash'

import {
  DIMENSIONS,
  getDrawingEnvironment
} from '../GeoChartAxis/GeoChartAxis'

import {
  isDimensionAxis
} from '../GeoChartUtils/barsUtils'

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
const FOCUS_GROUP_DEFAULT_CLASS = 'hover-overlay__focus'

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
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
    .attr('class', 'x-hover-line hover-line')
    .attr('stroke-width', '2px')
    .attr('stroke', '#000')

  newFocusGroups
    .append('line')
    .attr('class', 'y-hover-line hover-line')
    .attr('stroke-width', '2px')
    .attr('stroke', '#000')

  newFocusGroups
    .append('circle')
    .attr('r', 4)

  newFocusGroups
    .append('text')
    .attr('x', 15)
    .attr('dy', '.31em')

  const focusGroup = d3Instance.selectAll(`g.${FOCUS_GROUP_DEFAULT_CLASS}`)
  d3Instance
    .on('mouseover', () => focusGroup.style('display', null))
    .on('mouseout', () => focusGroup.style('display', 'none'))

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
    .curve(singleGroupOptions.interpolationFn)

  const margin = globalOptions.chart.margin
  const overlayWidth = globalOptions.chart.size.width - margin.right - margin.left
  const overlayHeight = globalOptions.chart.size.height - margin.top - margin.bottom

  const focusGroup = d3Instance.selectAll(`g.${FOCUS_GROUP_DEFAULT_CLASS}`)

  d3Instance
    .on('mousemove', positionTooltipFactory(singleGroupOptions, globalOptions, {
      xScale,
      yScale,
      axisForDimension,
      axisForNormalDimension,
      overlayHeight,
      overlayWidth,
      margin,
      focusGroup
    }))

  group
    .selectAll(`path.${lineBaseClass}`)
    .attr('stroke-width', singleGroupOptions.lineWidth)
    .attr('class', getLineCssClassesFactory(singleGroupOptions))
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('d', line(singleGroupOptions.lineData))
}

function positionTooltipFactory (singleGroupOptions, globalOptions, {
  xScale,
  yScale,
  axisForDimension,
  axisForNormalDimension,
  overlayHeight,
  overlayWidth,
  margin,
  focusGroup
}) {
  return function () {
    const mouseCoord = singleGroupOptions.dimension === DIMENSIONS.horizontal ? 0 : 1
    const scale = singleGroupOptions.dimension === DIMENSIONS.horizontal ? xScale : yScale
    const c0 = scale.invert(d3.mouse(this)[mouseCoord])
    const bisect = d3.bisector((d) => d[axisForDimension.keyForValues]).right
    const i = bisect(singleGroupOptions.lineData, c0, 1)
    const d0 = singleGroupOptions.lineData[i - 1]
    const d1 = singleGroupOptions.lineData[i]
    const d = d0 && c0 - d0[axisForDimension.keyForValues] > d1 && d1[axisForDimension.keyForValues] - c0 ? d1 : d0
    const { absolutePosition } = getDrawingEnvironment(axisForDimension, globalOptions)

    focusGroup.select('text').text(() => singleGroupOptions.tooltip)

    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      focusGroup.attr('transform', `translate(${xScale(d[axisForDimension.keyForValues])}, ${yScale(d[axisForNormalDimension.keyForValues])})`)
      const { y1, y2 } = computeHorizontalTooltipPosition(d, singleGroupOptions, {
        axisForNormalDimension,
        overlayHeight,
        margin,
        yScale,
        absolutePosition
      })
      focusGroup.select('.x-hover-line').attr('y1', y1)
      focusGroup.select('.x-hover-line').attr('y2', y2)
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      focusGroup.attr('transform', `translate(${xScale(d[axisForNormalDimension.keyForValues])}, ${yScale(d[axisForDimension.keyForValues])})`)
      const { x1, x2 } = computeVerticalTooltipPosition(d, singleGroupOptions, {
        axisForNormalDimension,
        overlayWidth,
        margin,
        xScale,
        absolutePosition
      })
      focusGroup.select('.y-hover-line').attr('x1', x1)
      focusGroup.select('.y-hover-line').attr('x2', x2)
    }
  }
}

function computeHorizontalTooltipPosition (d, singleGroupOptions, {
  axisForNormalDimension,
  overlayHeight,
  margin,
  yScale,
  absolutePosition
}) {
  const yScaleValue = yScale(d[axisForNormalDimension.keyForValues])
  const yScaleValueAtOrigin = yScale(axisForNormalDimension.scale.valueForOrigin)
  const y1 = absolutePosition.y <= yScaleValue
    ? 0
    : yScaleValueAtOrigin - yScaleValue
  const y2 = yScaleValue <= yScaleValueAtOrigin
    ? 0
    : -(yScaleValue - yScaleValueAtOrigin)
  return { y1, y2 }
}

function computeVerticalTooltipPosition (d, singleGroupOptions, {
  axisForNormalDimension,
  overlayWidth,
  margin,
  xScale,
  absolutePosition
}) {
  const xScaleValue = xScale(d[axisForNormalDimension.keyForValues])
  const xScaleValueAtOrigin = xScale(axisForNormalDimension.scale.valueForOrigin)
  const x1 = absolutePosition.x <= xScaleValue
    ? 0
    : xScaleValueAtOrigin - xScaleValue
  const x2 = xScaleValue <= xScaleValueAtOrigin
    ? 0
    : -(xScaleValue - xScaleValueAtOrigin)
  return { x1, x2 }
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
      `geo-chart-line-element--${i}`,
      `geo-chart-line-element--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, lineBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
