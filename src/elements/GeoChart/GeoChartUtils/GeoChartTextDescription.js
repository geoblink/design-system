import _ from 'lodash'
import { computeLabelPositionsWithBackPressure, computeLabelPositionsWithoutReadjustment, ALGORITHMS } from './GeoChartTextDescriptionUtils'
import { setTextContent } from '../GeoChartUtils/textUtils'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

const TSPAN_LINE_HEIGHT = 18

/**
 * @param {Array<GeoChart.TextDescriptionSettingsData>} settingsData
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {GeoChart.TextDescriptionGlobalOptions} globalOptions
 */
export function setupTextDescriptions (settingsData, d3Instance, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-text-descriptions')
    .data(settingsData)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', getCSSClassesGroups)
    .attr('transform', (options, i) =>
      `translate(${options.startPosition})`
    )

  groups
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()

  const updatedGroups = groups
  const allGroups = newGroups.merge(updatedGroups)

  const dataWithPositions = []
  allGroups.each(function (singleOptions, i) {
    const group = d3.select(this)
    const newDataWithPositions = renderSingleGroup(group, singleOptions, globalOptions)
    dataWithPositions.push(newDataWithPositions)
  })

  return dataWithPositions

  function getCSSClassesGroups (d, i) {
    const defaultGroupCSSClasses = ['geo-chart-text-descriptions']

    const customCSSClasses = _.isFunction(d.textOptions.cssClassesGroups)
      ? d.textOptions.cssClassesGroups(defaultGroupCSSClasses, d, i)
      : defaultGroupCSSClasses

    return _.uniq([...customCSSClasses, defaultGroupCSSClasses]).join(' ')
  }
}

function renderSingleGroup (group, singleOptions, globalOptions) {
  const textOptions = singleOptions.textOptions
  const margin = _.get(textOptions, 'margin', 0)

  const textElems = group
    .selectAll('text')
    .data(singleOptions.data, (d) => d[singleOptions.keyForId])

  const newTextElems = textElems
    .enter()
    .append('text')
    .attr('class', getCSSClassesTexts)
    .attr('dominant-baseline', 'text-before-edge')
    .attr('text-anchor', singleOptions.textAnchor)
    .attr('opacity', 0)

  newTextElems
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('opacity', 1)

  const updatedTextElems = textElems

  textElems
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('opacity', 0)
    .remove()

  const allTextElems = newTextElems.merge(updatedTextElems)

  setTextContent(allTextElems, textOptions, globalOptions)
  setTextContentLineBreaks(allTextElems)

  const positions = computeLabelPositions(allTextElems)

  const dataWithPositions = _.filter(_.map(singleOptions.data, function (d, i) {
    if (positions[i] === null) {
      return null
    }
    return {
      data: d,
      position: positions[i]
    }
  }))

  setTextElementsPosition(allTextElems)

  return dataWithPositions

  function setTextContentLineBreaks (textElems) {
    textElems.each(function (d, i) {
      const tspans = d3.select(this).selectAll('tspan')
      tspans.each(function (d, i) {
        if (d.newLine) {
          d3.select(this).attr('dy', TSPAN_LINE_HEIGHT * i)
          d3.select(this).attr('x', 0)
        }
      })
    })
  }

  function setTextElementsPosition (textElems) {
    textElems.each(function (d, i) {
      const textElem = d3.select(this)
      if (positions[i]) {
        let y = positions[i]
        textElem
          .transition()
          .duration(globalOptions.chart.animationsDurationInMilliseconds)
          .attr('y', y)
          .attr('opacity', 1)
      } else {
        textElem
          .transition()
          .duration(globalOptions.chart.animationsDurationInMilliseconds)
          .style('opacity', 0)
          .remove()
      }
    })
  }

  function computeLabelPositions (textElems) {
    const textElemsConfig = []
    const computeGeneralConfig = {
      margin: margin,
      minY: singleOptions.minY,
      maxY: singleOptions.maxY
    }

    textElems.each(function (d) {
      const bbox = this.getBBox()

      textElemsConfig.push({
        height: bbox.height,
        preferredPosition: singleOptions.getTextPositionMainDirection(d) - bbox.height / 2
      })
    })

    switch (singleOptions.algorithm) {
      case ALGORITHMS.backPressure:
        return computeLabelPositionsWithBackPressure(textElemsConfig, computeGeneralConfig)
      case ALGORITHMS.withoutReadjustment:
        return computeLabelPositionsWithoutReadjustment(textElemsConfig, computeGeneralConfig)
      default:
        console.warn(`GeoChart (GeoChartTextDescription) [component] :: Unknown algorithm: ${singleOptions.algorithm}`)
        break
    }
  }

  function getCSSClassesTexts (d, i) {
    const defaultCSSClasses = ['geo-chart-text-descriptions__text']

    const customCSSClasses = _.isFunction(singleOptions.textOptions.cssClassesTexts)
      ? singleOptions.textOptions.cssClassesTexts(defaultCSSClasses, d, i).join(' ')
      : defaultCSSClasses

    return customCSSClasses
  }
}
