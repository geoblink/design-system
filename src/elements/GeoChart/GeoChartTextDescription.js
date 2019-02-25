import _ from 'lodash'

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

    const customCSSClasses = _.isFunction(options.cssClasses)
      ? options.cssClassesGroups(defaultGroupCSSClasses)
      : defaultGroupCSSClasses

    return customCSSClasses
  }
}

function renderSingleGroup (group, singleOptions, globalOptions) {
  const textOptions = singleOptions.textOptions
  const textGroups = group
    .selectAll('text')
    .data(singleOptions.data)

  const newTextGroups = textGroups
    .enter()
    .append('text')
    .attr('class', 'TODO-getclass')
    .attr('dominant-baseline', 'central')
    .attr('text-anchor', singleOptions.textAnchor)
    .attr('y', singleOptions.getTextPositionMainDirection)

  const updatedTextGroups = textGroups
  updatedTextGroups
    .attr('text-anchor', singleOptions.textAnchor)
    .attr('y', singleOptions.getTextPositionMainDirection)

  textGroups
    .exit()
    // .transition()
    // .duration(globalOptions.chart.animationsDurationInMilliseconds)
    // .style('opacity', 0)
    .remove()

  const allTextGroups = newTextGroups.merge(updatedTextGroups)

  setTextContent(allTextGroups)
  setTextContentLineBreaks(allTextGroups)

  var heights = []
  var preferredPositions = []
  allTextGroups.each(function () {
    heights.push(this.getBBox().height)
    preferredPositions.push(this.getBBox().y)
  })

  console.log(heights)
  console.log(preferredPositions)
  var positions = computeLabelPositions(heights, preferredPositions, 0, singleOptions.range[1], singleOptions.range[0])
  console.log(positions)

  setTextElementsGroupsPosition(allTextGroups, positions)

  function setTextContent (groups) {
    const tspans = groups
      .selectAll('tspan')
      .data(function (d, i) {
        return textOptions.content(d, i)
      })

    const newtspans = tspans
      .enter()
      .append('tspan')
      .attr('class', 'TODO-getlcass')
      .text(function (d) {
        return d.text
      })

    const updatedtspans = tspans
    updatedtspans
      .text(function (textD) {
        return textD.text
      })

    newtspans.merge(updatedtspans)

    tspans
      .exit()
      .remove()
  }

  function setTextContentLineBreaks (groups) {
    const lineHeight = 18
    groups.each(function (d, i) {
      const tspans = d3.select(this).selectAll('tspan')
      tspans.each(function (d, i) {
        if (d.newLine) {
          d3.select(this).attr('dy', lineHeight * i)
          d3.select(this).attr('x', 0)
        }
      })
    })
  }

  function setTextElementsGroupsPosition (groups, positions) {
    groups.each(function (d, i) {
      var textGroup = d3.select(this)
      if (i < positions.length) {
        var y = positions[i]
        // textGroup.select('text')
        // .attr('transform', `translate(${xOffset}, ${y + singleOptions.margin})`)
        // textGroup.attr('y', y)
      } else {
        // textGroup.remove()
      }
    })
  }
}

/**
 * @param {Array<Number>} heights
 * @param {Array<Number>} preferredPositions
 * @param {Number} textGroupMargin
 * @param {Number} maxY
 * @param {Number} minY
 * @returns {Array<Number>} positions
 */

function computeLabelPositions (heights, preferredPositions, textGroupMargin, maxY, minY) {
  var positions = []
  var initialMaxY = maxY
  for (var i = 0; i < heights.length; i++) {
    var heightWithMargin = heights[i] + 2 * textGroupMargin
    var lowerY = preferredPositions[i] - heightWithMargin / 2
    var upperY = lowerY + heightWithMargin
    if (upperY > maxY) {
      lowerY = maxY - heightWithMargin
      upperY = lowerY + heightWithMargin
    }
    if (lowerY < minY) {
      lowerY = minY
      upperY = lowerY + heightWithMargin
      var tentativeChangePositions = [] // use alternative array in case it is not possible to relocate
      var isBackFixed = false // fix backwards if we can
      var j = i
      tentativeChangePositions[j] = minY // position has to be at least minY
      for (j = i - 1; j >= 0; j--) {
        var currentPosition = positions[j]
        var backPressurePosition = tentativeChangePositions[j + 1]
        var backPressureHeightWithMargin = heights[j + 1] + 2 * textGroupMargin
        var upperBackPressureY = backPressurePosition + backPressureHeightWithMargin
        if (upperBackPressureY < currentPosition) {
          isBackFixed = true
          break
        } else {
          tentativeChangePositions[j] = upperBackPressureY
        }
      }
      // We moved everything and last one is correct
      if (j === -1 && !isBackFixed) {
        var firstElementHeightWithMargin = heights[0] + 2 * textGroupMargin
        if (tentativeChangePositions[0] + firstElementHeightWithMargin < initialMaxY) {
          isBackFixed = true
        }
      }

      if (isBackFixed) {
        // copy tentative possitions since it was successful
        // j is the index where we checked everything is good, so don't need to change j
        for (var k = j + 1; k <= i; k++) {
          positions[k] = tentativeChangePositions[k]
        }
      } else {
        // bail out we don't set anything further
        return positions
      }
    }
    maxY = lowerY
    positions[i] = lowerY
  }
  return positions
}
