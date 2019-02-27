import _ from 'lodash'

import * as ChartSizing from '../GeoChartUtils/GeoChartSizing'
import * as ChartBars from '../GeoChartBars/GeoChartBars'
import * as ChartLabels from '../GeoChartLabels/GeoChartLabels'
import * as ChartColorBar from '../GeoChartColorBar/GeoChartColorBar'
import * as ChartPie from '../GeoChartPie/GeoChartPie'
import * as ChartLineSegments from '../GeoChartLineSegments/GeoChartLineSegments'
import * as ChartAnchoredShapes from '../GeoChartAnchoredShapes/GeoChartAnchoredShapes'
import guidelinesAdapterMixin from './GeoChartConfigAdapter.guidelines.mixin'

export default {
  mixins: [guidelinesAdapterMixin],
  methods: {
    updateData () {
      if (!_.isEmpty(this.config.barGroups)) {
        this.updateBarGroups()
      }

      if (!_.isEmpty(this.config.labelGroups)) {
        this.updateLabelGroups()
      }

      if (!_.isEmpty(this.config.colorBarGroups)) {
        this.updateColorBarGroups()
      }

      if (!_.isEmpty(this.config.pieConfig)) {
        this.updatePieConfig()
      }

      if (!_.isEmpty(this.config.lineSegmentsGroups)) {
        this.updateLineSegmentsGroups()
      }

      if (!_.isEmpty(this.config.anchoredShapesGroups)) {
        this.updateAnchoredShapesGroups()
      }

      if (this.d3TipInstance) {
        this.d3Instance.call(this.d3TipInstance)
      }
    },

    cleanupData () {
      if (this.d3TipInstance) {
        this.d3TipInstance.destroy()
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

        if (singleBarGroupConfig.tooltip && !_.isFunction(singleBarGroupConfig.tooltip.content)) {
          console.warn(`GeoChart [component] :: Attempted to use a non-function as bar chart tooltip content (used «${singleBarGroupConfig.tooltip}»)`)
        }

        const tooltipConfig = singleBarGroupConfig.tooltip
          ? {
            getContent: singleBarGroupConfig.tooltip.content,
            getOffset: singleBarGroupConfig.tooltip.offset
          }
          : null

        return {
          id: index,
          axis,
          data: singleBarGroupConfig.data,
          dimension: singleBarGroupConfig.dimension,
          normalOffset: singleBarGroupConfig.normalOffset,
          naturalNormalOffset: singleBarGroupConfig.naturalNormalOffset,
          width: singleBarGroupConfig.width,
          naturalWidth: singleBarGroupConfig.naturalWidth,
          tooltip: tooltipConfig,
          cssClasses: singleBarGroupConfig.cssClasses
        }
      })

      ChartBars.render(this.d3Instance, this.d3TipInstance, barGroupsConfig, { chart })
    },

    updateColorBarGroups () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin
      }
      const colorBarGroupsConfig = _.map(this.config.colorBarGroups, (singleColorBarGroupConfig, index) => {
        const axis = {
          horizontal: this.axesConfigById[singleColorBarGroupConfig.idHorizontalAxis],
          vertical: this.axesConfigById[singleColorBarGroupConfig.idVerticalAxis]
        }
        return {
          id: index,
          axis,
          data: singleColorBarGroupConfig.data,
          dimension: singleColorBarGroupConfig.dimension,
          normalOffset: singleColorBarGroupConfig.normalOffset,
          naturalNormalOffset: singleColorBarGroupConfig.naturalNormalOffset,
          width: singleColorBarGroupConfig.width,
          naturalWidth: singleColorBarGroupConfig.naturalWidth,
          highlightedWidth: singleColorBarGroupConfig.highlightedWidth,
          naturalHighlightedWidth: singleColorBarGroupConfig.naturalHighlightedWidth,
          normalValue: singleColorBarGroupConfig.normalValue,
          cssClasses: singleColorBarGroupConfig.cssClasses
        }
      })

      ChartColorBar.render(this.d3Instance, colorBarGroupsConfig, { chart })
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
      const chartRadius = Math.min(chartSize.height, chartSize.width) / 2
      const animationsDurationInMilliseconds = _.get(this.config.chart, 'animationsDurationInMilliseconds')
        ? this.animationsDurationInMilliseconds
        : DEFAULT_PIE_TRANSITION_DURATION

      if (userConfig.tooltip && !this.d3TipInstance) {
        console.warn('GeoChart [component] :: d3-tip NPM package is required to use tooltips (attempted to use tooltips on a pie chart)')
      }

      if (userConfig.tooltip && !_.isFunction(userConfig.tooltip.content)) {
        console.warn(`GeoChart [component] :: Attempted to use a non-function as pie chart tooltip content (used «${userConfig.tooltip}»)`)
      }

      const chart = {
        animationsDurationInMilliseconds: animationsDurationInMilliseconds,
        size: chartSize,
        margin: chartMargin,
        chartHeight: chartSize.height,
        chartWidth: chartSize.width
      }

      const tooltipConfig = userConfig.tooltip
        ? {
          getContent: userConfig.tooltip.content,
          getOffset: userConfig.tooltip.offset
        }
        : null

      const pieConfig = {
        data: userConfig.data,
        innerRadius: innerRadius * chartRadius,
        outerRadius: outerRadius * chartRadius,
        keyForValues: userConfig.keyForValues,
        tooltip: tooltipConfig,
        cssClasses: userConfig.cssClasses
      }

      ChartPie.render(this.d3Instance, this.d3TipInstance, pieConfig, { chart })
    },

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
          cssClasses: singleLineSegmentsGroupsConfig.cssClasses
        }
      })
      ChartLineSegments.render(this.d3Instance, lineSegmentsGroupsConfig, { chart })
    },

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
          getAnchoredText: singleAnchoredShapesGroupsConfig.getAnchoredText,
          getShapeSize: singleAnchoredShapesGroupsConfig.getShapeSize,
          getShapePath: singleAnchoredShapesGroupsConfig.getShapePath,
          cssClasses: singleAnchoredShapesGroupsConfig.cssClasses
        }
      })
      ChartAnchoredShapes.render(this.d3Instance, anchoredShapesGroupsConfig, { chart })
    }
  }
}
