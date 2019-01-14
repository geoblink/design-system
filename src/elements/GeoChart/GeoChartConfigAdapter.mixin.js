import _ from 'lodash'

import * as ChartSizing from './GeoChartSizing'

export default {
  methods: {
    updateData () {
      if (!_.isEmpty(this.config.barGroups)) {
        this.updateBarGroups()
      }

      if (!_.isEmpty(this.config.labelGroups)) {
        this.updateLabelGroups()
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

      for (let id = 0; id < this.config.barGroups.length; id++) {
        const barGroupConfig = this.config.barGroups[id]
        const axis = {
          horizontal: this.axesConfigById[barGroupConfig.idHorizontalAxis],
          vertical: this.axesConfigById[barGroupConfig.idVerticalAxis]
        }
        this.addBarGroup({
          id,
          chart,
          axis,
          data: barGroupConfig.data,
          dimension: barGroupConfig.dimension,
          normalOffset: barGroupConfig.normalOffset,
          naturalNormalOffset: barGroupConfig.naturalNormalOffset,
          width: barGroupConfig.width,
          naturalWidth: barGroupConfig.naturalWidth
        })
      }
    },

    updateLabelGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }

      for (let id = 0; id < this.config.labelGroups.length; id++) {
        const labelGroupConfig = this.config.labelGroups[id]
        const axis = {
          vertical: this.axesConfigById[labelGroupConfig.idVerticalAxis]
        }
        this.addLabelGroup({
          id,
          chart,
          axis,
          data: labelGroupConfig.data
        })
      }
    }
  }
}
