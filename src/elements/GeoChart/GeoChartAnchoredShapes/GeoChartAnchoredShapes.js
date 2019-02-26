/// <reference types="d3" />

import _ from 'lodash'

import '../GeoChartAxis/GeoChartAxis'
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

export const getTriangleShapePath = (d, i, size, singleGroupOptions) => {
  const shapeAnchorPosition = singleGroupOptions.getAnchorPosition(d, i)
  const { width, height } = size
  const sign = shapeAnchorPosition === ANCHOR_POSITIONS.leading ? -1 : 1
  return [
    (width / 2) + ' ' + sign * height,
    -(width / 2) + ' ' + sign * height,
    '0 ' + sign
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

  renderAnchoredShapes(group, singleGroupOptions, globalOptions, {
    axisForDimension,
    axisForNormalDimension
  })
}

function renderAnchoredShapes (anchoredShapesContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension
}) {
  const anchoredShapesBaseClass = 'geo-chart-anchored-shapes__segment-stop'
  const anchoredShapes = anchoredShapesContainer
    .selectAll(`polygon.${anchoredShapesBaseClass}`)
    .data(singleGroupOptions.shapeData)

  const newAnchoredShapes = anchoredShapes
    .enter()
    .append('polygon')
    .attr('class', getAnchoredShapesStopsCssClasses)
    .attr('points', (d, i) => {
      const shapeSize = singleGroupOptions.getShapeSize()
      return singleGroupOptions.getShapePath(d, i, shapeSize, singleGroupOptions)
    })
    .attr('transform', getAnchoredShapesInitialTransform)

  const updatedAnchoredShapesStops = anchoredShapes
  const allAnchoredShapesStops = updatedAnchoredShapesStops.merge(newAnchoredShapes)

  allAnchoredShapesStops
    .attr('class', getAnchoredShapesStopsCssClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('points', (d, i) => {
      const shapeSize = singleGroupOptions.getShapeSize()
      return singleGroupOptions.getShapePath(d, i, shapeSize, singleGroupOptions)
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
      `geo-chart-anchored-shapes__segment-stop--${i}`,
      `geo-chart-anchored-shapes__segment-stop--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, anchoredShapesBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
