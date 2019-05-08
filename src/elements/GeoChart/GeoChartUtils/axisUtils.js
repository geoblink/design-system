/// <reference path="../GeoChart.d.ts" />

import _ from 'lodash'

import * as axisUtils from './axisUtils'
import * as dimensionUtils from './dimensionUtils'
import * as numericUtils from './numericUtils'
import * as scaleUtils from './scaleUtils'

export const POSITIONS = {
  bottom: 'bottom',
  top: 'top',
  left: 'left',
  right: 'right',
  verticallyCenteredInTheMiddle: 'verticallyCenteredInTheMiddle',
  horizontallyCenteredInTheMiddle: 'horizontallyCenteredInTheMiddle',
  anchoredToAxis: 'anchoredToAxis'
}

export const SIMPLE_POSITIONS = {
  [POSITIONS.bottom]: POSITIONS.bottom,
  [POSITIONS.top]: POSITIONS.top,
  [POSITIONS.left]: POSITIONS.left,
  [POSITIONS.right]: POSITIONS.right,
  [POSITIONS.verticallyCenteredInTheMiddle]: POSITIONS.verticallyCenteredInTheMiddle,
  [POSITIONS.horizontallyCenteredInTheMiddle]: POSITIONS.horizontallyCenteredInTheMiddle
}

/**
 * @template Domain
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {GeoChart.BidimensionalGroupConfig<Domain | HorizontalDomain, Domain | VerticalDomain>} [options]
 * @return {boolean}
 */
export function isMainDimensionAxis (axisConfig, options) {
  if (!options) return false

  const axisForMainDimension = {
    [dimensionUtils.DIMENSIONS_2D.horizontal]: options.axis.horizontal,
    [dimensionUtils.DIMENSIONS_2D.vertical]: options.axis.vertical
  }

  return axisForMainDimension[options.mainDimension] === axisConfig
}

/**
 * @template NormalDomain
 * @callback GetOffsetForItem
 * @param {GeoChart.AxisConfig<NormalDomain>} normalAxis
 * @param {any} singleItem
 */

/**
 * @template HorizontalDomain
 * @template VerticalDomain
 * @param {GeoChart.SingleBarGroupConfig<HorizontalDomain, VerticalDomain> | GeoChart.SingleColorBarGroupConfig<HorizontalDomain, VerticalDomain>} options
 * @param {object} keysConfig
 * @param {string} keysConfig.keyForNormalOffset
 * @param {string} keysConfig.keyForNaturalNormalOffset
 * @return {GetOffsetForItem<HorizontalDomain | VerticalDomain>}
 */
export function getTranslationForNormalAxisFactory (options, { keyForNormalOffset, keyForNaturalNormalOffset }) {
  return function (normalAxis, singleItem) {
    // By default we don't want to add any additional translation to be bars
    // apart from the one required to position it respect to their value in the
    // normal axis
    const naturalNormalOffset = numericUtils.isNumberForced(options, keyForNaturalNormalOffset)
      ? options.naturalNormalOffset
      : 0
    const positionOfItemValue = axisUtils.getItemValueAtAxis(normalAxis, singleItem)

    if (scaleUtils.isScaleBand(normalAxis.scale.axisScale)) {
      const normalOffset = numericUtils.isNumberForced(options, keyForNormalOffset)
        ? options[keyForNormalOffset]
        : naturalNormalOffset * normalAxis.scale.axisScale.bandwidth()

      return positionOfItemValue + normalOffset
    }

    return numericUtils.isNumberForced(options, keyForNormalOffset)
      ? positionOfItemValue + options[keyForNormalOffset]
      : axisUtils.getItemValueAtAxis(normalAxis, {
        [normalAxis.keyForValues]: _.get(singleItem, normalAxis.keyForValues) + naturalNormalOffset
      })
  }
}

/**
 * Returns the position of given value in given axis.
 *
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} singleItem
 * @return {number}
 */
export function getItemValueAtAxis (axisConfig, singleItem) {
  const rawValue = singleItem[axisConfig.keyForValues]
  return axisConfig.scale.axisScale(rawValue)
}
