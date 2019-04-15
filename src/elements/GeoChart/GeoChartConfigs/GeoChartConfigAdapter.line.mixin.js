import _ from 'lodash'

import * as ChartSizing from '../GeoChartUtils/GeoChartSizing'
import * as ChartLine from '../GeoChartLine/GeoChartLine'

export default {
  methods: {
    updateLineGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }
      const lineGroupsConfig = _.map(this.config.lineGroups, (singleLineGroupsConfig, index) => {
        const axis = {
          horizontal: this.axesConfigById[singleLineGroupsConfig.idHorizontalAxis],
          vertical: this.axesConfigById[singleLineGroupsConfig.idVerticalAxis]
        }
        if (singleLineGroupsConfig.tooltip && !this.d3TipInstance) {
          console.warn('GeoChart [component] :: d3-tip NPM package is required to use tooltips (attempted to use tooltips on a bar chart)')
        }

        if (singleLineGroupsConfig.tooltip && !_.isFunction(singleLineGroupsConfig.tooltip.content)) {
          console.warn(`GeoChart [component] :: Attempted to use a non-function as bar chart tooltip content (used «${singleLineGroupsConfig.tooltip}»)`)
        }

        const tooltipConfig = singleLineGroupsConfig.tooltip
          ? {
            getContent: singleLineGroupsConfig.tooltip.content,
            getOffset: singleLineGroupsConfig.tooltip.offset
          }
          : null

        return {
          id: index,
          lineGroupId: singleLineGroupsConfig.lineGroupId,
          axis,
          lineData: singleLineGroupsConfig.lineData,
          lineWidth: singleLineGroupsConfig.lineWidth,
          hoverCircleRadius: singleLineGroupsConfig.hoverCircleRadius,
          interpolationFn: singleLineGroupsConfig.interpolationFn,
          dimension: singleLineGroupsConfig.dimension,
          tooltip: tooltipConfig,
          cssClasses: singleLineGroupsConfig.cssClasses,
          trackByKey: singleLineGroupsConfig.trackByKey
        }
      })
      ChartLine.render(this.d3Instance, this.d3TipInstance, lineGroupsConfig, { chart })
    }
  }
}
