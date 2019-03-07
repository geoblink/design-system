export function setTextContent (textElems, textOptions, globalOptions) {
  const tspans = textElems
    .selectAll('tspan')
    .data(function (d, i) {
      return textOptions.content(d, i)
    })

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
