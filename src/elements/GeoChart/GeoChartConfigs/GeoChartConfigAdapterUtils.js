import _ from 'lodash'

import * as axisUtils from '../GeoChartUtils/axisUtils'

/**
 * @template Domain
 * @template RelativeScaleDomain
 * @typedef {Object} GeoChartComponentInstance
 * @property {Object<string, GeoChart.AxisConfigScale<Domain>>} scalesById
 * @property {Object} config
 * @property {Array<GeoChart.AxisConfig<Domain, RelativeScaleDomain>>} config.axisGroups
 */

/**
 * @template Domain
 * @template RelativeScaleDomain
 * @param {GeoChartComponentInstance<Domain, RelativeScaleDomain>} component
 * @param {Object} axisUserConfig
 * @return {GeoChart.AxisConfig<Domain, RelativeScaleDomain>}
 */
export function parseAxisConfig (component, axisUserConfig) {
  const scale = component.scalesById[axisUserConfig.id]
  const position = getPositionOfAxis(axisUserConfig, {
    scalesById: component.scalesById,
    axisGroups: component.config.axisGroups
  })

  return {
    id: axisUserConfig.id,
    keyForValues: axisUserConfig.keyForValues,
    position,
    scale,
    cssClasses: axisUserConfig.cssClasses,
    ticks: axisUserConfig.ticks,
    label: axisUserConfig.label
  }
}

/**
 * @template Domain
 * @template RelativeScaleDomain
 * @param {Object} axisUserConfig
 * @param {Object} globalConfig
 * @param {Object<string, GeoChart.AxisConfigScale<Domain>>} globalConfig.scalesById
 * @param {Array<GeoChart.AxisConfig<Domain, RelativeScaleDomain>>} globalConfig.axisGroups
 * @return {GeoChart.AxisPosition<RelativeScaleDomain>}
 */
export function getPositionOfAxis (axisUserConfig, globalConfig) {
  if (axisUserConfig.position.type === axisUtils.POSITIONS.anchoredToAxis) {
    const relativeAxisConfig = _.find(globalConfig.axisGroups, {
      id: axisUserConfig.position.relativeToAxis
    })

    if (!relativeAxisConfig) {
      throw new Error(`GeoChart [component] :: Tried to add an axis relative to unknown axis ${axisUserConfig.position.relativeToAxis}`)
    }

    const scale = globalConfig.scalesById[axisUserConfig.position.relativeToAxis]

    return {
      type: axisUtils.POSITIONS.anchoredToAxis,
      value: axisUserConfig.position.value,
      scale,
      relativeAxisPosition: getPositionOfAxis(relativeAxisConfig, {
        scalesById: globalConfig.scalesById,
        axisGroups: globalConfig.axisGroups
      })
    }
  }

  return {
    type: (/** @type {GeoChart.SimpleAxisPositionType} */ (axisUserConfig.position.type))
  }
}
