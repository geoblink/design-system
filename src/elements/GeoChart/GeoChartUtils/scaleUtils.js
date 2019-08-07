import _ from 'lodash'

/**
 * @enum {string}
 */
export const SCALE_TYPES = {
  linear: 'linear',
  logarithmic: 'logarithmic',
  categorical: 'categorical',
  time: 'time'
}

/**
 * @enum {string}
 */
export const NICE_TYPES = {
  timeDay: 'timeDay',
  timeWeek: 'timeWeek',
  timeMonth: 'timeMonth',
  timeYear: 'timeYear'
}

/**
 * @param {GeoChart.AxisScale} axisScale
 * @returns {boolean}
 * @see https://github.com/d3/d3-scale#scaleBand
 */
export function isScaleBand (axisScale) {
  return !!_.get(axisScale, 'bandwidth')
}
