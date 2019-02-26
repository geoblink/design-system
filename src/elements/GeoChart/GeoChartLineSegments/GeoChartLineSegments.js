/// <reference types="d3" />

import _ from 'lodash'

import '../GeoChartAxis/GeoChartAxis'
import {
  getItemSpanAtAxis,
  getTranslationForNormalAxisFactory,
  getItemTranslationFactory,
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
 * @enum {GeoChart.BarDimension}
 */
export const DIMENSIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

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
  const groups = d3Instance
    .selectAll('g.geo-chart-line-segments-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-line-segments-group geo-chart-line-segments-group--${singleGroupOptions.id} geo-chart-line-segments-group--${singleGroupOptions.dimension}`
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
    renderSingleGroup(group, singleGroupOptions, globalOptions)
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
function renderSingleGroup (group, singleGroupOptions, globalOptions) {
  const axisForNormalDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  renderLineSegments(group, singleGroupOptions, globalOptions, {
    axisForDimension,
    axisForNormalDimension
  })

  renderLineSegmentsStops(group, singleGroupOptions, globalOptions, {
    axisForDimension,
    axisForNormalDimension
  })
}

function renderLineSegments (lineSegmentsContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension
}) {
  const getLineSegmentInitialWidth = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return 0
      case DIMENSIONS.vertical:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentWidth: ${singleGroupOptions.dimension}`)
    }
  }
  const getLineSegmentWidth = (d, i) => {
    const leadingEdgeMargin = i === 0 ? 0 : circleRadiusAtAxis + circleRadialMarginAtAxis
    const trailingEdgeMargin = i === singleGroupOptions.data.length ? 0 : circleRadiusAtAxis + circleRadialMarginAtAxis
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return Math.max(
          axisForDimension.scale.axisScale(d.endValue) - axisForDimension.scale.axisScale(d.startValue) - (leadingEdgeMargin + trailingEdgeMargin),
          0
        )
      case DIMENSIONS.vertical:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentWidth: ${singleGroupOptions.dimension}`)
    }
  }
  const getLineSegmentInitialHeight = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      case DIMENSIONS.vertical:
        return 0
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentHeight: ${singleGroupOptions.dimension}`)
    }
  }
  const getLineSegmentHeight = (d, i) => {
    const leadingEdgeMargin = i === 0 ? 0 : circleRadiusAtAxis + circleRadialMarginAtAxis
    const trailingEdgeMargin = i === singleGroupOptions.data.length ? 0 : circleRadiusAtAxis + circleRadialMarginAtAxis
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      case DIMENSIONS.vertical:
        return Math.max(
          axisForDimension.scale.axisScale(d.endValue) - axisForDimension.scale.axisScale(d.startValue) - (leadingEdgeMargin + trailingEdgeMargin),
          0
        )
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentHeight: ${singleGroupOptions.dimension}`)
    }
  }
  const lineSegmentsBaseClass = 'geo-chart-line-segments__segment'

  function getCirclePositionInMainDimension (idx) {
    return _.get(singleGroupOptions.data[idx], axisForDimension.keyForValues)
  }

  const circleRadiusAtAxis = getItemSpanAtAxis(axisForNormalDimension, null, singleGroupOptions, {
    keyForWidth: 'circleRadius',
    keyForNaturalWidth: 'circleNaturalRadius'
  })

  const circleRadialMarginAtAxis = getItemSpanAtAxis(axisForNormalDimension, null, singleGroupOptions, {
    keyForWidth: 'circleMargin',
    keyForNaturalWidth: 'circleNaturalMargin'
  })

  const segments = _.times(singleGroupOptions.data.length + 1, function (idx) {
    return {
      startValue: idx > 0
        ? getCirclePositionInMainDimension(idx - 1)
        : _.first(axisForDimension.scale.axisScale.domain()),
      endValue: idx < singleGroupOptions.data.length
        ? getCirclePositionInMainDimension(idx)
        : _.last(axisForDimension.scale.axisScale.domain())
    }
  })

  const lineSegments = lineSegmentsContainer
    .selectAll(`rect.${lineSegmentsBaseClass}`)
    .data(segments)

  const newLineSegments = lineSegments
    .enter()
    .append('rect')
    .attr('class', getLineSegmentsCssClasses)
    .attr('transform', getLineSegmentInitialTransform)
    .attr('width', getLineSegmentInitialWidth)
    .attr('height', getLineSegmentInitialHeight)

  const updatedLineSegments = lineSegments
  const allLineSegments = updatedLineSegments.merge(newLineSegments)

  allLineSegments
    .attr('class', getLineSegmentsCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getLineSegmentsTransform)
    .attr('width', getLineSegmentWidth)
    .attr('height', getLineSegmentHeight)

  lineSegments
    .exit()
    .remove()

  function getLineSegmentsTransform (d, i) {
    const leadingEdgeMargin = i === 0 ? 0 : circleRadiusAtAxis + circleRadialMarginAtAxis
    const dimensionTranslation = axisForDimension.scale.axisScale(d.startValue)
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const translationForDimension = {
      [DIMENSIONS.horizontal]: {
        x: dimensionTranslation + leadingEdgeMargin,
        y: normalDimensionTranslation - getLineSegmentHeight(d, i) / 2
      },
      [DIMENSIONS.vertical]: {
        x: normalDimensionTranslation - getLineSegmentWidth(d, i) / 2,
        y: dimensionTranslation + leadingEdgeMargin
      }
    }
    const translation = translationForDimension[singleGroupOptions.dimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getLineSegmentInitialTransform (d, i) {
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue) - getLineSegmentHeight(d, i) / 2
    const translationForDimension = {
      [DIMENSIONS.horizontal]: {
        x: 0,
        y: normalDimensionTranslation
      },
      [DIMENSIONS.vertical]: {
        x: normalDimensionTranslation,
        y: 0
      }
    }
    const translation = translationForDimension[singleGroupOptions.dimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getLineSegmentsCssClasses (d, i) {
    const defaultClasses = [
      lineSegmentsBaseClass,
      `geo-chart-line-segments__segment--${i}`,
      `geo-chart-line-segments__segment--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, lineSegmentsBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

function renderLineSegmentsStops (lineSegmentsContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension
}) {
  const lineSegmentsStopBaseClass = 'geo-chart-line-segments__segment-stop'
  const getLineSegmentsStopInitialCx = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return 0
      case DIMENSIONS.vertical:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopInitialCx: ${singleGroupOptions.dimension}`)
    }
  }
  const getLineSegmentsStopInitialCy = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      case DIMENSIONS.vertical:
        return 0
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopInitialCy: ${singleGroupOptions.dimension}`)
    }
  }
  const getLineSegmentsStopCx = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return axisForDimension.scale.axisScale(_.get(d, axisForDimension.keyForValues))
      case DIMENSIONS.vertical:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopCx: ${singleGroupOptions.dimension}`)
    }
  }
  const getLineSegmentsStopCy = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      case DIMENSIONS.vertical:
        return axisForDimension.scale.axisScale(_.get(d, axisForDimension.keyForValues))
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopCy: ${singleGroupOptions.dimension}`)
    }
  }

  const lineSegmentsStops = lineSegmentsContainer
    .selectAll(`circle.${lineSegmentsStopBaseClass}`)
    .data(singleGroupOptions.data)

  const newLineSegmentsStops = lineSegmentsStops
    .enter()
    .append('circle')
    .attr('class', getLineSegmentsStopsCssClasses)
    .attr('r', 0)
    .attr('cx', getLineSegmentsStopInitialCx)
    .attr('cy', getLineSegmentsStopInitialCy)

  const updatedLineSegmentsStops = lineSegmentsStops
  const allLineSegmentsStops = updatedLineSegmentsStops.merge(newLineSegmentsStops)

  allLineSegmentsStops
    .attr('class', getLineSegmentsStopsCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('cx', getLineSegmentsStopCx)
    .attr('cy', getLineSegmentsStopCy)
    .attr('r', getLineSegmentStopCircleRadius)

  lineSegmentsStops
    .exit()
    .remove()

  function getLineSegmentStopCircleRadius (d, i) {
    return getItemSpanAtAxis(axisForNormalDimension, d, singleGroupOptions, {
      keyForWidth: 'circleRadius',
      keyForNaturalWidth: 'circleNaturalRadius'
    })
  }

  function getLineSegmentsStopsCssClasses (d, i) {
    const defaultClasses = [
      lineSegmentsStopBaseClass,
      `geo-chart-line-segments__segment-stop--${i}`,
      `geo-chart-line-segments__segment-stop--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, lineSegmentsStopBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
