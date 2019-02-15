/// <reference types="d3" />

import _ from 'lodash'

import './GeoChartAxis'
import {
  getItemSpanAtAxis,
  getTranslationForNormalAxisFactory,
  getItemTranslationFactory,
  isDimensionAxis
} from './barsUtils'

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
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.ColorBarGroupsGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-color-bar-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-color-bar-group geo-chart-color-bar-group--${singleGroupOptions.id} geo-chart-color-bar-group--${singleGroupOptions.dimension}`
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
 * @param {GeoChart.ColorBarGroupsGlobalConfig} globalOptions
 */
function renderSingleGroup (group, singleGroupOptions, globalOptions) {
  const axisForNormalDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.vertical
    : singleGroupOptions.axis.horizontal

  const axisForDimension = isDimensionAxis(singleGroupOptions.axis.horizontal, singleGroupOptions)
    ? singleGroupOptions.axis.horizontal
    : singleGroupOptions.axis.vertical

  const getSegmentWidth = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      case DIMENSIONS.vertical:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis dimension for getSegmentWidth: ${singleGroupOptions.dimension}`)
    }
  }
  const getSegmentHeight = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      case DIMENSIONS.vertical:
        return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions, {
          keyForWidth: 'width',
          keyForNaturalWidth: 'naturalWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis dimension for getSegmentHeight: ${singleGroupOptions.dimension}`)
    }
  }

  const colorBarContainer = renderColorBarContainer(group, singleGroupOptions, globalOptions, {
    axisForDimension,
    axisForNormalDimension
  })

  renderColorBarSegments(colorBarContainer, singleGroupOptions, {
    axisForDimension,
    axisForNormalDimension,
    getSegmentWidth,
    getSegmentHeight
  })

  renderColorBarHighlightedSegments(colorBarContainer, singleGroupOptions, globalOptions, {
    axisForDimension,
    axisForNormalDimension,
    getSegmentWidth,
    getSegmentHeight
  })
}

function renderColorBarContainer (group, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension
}) {
  const colorBarBaseClass = 'geo-chart-color-bar'
  const getTranslation = getItemTranslationFactory(singleGroupOptions, {
    keyForWidth: 'width',
    keyForNaturalWidth: 'naturalWidth',
    componentName: 'Color Bar',
    getOriginPositionAtAxis (axisConfig, singleItem) {
      return axisConfig.scale.axisScale(singleItem[axisConfig.keyForValues])
    },
    getTranslationForNormalAxis: getTranslationForNormalAxisFactory(singleGroupOptions, {
      keyForNormalOffset: 'normalOffset',
      keyForNaturalNormalOffset: 'naturalNormalOffset'
    })
  })

  const colorBar = group
    .selectAll(`g.${colorBarBaseClass}`)
    .data([{
      [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
      [axisForDimension.keyForValues]: axisForDimension.scale.valueForOrigin
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
      `geo-chart-color-bar--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, colorBarBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }

  function getColorBarTransform (d, i) {
    const translation = getTranslation(d, i)
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      return `translate(0, ${translation.y})`
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      return `translate(${translation.x}, 0)`
    }
  }
}

function renderColorBarSegments (colorBarContainer, singleGroupOptions, {
  axisForDimension,
  axisForNormalDimension,
  getSegmentWidth,
  getSegmentHeight
}) {
  const segmentBaseClass = 'geo-chart-color-bar__segment'
  const getSegmentTranslation = getItemTranslationFactory(singleGroupOptions, {
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
    .data(_.map(axisForDimension.scale.axisScale.domain(), (d) => {
      return {
        [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue,
        [axisForDimension.keyForValues]: d
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
      [axisForDimension.keyForValues]: axisForDimension.scale.valueForOrigin,
      [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
    }, i)
    if (singleGroupOptions.dimension === DIMENSIONS.horizontal) {
      return `translate(${originTranslation.x}, ${translation.y})`
    } else if (singleGroupOptions.dimension === DIMENSIONS.vertical) {
      return `translate(${translation.x}, ${originTranslation.y})`
    }
  }

  function getSegmentBarCSSClasses (d, i) {
    const defaultClasses = [
      segmentBaseClass,
      `geo-chart-color-bar__segment--${i}`,
      `geo-chart-color-bar__segment--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, segmentBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}

function renderColorBarHighlightedSegments (colorBarContainer, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension,
  getSegmentWidth,
  getSegmentHeight
}) {
  const highlightedSegmentBaseClass = 'geo-chart-color-bar__highlighted-segment'
  const getHighlightedSegmentWidth = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      case DIMENSIONS.vertical:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis dimension for getHighlightedSegmentWidth: ${singleGroupOptions.dimension}`)
    }
  }
  const getHighlightedSegmentHeight = (d, i) => {
    switch (singleGroupOptions.dimension) {
      case DIMENSIONS.horizontal:
        return getItemSpanAtAxis(axisForNormalDimension, {
          [axisForNormalDimension.keyForValues]: singleGroupOptions.normalValue
        }, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      case DIMENSIONS.vertical:
        return getItemSpanAtAxis(axisForDimension, d, singleGroupOptions, {
          keyForWidth: 'highlightedWidth',
          keyForNaturalWidth: 'naturalHighlightedWidth'
        })
      default:
        console.error(`GeoChartColorBar [component] :: Invalid axis dimension for getHighlightedSegmentHeight: ${singleGroupOptions.dimension}`)
    }
  }
  const getHighlightedSegmentTranslation = getItemTranslationFactory(singleGroupOptions, {
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
        [axisForDimension.keyForValues]: d[axisForDimension.keyForValues]
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
    const highlightedSegmentIndex = _.indexOf(axisForDimension.scale.axisScale.domain(), d[axisForDimension.keyForValues])
    const defaultClasses = [
      highlightedSegmentBaseClass,
      `geo-chart-color-bar__highlighted-segment--${highlightedSegmentIndex}`,
      `geo-chart-color-bar__highlighted-segment--${singleGroupOptions.dimension}`
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
