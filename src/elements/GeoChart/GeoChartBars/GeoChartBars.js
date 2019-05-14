/// <reference path="../GeoChart.d.ts" />

import _ from 'lodash'

import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as barsUtils from '../GeoChartUtils/barsUtils'
import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'

import '../GeoChartAxis/GeoChartAxis'
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
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Tooltip<SVGElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */
export function render (d3Instance, d3TipInstance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-bars-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-bars-group geo-chart-bars-group--${singleGroupOptions.id} geo-chart-bars-group--${singleGroupOptions.mainDimension}`
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
    renderSingleGroup(group, d3TipInstance, singleGroupOptions, globalOptions)
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
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleGroup (group, d3TipInstance, singleGroupOptions, globalOptions) {
  const getWidth = (d, i) => barsUtils.getItemSpanAtAxis(singleGroupOptions.axis.horizontal, d, singleGroupOptions, {
    keyForWidth: 'width',
    keyForNaturalWidth: 'naturalWidth'
  })
  const getHeight = (d, i) => barsUtils.getItemSpanAtAxis(singleGroupOptions.axis.vertical, d, singleGroupOptions, {
    keyForWidth: 'width',
    keyForNaturalWidth: 'naturalWidth'
  })

  const getNewItemInitialWidth = (d, i) => {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return 0
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return getWidth(d, i)
    }
  }
  const getNewItemInitialHeight = (d, i) => {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return getHeight(d, i)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return 0
    }
  }

  const getTranslation = barsUtils.getItemTranslationFactory(singleGroupOptions, {
    keyForWidth: 'width',
    keyForNaturalWidth: 'naturalWidth',
    componentName: 'Bars',
    getOriginPositionAtAxis (axisConfig) {
      return axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
    },
    getTranslationForNormalAxis: axisUtils.getTranslationForNormalAxisFactory(singleGroupOptions, {
      keyForNormalOffset: 'normalOffset',
      keyForNaturalNormalOffset: 'naturalNormalOffset'
    })
  })

  const singleBarBaseClass = 'geo-chart-bar'

  const bars = group
    .selectAll(`rect.${singleBarBaseClass}`)
    .data(singleGroupOptions.data)

  const newBars = bars
    .enter()
    .append('rect')
    .attr('class', getSingleBarCSSClasses)
    .attr('transform', getNewItemInitialTransform)
    .attr('width', getNewItemInitialWidth)
    .attr('height', getNewItemInitialHeight)

  newBars
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getTransform)
    .attr('width', getWidth)
    .attr('height', getHeight)

  const updatedBars = bars
  updatedBars
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('class', getSingleBarCSSClasses)
    .attr('transform', getTransform)
    .attr('width', getWidth)
    .attr('height', getHeight)

  const allBars = newBars.merge(updatedBars)

  setupTooltipEventListeners(allBars, d3TipInstance, singleGroupOptions.tooltip)

  bars
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getItemToBeRemovedFinalTransform)
    .attr('width', getNewItemInitialWidth)
    .attr('height', getNewItemInitialHeight)
    .remove()

  function getTransform (d, i) {
    const translation = getTranslation(d, i)
    return `translate(${translation.x}, ${translation.y})`
  }

  function getNewItemInitialTransform (d, i) {
    if (_.isNil(singleGroupOptions.axis.horizontal.scale.valueForOrigin)) {
      throw new Error(`GeoChart (bars) [component] :: Horizontal axis («${singleGroupOptions.axis.horizontal.id}») does not have a valueForOrigin set. In bar charts this is required to set the initial position of the items.`)
    }

    if (_.isNil(singleGroupOptions.axis.vertical.scale.valueForOrigin)) {
      throw new Error(`GeoChart (bars) [component] :: Vertical axis («${singleGroupOptions.axis.vertical.id}») does not have a valueForOrigin set. In bar charts this is required to set the initial position of the items.`)
    }

    const translationForItemAtOrigin = getTranslation({
      [singleGroupOptions.axis.horizontal.keyForValues]: singleGroupOptions.axis.horizontal.scale.valueForOrigin,
      [singleGroupOptions.axis.vertical.keyForValues]: singleGroupOptions.axis.vertical.scale.valueForOrigin
    }, i)
    const translation = getTranslation(d, i)

    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return `translate(${translationForItemAtOrigin.x}, ${translation.y})`
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return `translate(${translation.x}, ${translationForItemAtOrigin.y})`
    }
  }

  function getItemToBeRemovedFinalTransform (d, i) {
    const previousTransform = d3.select(this).attr('transform')
    const translationForItemAtOrigin = getTranslation({
      [singleGroupOptions.axis.horizontal.keyForValues]: singleGroupOptions.axis.horizontal.scale.valueForOrigin,
      [singleGroupOptions.axis.vertical.keyForValues]: singleGroupOptions.axis.vertical.scale.valueForOrigin
    }, i)

    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return previousTransform.replace(/(.*\s*translate\()[^,]*(,.*)/gi, `$1${translationForItemAtOrigin.x}$2`)
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return previousTransform.replace(/(.*\s*translate\([^,]*,)[^)]*(\).*)/gi, `$1${translationForItemAtOrigin.y}$2`)
    }
  }

  function getSingleBarCSSClasses (d, i) {
    const defaultClasses = [
      singleBarBaseClass,
      `geo-chart-bar--${i}`,
      `geo-chart-bar--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, singleBarBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
