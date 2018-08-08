/**
 * Returns the offset of given element relative to document's body.
 *
 * @param {HTMLElement} initialElement Element whose offset will be returned.
 * @returns {{left: number, top: number}} Offset of given element relative to
 * document body.
 */
export default function (initialElement) {
  const boundingRect = initialElement.getBoundingClientRect()

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top = boundingRect.top + scrollTop - clientTop
  const left = boundingRect.left + scrollLeft - clientLeft

  return {
    top: Math.round(top),
    left: Math.round(left)
  }
}
