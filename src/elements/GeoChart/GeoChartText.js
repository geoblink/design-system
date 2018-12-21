import _ from 'lodash'
import * as d3 from 'd3'

/**
 * @callback wrapTextTagsForWidth
 * @param {d3.Selection<any, any, null, undefined>} textTags
 * @param {number} width
 */

/**
 * @returns {wrapTextTagsForWidth}
 */
export function wrapTextTagsForWidthFactory () {
  const cache = {}

  return function (textTags, width) {
    textTags.each(function () {
      const d3TextTag = d3.select(this)
      const text = d3TextTag.text()

      const cachePath = [text, width]

      const cachedLines = _.get(cache, cachePath) || getRequiredLinesForTextTag(this, width)
      _.set(cache, cachePath, cachedLines)

      makeMultilineTextTag(this, cachedLines)
    })
  }
}

/**
 * @callback wrapTextSegmentsForWidth
 * @param {d3.Selection<any, any, null, undefined>} textTags
 * @param {string[][]} segmentsForTags
 * @param {number} width
 */

/**
 * @returns {wrapTextSegmentsForWidth}
 */
export function wrapTextSegmentsForWidthFactory () {
  const cache = {}

  return function (textTags, segmentsForTags, width) {
    textTags.each(function (value, index) {
      const textSegments = segmentsForTags[index]

      const cachePath = [JSON.stringify(textSegments), width]

      const cachedLines = _.get(cache, cachePath) || getRequiredLinesForTextSegments(this, textSegments, width)
      _.set(cache, cachePath, cachedLines)

      makeMultilineTextTag(this, cachedLines)
    })
  }
}

/**
 * @param {d3.Selection<any, any, null, undefined>} textTag
 * @param {number} width
 * @returns {string[]}
 */
function getRequiredLinesForTextTag (textTag, width) {
  const d3TextTag = d3.select(textTag)
  const originalText = d3TextTag.text()
  const words = originalText.split(/\s+/)

  return getRequiredLinesForTextSegments(textTag, words, width)
}

/**
 * @param {d3.Selection<any, any, null, undefined>} textTag
 * @param {string[]} textSegments
 * @param {number} width
 * @returns {string[]}
 */
function getRequiredLinesForTextSegments (textTag, textSegments, width) {
  const d3TextTag = d3.select(textTag)
  const originalText = d3TextTag.text()
  const segments = [...textSegments].reverse()

  if (!segments.length) return []

  const y = d3TextTag.attr('y')
  const dy = parseFloat(d3TextTag.attr('dy') || 0)

  d3TextTag.text(null)

  const tspan = d3TextTag
    .append('tspan')
    .attr('x', 0)
    .attr('y', y)
    .attr('dy', `${dy}em`)

  const lines = [[segments.pop()]]

  while (segments.length) {
    const currentSegment = segments.pop()
    const currentLine = _.last(lines)

    // We attempt to add next segment to current line...
    currentLine.push(currentSegment)
    tspan.text(currentLine.join(' '))

    // ... if line is wider than limited width then last segment must be in next line
    if (tspan.node().getComputedTextLength() > width) {
      currentLine.pop()
      lines.push([currentSegment])
    }
  }

  tspan.remove()
  d3TextTag
    .text(originalText)
    .attr('y', y)
    .attr('dy', `${dy}em`)

  return _.map(lines, line => line.join(' '))
}

/**
 * @param {d3.Selection<any, any, null, undefined>} textTag
 * @param {string[]} lines
 */
function makeMultilineTextTag (textTag, lines) {
  if (!lines.length) return

  const d3TextTag = d3.select(textTag)

  const y = d3TextTag.attr('y')
  const dy = parseFloat(d3TextTag.attr('dy') || 0.32)

  d3TextTag
    .text(null)
    .attr('dy', `${dy}em`)

  // First line is special because it does not need line-height translation
  getNewTspan()
    .attr('dy', `${dy}em`)
    .text(_.first(lines))

  const lineHeight = 1.1 // ems
  for (const line of _.tail(lines)) {
    getNewTspan()
      .attr('dy', `${lineHeight + dy}em`)
      .text(line)
  }

  function getNewTspan () {
    return d3TextTag
      .append('tspan')
      .attr('x', 0)
      .attr('y', y)
  }
}
