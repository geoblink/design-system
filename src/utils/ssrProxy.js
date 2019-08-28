/**
 * Returns a server-side-friendly document object.
 *
 * When this code is run outside a browser, an empty object is returned.
 *
 * @returns {object}
 */
export function getDocument () {
  return typeof document !== 'undefined'
    ? document
    : {}
}
