/// <reference types="d3" />

import _ from 'lodash'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

export const DEFAULT_OUTER_RADIUS = 1
export const DEFAULT_INNER_RADIUS = 0

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {Array<GeoChart.PieConfig} options
 * @param {GeoChart.PieGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const chartHeight = globalOptions.chart.size.height
  const chartWidth = globalOptions.chart.size.width

  const pies = d3Instance
    .selectAll('g.geo-chart-pie')
    .data([{}])

  const newPies = pies
    .enter()
    .append('g')
    .attr('class', 'geo-chart-pie')
    .attr('transform', 'translate(' + (chartWidth / 2) + ',' + (chartHeight / 2) + ')')

  const updatedPies = pies

  const allPies = newPies.merge(updatedPies)

  // TODO:  Para pillar el primer hijo
  allPies.each(function () {
    const pie = d3.select(this)
    renderSinglePie(pie, options, globalOptions)
  })
}

function renderSinglePie (pie, singlePieOptions, globalOptions) {
  const outerRadius = singlePieOptions.outerRadius || DEFAULT_OUTER_RADIUS
  const innerRadius = singlePieOptions.innerRadius || DEFAULT_INNER_RADIUS
  const chartHeight = globalOptions.chart.size.height
  const chartWidth = globalOptions.chart.size.width
  const chartRadius = Math.min(chartHeight, chartWidth) / 2
  const pieOuterRadius = outerRadius * chartRadius
  const pieInnerRadius = innerRadius * chartRadius

  const pieScale = getPieScale()
  const arc = getArc()
  const arcTween = getArcTween()
  const arcTweenExit = getArcTweenExit()

  let pieWasEmpty = true
  const pieSegmentSelection = pie
    .selectAll('path')
    .each(function (d, i) {
      if (i < singlePieOptions.data.length) {
        singlePieOptions.data[i].previousEndAngle = d.endAngle
        singlePieOptions.data[i].previousStartAngle = d.startAngle
      }
      pieWasEmpty = false
    })

  const pieSegments = pieSegmentSelection
    .data(pieScale(singlePieOptions.data))

  const newPieSegments = pieSegments
    .enter()
    .append('path')
    .attr('class', getPieCSSClasses)

  const updatedPieSegments = pieSegments
  const allPieSegments = newPieSegments.merge(updatedPieSegments)

  allPieSegments
    .transition()
    .duration(1500)
    .attrTween('d', arcTween)

  pieSegments
    .exit()
    .transition()
    .duration(1500)
    .attrTween('d', arcTweenExit)
    .remove()

  function getPieScale () {
    return d3
      .pie()
      .sort(null)
      .value(d => d[singlePieOptions.keyForValues])
  }

  function getArcTween () {
    return function (d) {
      let newPieElementsStartAngle
      if (pieWasEmpty) {
        newPieElementsStartAngle = 0
      } else {
        newPieElementsStartAngle = 2 * Math.PI
      }
      const interpolateEndAngle = d3.interpolate(_.defaultTo(d.data.previousEndAngle, newPieElementsStartAngle), d.endAngle)
      const interpolateStartAngle = d3.interpolate(_.defaultTo(d.data.previousStartAngle, newPieElementsStartAngle), d.startAngle)

      return function (t) {
        d.startAngle = interpolateStartAngle(t)
        d.endAngle = interpolateEndAngle(t)
        return arc(d)
      }
    }
  }

  function getArcTweenExit () {
    return function (d) {
      const endAngle = 2 * Math.PI
      const interpolateEndAngle = d3.interpolate(d.endAngle, endAngle)
      const interpolateStartAngle = d3.interpolate(d.startAngle, endAngle)

      return function (t) {
        d.startAngle = interpolateStartAngle(t)
        d.endAngle = interpolateEndAngle(t)
        return arc(d)
      }
    }
  }

  function getArc () {
    return d3
      .arc()
      .innerRadius(pieInnerRadius)
      .outerRadius(pieOuterRadius)
  }

  function getPieCSSClasses (d, i) {
    const defaultClasses = [
      'geo-chart-pie-slice',
      `geo-chart-pie-slice--${i}`
    ]

    if (singlePieOptions.cssClasses) {
      const customClasses = singlePieOptions.cssClasses(defaultClasses, d, i)
      return _.uniq([...customClasses, defaultClasses[0]]).join(' ')
    }

    return defaultClasses.join(' ')
  }
}
