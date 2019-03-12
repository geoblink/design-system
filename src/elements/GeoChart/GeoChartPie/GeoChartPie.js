/// <reference types="d3" />

import _ from 'lodash'
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
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {GeoChart.PieConfig} options
 * @param {GeoChart.PieGlobalConfig} globalOptions
 */
export function render (d3Instance, d3TipInstance, options, globalOptions) {
  const pies = d3Instance
    .selectAll('g.geo-chart-pie')
    .data([{}])

  const newPies = pies
    .enter()
    .append('g')

  const updatedPies = pies

  const allPies = newPies.merge(updatedPies)
  allPies
    .attr('class', 'geo-chart-pie')
    .attr('transform', `translate(${((globalOptions.chart.chartWidth + globalOptions.chart.margin.left - globalOptions.chart.margin.right) / 2)}, ${((globalOptions.chart.chartHeight + globalOptions.chart.margin.top - globalOptions.chart.margin.bottom) / 2)})`)
  // We use forEach to get the 'this' of the pie although we know we'll always have 1 for now.
  allPies.each(function () {
    const pie = d3.select(this)
    renderSinglePie(pie, d3TipInstance, options, globalOptions)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} pie
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {GeoChart.PieConfig} singlePieOptions
 * @param {GeoChart.PieGlobalConfig} globalOptions
 */
function renderSinglePie (pie, d3TipInstance, singlePieOptions, globalOptions) {
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

  setupTooltipEventListeners(allPieSegments, d3TipInstance, singlePieOptions.tooltip)

  function getPieScale () {
    return d3
      .pie()
      .sort(null)
      .value(d => d[singlePieOptions.keyForValues])
  }

  function getArcTween () {
    return function (d) {
      // The animation of a new pie will be clockwise (from 0 to angle)
      // If the pie is updated with new slices, those slices will be animated counterclockwise, meaning that
      // the existing elements will adapt their width and the new ones will grow from the left (from 2 * Math.PI to angle).
      const newPieElementsStartAngle = pieWasEmpty ? 0 : 2 * Math.PI

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
      // If the pie is updated with no data, all the slices will shrink and dissapear towards the right.
      // If only some of the slices are no longer in the pie, those slices will shrink and dissapear towards the left.
      const endAngle = !pieScaleData.length ? 0 : 2 * Math.PI

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
