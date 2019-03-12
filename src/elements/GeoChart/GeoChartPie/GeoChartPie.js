/// <reference types="d3" />

import _ from 'lodash'
import { setupTooltipEventListeners } from '../GeoChartUtils/GeoChartTooltip'
import { setupTextDescriptions } from '../GeoChartUtils/GeoChartTextDescription'
import { ALGORITHMS } from '../GeoChartUtils/GeoChartTextDescriptionUtils'

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
    renderSinglePie(pie, d3Instance, d3TipInstance, options, globalOptions)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} pie
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {GeoChart.PieConfig} singlePieOptions
 * @param {GeoChart.PieGlobalConfig} globalOptions
 */
function renderSinglePie (pie, d3Instance, d3TipInstance, singlePieOptions, globalOptions) {
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

  if (singlePieOptions.text) {
    renderTexts(allPieSegments, d3Instance, singlePieOptions, globalOptions, arc)
  }

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

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} allPieSegments
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {GeoChart.PieConfig} singlePieOptions
 * @param {GeoChart.PieGlobalConfig} globalOptions
 */
function renderTexts (allPieSegments, d3Instance, singlePieOptions, globalOptions) {
  const keyForTextId = 'pieIndex'
  const rightGroup = []
  const leftGroup = []
  // Arc inside the pie for the starter point of the lines
  const innerPointArc = d3.arc()
    .innerRadius(singlePieOptions.outerRadius * 0.8)
    .outerRadius(singlePieOptions.outerRadius * 0.8)
  // Arc out of the pie to get the points where the texts and lines should be placed
  const outerPointArc = d3.arc()
    .innerRadius(singlePieOptions.outerRadius * 1.1)
    .outerRadius(singlePieOptions.outerRadius * 1.1)

  allPieSegments
    .each(function (d, i) {
      // It's alright to modify this d since this is the d provided by d3 pie, not the one by the user.
      d[keyForTextId] = i
      if (midAngle(d) < Math.PI) {
        rightGroup.push(d)
      } else {
        leftGroup.push(d)
      }
    })

  // reverse is needed on the rightGroup because the positioning algorithm
  // requires the Y's to be in desc order.
  _.reverse(rightGroup)

  const textOffset = singlePieOptions.outerRadius + 20
  const midChartWidth = globalOptions.chart.chartWidth / 2
  const midChartHeight = globalOptions.chart.chartHeight / 2
  const startPositionRight = [midChartWidth + textOffset, midChartHeight]
  const startPositionLeft = [midChartWidth - textOffset, midChartHeight]

  const commonSettings = {
    keyForId: keyForTextId,
    textOptions: singlePieOptions.text,
    getTextPositionMainDirection: getTextPositionMainDirection,
    minY: -midChartHeight,
    maxY: midChartHeight,
    algorithm: ALGORITHMS.withoutReadjustment
  }

  const textDescriptionSettingsRight = _.assign({}, commonSettings, {
    data: rightGroup,
    startPosition: startPositionRight,
    textAnchor: 'start'
  })

  const textDescriptionSettingsLeft = _.assign({}, commonSettings, {
    data: leftGroup,
    startPosition: startPositionLeft,
    textAnchor: 'end'
  })

  const newSettings = [textDescriptionSettingsRight, textDescriptionSettingsLeft]

  const dataWithPositions = setupTextDescriptions(newSettings, d3Instance, globalOptions)

  addPolylines()

  function getTextPositionMainDirection (d, i) {
    const centroid = outerPointArc.centroid(d)
    const yPos = centroid[1]
    return yPos
  }

  function midAngle (d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2
  }

  function addPolylines () {
    const groups = d3Instance
      .selectAll('g.geo-chart-polylines')
      .data(dataWithPositions)

    const newGroups = groups
      .enter()
      .append('g')
      .attr('class', 'geo-chart-polylines')

    groups
      .exit()
      .transition()
      .duration(globalOptions.chart.animationsDurationInMilliseconds)
      .attr('opacity', 0)
      .remove()

    const updatedGroups = groups
    const allGroups = newGroups.merge(updatedGroups)

    allGroups.each(function (singleData, i) {
      const group = d3.select(this)
      const polylinePoints = getPolylinePointsFactory(newSettings[i])

      const polylines = group
        .selectAll('polyline')
        .data(singleData, function (d) {
          return d.data[commonSettings.keyForId]
        })

      const newPolylines = polylines
        .enter()
        .append('polyline')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('opacity', 0)

      newPolylines
        .transition()
        .duration(globalOptions.chart.animationsDurationInMilliseconds)
        .attr('opacity', 1)

      const updatedPolylines = polylines
      const allPolylines = newPolylines.merge(updatedPolylines)

      allPolylines
        .transition()
        .duration(globalOptions.chart.animationsDurationInMilliseconds)
        .attr('points', polylinePoints)
        .attr('opacity', 1)

      polylines
        .exit()
        .transition()
        .duration(globalOptions.chart.animationsDurationInMilliseconds)
        .attr('opacity', 0)
        .remove()
    })
  }

  function getPolylinePointsFactory (settings) {
    const spaceOffset = 5
    const xPos = settings.startPosition[0]

    return function (d) {
      // Space between the line and the text
      const xPosOffset = midAngle(d.data) < Math.PI ? -spaceOffset : spaceOffset
      const [innerPointX, innerPointY] = innerPointArc.centroid(d.data)
      const [outerPointX, outerPointY] = outerPointArc.centroid(d.data)

      // Position the points with respect to the middle of the chart
      const innerPoint = [innerPointX + midChartWidth, innerPointY + midChartHeight]
      const outerPoint = [outerPointX + midChartWidth, outerPointY + midChartHeight]
      const textPoint = [xPos + xPosOffset, outerPointY + midChartHeight]

      return [innerPoint, outerPoint, textPoint]
    }
  }
}
