const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * Sets up `d3TipInstance` to be displayed when `d3Element` is hovered.
 *
 * **Note:** If `d3TipInstance` or `getHTMLCode` are falsy, events set by a
 * previous call to this method with the same `d3Element` will be removed.
 *
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Element
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {Function} [getHTMLCode] Function taking as parameters an object and its
 * positions in the data source and returning tooltip HTML code to be rendered
 * when hovering its value in the chart.
 */
export function setupTooltipEventListeners (d3Element, d3TipInstance, getHTMLCode) {
  if (d3TipInstance && getHTMLCode) {
    registerD3TipEvents(d3TipInstance, d3Element, getHTMLCode)
  } else {
    removeD3TipEvents(d3Element)
  }
}

/**
 * Sets up `d3TipInstance` to be displayed when `d3Element` is hovered and
 * update the position on mouse movements.
 *
 * **Note:** If `d3TipInstance` or `getHTMLCode` are falsy, events set by a
 * previous call to this method with the same `d3Element` will be removed.
 *
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Element
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {Function} [getHTMLCode] Function taking as parameters an object and its
 * positions in the data source and returning tooltip HTML code to be rendered
 * when hovering its value in the chart.
 */
export function setupDynamicTooltipEventListeners (d3Element, d3TipInstance, getHTMLCode) {
  if (d3TipInstance && getHTMLCode) {
    registerD3DynamicTipEvents(d3TipInstance, d3Element, getHTMLCode)
  } else {
    removeD3TipEvents(d3Element)
  }
}

/**
 * Registers event listeners required to show tooltips when hovering element
 * and then updating the tooltip offset according to the mouse position.
 *
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3TipInstance
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Element
 * @param {Function} getHTMLCode Function taking as parameters an object and its
 * positions in the data source and returning tooltip HTML code to be rendered
 * when hovering its value in the chart.
 */
function registerD3DynamicTipEvents (d3TipInstance, d3Element, getHTMLCode) {
  d3Element
    .on('mouseover.updateTooltipText', function () {
      d3TipInstance.html(getTooltipHTMLEmbeddingFactory(getHTMLCode))
    })
    .on('mousemove.updateTooltipOffset', function () {
      const mouseTopOffset = 15
      const mouse = d3.mouse(this)
      const bbox = this.getBBox()
      const midpoint = [ bbox.x + bbox.width / 2, bbox.y + bbox.height / 2 ]
      d3TipInstance.offset([mouse[1] - mouseTopOffset - bbox.y, -midpoint[0] + mouse[0]])
    })
    .on('mousemove.updateTooltipPosition', d3TipInstance.show)
    .on('mouseout.hideTooltip', d3TipInstance.hide)
}

/**
 * Registers event listeners required to show tooltips when hovering element.
 *
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3TipInstance
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Element
 * @param {Function} getHTMLCode Function taking as parameters an object and its
 * positions in the data source and returning tooltip HTML code to be rendered
 * when hovering its value in the chart.
 */
function registerD3TipEvents (d3TipInstance, d3Element, getHTMLCode) {
  d3Element
    .on('mouseover.updateTooltipText', function () {
      d3TipInstance.html(getTooltipHTMLEmbeddingFactory(getHTMLCode))
    })
    .on('mouseover.showTooltip', d3TipInstance.show)
    .on('mouseout.hideTooltip', d3TipInstance.hide)
}

/**
 * Cleans up previously set d3Tip-related event listeners.
 *
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Element
 */
function removeD3TipEvents (d3Element) {
  d3Element.on('mouseover.updateTooltipText', null)
  d3Element.on('mouseover.showTooltip', null)
  d3Element.on('mouseover.hideTooltip', null)
  d3Element.on('mousemove.updateTooltipOffset', null)
  d3Element.on('mousemove.updateTooltipPosition', null)
}

/**
 * Returns a function that can be fed to `d3Tip.html` in order to set up
 * tooltip's content while avoiding boilerplate to style it up to look like a
 * `vue-directive-tooltip`.
 *
 * @param {Function} getHTMLCode Function taking as parameters an object and its
 * positions in the data source and returning tooltip HTML code to be rendered
 * when hovering its value in the chart.
 * @returns {Function} `d3Tip.html()`-compatible function.
 */
function getTooltipHTMLEmbeddingFactory (getHTMLCode) {
  return function (d, i) {
    const htmlCode = getHTMLCode(d, i)
    return getTooltipHTMLEmbedding(htmlCode)
  }
}

/**
 * Returns proper HTML for chart tooltip, including arrow and content wrapper.
 *
 * @param {string} htmlCode HTML code to be used as content of the tooltip
 * @returns {string} HTML code for tooltip, including arrow.
 */
function getTooltipHTMLEmbedding (htmlCode) {
  return `<div class="geo-chart-tooltip__content">${htmlCode}</div><div class="geo-chart-tooltip__arrow"></div>`
}
