import _ from 'lodash'

import * as ChartSizing from '../GeoChartUtils/GeoChartSizing'
import * as ChartLineSegments from '../GeoChartLineSegments/GeoChartLineSegments'

export default {
  methods: {
    updateLineSegmentsGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }
      const lineSegmentsGroupsConfig = _.map(this.config.lineSegmentsGroups, (singleLineSegmentsGroupsConfig, index) => {
        const axis = {
          horizontal: this.axesConfigById[singleLineSegmentsGroupsConfig.idHorizontalAxis],
          vertical: this.axesConfigById[singleLineSegmentsGroupsConfig.idVerticalAxis]
        }
        return {
          id: index,
          axis,
          circleData: singleLineSegmentsGroupsConfig.circleData,
          dimension: singleLineSegmentsGroupsConfig.dimension,
          lineWidth: singleLineSegmentsGroupsConfig.lineWidth,
          lineNaturalWidth: singleLineSegmentsGroupsConfig.lineNaturalWidth,
          circleRadius: singleLineSegmentsGroupsConfig.circleRadius,
          circleNaturalRadius: singleLineSegmentsGroupsConfig.circleNaturalRadius,
          circleMargin: singleLineSegmentsGroupsConfig.circleMargin,
          circleNaturalMargin: singleLineSegmentsGroupsConfig.circleNaturalMargin,
          normalValue: singleLineSegmentsGroupsConfig.normalValue,
          cssClasses: singleLineSegmentsGroupsConfig.cssClasses,
          trackByKey: singleLineSegmentsGroupsConfig.trackByKey
        }
      })
      ChartLineSegments.render(this.d3Instance, lineSegmentsGroupsConfig, { chart })
    }
  }
}
