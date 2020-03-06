import _ from 'lodash'

import * as ChartSizing from '../GeoChartUtils/GeoChartSizing'
import * as ChartScatterPlot from '../GeoChartScatterPlot/GeoChartScatterPlot'

export default {
  methods: {
    updateScatterPlotGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }

      const scatterPlotGroupsConfig = _.map(this.config.scatterPlotGroups, (singleScatterPlotGroupConfig, index) => {
        const axis = {
          horizontal: this.axesConfigById[singleScatterPlotGroupConfig.idHorizontalAxis],
          vertical: this.axesConfigById[singleScatterPlotGroupConfig.idVerticalAxis]
        }

        if (singleScatterPlotGroupConfig.tooltip && !this.d3TipInstance) {
          console.warn('GeoChart [component] :: d3-tip NPM package is required to use tooltips (attempted to use tooltips on a line chart)')
        }

        if (singleScatterPlotGroupConfig.tooltip && !_.isFunction(singleScatterPlotGroupConfig.tooltip.content)) {
          console.warn(`GeoChart [component] :: Attempted to use a non-function as line chart tooltip content (used «${singleScatterPlotGroupConfig.tooltip}»)`)
        }

        const tooltipConfig = singleScatterPlotGroupConfig.tooltip
          ? {
            getContent: singleScatterPlotGroupConfig.tooltip.content,
            getOffset: singleScatterPlotGroupConfig.tooltip.offset
          }
          : null

        return {
          id: index,
          axis,
          data: singleScatterPlotGroupConfig.data,
          mainDimension: singleScatterPlotGroupConfig.mainDimension,
          getRadius: singleScatterPlotGroupConfig.getRadius,
          getFillColor: singleScatterPlotGroupConfig.getFillColor,
          getOpacity: singleScatterPlotGroupConfig.getOpacity,
          onDotClick: singleScatterPlotGroupConfig.onDotClick,
          blockMouseEvents: singleScatterPlotGroupConfig.blockMouseEvents,
          tooltip: tooltipConfig,
          cssClasses: singleScatterPlotGroupConfig.cssClasses,
          groupKey: singleScatterPlotGroupConfig.groupKey
        }
      })

      ChartScatterPlot.render(this.d3Instance, this.d3TipInstance, scatterPlotGroupsConfig, { chart })
    }
  }
}
