/// <reference path="../GeoChart.d.ts" />

import _ from 'lodash'

import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as barsUtils from '../GeoChartUtils/barsUtils'
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
 * @typedef {Object} d3.Tooltip<GElement, Datum, PElement, PDatum>
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.SingleStackedBarGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {d3.Tooltip<SVGElement, Datum, PElement, PDatum>} [d3TipInstance]
 */
export function render (d3Instance, options, globalOptions, d3TipInstance) {
  const groups = d3Instance
    .selectAll('g.geo-chart-stacked-bars-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-stacked-bars-group geo-chart-stacked-bars-group--${singleGroupOptions.id}`
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
    renderSingleGroup(group, singleGroupOptions, globalOptions, d3TipInstance)
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
 * @param {GeoChart.SingleStackedBarGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions, d3TipInstance) {
  const isMainDimensionHorizontal = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)

  const axisForNormalDimension = isMainDimensionHorizontal
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForMainDimension = isMainDimensionHorizontal
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  const normalDimension = isMainDimensionHorizontal
    ? dimensionUtils.DIMENSIONS_2D.vertical
    : dimensionUtils.DIMENSIONS_2D.horizontal

  const barWrapper = group
    .selectAll('g.geo-chart-stacked-bars-group__single-group')
    .data(d => d.data)

  const newBarWrapper = barWrapper
    .enter()
    .append('g')
    .attr('class', (barWrapperOptions, i) =>
      `geo-chart-stacked-bars-group__single-group geo-chart-stacked-bars-group__single-group--${i}`
    )
    .attr('height', getBarInitialHeight)
    .attr('width', getBarInitialWidth)

  const updatedBarWrapper = barWrapper
  const allBarWrappers = newBarWrapper.merge(updatedBarWrapper)

  allBarWrappers
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getBarTransform)
    .attr('height', getBarHeight)
    .attr('width', getBarWidth)

  barWrapper
    .exit()
    .remove()

  allBarWrappers.each(function (stackedBarData) {
    const singleGroupBar = d3.select(this)
    renderStackedBars(singleGroupBar, stackedBarData, singleGroupOptions, globalOptions, {
      axisForMainDimension,
      axisForNormalDimension
    }, d3TipInstance)
  })

  function getTranslation (d, i) {
    return barsUtils.getItemTranslationFactoryOneDimension(singleGroupOptions, {
      keyForWidth: 'width',
      keyForNaturalWidth: 'naturalWidth',
      axisForNormalDimension: normalDimension,
      componentName: 'Stacked Bars',
      getOriginPositionAtAxis (axisConfig) {
        return axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
      },
      getTranslationForNormalAxis: axisUtils.getTranslationForNormalAxisFactoryStackedBar
    })(d, i)
  }

  function getBarTransform (d, i) {
    const barNormalTranslation = getTranslation(d, i)
    const widthTranslation = -getWidthTranslation(d, i) / 2
    return isMainDimensionHorizontal
      ? `translate(0, ${barNormalTranslation + widthTranslation})`
      : `translate(${barNormalTranslation + widthTranslation}, 0)`
  }

  function getWidthTranslation (d, i) {
    return barsUtils.getItemSpanAtAxis(axisForNormalDimension, d, singleGroupOptions, {
      keyForWidth: 'width',
      keyForNaturalWidth: 'naturalWidth'
    })
  }

  function getBarHeight (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return getWidthTranslation(d, i)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return Math.abs(
          _.first(axisForMainDimension.scale.axisScale.domain()) - _.last(axisForMainDimension.scale.axisScale.domain())
        )
      default:
        console.error(`GeoChartStackedBars [component] :: Invalid axis main dimension for getBarHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getBarInitialHeight (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return getWidthTranslation(d, i)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return 0
      default:
        console.error(`GeoChartStackedBars [component] :: Invalid axis main dimension for getBarInitialHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getBarInitialWidth (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return 0
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return getWidthTranslation(d, i)
      default:
        console.error(`GeoChartStackedBars [component] :: Invalid axis main dimension for getBarInitialWidth: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getBarWidth (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return Math.abs(
          _.first(axisForMainDimension.scale.axisScale.domain()) - _.last(axisForMainDimension.scale.axisScale.domain())
        )
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return getWidthTranslation(d, i)
      default:
        console.error(`GeoChartStackedBar [component] :: Invalid axis main dimension for getBarWidth: ${singleGroupOptions.mainDimension}`)
    }
  }
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
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} stackedBarsContainer
 * @param {Object} stackedBarData
 * @param {GeoChart.SingleStackedBarGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {Object} params
 * @param {GeoChart.AxisConfig<MainDimensionDomain, any>} params.axisForMainDimension
 * @param {GeoChart.AxisConfig<NormalDimensionDomain, any>} params.axisForNormalDimension
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 */
function renderStackedBars (stackedBarsContainer, stackedBarData, singleGroupOptions, globalOptions, {
  axisForMainDimension,
  axisForNormalDimension
}, d3TipInstance) {
  const isMainDimensionHorizontal = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)

  const stackedBarsBaseClass = 'geo-chart-stacked-bars__segment'

  const stackedBarsSegmentsData = stackedBarData[axisForMainDimension.keyForValues]

  let temporaryBarWrapperHeight = 0
  const allStackedBarsSegments = _.times(stackedBarsSegmentsData.length, function (idx) {
    const stackedBarSegment = {
      startValue: idx === 0
        ? _.min(axisForMainDimension.scale.axisScale.domain())
        : temporaryBarWrapperHeight,
      endValue: idx === stackedBarsSegmentsData.length - 1
        ? _.max(axisForMainDimension.scale.axisScale.domain())
        : temporaryBarWrapperHeight + stackedBarsSegmentsData[idx][axisForMainDimension.keyForValues]
    }
    temporaryBarWrapperHeight += stackedBarsSegmentsData[idx][axisForMainDimension.keyForValues]
    return stackedBarSegment
  })

  const stackedBarsOriginAtAxis = axisForMainDimension.scale.axisScale(axisForMainDimension.scale.valueForOrigin)

  const axisPositions = {
    [dimensionUtils.DIMENSIONS_2D.horizontal]: 'x',
    [dimensionUtils.DIMENSIONS_2D.vertical]: 'y'
  }
  const directionToChange = axisPositions[singleGroupOptions.mainDimension]

  const stackedBars = stackedBarsContainer
    .selectAll(`rect.${stackedBarsBaseClass}`)
    .data(allStackedBarsSegments)

  stackedBars
    .attr(directionToChange, stackedBarsOriginAtAxis)
    .attr('width', getStackedBarsInitialWidth)
    .attr('height', getStackedBarsInitialHeight)

  const newStackedBars = stackedBars
    .enter()
    .append('rect')
    .attr('class', getStackedBarsCssClasses)
    .attr(directionToChange, stackedBarsOriginAtAxis)
    .attr('width', getStackedBarsInitialWidth)
    .attr('height', getStackedBarsInitialHeight)

  const updatedStackedBars = stackedBars
  const allStackedBars = updatedStackedBars.merge(newStackedBars)

  allStackedBars
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('class', getStackedBarsCssClasses)
    .attr(directionToChange, getStackedBarsPositionAtAxis)
    .attr('width', getStackedBarsWidth)
    .attr('height', getStackedBarsHeight)

  setupTooltipEventListeners(allStackedBars, d3TipInstance, singleGroupOptions.tooltip)

  stackedBars
    .exit()
    .remove()

  function getStackedBarsPositionAtAxis (d, i) {
    const normalTranslation = isMainDimensionHorizontal
      ? axisForMainDimension.scale.axisScale(d.startValue)
      : axisForMainDimension.scale.axisScale(d.endValue)
    return normalTranslation
  }

  function getWidthNormalDimension (d, i) {
    return barsUtils.getItemSpanAtAxis(axisForNormalDimension, d, singleGroupOptions, {
      keyForWidth: 'width',
      keyForNaturalWidth: 'naturalWidth'
    })
  }

  function getStackedBarsWidth (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return Math.max(
          Math.abs(axisForMainDimension.scale.axisScale(d.endValue) - axisForMainDimension.scale.axisScale(d.startValue)),
          0
        )
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return getWidthNormalDimension(d, i)
      default:
        console.error(`GeoChartStackedBar [component] :: Invalid axis main dimension for getStackedBarsWidth: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getStackedBarsInitialWidth (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return getWidthNormalDimension(d, i)
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return 0
      default:
        console.error(`GeoChartStackedBars [component] :: Invalid axis main dimension for getStackedBarsHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getStackedBarsInitialHeight (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return getWidthNormalDimension(d, i)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return 0
      default:
        console.error(`GeoChartStackedBars [component] :: Invalid axis main dimension for getStackedBarsHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getStackedBarsHeight (d, i) {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return getWidthNormalDimension(d, i)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return Math.abs(axisForMainDimension.scale.axisScale(d.endValue) - axisForMainDimension.scale.axisScale(d.startValue))
      default:
        console.error(`GeoChartStackedBars [component] :: Invalid axis main dimension for getStackedBarsHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  function getStackedBarsCssClasses (d, i) {
    const defaultClasses = [
      stackedBarsBaseClass,
      `geo-chart-stacked-bars__segment--${i}`,
      `geo-chart-stacked-bars__segment--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, stackedBarsBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
