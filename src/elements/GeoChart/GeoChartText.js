import _ from 'lodash'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * @callback wrapTextTagsForWidth
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textTags
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
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textTags
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
 * @callback wrapTextSegmentsForWidth
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textTags
 * @param {{text: string, cssClasses?: string[]}[][]} segmentsForTags
 * @param {number} width
 */

/**
 * @returns {wrapTextSegmentsForWidth}
 */
export function wrapTextSegmentsForCSSClasses (textTags, segmentsForTags, width) {
  textTags.each(function (value, index) {
    const textSegments = segmentsForTags[index]
    makeSinglelineTextTags(this, textSegments)
  })
}

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textTag
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
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textTag
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
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textTag
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

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textTag
 * @param {{text: string, cssClasses?: string[]}[]} lines
 */
function makeSinglelineTextTags (textTag, lines) {
  if (!lines.length) return

  const d3TextTag = d3.select(textTag)

  const bbox = d3TextTag.node().getBBox()
  const { height } = bbox

  const d3TextTagParent = d3TextTag.select(function () {
    return this.parentNode
  })

  d3TextTagParent
    .selectAll('g')
    .remove()

  const group = d3TextTagParent.append('g')

  const requiredWidthOfLine = []
  for (const line of lines) {
    const requiredWidth = d3TextTag.text(line.text).node().getComputedTextLength()
    requiredWidthOfLine.push(requiredWidth)
  }
  const totalWidth = _.max(requiredWidthOfLine)

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber]
    const requiredWidth = requiredWidthOfLine[lineNumber]

    group
      .attr('class', (line.cssClasses || []).join(' '))
      .append('rect')
      .attr('height', height)
      .attr('width', requiredWidth)
      .attr('transform', `translate(${totalWidth - requiredWidth}, ${height * lineNumber - height / 2})`)

    group
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', height)
      .attr('width', requiredWidth)
      .attr('transform', `translate(${totalWidth - requiredWidth}, ${height * lineNumber})`)
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .text(line.text)
  }

  group.attr('transform', `translate(${-totalWidth}, 0)`)

  d3TextTag.text(null)
}
