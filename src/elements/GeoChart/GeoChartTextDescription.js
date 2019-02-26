import _ from 'lodash'
import { computeLabelPositionsWithBackPressure, computeLabelPositionsWithoutReadjustment, ALGORITHIMS } from './GeoChartTextDescriptionUtils'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

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

  allGroups.each(function (singleOptions, i) {
    const group = d3.select(this)
    renderSingleGroup(group, singleOptions, globalOptions)
  })

  function getCSSClassesGroups (options, i) {
    const defaultGroupCSSClasses = ['geo-chart-text-descriptions']

    const customCSSClasses = _.isFunction(options.cssClassesGroups)
      ? options.cssClassesGroups(defaultGroupCSSClasses)
      : defaultGroupCSSClasses

    return customCSSClasses
  }
}

function renderSingleGroup (group, singleOptions, globalOptions) {
  const textOptions = singleOptions.textOptions
  const margin = _.get(singleOptions.textOptions, 'margin', 0)
  const textElems = group
    .selectAll('text')
    .data(singleOptions.data, (d) => d.data[singleOptions.keyForId])

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

  setTextContent(allTextElems)
  setTextContentLineBreaks(allTextElems)

  const positions = computeLabelPositions(allTextElems)

  setTextElementsPosition(allTextElems, positions)

  function setTextContent (textElems) {
    const tspans = textElems
      .selectAll('tspan')
      .data(function (d, i) {
        return textOptions.content(d, i)
      })

    const newtspans = tspans
      .enter()
      .append('tspan')
      .attr('class', function (d) {
        return d.cssClass
      })
      .text(function (d) {
        return d.text
      })

    const updatedtspans = tspans
    updatedtspans
      .attr('class', function (d) {
        return d.cssClass
      })
      .text(function (textD) {
        return textD.text
      })

    newtspans.merge(updatedtspans)

    tspans
      .exit()
      .remove()
  }

  function setTextContentLineBreaks (textElems) {
    const lineHeight = 18
    textElems.each(function (d, i) {
      const tspans = d3.select(this).selectAll('tspan')
      tspans.each(function (d, i) {
        if (d.newLine) {
          d3.select(this).attr('dy', lineHeight * i)
          d3.select(this).attr('x', 0)
        }
      })
    })
  }

  function setTextElementsPosition (textElems, positions) {
    textElems.each(function (d, i) {
      const textElem = d3.select(this)
      if (positions[i]) {
        let y = positions[i]
        textElem
          .transition()
          .duration(globalOptions.chart.animationsDurationInMilliseconds)
          .attr('text-anchor', singleOptions.textAnchor)
          .attr('y', y)
          .attr('opacity', 1)
      } else {
        textElem.remove()
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

    switch (singleOptions.algorithim) {
      case ALGORITHIMS.backPressure:
        return computeLabelPositionsWithBackPressure(textElemsConfig, computeGeneralConfig)
      case ALGORITHIMS.withoutReadjustment:
        return computeLabelPositionsWithoutReadjustment(textElemsConfig, computeGeneralConfig)
      default:
        console.warn(`GeoChart (GeoChartTextDescription) [component] :: Unknown algorithim: ${singleOptions.algorithim}`)
        break
    }
  }

  function getCSSClassesTexts (options, i) {
    const defaultCSSClasses = ['geo-chart-text-descriptions__text']

    const customCSSClasses = _.isFunction(options.cssClassesTexts)
      ? options.cssClassesTexts(defaultCSSClasses)
      : defaultCSSClasses

    return customCSSClasses
  }
}
