import _ from 'lodash'

/**
 * @param {any} [options]
 * @param {string} [key]
 * @return {boolean}
 */
export function isNumberForced (options, key) {
  return _.isFinite(_.get(options, key))
}
