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

    const customCSSClasses = _.isFunction(options.cssClassesGroups)
      ? options.cssClassesGroups(defaultGroupCSSClasses)
      : defaultGroupCSSClasses

    return customCSSClasses
  }
}

function renderSingleGroup (group, singleOptions, globalOptions) {
  const textOptions = singleOptions.textOptions
  const margin = _.get(singleOptions.textOptions, 'margin', 0)
  const textGroups = group
    .selectAll('text')
    .data(singleOptions.data)

  const newTextGroups = textGroups
    .enter()
    .append('text')
    .attr('class', getCSSClassesTexts)
    .attr('dominant-baseline', 'text-before-edge')
    .attr('text-anchor', singleOptions.textAnchor)
    .attr('y', 0)

  newTextGroups
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .attr('y', singleOptions.getTextPositionMainDirection)

  const updatedTextGroups = textGroups
  updatedTextGroups
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
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
  allTextGroups.each(function (d) {
    heights.push(this.getBBox().height)
    preferredPositions.push(this.getBBox().y)
    console.log(d.data.value)
    console.log(this.getBBox())
  })

  // console.log(heights)
  // console.log(preferredPositions)
  // var positions = computeLabelPositions(heights, preferredPositions, margin, singleOptions.range[1], singleOptions.range[0])
  // console.log(positions)

  // setTextElementsGroupsPosition(allTextGroups, positions)

  function setTextContent (groups) {
    const tspans = groups
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
        textGroup.attr('y', y)
      } else {
        // textGroup.remove()
      }
    })
  }

  function getCSSClassesTexts (options, i) {
    const defaultCSSClasses = ['geo-chart-text-descriptions__text']

    const customCSSClasses = _.isFunction(options.cssClassesTexts)
      ? options.cssClassesTexts(defaultCSSClasses)
      : defaultCSSClasses

    return customCSSClasses
  }
}
