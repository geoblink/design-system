/// <reference path="../GeoChart.d.ts" />

import _ from 'lodash'

import * as axisUtils from './axisUtils'
import * as dimensionUtils from './dimensionUtils'
import * as numericUtils from './numericUtils'
import * as scaleUtils from './scaleUtils'

export const DEFAULT_WIDTH = 10

/**
 * Returns the span (width or height) of given value in given axis, also
 * considering if there's a width overriden.
 *
 * @template Domain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @param {GeoChart.BidimensionalGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @param {object} keysConfig
 * @param {string} keysConfig.keyForWidth
 * @param {string} keysConfig.keyForNaturalWidth
 * @return {number}
 */
export function getItemSpanAtAxis (axisConfig, singleItem, options, keysConfig) {
  if (
    !axisUtils.isMainDimensionAxis(axisConfig, options) &&
    numericUtils.isNumberForced(options, keysConfig.keyForWidth)
  ) {
    return options[keysConfig.keyForWidth]
  }

  if (scaleUtils.isScaleBand(axisConfig.scale.axisScale)) {
    const widthForOneNaturalUnit = axisConfig.scale.axisScale.bandwidth()
    const naturalUnitsForWidth = axisUtils.isMainDimensionAxis(axisConfig, options)
      ? 1
      : _.get(options, keysConfig.keyForNaturalWidth, 1)

    return widthForOneNaturalUnit * naturalUnitsForWidth
  }

  const spanEndPoint = getSpanEndPoint(axisConfig, singleItem, options, keysConfig)
  const spanOriginPoint = getSpanOriginPoint(axisConfig, singleItem, options, keysConfig)

  return Math.abs(spanEndPoint - spanOriginPoint)
}

/**
 * @template Domain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @param {GeoChart.BidimensionalGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @param {object} keysConfig
 * @param {string} keysConfig.keyForWidth
 * @param {string} keysConfig.keyForNaturalWidth
 * @return {number}
 */
function getSpanOriginPoint (axisConfig, singleItem, options, keysConfig) {
  const positionAtAxisOrigin = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const positionAtValue = axisUtils.getItemValueAtAxis(axisConfig, singleItem)

  if (!axisUtils.isMainDimensionAxis(axisConfig, options)) {
    if (numericUtils.isNumberForced(options, keysConfig.keyForNaturalWidth)) {
      return axisUtils.getItemValueAtAxis(axisConfig, {
        [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) - options[keysConfig.keyForNaturalWidth] / 2
      })
    }

    // By default bars will have a width of 10px in non-band scales so they
    // start 5px below the anchor point.
    return positionAtValue - _.get(options, keysConfig.keyForWidth, DEFAULT_WIDTH) / 2
  }

  return positionAtAxisOrigin
}

/**
 * @template Domain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @param {GeoChart.BidimensionalGroupConfig<HorizontalDomain, VerticalDomain>} [options]
 * @param {object} keysConfig
 * @param {string} keysConfig.keyForWidth
 * @param {string} keysConfig.keyForNaturalWidth
 * @return {number}
 */
function getSpanEndPoint (axisConfig, singleItem, options, keysConfig) {
  const positionAtValue = axisUtils.getItemValueAtAxis(axisConfig, singleItem)

  if (!axisUtils.isMainDimensionAxis(axisConfig, options)) {
    if (numericUtils.isNumberForced(options, keysConfig.keyForNaturalWidth)) {
      return axisUtils.getItemValueAtAxis(axisConfig, {
        [axisConfig.keyForValues]: _.get(singleItem, axisConfig.keyForValues) + options[keysConfig.keyForNaturalWidth] / 2
      })
    }

    // By default bars will have a width of 10px in non-band scales so they
    // start 5px below the anchor point.
    return positionAtValue + _.get(options, keysConfig.keyForWidth, DEFAULT_WIDTH) / 2
  }

  return positionAtValue
}

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {boolean}
 */
function isBarAxisLengthIncreasing (axisConfig, singleItem) {
  const originPosition = axisConfig.scale.axisScale(axisConfig.scale.valueForOrigin)
  const valuePosition = axisUtils.getItemValueAtAxis(axisConfig, singleItem)
  return originPosition <= valuePosition
}

/**
 * @template Domain
 * @callback getTranslationForNormalAxis
 * @param {GeoChart.AxisConfig<Domain>} normalAxis
 * @param {object} singleItem
 * @returns {number}
 */

/**
 * @template Domain
 * @callback GetOriginPositionAtAxis
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @returns {number}
 */

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @param {object} params
 * @param {string} params.keyForWidth
 * @param {string} params.keyForNaturalWidth
 * @param {getTranslationForNormalAxis<HorizontalDomain | VerticalDomain>} params.getTranslationForNormalAxis
 * @param {string} params.componentName
 * @param {GetOriginPositionAtAxis<HorizontalDomain | VerticalDomain>} params.getOriginPositionAtAxis
 * @returns {Function}
 */
export function getItemTranslationFactory (options, {
  keyForWidth,
  keyForNaturalWidth,
  getTranslationForNormalAxis,
  componentName,
  getOriginPositionAtAxis
}) {
  return function (singleItem, index) {
    const horizontalAxis = options.axis.horizontal
    const verticalAxis = options.axis.vertical

    const originHorizontalPosition = getOriginPositionAtAxis(horizontalAxis, singleItem)
    const originVerticalPosition = getOriginPositionAtAxis(verticalAxis, singleItem)

    const valueHorizontalSpan = getItemSpanAtAxis(horizontalAxis, singleItem, options, {
      keyForWidth,
      keyForNaturalWidth
    })
    const valueVerticalSpan = getItemSpanAtAxis(verticalAxis, singleItem, options, {
      keyForWidth,
      keyForNaturalWidth
    })

    const isBarHorizontalLengthIncreasing = isBarAxisLengthIncreasing(horizontalAxis, singleItem)
    const isBarVerticalLengthIncreasing = isBarAxisLengthIncreasing(verticalAxis, singleItem)

    const horizontalAxisTranslationForDimension = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: isBarHorizontalLengthIncreasing
        ? originHorizontalPosition
        : originHorizontalPosition - valueHorizontalSpan,
      [dimensionUtils.DIMENSIONS_2D.vertical]: getTranslationForNormalAxis(horizontalAxis, singleItem)
    }

    const verticalAxisTranslationForDimension = {
      [dimensionUtils.DIMENSIONS_2D.horizontal]: getTranslationForNormalAxis(verticalAxis, singleItem),
      [dimensionUtils.DIMENSIONS_2D.vertical]: isBarVerticalLengthIncreasing
        ? originVerticalPosition
        : originVerticalPosition - valueVerticalSpan
    }

    const horizontalAxisTranslation = horizontalAxisTranslationForDimension[options.mainDimension]
    const verticalAxisTranslation = verticalAxisTranslationForDimension[options.mainDimension]

    if (!_.isFinite(horizontalAxisTranslation)) {
      throw new Error(`GeoChart (${componentName}) [component] :: Wrong translation in x-axis. Check that item ${index} has a proper value for key «${horizontalAxis.keyForValues}» (currently it is «${_.get(singleItem, horizontalAxis.keyForValues)}»). Alternatively, change the horizontal axis (currently set to «${horizontalAxis.id}»). This could also happen if the axis has an invalid valueForOrigin (currently it is «${horizontalAxis.scale.valueForOrigin}»).`)
    }

    if (!_.isFinite(verticalAxisTranslation)) {
      throw new Error(`GeoChart (${componentName}) [component] :: Wrong translation in y-axis. Check that item ${index} has a proper value for key «${verticalAxis.keyForValues}» (currently it is «${_.get(singleItem, verticalAxis.keyForValues)}»). Alternatively, change the vertical axis (currently set to ${verticalAxis.id}). This could also happen if the axis has an invalid valueForOrigin (currently it is «${verticalAxis.scale.valueForOrigin}»).`)
    }

    return {
      x: horizontalAxisTranslation,
      y: verticalAxisTranslation
    }
  }
}
