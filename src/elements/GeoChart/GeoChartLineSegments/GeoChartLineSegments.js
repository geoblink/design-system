/// <reference types="d3" />

import _ from 'lodash'

import '../GeoChartAxis/GeoChartAxis'
import {
  getItemSpanAtAxis,
  getTranslationForNormalAxisFactory,
  getItemTranslationFactory,
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
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const groups = d3Instance
    .selectAll('g.geo-chart-line-segments-group')
    .data(options)

  const newGroups = groups
    .enter()
    .append('g')
    .attr('class', (singleGroupOptions, i) =>
      `geo-chart-line-segments-group geo-chart-line-segments-group--${singleGroupOptions.id} geo-chart-line-segments-group--${singleGroupOptions.dimension}`
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
 * @param {GeoChart.singleLineSegmentsGroupsConfig<HorizontalDomain, VerticalDomain>} singleGroupOptions
 * @param {GeoChart.LineSegmentsGroupsGlobalConfig} globalOptions
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
}

function renderColorBarContainer (group, singleGroupOptions, globalOptions, {
  axisForDimension,
  axisForNormalDimension
}) {
  const colorBarBaseClass = 'geo-chart-line-segments'
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
    .attr('class', 'geo-chart-line-segments__segment-container')

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
      `geo-chart-line-segments--${i}`,
      `geo-chart-line-segments--${singleGroupOptions.dimension}`
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
  const segmentBaseClass = 'geo-chart-line-segments__segment'
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
    .select('g.geo-chart-line-segments__segment-container')
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
      `geo-chart-line-segments__segment--${i}`,
      `geo-chart-line-segments__segment--${singleGroupOptions.dimension}`
    ]

    if (singleGroupOptions.cssClasses) {
      const customClasses = singleGroupOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, segmentBaseClass]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
