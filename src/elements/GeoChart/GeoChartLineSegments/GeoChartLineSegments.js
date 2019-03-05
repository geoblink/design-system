/// <reference types="d3" />

import _ from 'lodash'

import {
  DIMENSIONS
} from '../GeoChartAxis/GeoChartAxis'
import {
  getItemSpanAtAxis,
  isDimensionAxis,
  getItemValueAtAxis
} from '../GeoChartUtils/barsUtils'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

export const DEFAULT_RADIUS = 5

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

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @template Domain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} lineSegmentsContainer
 * @param {GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 * @param {object} params
 * @param {GeoChart.AxisConfig<Domain>} params.axisForDimension
 * @param {GeoChart.AxisConfig<Domain>} params.axisForNormalDimension
 */
function renderLineSegments (lineSegmentsContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension
}) {
  const lineSegmentsBaseClass = 'geo-chart-line-segments__segment'
  const segments = _.times(singleGroupOptions.circleData.length + 1, function (idx) {
    return {
      startValue: idx > 0
        ? getCirclePositionInMainDimension(idx - 1)
        : _.first(axisForDimension.scale.axisScale.domain()),
      endValue: idx < singleGroupOptions.circleData.length
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

  function getCirclePositionInMainDimension (idx) {
    return _.get(singleGroupOptions.circleData[idx], axisForDimension.keyForValues)
  }

  function getLineSegmentsTransform (d, i) {
    const circleSizeAtAxis = getStopSizeAtAxis(axisForDimension, {
      [axisForDimension.keyForValues]: d.endValue
    }, {
      optionalMargin: singleGroupOptions.circleMargin,
      optionalNaturalMargin: singleGroupOptions.circleNaturalMargin,
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    const leadingEdgeMargin = i === 0 ? 0 : circleSizeAtAxis / 2
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
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const translationForDimension = {
      [DIMENSIONS.horizontal]: {
        x: axisForDimension.scale.axisScale(d.startValue),
        y: normalDimensionTranslation - getLineSegmentHeight(d, i) / 2
      },
      [DIMENSIONS.vertical]: {
        x: normalDimensionTranslation - getLineSegmentWidth(d, i) / 2,
        y: axisForDimension.scale.axisScale(d.startValue)
      }
    }
    const translation = translationForDimension[singleGroupOptions.dimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getLineSegmentInitialWidth (d, i) {
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

  function getLineSegmentWidth (d, i) {
    const circleSizeAtAxis = getStopSizeAtAxis(axisForDimension, {
      [axisForDimension.keyForValues]: d.endValue
    }, {
      optionalMargin: singleGroupOptions.circleMargin,
      optionalNaturalMargin: singleGroupOptions.circleNaturalMargin,
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    const leadingEdgeMargin = i === 0 ? 0 : circleSizeAtAxis / 2
    const trailingEdgeMargin = i === singleGroupOptions.circleData.length ? 0 : circleSizeAtAxis / 2
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

  function getLineSegmentInitialHeight (d, i) {
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

  function getLineSegmentHeight (d, i) {
    const circleSizeAtAxis = getStopSizeAtAxis(axisForDimension, {
      [axisForDimension.keyForValues]: d.endValue
    }, {
      optionalMargin: singleGroupOptions.circleMargin,
      optionalNaturalMargin: singleGroupOptions.circleNaturalMargin,
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    const leadingEdgeMargin = i === 0 ? 0 : circleSizeAtAxis / 2
    const trailingEdgeMargin = i === singleGroupOptions.circleData.length ? 0 : circleSizeAtAxis / 2
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

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @template Domain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} lineSegmentsContainer
 * @param {GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 * @param {object} params
 * @param {GeoChart.AxisConfig<Domain>} params.axisForDimension
 * @param {GeoChart.AxisConfig<Domain>} params.axisForNormalDimension
 */
function renderLineSegmentsStops (lineSegmentsContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension
}) {
  const lineSegmentsStopBaseClass = 'geo-chart-line-segments__segment-stop'
  const lineSegmentsStops = lineSegmentsContainer
    .selectAll(`circle.${lineSegmentsStopBaseClass}`)
    .data(singleGroupOptions.circleData)

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
    const circleSizeWithoutMargin = getStopSizeAtAxis(axisForDimension, d, {
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    return circleSizeWithoutMargin / 2
  }

  function getLineSegmentsStopInitialCx (d, i) {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return 0
      case DIMENSIONS.vertical:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopInitialCx: ${singleGroupOptions.dimension}`)
    }
  }
  function getLineSegmentsStopInitialCy (d, i) {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      case DIMENSIONS.vertical:
        return 0
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopInitialCy: ${singleGroupOptions.dimension}`)
    }
  }
  function getLineSegmentsStopCx (d, i) {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return axisForDimension.scale.axisScale(_.get(d, axisForDimension.keyForValues))
      case DIMENSIONS.vertical:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopCx: ${singleGroupOptions.dimension}`)
    }
  }
  function getLineSegmentsStopCy (d, i) {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      case DIMENSIONS.vertical:
        return axisForDimension.scale.axisScale(_.get(d, axisForDimension.keyForValues))
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis dimension for getLineSegmentsStopCy: ${singleGroupOptions.dimension}`)
    }
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

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @param {object} params
 * @param {string} params.optionalRadius
 * @param {string} params.optionalNaturalRadius
 * @param {string} params.optionalMargin
 * @param {string} params.optionalNaturalMargin
 */
function getStopSizeAtAxis (axisConfig, singleItem, {
  optionalRadius,
  optionalNaturalRadius,
  optionalMargin,
  optionalNaturalMargin
}) {
  const naturalRadius = _.defaultTo(optionalNaturalRadius, 0)
  const hasNaturalRadius = naturalRadius !== 0
  const radius = _.defaultTo(optionalRadius, hasNaturalRadius ? 0 : DEFAULT_RADIUS)

  const naturalMargin = _.defaultTo(optionalNaturalMargin, 0)
  const margin = _.defaultTo(optionalMargin, 0)

  return Math.abs(getSpanEndPoint() - getSpanOriginPoint())

  function getSpanOriginPoint () {
    return getItemValueAtAxis(axisConfig, {
      [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) - naturalRadius - naturalMargin
    }) - radius - margin
  }

  function getSpanEndPoint () {
    return getItemValueAtAxis(axisConfig, {
      [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) + naturalRadius + naturalMargin
    }) + radius + margin
  }
}
