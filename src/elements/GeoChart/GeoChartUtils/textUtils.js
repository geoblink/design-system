/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @typedef {import('d3').Selection<GElement, Datum, PElement, PDatum>} d3.Selection
 */

/**
 * @callback GetTextContent
 * @param {Object} item
 * @param {number} index
 * @returns string[]
 */

/**
 * @typedef {Object} TextOptions
 * @property {GetTextContent} content
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} textElems
 * @param {TextOptions} textOptions
 * @param {GeoChart.GlobalOptions} globalOptions
 */
export function setTextContent (textElems, textOptions, globalOptions) {
  const tspans = textElems
    .selectAll('tspan')
    .data((d, i) => textOptions.content(d, i))

  const newtspans = tspans
    .enter()
    .append('tspan')
    .attr('class', (d) => d.cssClass)

  const updatedtspans = tspans
  const alltspans = newtspans.merge(updatedtspans)

  alltspans
    .attr('class', (d) => d.cssClass)
    .text((d) => d.text)

  tspans
    .exit()
    .transition()
    .duration(globalOptions.chart.animationsDurationInMilliseconds)
    .style('opacity', 0)
    .remove()
}
