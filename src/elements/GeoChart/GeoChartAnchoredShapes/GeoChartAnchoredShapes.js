/// <reference types="d3" />

import _ from 'lodash'

import '../GeoChartAxis/GeoChartAxis'
import {
  isDimensionAxis,
  getItemSpanAtAxis
} from '../GeoChartUtils/barsUtils'

import { setTextContent } from '../GeoChartUtils/textUtils'

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
 * @enum {GeoChart.AnchorPositions}
 */
export const ANCHOR_POSITIONS = {
  leading: 'leading',
  trailing: 'trailing'
}

export const getTriangleShapePath = (d, i, { size, shapeOffsetFromAxis, singleGroupOptions }) => {
  const shapeAnchorPosition = singleGroupOptions.getAnchorPosition(d, i)
  const { width, height } = size
  const sign = shapeAnchorPosition === ANCHOR_POSITIONS.leading ? -1 : 1
  return [
    (width / 2) + ' ' + sign * (height + shapeOffsetFromAxis),
    -(width / 2) + ' ' + sign * (height + shapeOffsetFromAxis),
    '0 ' + sign * shapeOffsetFromAxis
  ]
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.singleAnchoredShapesGroupsConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.AnchoredShapesGroupsGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-anchored-shapes-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-anchored-shapes-group geo-chart-anchored-shapes-group--${singleGroupOptions.id} geo-chart-anchored-shapes-group--${singleGroupOptions.dimension}`
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
 * @param {GeoChart.singleAnchoredShapesGroupsConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.AnchoredShapesGroupsGlobalConfig} globalOptions
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions) {
  const axisForNormalDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  const shapeOffsetFromAxis = getItemSpanAtAxis(axisForNormalDimension, null, singleGroupOptions, {
    keyForWidth: 'normalOffset',
    keyForNaturalWidth: 'naturalNormalOffset'
  })

  renderAnchoredShapes(group, singleGroupOptions, globalOptions, {
    axisForDimension,
    axisForNormalDimension,
    shapeOffsetFromAxis
  })

  renderAnchoredTexts(group, singleGroupOptions, globalOptions, {
    axisForDimension,
    axisForNormalDimension,
    shapeOffsetFromAxis
  })
}

function renderAnchoredShapes (anchoredShapesContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension,
  shapeOffsetFromAxis
}) {
  const anchoredShapesBaseClass = 'geo-chart-anchored-shapes__shape-element'
  const anchoredShapes = anchoredShapesContainer
    .selectAll(`polygon.${anchoredShapesBaseClass}`)
    .data(singleGroupOptions.shapeData)

  const newAnchoredShapes = anchoredShapes
    .enter()
    .append('polygon')
    .attr('class', getAnchoredShapesStopsCssClasses)
    .attr('points', (d, i) => {
      const size = singleGroupOptions.getShapeSize()
      return singleGroupOptions.getShapePath(d, i, {
        size, shapeOffsetFromAxis, singleGroupOptions
      })
    })
    .attr('transform', getAnchoredShapesInitialTransform)

  const updatedAnchoredShapesStops = anchoredShapes
  const allAnchoredShapesStops = updatedAnchoredShapesStops.merge(newAnchoredShapes)

  allAnchoredShapesStops
    .attr('class', getAnchoredShapesStopsCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('points', (d, i) => {
      const size = singleGroupOptions.getShapeSize()
      return singleGroupOptions.getShapePath(d, i, {
        size, shapeOffsetFromAxis, singleGroupOptions
      })
    })
    .attr('transform', getAnchoredShapesTransform)

  anchoredShapes
    .exit()
    .remove()

  function getAnchoredShapesTransform (d, i) {
    const dimensionTranslation = axisForDimension.scale.axisScale(d[axisForDimension.keyForValues])
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const translationForDimension = {
      [DIMENSIONS.horizontal]: {
        x: dimensionTranslation,
        y: normalDimensionTranslation
      },
      [DIMENSIONS.vertical]: {
        x: normalDimensionTranslation,
        y: dimensionTranslation
      }
    }
    const translation = translationForDimension[singleGroupOptions.dimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getAnchoredShapesInitialTransform (d, i) {
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
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

  function getAnchoredShapesStopsCssClasses (d, i) {
    const defaultClasses = [
      anchoredShapesBaseClass,
      `geo-chart-anchored-shapes__shape-element--${i}`,
      `geo-chart-anchored-shapes__shape-element--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, anchoredShapesBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

function renderAnchoredTexts (anchoredShapesContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension,
  shapeOffsetFromAxis
}) {
  if (!_.isFunction(_.get(singleGroupOptions, 'text.content'))) return
  if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
    // TODO: Add vertical behaviour to position text labels
    throw new Error(`GeoChart (Anchored Shapes) [component] :: Anchored texts are not supported for vertical dimensions. If you want to display labels together with shapes, set dimension to «Horizontal» in your chart config.`)
  }
  const anchoredTextsBaseClass = 'geo-chart-anchored-shapes__text-element'
  const anchoredTexts = anchoredShapesContainer
    .selectAll(`text.${anchoredTextsBaseClass}`)
    .data(singleGroupOptions.shapeData)

  const newAnchoredTexts = anchoredTexts
    .enter()
    .append('text')
    .attr('class', getAnchoredTextsStopsCssClasses)
    .attr('dominant-baseline', 'central')
    .attr('opacity', 0)

  const updatedAnchoredTexts = anchoredTexts
  const allAnchoredTexts = updatedAnchoredTexts.merge(newAnchoredTexts)
  setTextContent(allAnchoredTexts, singleGroupOptions.text)

  allAnchoredTexts
    .attr('class', getAnchoredTextsStopsCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getRankingLineTransform)
    .attr('opacity', 1)

  anchoredTexts
    .exit()
    .remove()

  // This algorithm is tightly coupled to the app case in which we're always going to have
  // two shapes with text up (one on 0 and the other on the max value) and another
  // shape below with another text element
  // TODO: Find a more abstract algorithm so we can position N shapes with their respectives text elements.
  function getRankingLineTransform (d, i) {
    let leadingDimensionTranslation, trailingDimensionTranslation
    const { width } = this.getBBox()
    const chartInnerWidth = globalOptions.chart.size.width - globalOptions.chart.margin.left - globalOptions.chart.margin.right
    const dimensionTranslation = axisForDimension.scale.axisScale(d[axisForDimension.keyForValues])
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const isLabelTooLong = dimensionTranslation + width > chartInnerWidth
    const labelOffset = isLabelTooLong ? width : 0
    const hSign = isLabelTooLong ? 1 : -1
    const shapeAnchorPosition = singleGroupOptions.getAnchorPosition(d, i)
    const shapeSize = singleGroupOptions.getShapeSize()

    if (shapeAnchorPosition === ANCHOR_POSITIONS.leading) {
      leadingDimensionTranslation = dimensionTranslation - labelOffset + hSign * shapeSize.width
      trailingDimensionTranslation = normalDimensionTranslation - (shapeOffsetFromAxis + shapeSize.height * 2)
    } else {
      leadingDimensionTranslation = dimensionTranslation - labelOffset - hSign * shapeSize.width
      trailingDimensionTranslation = normalDimensionTranslation + (shapeOffsetFromAxis + shapeSize.height / 2)
    }

    const translation = {
      x: leadingDimensionTranslation,
      y: trailingDimensionTranslation
    }
    return `translate(${translation.x}, ${translation.y})`
  }

  function getAnchoredTextsStopsCssClasses (d, i) {
    const defaultClasses = [
      anchoredTextsBaseClass,
      `geo-chart-anchored-shapes__text-element--${i}`,
      `geo-chart-anchored-shapes__text-element--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, anchoredTextsBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
