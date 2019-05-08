import _ from 'lodash'

/**
 * @enum {string}
 */
export const SCALE_TYPES = {
  linear: 'linear',
  logarithmic: 'logarithmic',
  categorical: 'categorical'
}

/**
 * @param {GeoChart.AxisScale} axisScale
 * @returns {boolean}
 * @see https://github.com/d3/d3-scale#scaleBand
 */
export function isScaleBand (axisScale) {
  return !!_.get(axisScale, 'bandwidth')
}
