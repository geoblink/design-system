import _ from 'lodash'

import * as ChartSizing from './GeoChartSizing'
import * as ChartBars from './GeoChartBars'
import * as ChartLabels from './GeoChartLabels'
import * as ChartPie from './GeoChartPie'

export default {
  methods: {
    updateData () {
      if (!_.isEmpty(this.config.barGroups)) {
        this.updateBarGroups()
      }

      if (!_.isEmpty(this.config.labelGroups)) {
        this.updateLabelGroups()
      }

      if (!_.isEmpty(this.config.pieConfig)) {
        this.updatePieConfig()
      }
    },

    updateBarGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }

      const barGroupsConfig = _.map(this.config.barGroups, (singleBarGroupConfig, index) => {
        const axis = {
          horizontal: this.axesConfigById[singleBarGroupConfig.idHorizontalAxis],
          vertical: this.axesConfigById[singleBarGroupConfig.idVerticalAxis]
        }
        return {
          id: index,
          chart,
          axis,
          data: singleBarGroupConfig.data,
          dimension: singleBarGroupConfig.dimension,
          normalOffset: singleBarGroupConfig.normalOffset,
          naturalNormalOffset: singleBarGroupConfig.naturalNormalOffset,
          width: singleBarGroupConfig.width,
          naturalWidth: singleBarGroupConfig.naturalWidth,
          cssClasses: singleBarGroupConfig.cssClasses
        }
      })

      ChartBars.render(this.d3Instance, barGroupsConfig, { chart })
    },

    updateLabelGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }

      const labelGroupsConfig = _.map(this.config.labelGroups, (singleLabelGroupConfig, index) => {
        return {
          id: index,
          axis: {
            vertical: this.axesConfigById[singleLabelGroupConfig.idVerticalAxis]
          },
          data: singleLabelGroupConfig.data
        }
      })

      ChartLabels.render(this.d3Instance, labelGroupsConfig, { chart })
    },

    updatePieConfig () {
      const DEFAULT_PIE_TRANSITION_DURATION = 1000
      const DEFAULT_OUTER_RADIUS = 1
      const DEFAULT_INNER_RADIUS = 0

      const chartSize = this.svgSize
      const userConfig = this.config.pieConfig
      const innerRadius = userConfig.innerRadius || DEFAULT_INNER_RADIUS
      const outerRadius = userConfig.outerRadius || DEFAULT_OUTER_RADIUS
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const animationsDurationInMilliseconds = this.config.chart.animationsDurationInMilliseconds
        ? this.animationsDurationInMilliseconds
        : DEFAULT_PIE_TRANSITION_DURATION

      const chart = {
        animationsDurationInMilliseconds: animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin,
        chartHeight: chartSize.height,
        chartWidth: chartSize.width,
        chartRadius: Math.min(chartSize.height, chartSize.width) / 2
      }

      const pieConfig = {
        data: userConfig.data,
        innerRadius: innerRadius * chart.chartRadius,
        outerRadius: outerRadius * chart.chartRadius,
        keyForValues: userConfig.keyForValues,
        cssClasses: userConfig.cssClasses
      }

      ChartPie.render(this.d3Instance, pieConfig, { chart })
    }
  }
}
