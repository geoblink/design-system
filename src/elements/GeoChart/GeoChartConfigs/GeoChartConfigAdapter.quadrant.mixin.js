import _ from 'lodash'

import { parseAxisConfig } from './GeoChartConfigAdapterUtils'
import * as ChartSizing from '../GeoChartUtils/GeoChartSizing'
import * as ChartQuadrant from '../GeoChartQuadrant/GeoChartQuadrant'

export default {
  methods: {
    redrawQuadrants () {
      if (!this.config.quadrantGroups) return

      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }

      const quadrantGroupConfig = _.map(this.config.quadrantGroups, (singleQuadrantGroupConfig, index) => {
        const horizontalAxisConfig = parseAxisConfig(this, singleQuadrantGroupConfig.horizontalAxisConfig)
        const verticalAxisConfig = parseAxisConfig(this, singleQuadrantGroupConfig.verticalAxisConfig)

        if (singleQuadrantGroupConfig.tooltip && !this.d3TipInstance) {
          console.warn('GeoChart [component] :: d3-tip NPM package is required to use tooltips (attempted to use tooltips on a bar chart)')
        }

        if (singleQuadrantGroupConfig.tooltip && !_.isFunction(singleQuadrantGroupConfig.tooltip.content)) {
          console.warn(`GeoChart [component] :: Attempted to use a non-function as bar chart tooltip content (used «${singleQuadrantGroupConfig.tooltip}»)`)
        }

        const tooltipConfig = singleQuadrantGroupConfig.tooltip
          ? {
            getContent: singleQuadrantGroupConfig.tooltip.content,
            getOffset: singleQuadrantGroupConfig.tooltip.offset
          }
          : null

        return {
          horizontalAxisConfig: horizontalAxisConfig,
          verticalAxisConfig: verticalAxisConfig,
          horizontalThreshold: singleQuadrantGroupConfig.horizontalThreshold,
          verticalThreshold: singleQuadrantGroupConfig.verticalThreshold,
          quadrantTopLeftName: singleQuadrantGroupConfig.quadrantTopLeftName,
          quadrantTopRightName: singleQuadrantGroupConfig.quadrantTopRightName,
          quadrantBottomLeftName: singleQuadrantGroupConfig.quadrantBottomLeftName,
          quadrantBottomRightName: singleQuadrantGroupConfig.quadrantBottomRightName,
          labelSize: singleQuadrantGroupConfig.labelSize,
          tooltip: tooltipConfig,
          cssClasses: singleQuadrantGroupConfig.cssClasses
        }
      })

      ChartQuadrant.render(this.d3Instance, this.d3TipInstance, quadrantGroupConfig, { chart })
    }
  }
}
