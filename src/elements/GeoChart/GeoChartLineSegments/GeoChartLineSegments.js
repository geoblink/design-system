/// <reference path="../GeoChart.d.ts" />

import _ from 'lodash'

import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as barsUtils from '../GeoChartUtils/barsUtils'
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

export const DEFAULT_RADIUS = 5

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.SingleLineSegmentsGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-line-segments-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-line-segments-group geo-chart-line-segments-group--${singleGroupOptions.id} geo-chart-line-segments-group--${singleGroupOptions.mainDimension}`
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
 * @param {GeoChart.SingleLineSegmentsGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions) {
  const axisForNormalDimension = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForMainDimension = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  renderLineSegments(group, singleGroupOptions, globalOptions, {
    axisForMainDimension,
    axisForNormalDimension
  })

  renderLineSegmentsStops(group, singleGroupOptions, globalOptions, {
    axisForMainDimension,
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
 * @template MainDimensionDomain
 * @template NormalDimensionDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} lineSegmentsContainer
 * @param {GeoChart.SingleLineSegmentsGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {Object} params
 * @param {GeoChart.AxisConfig<MainDimensionDomain, any>} params.axisForMainDimension
 * @param {GeoChart.AxisConfig<NormalDimensionDomain, any>} params.axisForNormalDimension
 */
function renderLineSegments (lineSegmentsContainer, singleGroupOptions, globalOptions, {
  axisForMainDimension,
  axisForNormalDimension
}) {
  const lineSegmentsBaseClass = 'geo-chart-line-segments__segment'
  const segments = _.times(singleGroupOptions.data.length + 1, function (idx) {
    return {
      startValue: idx > 0
        ? getCirclePositionInMainDimension(idx - 1)
        : _.first(axisForMainDimension.scale.axisScale.domain()),
      endValue: idx < singleGroupOptions.data.length
        ? getCirclePositionInMainDimension(idx)
        : _.last(axisForMainDimension.scale.axisScale.domain())
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
    return _.get(singleGroupOptions.data[idx], axisForMainDimension.keyForValues)
  }

  function getLineSegmentsTransform (d, i) {
    const circleSizeAtAxis = getStopSizeAtAxis(axisForMainDimension, {
      [axisForMainDimension.keyForValues]: d.endValue
    }, {
      optionalMargin: singleGroupOptions.circleMargin,
      optionalNaturalMargin: singleGroupOptions.circleNaturalMargin,
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    const leadingEdgeMargin = i === 0 ? 0 : circleSizeAtAxis / 2
    const dimensionTranslation = axisForMainDimension.scale.axisScale(d.startValue)
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const translationForDimension = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: {
        x: dimensionTranslation + leadingEdgeMargin,
        y: normalDimensionTranslation - getLineSegmentHeight(d, i) / 2
      },
      [dimensionUtils.DIMENSIONS_2D.vertical]: {
        x: normalDimensionTranslation - getLineSegmentWidth(d, i) / 2,
        y: dimensionTranslation + leadingEdgeMargin
      }
    }
    const translation = translationForDimension[singleGroupOptions.mainDimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getLineSegmentInitialTransform (d, i) {
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const translationForDimension = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: {
        x: axisForMainDimension.scale.axisScale(d.startValue),
        y: normalDimensionTranslation - getLineSegmentHeight(d, i) / 2
      },
      [dimensionUtils.DIMENSIONS_2D.vertical]: {
        x: normalDimensionTranslation - getLineSegmentWidth(d, i) / 2,
        y: axisForMainDimension.scale.axisScale(d.startValue)
      }
    }
    const translation = translationForDimension[singleGroupOptions.mainDimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getLineSegmentInitialWidth (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return 0
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return barsUtils.getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentWidth: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getLineSegmentWidth (d, i) {
    const circleSizeAtAxis = getStopSizeAtAxis(axisForMainDimension, {
      [axisForMainDimension.keyForValues]: d.endValue
    }, {
      optionalMargin: singleGroupOptions.circleMargin,
      optionalNaturalMargin: singleGroupOptions.circleNaturalMargin,
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    const leadingEdgeMargin = i === 0 ? 0 : circleSizeAtAxis / 2
    const trailingEdgeMargin = i === singleGroupOptions.data.length ? 0 : circleSizeAtAxis / 2
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return Math.max(
          axisForMainDimension.scale.axisScale(d.endValue) - axisForMainDimension.scale.axisScale(d.startValue) - (leadingEdgeMargin + trailingEdgeMargin),
          0
        )
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return barsUtils.getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentWidth: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getLineSegmentInitialHeight (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return barsUtils.getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return 0
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getLineSegmentHeight (d, i) {
    const circleSizeAtAxis = getStopSizeAtAxis(axisForMainDimension, {
      [axisForMainDimension.keyForValues]: d.endValue
    }, {
      optionalMargin: singleGroupOptions.circleMargin,
      optionalNaturalMargin: singleGroupOptions.circleNaturalMargin,
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    const leadingEdgeMargin = i === 0 ? 0 : circleSizeAtAxis / 2
    const trailingEdgeMargin = i === singleGroupOptions.data.length ? 0 : circleSizeAtAxis / 2
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return barsUtils.getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'lineWidth',
          keyForNaturalWidth: 'lineNaturalWidth'
        })
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return Math.max(
          axisForMainDimension.scale.axisScale(d.endValue) - axisForMainDimension.scale.axisScale(d.startValue) - (leadingEdgeMargin + trailingEdgeMargin),
          0
        )
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getLineSegmentsCssClasses (d, i) {
    const defaultClasses = [
      lineSegmentsBaseClass,
      `geo-chart-line-segments__segment--${i}`,
      `geo-chart-line-segments__segment--${singleGroupOptions.mainDimension}`
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
 * @param {GeoChart.SingleLineSegmentsGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {object} params
 * @param {GeoChart.AxisConfig<Domain>} params.axisForMainDimension
 * @param {GeoChart.AxisConfig<Domain>} params.axisForNormalDimension
 */
function renderLineSegmentsStops (lineSegmentsContainer, singleGroupOptions, globalOptions, {
  axisForMainDimension,
  axisForNormalDimension
}) {
  const lineSegmentsStopBaseClass = 'geo-chart-line-segments__segment-stop'
  const lineSegmentsStops = lineSegmentsContainer
    .selectAll(`circle.${lineSegmentsStopBaseClass}`)
    .data(singleGroupOptions.data, singleGroupOptions.trackByKey)

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
    const circleSizeWithoutMargin = getStopSizeAtAxis(axisForMainDimension, d, {
      optionalRadius: singleGroupOptions.circleRadius,
      optionalNaturalRadius: singleGroupOptions.circleNaturalRadius
    })
    return circleSizeWithoutMargin / 2
  }

  function getLineSegmentsStopInitialCx (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return 0
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentsStopInitialCx: ${singleGroupOptions.mainDimension}`)
    }
  }
  function getLineSegmentsStopInitialCy (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return 0
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentsStopInitialCy: ${singleGroupOptions.mainDimension}`)
    }
  }
  function getLineSegmentsStopCx (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return axisForMainDimension.scale.axisScale(_.get(d, axisForMainDimension.keyForValues))
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentsStopCx: ${singleGroupOptions.mainDimension}`)
    }
  }
  function getLineSegmentsStopCy (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return axisForMainDimension.scale.axisScale(_.get(d, axisForMainDimension.keyForValues))
      default:
        console.error(`GeoChartLineSegments [component] :: Invalid axis main dimension for getLineSegmentsStopCy: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getLineSegmentsStopsCssClasses (d, i) {
    const defaultClasses = [
      lineSegmentsStopBaseClass,
      `geo-chart-line-segments__segment-stop--${i}`,
      `geo-chart-line-segments__segment-stop--${singleGroupOptions.mainDimension}`
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
 * @param {number} [params.optionalRadius]
 * @param {number} [params.optionalNaturalRadius]
 * @param {number} [params.optionalMargin]
 * @param {number} [params.optionalNaturalMargin]
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
    return axisUtils.getItemValueAtAxis(axisConfig, {
      [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) - naturalRadius - naturalMargin
    }) - radius - margin
  }

  function getSpanEndPoint () {
    return axisUtils.getItemValueAtAxis(axisConfig, {
      [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) + naturalRadius + naturalMargin
    }) + radius + margin
  }
}
