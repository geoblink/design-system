import _ from 'lodash'

import { parseAxisConfig } from './GeoChartConfigAdapterUtils'
import * as ChartSizing from '../GeoChartUtils/GeoChartSizing'
import * as ChartAxisGuidelines from '../GeoChartAxisGuidelines/GeoChartAxisGuidelines'

export default {
  methods: {
    redrawGuidelines () {
      if (!this.config.guidelinesGroups) return

      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const globalGuidelinesConfig = {
        chart: {
          animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
          size: chartSize,
          margin: chartMargin
        }
      }

      const guidelinesConfig = _.map(this.config.guidelinesGroups, (groupConfig, index) => {
        const axisConfig = this.axesConfigById[groupConfig.idAxis] || parseAxisConfig(this, groupConfig.axisConfig)

        return {
          id: axisConfig.id,
          axisConfig: axisConfig,
          guidelines: groupConfig.guidelines,
          cssClasses: groupConfig.cssClasses
        }
      })

      ChartAxisGuidelines.render(this.d3Instance, guidelinesConfig, globalGuidelinesConfig)
    }
  }
}
