import _ from 'lodash'

import * as ChartAnchoredShapes from '../GeoChartAnchoredShapes/GeoChartAnchoredShapes'
import * as ChartSizing from '../GeoChartUtils/GeoChartSizing'

export default {
  methods: {
    updateAnchoredShapesGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }
      const anchoredShapesGroupsConfig = _.map(this.config.anchoredShapesGroups, (singleAnchoredShapesGroupsConfig, index) => {
        const axis = {
          horizontal: this.axesConfigById[singleAnchoredShapesGroupsConfig.idHorizontalAxis],
          vertical: this.axesConfigById[singleAnchoredShapesGroupsConfig.idVerticalAxis]
        }
        return {
          id: index,
          axis,
          shapeData: singleAnchoredShapesGroupsConfig.shapeData,
          dimension: singleAnchoredShapesGroupsConfig.dimension,
          offset: singleAnchoredShapesGroupsConfig.offset,
          normalOffset: singleAnchoredShapesGroupsConfig.normalOffset,
          naturalNormalOffset: singleAnchoredShapesGroupsConfig.naturalNormalOffset,
          normalValue: singleAnchoredShapesGroupsConfig.normalValue,
          getAnchorPosition: singleAnchoredShapesGroupsConfig.getAnchorPosition,
          text: singleAnchoredShapesGroupsConfig.text,
          getShapeSize: singleAnchoredShapesGroupsConfig.getShapeSize,
          getShapePath: singleAnchoredShapesGroupsConfig.getShapePath,
          cssClasses: singleAnchoredShapesGroupsConfig.cssClasses
        }
      })
      ChartAnchoredShapes.render(this.d3Instance, anchoredShapesGroupsConfig, { chart })
    }
  }
}
