/// <reference types="d3" />

import _ from 'lodash'

import * as ChartAxis from '../GeoChartAxis/GeoChartAxis'
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
 * @template Domain
 * @typedef {import('d3').Axis<Domain>} d3.Axis
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleQuadrantGroupConfig<Domain, RelativeScaleDomain>>} quadrantOptions
 * @param {GeoChart.GlobalOptions} globalAxesConfig
 */
export function render (d3Instance, d3TipInstance, quadrantOptions, globalAxesConfig) {
  const baseQuadrantCSSClass = 'geo-chart-quadrant'

  const quadrantGroups = d3Instance
    .selectAll(`g.${baseQuadrantCSSClass}`)
    .data(quadrantOptions)

  const newQuadrantGroups = quadrantGroups
    .enter()
    .append('g')
    .attr('class', getQuadrantCSSClasses)

  const updatedQuadrantGroups = quadrantGroups
  const allQuadrantGroups = newQuadrantGroups.merge(updatedQuadrantGroups)

  quadrantGroups
    .exit()
    .transition()
    .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  allQuadrantGroups
    .attr('class', getQuadrantCSSClasses)

  allQuadrantGroups.each(function (singleQuadrantOptions, i) {
    const group = d3.select(this)
    renderSingleQuadrant(group, d3TipInstance, singleQuadrantOptions, globalAxesConfig)
  })

  function getQuadrantCSSClasses (singleQuadrantOptions, i) {
    const defaultGroupCSSClasses = [
      baseQuadrantCSSClass
    ]

    const customCSSClasses = _.isFunction(singleQuadrantOptions.cssClasses)
      ? singleQuadrantOptions.cssClasses(defaultGroupCSSClasses)
      : defaultGroupCSSClasses

    return _.uniq([...customCSSClasses, baseQuadrantCSSClass]).join(' ')
  }
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} group
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleQuadrantGroupConfig<Domain, RelativeScaleDomain>>} singleQuadrantOptions
 * @param {GeoChart.GlobalOptions} globalAxesConfig
*/
function renderSingleQuadrant (group, d3TipInstance, singleQuadrantOptions, globalAxesConfig) {
  const allQuadrantLineData = [
    { dimension: dimensionUtils.DIMENSIONS_2D.vertical, axisConfig: singleQuadrantOptions.horizontalAxisConfig },
    { dimension: dimensionUtils.DIMENSIONS_2D.horizontal, axisConfig: singleQuadrantOptions.verticalAxisConfig }
  ]
  const allQuadrantLabelData = [
    { id: 1, name: singleQuadrantOptions.quadrantTopLeftName },
    { id: 2, name: singleQuadrantOptions.quadrantTopRightName },
    { id: 3, name: singleQuadrantOptions.quadrantBottomLeftName },
    { id: 4, name: singleQuadrantOptions.quadrantBottomRightName }
  ]

  renderQuadrantLines(group, d3TipInstance, singleQuadrantOptions, allQuadrantLineData, globalAxesConfig)
  renderQuadrantLabels(group, d3TipInstance, singleQuadrantOptions, allQuadrantLabelData, globalAxesConfig)
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} group
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleQuadrantGroupConfig<Domain, RelativeScaleDomain>>} singleQuadrantOptions
 * @param {Array<string, GeoChart.AxisConfig<Domain, RelativeScaleDomain>>} allQuadrantLineData
 * @param {GeoChart.GlobalOptions} globalAxesConfig
*/
function renderQuadrantLines (group, d3TipInstance, singleQuadrantOptions, allQuadrantLineData, globalAxesConfig) {
  const lineGroup = group
    .selectAll('g.geo-chart-quadrant-line')
    .data(allQuadrantLineData)

  const newLineGroup = lineGroup
    .enter()
    .append('g')
    .attr('class', (d, i) => `geo-chart-quadrant-line geo-chart-quadrant-line--${d.dimension}`)

  const updatedLineGroup = lineGroup
  const allLinesGroups = newLineGroup.merge(updatedLineGroup)

  setupTooltipEventListeners(allLinesGroups, d3TipInstance, singleQuadrantOptions.tooltip)

  lineGroup
    .exit()
    .transition()
    .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  allLinesGroups.each(function (singleQuadrantLineOptions, i) {
    const singleLineGroup = d3.select(this)
    renderSingleQuadrantLine(singleLineGroup, singleQuadrantOptions, singleQuadrantLineOptions, globalAxesConfig)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} singleLineGroup
 * @param {Array<GeoChart.SingleQuadrantGroupConfig<Domain, RelativeScaleDomain>>} singleQuadrantOptions
 * @param {Object<string, GeoChart.AxisConfig<Domain, RelativeScaleDomain>>} singleQuadrantLineOptions
 * @param {GeoChart.GlobalAxesConfig} globalAxesConfig
 */
function renderSingleQuadrantLine (singleLineGroup, singleQuadrantOptions, singleQuadrantLineOptions, globalAxesConfig) {
  const drawingEnvironment = getDrawingEnvironmentForQuadrant(singleQuadrantLineOptions)
  const quadrantLine = ChartAxis.getAxis(singleQuadrantLineOptions.axisConfig)

  quadrantLine
    .tickSize(0)

  singleLineGroup
    .transition()
    .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    .attr('transform', `translate(${drawingEnvironment.absolutePosition.x}, ${drawingEnvironment.absolutePosition.y})`)
    .call(quadrantLine)

  singleLineGroup
    .selectAll('g.tick')
    .remove()

  function getDrawingEnvironmentForQuadrant (singleQuadrantLineOptions) {
    const isHorizontalQuadrant = singleQuadrantLineOptions.dimension === dimensionUtils.DIMENSIONS_2D.horizontal

    const xTranslation = isHorizontalQuadrant
      ? 0
      : singleQuadrantOptions.verticalAxisConfig.scale.axisScale(singleQuadrantOptions.thresholdX)

    const yTranslation = isHorizontalQuadrant
      ? singleQuadrantOptions.horizontalAxisConfig.scale.axisScale(singleQuadrantOptions.thresholdY)
      : 0

    const drawingEnvironment = {
      canvasSize: globalAxesConfig.chart.size,
      chartMargin: globalAxesConfig.chart.margin,
      absolutePosition: {
        x: xTranslation,
        y: yTranslation
      }
    }

    return drawingEnvironment
  }
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template Domain
 * @template RelativeScaleDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} group
 * @param {d3.Tooltip<SVGElement, object, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleQuadrantGroupConfig<Domain, RelativeScaleDomain>>} singleQuadrantOptions
 * @param {Array<number, string>} allQuadrantLabelData
 * @param {GeoChart.GlobalAxesConfig} globalAxesConfig
 */
function renderQuadrantLabels (group, d3TipInstance, singleQuadrantOptions, allQuadrantLabelData, globalAxesConfig) {
  const labelSize = singleQuadrantOptions.labelSize
    ? singleQuadrantOptions.labelSize
    : 10 // Default to 10px

  const labelGroup = group
    .selectAll('g.geo-chart-quadrant-label')
    .data(allQuadrantLabelData)

  const newLabelGroup = labelGroup
    .enter()
    .append('g')
    .attr('class', (d) => `geo-chart-quadrant-label geo-chart-quadrant-label--${d.id}`)
    .attr('transform', getQuadrantLabelInitialTransform)
    .style('font-size', labelSize)

  newLabelGroup
    .append('text')
    .attr('class', (d) => `geo-chart-quadrant-label-text geo-chart-quadrant-label-text--${d.id}`)
    .attr('transform', `translate(${labelSize * 0.9}, 0)`)
    .text((d) => d.name)

  if (singleQuadrantOptions.tooltip) {
    createIconsInLabelGroup(newLabelGroup, labelSize)
  }

  const updatedLabelGroup = labelGroup
  const allLabelGroup = newLabelGroup.merge(updatedLabelGroup)

  if (singleQuadrantOptions.tooltip) {
    const icons = newLabelGroup
      .selectAll('circle')

    setupTooltipEventListeners(icons, d3TipInstance, singleQuadrantOptions.tooltip)
  }

  allLabelGroup
    .transition()
    .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    .attr('transform', getQuadrantLabelTransform)

  labelGroup
    .exit()
    .remove()

  function createIconsInLabelGroup (parent, labelSize) {
    const iconsGroup = parent
      .append('g')
      .attr('class', (d) => `geo-chart-quadrant-label-icon geo-chart-quadrant-label-icon--${d.id}`)

    iconsGroup
      .append('circle')
      .attr('transform', `translate(0, -${labelSize * 0.4})`)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .style('r', labelSize * 0.55)

    iconsGroup
      .append('text')
      .attr('dx', -labelSize * 0.14)
      .text('i')
      .attr('font-size', labelSize)
      .attr('font-weight', 'bold')
  }

  function getQuadrantLabelInitialTransform (d, i) {
    const axesMargin = globalAxesConfig.chart.margin
    const axesSize = globalAxesConfig.chart.size
    const translation = {
      x: (axesSize.width / 2) - axesMargin.left + axesMargin.right,
      y: (axesSize.height / 2)
    }
    return `translate(${translation.x}, ${translation.y})`
  }

  function getQuadrantLabelTransform (d, i) {
    const translation = {
      x: null,
      y: null
    }
    const DEFAULT_LINE_HEIGHT = 16
    const axesMargin = globalAxesConfig.chart.margin
    const axesSize = globalAxesConfig.chart.size

    switch (d.id) {
      case 1:
        translation.x = axesMargin.left
        translation.y = axesMargin.bottom - (DEFAULT_LINE_HEIGHT / 2)
        break
      case 2:
        translation.x = axesSize.width - axesMargin.left - axesMargin.right
        translation.y = axesMargin.bottom - (DEFAULT_LINE_HEIGHT / 2)
        break
      case 3:
        translation.x = axesMargin.left
        translation.y = axesSize.height - DEFAULT_LINE_HEIGHT
        break
      case 4:
        translation.x = axesSize.width - axesMargin.left - axesMargin.right
        translation.y = axesSize.height - DEFAULT_LINE_HEIGHT
        break
    }
    return `translate(${translation.x}, ${translation.y})`
  }
}
