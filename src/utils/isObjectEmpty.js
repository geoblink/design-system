/**
 * Returns `true` if the object has no values.
 * @param {Object} object Object to be checked
 * @returns {boolean} `true` if the object has no values
 */
export default function (object) {
  return Object.keys(object).length === 0
}
