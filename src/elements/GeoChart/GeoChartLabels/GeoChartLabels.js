/// <reference types="d3" />

import { EMPTY_MARGIN } from '../GeoChartUtils/GeoChartSizing'

import _ from 'lodash'
import { DIMENSIONS } from '../constants'

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
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.LabelGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-labels-group-container')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-labels-group-container geo-chart-labels-group-container--${singleGroupOptions.id}`
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
    renderSingleGroup(group, singleGroupOptions, globalOptions, i)
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
 * @param {GeoChart.LabelGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions, indexOfGroup) {
  const singleDataGroups = group
    .selectAll('g.geo-chart-labels-group')
    .data(singleGroupOptions.data)

  const newSingleDataGroups = singleDataGroups
    .enter()
    .append('g')
    .style('opacity', 0)
    .attr('class', (d, i) => `geo-chart-labels-group geo-chart-label-group--${i}`)

  singleDataGroups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  const updatedSingleDataGroups = singleDataGroups
  const allSingleDataGroups = newSingleDataGroups
    .merge(updatedSingleDataGroups)
  allSingleDataGroups.each(function () {
    const labelsGroup = d3.select(this)
    renderSingleLabelLine(labelsGroup, globalOptions)
  })

  allSingleDataGroups
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 1)
    .attr('transform', getTransform)
    .selectAll('text')
    .attr('fill', d => _.get(d, 'color', 'black'))

  // allSingleDataGroups
  // .transition()
  // .duration(globalOptions.chart.animationsDurationInMilliseconds)
  // .attr('transform', ()=>{singleGroupOptions.mainDimension===DIMENSIONS.DIMENSIONS_2D.horizontal?`translate`)
  function getTransform (d, i) {
    const height = d3.select(this).node().getBBox().height
    const width = d3.select(this).node().getBBox().width
    const translation = getTranslation(singleGroupOptions, d, height, width, globalOptions)
    return `translate(${translation.x}, ${translation.y})`
  }
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, GeoChart.SingleLabelLineConfig, PElement, PDatum>} group
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleLabelLine (group, globalOptions) {
  const singleLabelGroupsBaseClass = 'geo-chart-labels-group__single-label'

  const singleLabelGroups = group
    .selectAll(`g.${singleLabelGroupsBaseClass}`)
    .data(d => d.labels)

  const newSingleLabelGroups = singleLabelGroups
    .enter()
    .append('g')
    .attr('class', getSingleLabelGroupCSSClasses)

  singleLabelGroups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  const updatedSingleLabelGroups = singleLabelGroups
  const allSingleLabelGroups = newSingleLabelGroups
    .merge(updatedSingleLabelGroups)
    .attr('class', getSingleLabelGroupCSSClasses)

  const newRects = newSingleLabelGroups
    .append('rect')
  /** @type {unknown} */
  const updatedRects = updatedSingleLabelGroups
    .selectAll('rect')
  const allRects = newRects
    .merge((/** @type {d3.Selection<SVGRectElement, GeoChart.SingleLabelConfig, GElement, GeoChart.SingleLabelLineConfig>} */ (updatedRects)))

  allRects
    .attr('rx', d => d.cornerRadius)
    .attr('ry', d => d.cornerRadius)

  const newTexts = newSingleLabelGroups
    .append('text')
    .attr('dominant-baseline', 'hanging')
  /** @type {unknown} */
  const updatedTexts = updatedSingleLabelGroups
    .selectAll('text')
  const allTexts = newTexts
    .merge((/** @type {d3.Selection<SVGTextElement, GeoChart.SingleLabelConfig, GElement, GeoChart.SingleLabelLineConfig>} */(updatedTexts)))

  allTexts
    .text(d => d.text)

  applyPositioningAttributes(allSingleLabelGroups, globalOptions)

  function getSingleLabelGroupCSSClasses (d, i) {
    const defaultClasses = [singleLabelGroupsBaseClass, 'rect-fill-none']
    if (d.cssClasses) {
      const customClasses = d.cssClasses(defaultClasses)
      return _.uniq([...customClasses, singleLabelGroupsBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.LabelGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {object} singleItem
 * @param {number} height
 * @returns {{x: number, y: number}}
 */
function getTranslation (singleGroupOptions, singleItem, height, width, globalOptions) {
  const chartWidth = globalOptions.chart.size.width
  const verticalAxis = singleGroupOptions.axis.vertical
  const verticalAxisTranslationToTopPosition = getItemValueAtAxis(verticalAxis, singleItem)
  const verticalAxisSpan = getItemSpanAtAxis(verticalAxis, singleItem)
  let verticalAxisTranslation = verticalAxisTranslationToTopPosition + (verticalAxisSpan - height) / 2
  let horizontalAxisTranslation = 0
  if (singleGroupOptions.axis.horizontal) {
    const horizontalAxis = singleGroupOptions.axis.horizontal
    const horizontalAxisTranslationToTopPosition = getItemValueAtAxis(horizontalAxis, singleItem)
    const horizontalAxisSpan = getItemSpanAtAxis(horizontalAxis, singleItem)
    if (singleGroupOptions.mainDimension === DIMENSIONS.DIMENSIONS_2D.vertical) {
      horizontalAxisTranslation = horizontalAxisTranslationToTopPosition + (horizontalAxisSpan - width) / 2
      verticalAxisTranslation = verticalAxisTranslationToTopPosition - _.first(singleItem.labels).margin.top
      if (verticalAxisTranslation < 0) {
        verticalAxisTranslation = 0
        _.forEach(singleItem.labels, (label) => { label.color = 'white' })
      }
    } else {
      let horizontalOffset
      if (horizontalAxisTranslationToTopPosition + width >= chartWidth) {
        horizontalOffset = width + _.get(_.first(singleItem.labels).padding, 'right', 0)
        _.forEach(singleItem.labels, (label) => { label.color = 'white' })
      } else {
        horizontalOffset = 0
      }
      const verticalOffset = _.parseInt(singleGroupOptions.id) > 0
        ? _.get(singleGroupOptions, 'naturalOffset', 0)
        : 0 - _.get(singleGroupOptions, 'naturalOffset', 0)
      verticalAxisTranslation = verticalAxisTranslation + verticalOffset - _.get(_.first(singleItem.labels), ['padding', 'bottom'], 0)
      horizontalAxisTranslation = horizontalAxisTranslationToTopPosition - horizontalOffset
    }
  }

  return {
    x: horizontalAxisTranslation,
    y: verticalAxisTranslation
  }
}

/**
 * Returns the position of given value in given axis.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {number}
 */
function getItemValueAtAxis (axisConfig, singleItem) {
  const rawValue = singleItem[axisConfig.keyForValues]
  return axisConfig.scale.axisScale(rawValue)
}

/**
 * Returns the span (width or height) of given value in given axis.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {number}
 */
function getItemSpanAtAxis (axisConfig, singleItem) {
  if (axisConfig.scale.axisScale.bandwidth) return axisConfig.scale.axisScale.bandwidth()

  const positionAtOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = getItemValueAtAxis(axisConfig, singleItem)

  return Math.abs(positionAtValue - positionAtOrigin)
}

/**
 * @typedef {GeoChart.Margin} PaddingOrMargin
 */

/**
 * @typedef {object} PositioningAttributes
 * @property {number} xTranslation
 * @property {PaddingOrMargin} padding
 * @property {PaddingOrMargin} margin
 * @property {number} requiredHeightForText
 * @property {number} requiredWidthForText
 * @property {number} heightWithPadding
 * @property {number} heightWithPaddingAndMargin
 * @property {number} widthWithPadding
 * @property {number} widthWithPaddingAndMargin
 */

/**
 * @template GElement
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, GeoChart.SingleLabelConfig, PElement, PDatum>} allSingleLabelGroups
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function applyPositioningAttributes (allSingleLabelGroups, globalOptions) {
  const positioningAttributes = getPositioningAttributes(allSingleLabelGroups)

  const tallestGroupHeight = _.max(_.map(positioningAttributes, 'heightWithPaddingAndMargin'))

  allSingleLabelGroups.each(function () {
    const group = d3.select(this)
    const d3TextSelection = group.select('text')
    const d3RectSelection = group.select('rect')

    const {
      xTranslation,
      padding,
      margin,
      heightWithPadding,
      heightWithPaddingAndMargin,
      widthWithPadding,
      widthWithPaddingAndMargin
    } = positioningAttributes.shift()

    const yTranslation = (tallestGroupHeight - heightWithPaddingAndMargin) / 2

    d3TextSelection
      .transition()
      .duration(globalOptions.chart.animationsDurationInMilliseconds)
      .attr('transform', `translate(${margin.left + padding.left}, ${padding.top})`)
    d3RectSelection
      .transition()
      .duration(globalOptions.chart.animationsDurationInMilliseconds)
      .attr('width', widthWithPadding)
      .attr('height', heightWithPadding)
      .attr('x', margin.left)
      .attr('y', margin.top)
    group
      .transition()
      .duration(globalOptions.chart.animationsDurationInMilliseconds)
      .attr('width', widthWithPaddingAndMargin)
      .attr('height', heightWithPaddingAndMargin)
      .attr('transform', `translate(${xTranslation}, ${yTranslation})`)
  })
}

/**
 * @template GElement
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, GeoChart.SingleLabelConfig, PElement, PDatum>} allRectAndTextGroups
 * @returns {PositioningAttributes[]}
 */
function getPositioningAttributes (allRectAndTextGroups) {
  /** @type {PositioningAttributes[]} */
  const positioningAttributesOfGroup = []

  allRectAndTextGroups.each(function (d, i) {
    // Beware, this is being called with repeated values of `i` because we are
    // working with nested collections. This means that we can't assume that the
    // values of `i` are unique so we have to treat each call to this function
    // as unique and not rely on `i` for indexing the call. We can rely on that
    // this function is going to be called in order, so if `i` decreases we know
    // that we entered in a new item of the parent collection.

    const group = d3.select(this)
    const d3TextSelection = group.select('text')

    const d3TextNode = d3TextSelection.node()

    const requiredHeightForText = d3TextNode.getBBox().height
    const requiredWidthForText = d3TextNode.getComputedTextLength()
    const padding = d.padding || EMPTY_MARGIN
    const margin = d.margin || EMPTY_MARGIN

    const widthWithPadding = padding.left + requiredWidthForText + padding.right
    const heightWithPadding = padding.top + requiredHeightForText + padding.bottom
    const widthWithPaddingAndMargin = margin.left + widthWithPadding + margin.right
    const heightWithPaddingAndMargin = margin.top + heightWithPadding + margin.bottom
    const previousGroupPositioningAttributes = i > 0 // If this is not the first label of a group...
      ? _.last(positioningAttributesOfGroup) // ... then we are interested in position of the previous label of this group
      : { // ... otherwise we default to 0
        xTranslation: 0,
        widthWithPaddingAndMargin: 0
      }

    const xTranslation = (
      previousGroupPositioningAttributes.xTranslation +
      previousGroupPositioningAttributes.widthWithPaddingAndMargin
    )

    positioningAttributesOfGroup.push({
      xTranslation,
      padding,
      margin,
      requiredHeightForText,
      requiredWidthForText,
      heightWithPadding,
      heightWithPaddingAndMargin,
      widthWithPadding,
      widthWithPaddingAndMargin
    })
  })

  return positioningAttributesOfGroup
}
