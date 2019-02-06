import _ from 'lodash'

import * as ChartSizing from './GeoChartSizing'
import * as ChartBars from './GeoChartBars'
import * as ChartLabels from './GeoChartLabels'

export default {
  methods: {
    updateData () {
      if (!_.isEmpty(this.config.barGroups)) {
        this.updateBarGroups()
      }

      if (!_.isEmpty(this.config.labelGroups)) {
        this.updateLabelGroups()
      }

      if (this.d3TipInstance) {
        this.d3Instance.call(this.d3TipInstance)
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

        if (singleBarGroupConfig.tooltip && !this.d3TipInstance) {
          console.warn('GeoChart [component] :: d3-tip NPM package is required to use tooltips (attempted to use tooltips on a bar chart)')
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
          getTooltip: singleBarGroupConfig.tooltip,
          cssClasses: singleBarGroupConfig.cssClasses
        }
      })

      ChartBars.render(this.d3Instance, this.d3TipInstance, barGroupsConfig, { chart })
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
    }
  }
}
