/// <reference types='d3' />

import _ from 'lodash'

import { getDrawingEnvironment } from '../GeoChartAxis/GeoChartAxis'

import * as axisUtils from '../GeoChartUtils/axisUtils'
import * as dimensionUtils from '../GeoChartUtils/dimensionUtils'

import { setupTooltipEventListeners } from '../GeoChartUtils/GeoChartTooltip'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @typedef {import('d3').Selection<GElement, Datum, PElement, PDatum>} d3.Selection
 */

/**
 * @template Domain
 * @typedef {import('d3').Line<Domain>} d3.Line
 */

/**
 * @typedef {import('d3').CurveGenerator} d3.CurveGenerator
 */

/**
 * @template GElement
 * @template Datum
 * @typedef {import('d3').ValueFn<GElement, Datum, void>} d3.ValueFn
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @typedef {Object} d3.Tooltip<GElement, Datum, PElement, PDatum>
 * @property {d3.ValueFn<GElement, Datum>} show
 * @property {d3.ValueFn<GElement, Datum>} hide
 * @property {Function} offset
 * @property {Function} html
 */

/**
 * @template GElement
 * @template Datum
 * @template PElement
 * @template PDatum
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {d3.Selection<GElement, Datum, PElement, PDatum>} d3Instance
 * @param {d3.Tooltip<GElement, Datum, PElement, PDatum>} [d3TipInstance]
 * @param {Array<GeoChart.SingleLineGroupConfig<HorizontalDomain, VerticalDomain>>} options
 * @param {GeoChart.GlobalOptions} globalOptions
 */

export function render (d3Instance, d3TipInstance, options, globalOptions) {

}
