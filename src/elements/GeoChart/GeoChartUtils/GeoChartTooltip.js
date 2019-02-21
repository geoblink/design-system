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
 * @param {object} [tooltipConfig]
 * @param {Function} tooltipConfig.getContent Function taking as parameters an
 * object and its positions in the data source and returning tooltip HTML code
 * to be rendered when hovering its value in the chart.
 * @param {Function} [tooltipConfig.getOffset] Function taking as parameters an
 * object and its positions in the data source and returning tooltip HTML code
 * to be rendered when hovering its value in the chart.
 */
export function setupTooltipEventListeners (d3Element, d3TipInstance, tooltipConfig) {
  if (d3TipInstance && tooltipConfig) {
    registerD3TipEvents(d3TipInstance, d3Element, tooltipConfig)
  } else {
    removeD3TipEvents(d3Element)
  }
}

/**
 * Registers event listeners required to show tooltips when hovering element.
 *
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3TipInstance
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Element
 * @param {object} [tooltipConfig]
 * @param {Function} tooltipConfig.getContent Function taking as parameters an
 * object and its positions in the data source and returning tooltip HTML code
 * to be rendered when hovering its value in the chart.
 * @param {Function} [tooltipConfig.getOffset] Function taking as parameters an
 * object and its positions in the data source and returning tooltip HTML code
 * to be rendered when hovering its value in the chart.
 */
function registerD3TipEvents (d3TipInstance, d3Element, tooltipConfig) {
  d3Element
    .on('mouseover.updateTooltipText', function () {
      d3TipInstance.html(getTooltipHTMLEmbeddingFactory(tooltipConfig.getContent))
    })
    .on('mousemove.updateTooltipOffset', function (event) {
      const getTooltipOffset = tooltipConfig.getOffset || getDefaultTooltipOffset
      const offset = getTooltipOffset.call(this, event)

      if (offset) {
        // It's not an error, d3Tip wants the coordinates in this order
        d3TipInstance.offset([offset.y, offset.x])
      } else {
        d3TipInstance.offset([0, 0])
      }
    })
    .on('mousemove.showTooltip', d3TipInstance.show)
    .on('mouseout.hideTooltip', d3TipInstance.hide)
}

function getDefaultTooltipOffset () {
  const mouseTopOffset = 15
  const mouse = d3.mouse(this)
  const bbox = this.getBBox()
  const xMidpoint = bbox.x + bbox.width / 2

  return {
    x: mouse[0] - xMidpoint,
    y: mouse[1] - mouseTopOffset - bbox.y
  }
}

/**
 * Cleans up previously set d3Tip-related event listeners.
 *
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Element
 */
function removeD3TipEvents (d3Element) {
  d3Element.on('mouseover.updateTooltipText', null)
  d3Element.on('mouseout.hideTooltip', null)
  d3Element.on('mousemove.updateTooltipOffset', null)
  d3Element.on('mousemove.showTooltip', null)
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
