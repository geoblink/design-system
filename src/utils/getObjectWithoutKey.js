/**
 * Returns a new object that is a shallow copy of given one but without including
 * given key.
 *
 * @param {Object} object Object to be checked.
 * @param {string} keyToOmit Key to be omitted in the returned object.
 * @return {Object} New object with the same keys and values as the original one
 * but without given key.
 */
export default function (object, keyToOmit) {
  const newObject = {}
  for (const key in object) {
    if (key === keyToOmit) continue
    newObject[key] = object[key]
  }
  return newObject
}
