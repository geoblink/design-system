import _ from 'lodash'

import * as ChartAxis from './GeoChartAxis'

/**
 * @param {GeoChart} component
 * @param {object} axisUserConfig
 * @return {GeoChartAxis.AxisConfig}
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
    ticks: axisUserConfig.ticks
  }
}

/**
 * @template Domain
 * @param {GeoChart.AxisConfig<Domain>} axisConfig
 * @param {object} object
 * @param {Array<d3.ScaleLinear|d3.ScaleBand|d3.ScaleLogarithmic>} object.scalesById
 * @param {Array<GeoChart.AxisConfig<Domain>>} object.axisGroups
 * @return {AxisPositionType}
 */
export function getPositionOfAxis (axisConfig, { scalesById, axisGroups }) {
  if (axisConfig.position.type === ChartAxis.POSITIONS.anchoredToAxis) {
    const relativeAxisConfig = _.find(axisGroups, {
      id: axisConfig.position.relativeToAxis
    })

    if (!relativeAxisConfig) {
      throw new Error(`GeoChart [component] :: Tried to add an axis relative to unknown axis ${axisConfig.position.relativeToAxis}`)
    }

    const scale = scalesById[axisConfig.position.relativeToAxis]

    return {
      type: ChartAxis.POSITIONS.anchoredToAxis,
      value: axisConfig.position.value,
      scale,
      relativeAxisPosition: getPositionOfAxis(relativeAxisConfig, { scalesById, axisGroups })
    }
  }

  return {
    type: axisConfig.position.type
  }
}
