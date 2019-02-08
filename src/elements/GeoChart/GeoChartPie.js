/// <reference types="d3" />

import _ from 'lodash'

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
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {GeoChart.PieConfig} options
 * @param {GeoChart.PieGlobalConfig} globalOptions
 */
export function render (d3Instance, options, globalOptions) {
  const pies = d3Instance
    .selectAll('g.geo-chart-pie')
    .data([{}])

  const newPies = pies
    .enter()
    .append('g')
    .attr('class', 'geo-chart-pie')
    .attr('transform', 'translate(' + (globalOptions.chart.chartWidth / 2) + ',' + (globalOptions.chart.chartHeight / 2) + ')')

  const updatedPies = pies

  const allPies = newPies.merge(updatedPies)

  // We use forEach to get the 'this' of the pie although we know we'll always have 1 for now.
  allPies.each(function () {
    const pie = d3.select(this)
    renderSinglePie(pie, options, globalOptions)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} pie
 * @param {GeoChart.PieConfig} singlePieOptions
 * @param {GeoChart.PieGlobalConfig} globalOptions
 */
function renderSinglePie (pie, singlePieOptions, globalOptions) {
  let pieWasEmpty = true
  const pieScale = getPieScale()
  const pieScaleData = pieScale(singlePieOptions.data)
  const arc = getArc()
  const arcTween = getArcTween()
  const arcTweenExit = getArcTweenExit()

  const pieSegments = pie
    .selectAll('path')
    // In the first iteration of the pie we won't have any element yet and the forEach is ignored.
    // But if data is updated, we need to save the angles of the current slices to animate them later.
    .each(function (d, i) {
      if (i < singlePieOptions.data.length) {
        pieScaleData[i].previousEndAngle = d.endAngle
        pieScaleData[i].previousStartAngle = d.startAngle
      }
      pieWasEmpty = false
    })
    .data(pieScaleData)

  const newPieSegments = pieSegments
    .enter()
    .append('path')
    .attr('class', getPieCSSClasses)

  const updatedPieSegments = pieSegments
  const allPieSegments = newPieSegments.merge(updatedPieSegments)

  allPieSegments
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attrTween('d', arcTween)

  pieSegments
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
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
      const interpolateEndAngle = d3.interpolate(_.defaultTo(d.previousEndAngle, newPieElementsStartAngle), d.endAngle)
      const interpolateStartAngle = d3.interpolate(_.defaultTo(d.previousStartAngle, newPieElementsStartAngle), d.startAngle)

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
      .innerRadius(singlePieOptions.innerRadius)
      .outerRadius(singlePieOptions.outerRadius)
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
