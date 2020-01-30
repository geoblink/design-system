/// <reference types="d3" />

import _ from 'lodash'

import * as ChartAxis from '../GeoChartAxis/GeoChartAxis'
import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'
import { setupTooltipEventListeners } from '../GeoChartUtils/GeoChartTooltip'
import { QUADRANT_LABEL } from '../constants.js'

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
  const showVerticalLine = singleQuadrantOptions.horizontalThreshold !== undefined
  const showHorizontalLine = singleQuadrantOptions.verticalThreshold !== undefined

  const horizontalLine = {
    dimension: dimensionUtils.DIMENSIONS_2D.horizontal,
    axisConfigForOrigin: singleQuadrantOptions.verticalAxisConfig,
    axisConfigForLine: singleQuadrantOptions.horizontalAxisConfig,
    threshold: singleQuadrantOptions.verticalThreshold
  }
  const verticalLine = {
    dimension: dimensionUtils.DIMENSIONS_2D.vertical,
    axisConfigForOrigin: singleQuadrantOptions.horizontalAxisConfig,
    axisConfigForLine: singleQuadrantOptions.verticalAxisConfig,
    threshold: singleQuadrantOptions.horizontalThreshold
  }
  let allQuadrantLineData
  if (showHorizontalLine && showVerticalLine) {
    allQuadrantLineData = [verticalLine, horizontalLine]
  } else if (showHorizontalLine && !showVerticalLine) {
    allQuadrantLineData = [horizontalLine]
  } else if (!showHorizontalLine && showVerticalLine) {
    allQuadrantLineData = [verticalLine]
  } else {
    allQuadrantLineData = []
  }

  const allQuadrantLabelData = [
    { id: QUADRANT_LABEL.topLeft, name: singleQuadrantOptions.quadrantTopLeftName },
    { id: QUADRANT_LABEL.topRight, name: singleQuadrantOptions.quadrantTopRightName },
    { id: QUADRANT_LABEL.bottomLeft, name: singleQuadrantOptions.quadrantBottomLeftName },
    { id: QUADRANT_LABEL.bottomRight, name: singleQuadrantOptions.quadrantBottomRightName }
  ]

  const filteredAllQuadrantLabelData = _.filter(allQuadrantLabelData, (label) => {
    return !!label.name
  })

  renderQuadrantLines(group, d3TipInstance, singleQuadrantOptions, allQuadrantLineData, globalAxesConfig)
  renderQuadrantLabels(group, d3TipInstance, singleQuadrantOptions, filteredAllQuadrantLabelData, globalAxesConfig)
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
    renderSingleQuadrantLine(singleLineGroup, singleQuadrantLineOptions, globalAxesConfig)
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
 * @param {Object<string, GeoChart.AxisConfig<Domain, RelativeScaleDomain>>} singleQuadrantLineOptions
 * @param {GeoChart.GlobalAxesConfig} globalAxesConfig
 */
function renderSingleQuadrantLine (singleLineGroup, singleQuadrantLineOptions, globalAxesConfig) {
  const quadrantLine = ChartAxis.getAxis(singleQuadrantLineOptions.axisConfigForLine)

  quadrantLine
    .tickSize(0)

  singleLineGroup
    .transition()
    .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    .attr('transform', getTranslationForQuadrantLine)
    .call(quadrantLine)

  singleLineGroup
    .selectAll('g.tick')
    .remove()

  function getTranslationForQuadrantLine (singleQuadrantLineOptions) {
    const isHorizontalLine = singleQuadrantLineOptions.dimension === dimensionUtils.DIMENSIONS_2D.horizontal

    const xTranslation = isHorizontalLine
      ? 0
      : singleQuadrantLineOptions.axisConfigForOrigin.scale.axisScale(singleQuadrantLineOptions.threshold)

    const yTranslation = isHorizontalLine
      ? singleQuadrantLineOptions.axisConfigForOrigin.scale.axisScale(singleQuadrantLineOptions.threshold)
      : 0

    return `translate(${xTranslation}, ${yTranslation})`
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
  const fontSize = singleQuadrantOptions.fontSize || 10 // Default to 10px

  const labelGroup = group
    .selectAll('g.geo-chart-quadrant-label')
    .data(allQuadrantLabelData)

  const newLabelGroup = labelGroup
    .enter()
    .append('g')
    .attr('class', (d) => `geo-chart-quadrant-label geo-chart-quadrant-label--${d.id}`)
    .attr('transform', getQuadrantLabelInitialTransform)
    .style('font-size', fontSize)

  createTextInLabelGroup(newLabelGroup)
  if (singleQuadrantOptions.tooltip) {
    createIconInLabelGroup(newLabelGroup, fontSize)

    const icons = newLabelGroup
      .selectAll('g.geo-chart-quadrant-label-icon')

    setupTooltipEventListeners(icons, d3TipInstance, singleQuadrantOptions.tooltip)
  }

  const updatedLabelGroup = labelGroup
  const allLabelsGroup = newLabelGroup.merge(updatedLabelGroup)

  allLabelsGroup
    .transition()
    .duration(globalAxesConfig.chart.animationsDurationInMilliseconds)
    .attr('transform', getQuadrantLabelTransform)

  labelGroup
    .exit()
    .remove()

  function createTextInLabelGroup (parent) {
    parent.each(function (d) {
      const singleLabelGroup = d3.select(this)

      singleLabelGroup
        .append('text')
        .attr('class', (d) => `geo-chart-quadrant-label-text geo-chart-quadrant-label-text--${d.id}`)
        .text((d) => d.name)
    })
  }

  function createIconInLabelGroup (parent, fontSize) {
    parent.each(function (d) {
      const singleLabelGroup = d3.select(this)
      const bbox = this.getBBox()

      const iconGroup = singleLabelGroup
        .append('g')
        .attr('class', (d) => `geo-chart-quadrant-label-icon geo-chart-quadrant-label-icon--${d.id}`)
        .attr('transform', `translate(${bbox.width + fontSize}, 0)`)

      iconGroup
        .append('circle')
        .attr('transform', `translate(0, -${fontSize * 0.4})`)
        .attr('fill', 'white')
        .attr('stroke', '#9B9B9B')
        .style('r', fontSize * 0.55)

      iconGroup
        .append('text')
        .attr('dx', -fontSize * 0.14)
        .text('i')
        .style('fill', '#9B9B9B')
        .attr('font-size', fontSize)
        .attr('font-weight', 'bold')
    })
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
    const textWidth = this.getBBox().width
    const DEFAULT_LINE_HEIGHT = 16
    const axesMargin = globalAxesConfig.chart.margin
    const axesSize = globalAxesConfig.chart.size

    switch (d.id) {
      case QUADRANT_LABEL.topLeft:
        translation.x = axesMargin.left
        translation.y = axesMargin.bottom - (DEFAULT_LINE_HEIGHT / 2)
        break
      case QUADRANT_LABEL.topRight:
        translation.x = axesSize.width - textWidth
        translation.y = axesMargin.bottom - (DEFAULT_LINE_HEIGHT / 2)
        break
      case QUADRANT_LABEL.bottomLeft:
        translation.x = axesMargin.left
        translation.y = axesSize.height - DEFAULT_LINE_HEIGHT
        break
      case QUADRANT_LABEL.bottomRight:
        translation.x = axesSize.width - textWidth
        translation.y = axesSize.height - DEFAULT_LINE_HEIGHT
        break
    }
    return `translate(${translation.x}, ${translation.y})`
  }
}
