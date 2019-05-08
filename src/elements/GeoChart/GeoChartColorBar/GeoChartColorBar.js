/// <reference types="d3" />

import _ from 'lodash'

import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as barsUtils from '../GeoChartUtils/barsUtils'
import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'

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
 * @param {Array<GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-color-bar-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-color-bar-group geo-chart-color-bar-group--${singleGroupOptions.id} geo-chart-color-bar-group--${singleGroupOptions.mainDimension}`
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
 * @param {GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions) {
  const axisForNormalDimension = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForMainDimension = axisUtils.isMainDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  const getSegmentWidth = (d, i) => {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return barsUtils.getItemSpanAtAxis((/** @type {GeoChart.AxisConfig<HorizontalDomain>} */(axisForMainDimension)), d, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return barsUtils.getItemSpanAtAxis((/** @type {GeoChart.AxisConfig<VerticalDomain>} */(axisForNormalDimension)), {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis main dimension for getSegmentWidth: ${singleGroupOptions.mainDimension}`)
    }
  }
  const getSegmentHeight = (d, i) => {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return barsUtils.getItemSpanAtAxis((/** @type {GeoChart.AxisConfig<HorizontalDomain>} */(axisForNormalDimension)), {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return barsUtils.getItemSpanAtAxis((/** @type {GeoChart.AxisConfig<VerticalDomain>} */(axisForMainDimension)), d, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis main dimension for getSegmentHeight: ${singleGroupOptions.mainDimension}`)
    }
  }

  const colorBarContainer = renderColorBarContainer(group, singleGroupOptions, globalOptions, {
    axisForMainDimension,
    axisForNormalDimension
  })

  renderColorBarSegments(colorBarContainer, singleGroupOptions, {
    axisForMainDimension,
    axisForNormalDimension,
    getSegmentWidth,
    getSegmentHeight
  })

  renderColorBarHighlightedSegments(colorBarContainer, singleGroupOptions, globalOptions, {
    axisForMainDimension,
    axisForNormalDimension,
    getSegmentWidth,
    getSegmentHeight
  })
}

function renderColorBarContainer (group, singleGroupOptions, globalOptions, {
  axisForMainDimension,
  axisForNormalDimension
}) {
  const colorBarBaseClass = 'geo-chart-color-bar'
  const getTranslation = barsUtils.getItemTranslationFactory(singleGroupOptions, {
    keyForWidth: 'width',
    keyForNaturalWidth: 'naturalWidth',
    componentName: 'Color Bar',
    getOriginPositionAtAxis (axisConfig, singleItem) {
      return axisConfig.scale.axisScale(singleItem[axisConfig.keyForValues])
    },
    getTranslationForNormalAxis: axisUtils.getTranslationForNormalAxisFactory(singleGroupOptions, {
      keyForNormalOffset: 'normalOffset',
      keyForNaturalNormalOffset: 'naturalNormalOffset'
    })
  })

  const colorBar = group
    .selectAll(`g.${colorBarBaseClass}`)
    .data([{
      [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
      [axisForMainDimension.keyForValues]: axisForMainDimension.scale.valueForOrigin
    }])

  const newColorBar = colorBar
    .enter()
    .append('g')
    .attr('class', getSingleBarCSSClasses)

  newColorBar
    .attr('transform', getColorBarTransform)

  newColorBar
    .append('g')
    .attr('class', 'geo-chart-color-bar__segment-container')

  newColorBar
    .append('g')
    .attr('class', 'geo-chart-color-bar__highlighted-segment-container')

  const updatedColorBar = colorBar
  const allColorBars = updatedColorBar.merge(newColorBar)

  allColorBars
    .attr('class', getSingleBarCSSClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getColorBarTransform)

  colorBar
    .exit()
    .remove()
  return allColorBars

  function getSingleBarCSSClasses (d, i) {
    const defaultClasses = [
      colorBarBaseClass,
      `geo-chart-color-bar--${i}`,
      `geo-chart-color-bar--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, colorBarBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }

  function getColorBarTransform (d, i) {
    const translation = getTranslation(d, i)
    if (singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.horizontal) {
      return `translate(0, ${translation.y})`
    } else if (singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.vertical) {
      return `translate(${translation.x}, 0)`
    }
  }
}

function renderColorBarSegments (colorBarContainer, singleGroupOptions, {
  axisForMainDimension,
  axisForNormalDimension,
  getSegmentWidth,
  getSegmentHeight
}) {
  const segmentBaseClass = 'geo-chart-color-bar__segment'
  const getSegmentTranslation = barsUtils.getItemTranslationFactory(singleGroupOptions, {
    keyForWidth: 'width',
    keyForNaturalWidth: 'naturalWidth',
    componentName: 'Color Bar',
    getOriginPositionAtAxis (axisConfig, singleItem) {
      return axisConfig.scale.axisScale(singleItem[axisConfig.keyForValues])
    },
    getTranslationForNormalAxis () { return 0 }
  })

  const segments = colorBarContainer
    .select('g.geo-chart-color-bar__segment-container')
    .selectAll(`rect.${segmentBaseClass}`)
    .data(_.map(axisForMainDimension.scale.axisScale.domain(), (d) => {
      return {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
        [axisForMainDimension.keyForValues]: d
      }
    }))

  const newSegments = segments
    .enter()
    .append('rect')
    .attr('class', getSegmentBarCSSClasses)
    .attr('transform', getNewSegmentInitialTransform)
    .attr('width', getSegmentWidth)
    .attr('height', getSegmentHeight)

  const updatedSegments = segments
  const allSegments = updatedSegments.merge(newSegments)

  allSegments
    .attr('class', getSegmentBarCSSClasses)
    .attr('transform', getSegmentTransform)
    .attr('width', getSegmentWidth)
    .attr('height', getSegmentHeight)

  segments
    .exit()
    .remove()

  function getSegmentTransform (d, i) {
    const translation = getSegmentTranslation(d, i)
    return `translate(${translation.x}, ${translation.y})`
  }

  function getNewSegmentInitialTransform (d, i) {
    const translation = getSegmentTranslation(d, i)
    const originTranslation = getSegmentTranslation({
      [axisForMainDimension.keyForValues]: axisForMainDimension.scale.valueForOrigin,
      [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
    }, i)
    if (singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.horizontal) {
      return `translate(${originTranslation.x}, ${translation.y})`
    } else if (singleGroupOptions.mainDimension === dimensionUtils.DIMENSIONS_2D.vertical) {
      return `translate(${translation.x}, ${originTranslation.y})`
    }
  }

  function getSegmentBarCSSClasses (d, i) {
    const defaultClasses = [
      segmentBaseClass,
      `geo-chart-color-bar__segment--${i}`,
      `geo-chart-color-bar__segment--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, segmentBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

function renderColorBarHighlightedSegments (colorBarContainer, singleGroupOptions, globalOptions, {
  axisForMainDimension,
  axisForNormalDimension,
  getSegmentWidth,
  getSegmentHeight
}) {
  const highlightedSegmentBaseClass = 'geo-chart-color-bar__highlighted-segment'
  const getHighlightedSegmentWidth = (d, i) => {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return barsUtils.getItemSpanAtAxis(axisForMainDimension, d, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return barsUtils.getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis main dimension for getHighlightedSegmentWidth: ${singleGroupOptions.mainDimension}`)
    }
  }
  const getHighlightedSegmentHeight = (d, i) => {
    switch (singleGroupOptions.mainDimension) {
      case dimensionUtils.DIMENSIONS_2D.horizontal:
        return barsUtils.getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      case dimensionUtils.DIMENSIONS_2D.vertical:
        return barsUtils.getItemSpanAtAxis(axisForMainDimension, d, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis main dimension for getHighlightedSegmentHeight: ${singleGroupOptions.mainDimension}`)
    }
  }
  const getHighlightedSegmentTranslation = barsUtils.getItemTranslationFactory(singleGroupOptions, {
    keyForWidth: 'width',
    keyForNaturalWidth: 'naturalWidth',
    componentName: 'Color Bar',
    getOriginPositionAtAxis (axisConfig, singleItem) {
      return axisConfig.scale.axisScale(singleItem[axisConfig.keyForValues])
    },
    getTranslationForNormalAxis (normalAxis, singleItem) {
      const normalHighlightedElementOffset = _.isFinite(singleGroupOptions.width)
        ? (singleGroupOptions.highlightedWidth - singleGroupOptions.width) / 2
        : (normalAxis.scale.axisScale(singleGroupOptions.naturalHighlightedWidth) - normalAxis.scale.axisScale(singleGroupOptions.naturalWidth)) / 2
      return 0 - normalHighlightedElementOffset
    }
  })

  const highlightedSegments = colorBarContainer
    .select('g.geo-chart-color-bar__highlighted-segment-container')
    .selectAll(`rect.${highlightedSegmentBaseClass}`)
    .data(_.map(singleGroupOptions.data, (d) => {
      return {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
        [axisForMainDimension.keyForValues]: d[axisForMainDimension.keyForValues]
      }
    }))

  const newHighlightedSegments = highlightedSegments
    .enter()
    .append('rect')
    .attr('class', getHighlightedSegmentBarCSSClasses)
    .attr('transform', getHighlightedSegmentTransform)
    .attr('width', getSegmentWidth)
    .attr('height', getSegmentHeight)
    .attr('stroke', 'black')
    .attr('opacity', 0)

  const updatedHighlightedSegments = highlightedSegments
  const allHighlightedSegments = newHighlightedSegments.merge(updatedHighlightedSegments)

  allHighlightedSegments
    .attr('class', getHighlightedSegmentBarCSSClasses)
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('transform', getHighlightedSegmentTransform)
    .attr('width', getHighlightedSegmentWidth)
    .attr('height', getHighlightedSegmentHeight)
    .attr('stroke', 'black')
    .attr('stroke-width', '1px')
    .attr('opacity', 1)

  highlightedSegments
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('opacity', 0)
    .remove()

  function getHighlightedSegmentBarCSSClasses (d, i) {
    const highlightedSegmentIndex = _.indexOf(axisForMainDimension.scale.axisScale.domain(), d[axisForMainDimension.keyForValues])
    const defaultClasses = [
      highlightedSegmentBaseClass,
      `geo-chart-color-bar__highlighted-segment--${highlightedSegmentIndex}`,
      `geo-chart-color-bar__highlighted-segment--${singleGroupOptions.mainDimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, highlightedSegmentBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }

  function getHighlightedSegmentTransform (d, i) {
    const translation = getHighlightedSegmentTranslation(d, i)
    return `translate(${translation.x}, ${translation.y})`
  }
}
