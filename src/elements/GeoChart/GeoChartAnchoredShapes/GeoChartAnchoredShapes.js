/// <reference path="../GeoChart.d.ts" />

import _ from 'lodash'

import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'
import * as numericUtils from '../GeoChartUtils/numericUtils'
import * as textUtils from '../GeoChartUtils/textUtils'

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
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {Object} d
 * @param {number} i
 * @param {Object} params
 * @param {GeoChart.Size} params.size
 * @param {number} params.shapeOffsetFromAxis
 * @param {GeoChart.SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain>} params.singleGroupOptions
 */
export const getTriangleShapePath = (d, i, { size, shapeOffsetFromAxis, singleGroupOptions }) => {
  const shapeAnchorPosition = singleGroupOptions.getAnchorPosition(d, i)
  const { width, height } = size
  const sign = shapeAnchorPosition === dimensionUtils.ANCHOR_POSITIONS_1D.leading ? -1 : 1
  return [
    `${width / 2} ${sign * (height + shapeOffsetFromAxis)}`,
    `-${width / 2} ${sign * (height + shapeOffsetFromAxis)}`,
    `0 ${sign * shapeOffsetFromAxis}`
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
 * @param {Array<GeoChart.SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-anchored-shapes-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-anchored-shapes-group geo-chart-anchored-shapes-group--${singleGroupOptions.id} geo-chart-anchored-shapes-group--${singleGroupOptions.mainDimension}`
    )

  const updatedGroups = groups
  const allGroups = newGroups.merge(updatedGroups)

  groups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

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
 * @param {GeoChart.SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions) {
  const axisForNormalDimension = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForMainDimension = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  const shapeTextGroup = group
    .selectAll('g.geo-chart-anchored-shapes-group__shape-text-element')
    .data(singleGroupOptions.data, singleGroupOptions.trackByKey)

  const newShapeTextGroup = shapeTextGroup
    .enter()
    .append('g')
    .attr('class', (d, i) => {
      const anchorPosition = singleGroupOptions.getAnchorPosition(d, i)
      return `geo-chart-anchored-shapes-group__shape-text-element geo-chart-anchored-shapes-group__shape-text-element--${i} geo-chart-anchored-shapes-group__shape-text-element--${anchorPosition}`
    })

  const updatedShapeTextGroup = shapeTextGroup
  const allShapeTextGroup = newShapeTextGroup.merge(updatedShapeTextGroup)

  renderAnchoredShapes(newShapeTextGroup, allShapeTextGroup, singleGroupOptions, globalOptions, {
    axisForMainDimension,
    axisForNormalDimension
  })

  renderAnchoredTexts(newShapeTextGroup, allShapeTextGroup, singleGroupOptions, globalOptions, {
    axisForMainDimension,
    axisForNormalDimension
  })

  shapeTextGroup
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()
}

/**
 * @template GElement
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @template MainDimensionDomain
 * @template NormalDimensionDomain
 * @param {d3.Selection<GElement, Object, PElement, PDatum>} newAnchoredShapesContainer
 * @param {d3.Selection<GElement, Object, PElement, PDatum>} allAnchoredShapesContainer
 * @param {GeoChart.SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {Object} params
 * @param {GeoChart.AxisConfig<MainDimensionDomain, any>} params.axisForMainDimension
 * @param {GeoChart.AxisConfig<NormalDimensionDomain, any>} params.axisForNormalDimension
 */
function renderAnchoredShapes (newAnchoredShapesContainer, allAnchoredShapesContainer, singleGroupOptions, globalOptions, {
  axisForMainDimension,
  axisForNormalDimension
}) {
  if (singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.vertical) {
    // TODO: Add vertical behaviour to position text labels
    throw new Error('GeoChart (Anchored Shapes) [component] :: Anchored shapes are not supported for vertical main dimensions. If you want to display labels together with shapes, set main dimension to «horizontal» in your chart config.')
  }
  const anchoredShapesBaseClass = 'geo-chart-anchored-shapes__shape-element'
  const shapeOffsetFromAxis = getTranslationOffsetForNormalAxis(axisForNormalDimension, singleGroupOptions, globalOptions, {
    keyForNormalOffset: 'normalOffset',
    keyForNaturalNormalOffset: 'naturalNormalOffset'
  })

  newAnchoredShapesContainer
    .append('polygon')
    .attr('class', getAnchoredShapesStopsCssClasses)
    .attr('points', (d, i) => {
      const size = singleGroupOptions.getShapeSize(d, i)
      return singleGroupOptions.getShapePath(d, i, {
        size, shapeOffsetFromAxis, singleGroupOptions
      })
    })
    .attr('transform', getAnchoredShapesInitialTransform)

  allAnchoredShapesContainer
    .select(`polygon.${anchoredShapesBaseClass}`)
    .attr('class', getAnchoredShapesStopsCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('points', (d, i) => {
      const size = singleGroupOptions.getShapeSize(d, i)
      return singleGroupOptions.getShapePath(d, i, {
        size, shapeOffsetFromAxis, singleGroupOptions
      })
    })
    .attr('transform', getAnchoredShapesTransform)

  function getAnchoredShapesTransform (d, i) {
    const dimensionTranslation = axisForMainDimension.scale.axisScale(d[axisForMainDimension.keyForValues])
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const translationForDimension = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: {
        x: dimensionTranslation,
        y: normalDimensionTranslation
      },
      [dimensionUtils.DIMENSIONS_2D.vertical]: {
        x: normalDimensionTranslation,
        y: dimensionTranslation
      }
    }
    const translation = translationForDimension[singleGroupOptions.mainDimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getAnchoredShapesInitialTransform (d, i) {
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const translationForDimension = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: {
        x: 0,
        y: normalDimensionTranslation
      },
      [dimensionUtils.DIMENSIONS_2D.vertical]: {
        x: normalDimensionTranslation,
        y: 0
      }
    }
    const translation = translationForDimension[singleGroupOptions.mainDimension]
    return `translate(${translation.x}, ${translation.y})`
  }

  function getAnchoredShapesStopsCssClasses (d, i) {
    const defaultClasses = [
      anchoredShapesBaseClass,
      `geo-chart-anchored-shapes__shape-element--${i}`,
      `geo-chart-anchored-shapes__shape-element--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, anchoredShapesBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

/**
 * @template GElement
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @template MainDimensionDomain
 * @template NormalDimensionDomain
 * @param {d3.Selection<GElement, Object, PElement, PDatum>} newAnchoredShapesContainer
 * @param {d3.Selection<GElement, Object, PElement, PDatum>} allAnchoredShapesContainer
 * @param {GeoChart.SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {Object} params
 * @param {GeoChart.AxisConfig<MainDimensionDomain, any>} params.axisForMainDimension
 * @param {GeoChart.AxisConfig<NormalDimensionDomain, any>} params.axisForNormalDimension
 */
function renderAnchoredTexts (newAnchoredShapesContainer, allAnchoredShapesContainer, singleGroupOptions, globalOptions, {
  axisForMainDimension,
  axisForNormalDimension
}) {
  if (!_.isFunction(_.get(singleGroupOptions, 'text.content'))) return
  if (singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.vertical) {
    // TODO: Add vertical behaviour to position text labels
    throw new Error('GeoChart (Anchored Shapes) [component] :: Anchored texts are not supported for vertical dimensions. If you want to display labels together with shapes, set dimension to «Horizontal» in your chart config.')
  }
  const anchoredTextsBaseClass = 'geo-chart-anchored-shapes__text-element'
  const shapeOffsetFromAxis = getTranslationOffsetForNormalAxis(axisForNormalDimension, singleGroupOptions, globalOptions, {
    keyForNormalOffset: 'normalOffset',
    keyForNaturalNormalOffset: 'naturalNormalOffset'
  })

  const newAnchoredTexts = newAnchoredShapesContainer
    .append('text')
    .attr('class', getAnchoredTextsStopsCssClasses)
    .attr('dominant-baseline', 'central')
    .attr('transform', getRankingLineInitialTransform)
    .attr('opacity', 0)
  const updatedAnchoredTexts = allAnchoredShapesContainer
    .select(`text.${anchoredTextsBaseClass}`)
  const allAnchoredTexts = newAnchoredTexts
    .merge(updatedAnchoredTexts)

  textUtils.setTextContent(allAnchoredTexts, singleGroupOptions.text, globalOptions)

  allAnchoredTexts
    .attr('class', getAnchoredTextsStopsCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getRankingLineTransform)
    .attr('opacity', 1)

  function getRankingLineInitialTransform (d, i) {
    const trailingDimensionTranslation = getTrailingDimensionTranslation(d, i)
    const translation = {
      x: 0,
      y: trailingDimensionTranslation
    }
    return `translate(${translation.x}, ${translation.y})`
  }

  // This algorithm is tightly coupled to the app case in which we're always going to have
  // two shapes with text up (one on 0 and the other on the max value) and another
  // shape below with another text element
  // TODO: Find a more abstract algorithm so we can position N shapes with their respectives text elements.
  function getRankingLineTransform (d, i) {
    const { width } = this.getBBox()
    const leadingDimensionTranslation = getLeadingDimensionTranslation(d, i, width)
    const trailingDimensionTranslation = getTrailingDimensionTranslation(d, i)
    const translation = {
      x: leadingDimensionTranslation,
      y: trailingDimensionTranslation
    }
    return `translate(${translation.x}, ${translation.y})`
  }

  function getTrailingDimensionTranslation (d, i) {
    let trailingDimensionTranslation
    const normalDimensionTranslation = axisForNormalDimension.scale.axisScale(singleGroupOptions.normalValue)
    const shapeAnchorPosition = singleGroupOptions.getAnchorPosition(d, i)
    const shapeSize = singleGroupOptions.getShapeSize(d, i)
    if (shapeAnchorPosition === dimensionUtils.ANCHOR_POSITIONS_1D.leading) {
      trailingDimensionTranslation = normalDimensionTranslation - (shapeOffsetFromAxis + shapeSize.height * 2)
    } else {
      trailingDimensionTranslation = normalDimensionTranslation + (shapeOffsetFromAxis + shapeSize.height / 2)
    }
    return trailingDimensionTranslation
  }

  function getLeadingDimensionTranslation (d, i, width) {
    let leadingDimensionTranslation
    const chartInnerWidth = globalOptions.chart.size.width - globalOptions.chart.margin.left - globalOptions.chart.margin.right
    const dimensionTranslation = axisForMainDimension.scale.axisScale(d[axisForMainDimension.keyForValues])
    const isLabelTooLong = dimensionTranslation + width > chartInnerWidth
    const labelOffset = isLabelTooLong ? width : 0
    const hSign = isLabelTooLong ? 1 : -1
    const shapeAnchorPosition = singleGroupOptions.getAnchorPosition(d, i)
    const shapeSize = singleGroupOptions.getShapeSize(d, i)
    if (shapeAnchorPosition === dimensionUtils.ANCHOR_POSITIONS_1D.leading) {
      leadingDimensionTranslation = dimensionTranslation - labelOffset + hSign * shapeSize.width
    } else {
      leadingDimensionTranslation = dimensionTranslation - labelOffset - hSign * shapeSize.width
    }
    return leadingDimensionTranslation
  }

  function getAnchoredTextsStopsCssClasses (d, i) {
    const defaultClasses = [
      anchoredTextsBaseClass,
      `geo-chart-anchored-shapes__text-element--${i}`,
      `geo-chart-anchored-shapes__text-element--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, anchoredTextsBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

/**
 * @template Domain
 * @template RelativeScaleDomain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.AxisConfig<Domain, RelativeScaleDomain>} normalAxis
 * @param {GeoChart.SingleAnchoredShapesGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 * @param {Object} params
 * @param {string} params.keyForNormalOffset
 * @param {string} params.keyForNaturalNormalOffset
 */
function getTranslationOffsetForNormalAxis (normalAxis, options, globalOptions, {
  keyForNormalOffset,
  keyForNaturalNormalOffset
}) {
  const isNormalOffsetForced = numericUtils.isNumberForced(options, keyForNormalOffset)
  const isNaturalNormalOffsetForced = numericUtils.isNumberForced(options, keyForNaturalNormalOffset)

  if (isNormalOffsetForced) {
    return options[keyForNormalOffset]
  }

  if (isNaturalNormalOffsetForced) {
    return normalAxis.scale.axisScale(options[keyForNaturalNormalOffset]) - globalOptions.chart.margin.top
  }

  return 0
}
