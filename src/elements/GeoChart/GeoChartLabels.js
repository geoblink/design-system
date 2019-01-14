/// <reference types="d3" />

import { EMPTY_MARGIN } from './GeoChartSizing'

import _ from 'lodash'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * @callback AddLabelGroupFunction
 * @param {GeoChart.LabelGroupConfig<HorizontalDomain, VerticalDomain>} options
 */

/**
 * @param {d3.Selection<any, any, null, undefined>} d3Instance
 * @returns {AddLabelGroupFunction}
 */
export function groupFactory (d3Instance) {
  const rootGroups = {}

  return function (options) {
    const getTranslation = getSingleItemTranslationFactory(options)
    const rootGroup = rootGroups[options.id] || d3Instance
      .append('g')
      .attr('class', `geo-chart-labels-group-container geo-chart-labels-group-container--${options.id}`)
    rootGroups[options.id] = rootGroup

    const singleDataGroups = rootGroup
      .selectAll('g.geo-chart-labels-group')
      .data(options.data)

    const newSingleDataGroups = singleDataGroups
      .enter()
      .append('g')
      .attr('class', (d, i) => `geo-chart-labels-group geo-chart-label-group--${i}`)
    const updatedSingleDataGroups = singleDataGroups
      .selectAll('g.geo-chart-labels-group')
    const allSingleDataGroups = newSingleDataGroups
      .merge(updatedSingleDataGroups)

    const singleLabelGroupsBaseClass = 'geo-chart-labels-group__single-label'
    const singleLabelGroups = newSingleDataGroups
      .selectAll(`g.${singleLabelGroupsBaseClass}`)
      .data(d => d.labels)

    const newSingleLabelGroups = singleLabelGroups
      .enter()
      .append('g')
      .attr('class', getSingleLabelGroupCSSClasses)
    const updatedSingleLabelGroups = singleLabelGroups
      .selectAll(`g.${singleLabelGroupsBaseClass}`)
    const allSingleLabelGroups = newSingleLabelGroups
      .merge(updatedSingleLabelGroups)
      .attr('class', getSingleLabelGroupCSSClasses)

    singleLabelGroups
      .exit()
      .remove()

    const newRects = newSingleLabelGroups
      .append('rect')
      .attr('rx', d => d.cornerRadius)
      .attr('ry', d => d.cornerRadius)
    const updatedRects = updatedSingleLabelGroups
      .selectAll('rect')
    const allRects = newRects
      .merge(updatedRects)

    allRects
      .attr('rx', d => d.cornerRadius)
      .attr('ry', d => d.cornerRadius)

    const newTexts = newSingleLabelGroups
      .append('text')
      .attr('dominant-baseline', 'hanging')
    const updatedTexts = updatedSingleLabelGroups
      .selectAll('text')
    const allTexts = newTexts
      .merge(updatedTexts)

    allTexts
      .text(d => d.text)

    applyPositioningAttributes(allSingleLabelGroups)

    allSingleDataGroups
      .transition()
      .duration(options.chart.animationsDurationInMilliseconds)
      .attr('transform', getTransform)

    singleDataGroups
      .exit()
      .remove()

    function getTransform (d, i) {
      const height = d3.select(this).node().getBBox().height
      const translation = getTranslation(d, height)
      return `translate(${translation.x}, ${translation.y})`
    }

    function getSingleLabelGroupCSSClasses (d, i) {
      const defaultClasses = [singleLabelGroupsBaseClass]

      if (d.cssClasses) {
        const customClasses = d.cssClasses(defaultClasses)
        return _.uniq([...customClasses, singleLabelGroupsBaseClass]).join(' ')
      }

      return defaultClasses.join(' ')
    }
  }
}

/**
 * @callback GetTranslationFunction
 * @param {object} singleItem
 * @param {number} height
 */

/**
 * @param {GeoChart.BarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @returns {GetTranslationFunction}
 */
function getSingleItemTranslationFactory (options) {
  return function (singleItem, height) {
    const verticalAxis = options.axis.vertical
    const verticalAxisTranslationToTopPosition = getAxisScaledValue(verticalAxis, singleItem)
    const verticalAxisSpan = getAxisScaledSpan(verticalAxis, singleItem)
    const verticalAxisTranslation = verticalAxisTranslationToTopPosition + (verticalAxisSpan - height) / 2

    return {
      x: 0,
      y: verticalAxisTranslation
    }
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
function getAxisScaledValue (axisConfig, singleItem) {
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
function getAxisScaledSpan (axisConfig, singleItem) {
  if (axisConfig.scale.axisScale.bandwidth) return axisConfig.scale.axisScale.bandwidth()

  const positionAtOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = getAxisScaledValue(axisConfig, singleItem)

  return Math.abs(positionAtValue - positionAtOrigin)
}

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
 * @param {d3.Selection<any, any, null, undefined>} allSingleLabelGroups
 */
function applyPositioningAttributes (allSingleLabelGroups) {
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
      .attr('transform', `translate(${margin.left + padding.left}, ${padding.top})`)
    d3RectSelection
      .attr('width', widthWithPadding)
      .attr('height', heightWithPadding)
      .attr('x', margin.left)
      .attr('y', margin.top)
    group
      .attr('width', widthWithPaddingAndMargin)
      .attr('height', heightWithPaddingAndMargin)
      .attr('transform', `translate(${xTranslation}, ${yTranslation})`)
  })
}

/**
 * @param {d3.Selection<any, any, null, undefined>} allRectAndTextGroups
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
