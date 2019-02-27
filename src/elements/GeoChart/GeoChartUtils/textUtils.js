// TODO: Use this exported function in pieChartLabels
export function setTextContent (textElems, textOptions) {
  const tspans = textElems
    .selectAll('tspan')
    .data(function (d, i) {
      return textOptions.content(d, i)
    })

  const newtspans = tspans
    .enter()
    .append('tspan')
    .attr('class', (d) => d.cssClass)
    .text((d) => d.text)

  const updatedtspans = tspans
  updatedtspans
    .attr('class', (d) => d.cssClass)
    .text((d) => d.text)

  newtspans.merge(updatedtspans)

  tspans
    .exit()
    .remove()
}
