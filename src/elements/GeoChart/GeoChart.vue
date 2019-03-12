<template>
  <div
    v-on-resize="reloadSize"
    :class="{
      [`geo-chart${cssSuffix}`]: true,
      [`geo-chart--debug${cssSuffix}`]: debug
    }"
  >
    <svg ref="svgRoot"/>
  </div>
</template>

<script>
import _ from 'lodash'
import OnResize from '../../directives/GeoOnResize'
import cssSuffix from '../../mixins/cssModifierMixin'
import * as ChartAxis from './GeoChartAxis/GeoChartAxis'
import * as ChartSizing from './GeoChartUtils/GeoChartSizing'
import * as ChartBars from './GeoChartBars/GeoChartBars'
import * as ChartConfig from './GeoChartConfigs/GeoChartConfig'
import * as ChartScale from './GeoChartScale/GeoChartScale'
import { ANCHOR_POSITIONS, getTriangleShapePath } from './GeoChartAnchoredShapes/GeoChartAnchoredShapes'
import configAdapterMixin from './GeoChartConfigs/GeoChartConfigAdapter.mixin'
import { parseAxisConfig, getPositionOfAxis } from './GeoChartConfigs/GeoChartConfigAdapterUtils'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
  }
})()

const d3Tip = (function () {
  try {
    return require('d3-tip').default
  } catch (error) {
    return null
  }
})()

const Ajv = (function () {
  try {
    return require('ajv')
  } catch (error) {
    return null
  }
})()

const ajvErrors = (function () {
  try {
    return require('ajv-errors')
  } catch (error) {
    return null
  }
})()

const chartConfigValidator = (function () {
  let validator = null

  return function (value) {
    if (!Ajv) {
      // eslint-disable-next-line no-console
      console.debug('GeoChart [component] :: Install `ajv` to validate charts config')
    }

    if (!Ajv) return true
    if (validator) return getValidationResult(validator)

    const ajv = new Ajv({
      allErrors: true,
      jsonPointers: true
    })
    ajvErrors(ajv)

    const newValidator = ajv.compile(ChartConfig.jsonSchema)
    validator = newValidator

    return getValidationResult(newValidator)

    function getValidationResult (validator) {
      const isValid = validator(value)

      const errors = validator.errors || []
      for (const error of errors) {
        console.error(`GeoChart [component] :: Invalid config: ${error.message}${error.dataPath ? ' (' + error.dataPath + ')' : ''}`, error)
      }

      return isValid
    }
  }
})()

export default {
  name: 'GeoChart',
  status: 'ready',
  release: '9.4.0',
  directives: {
    OnResize
  },
  constants: {
    SCALE_TYPES: ChartScale.SCALE_TYPES,
    POSITIONS: ChartAxis.POSITIONS,
    BARS_DIMENSIONS: ChartBars.DIMENSIONS,
    ANCHOR_POSITIONS,
    getTriangleShapePath
  },
  mixins: [cssSuffix, configAdapterMixin],
  props: {
    /**
     * Main chart config. See the docs for more info or check out the JSON
     * schema in `GeoChartConfig.js`.
     */
    config: {
      type: Object,
      required: true,
      validator (value) {
        return chartConfigValidator(value)
      }
    },
    /**
     * Whether debug grid (a square gray grid) should be displayed (`true`) or
     * not. Useful to find errors in charts.
     */
    debug: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      svgSize: null,
      size: {
        width: null,
        height: null
      }
    }
  },
  computed: {
    svgElement () {
      return this.$refs.svgRoot
    },

    d3Instance () {
      if (!d3) {
        console.warn('GeoChart [component] :: d3 NPM package is required to use this component')
        return null
      }

      return d3.select(this.svgElement)
    },

    d3TipInstance () {
      if (!d3Tip) return null

      return d3Tip().attr('class', `geo-chart-tooltip${this.cssSuffix}`)
    },

    animationsDurationInMilliseconds () {
      return _.isFinite(_.get(this.config.chart, 'animationsDurationInMilliseconds'))
        ? this.config.chart.animationsDurationInMilliseconds
        : 250
    },

    scalesById () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const chart = {
        size: chartSize,
        margin: chartMargin
      }

      const axisGroups = [...this.config.axisGroups, ...this.guidelinesConfigs]

      const [
        simplePositionedScalesAxisGroups,
        advancedPositionedScalesAxisGroups
      ] = _.partition(axisGroups, (axisConfig) => axisConfig.position.type in ChartAxis.SIMPLE_POSITIONS)

      const simplePositionedScales = _.fromPairs(_.map(
        simplePositionedScalesAxisGroups,
        (axisConfig) => [axisConfig.id, getScaleForAxisConfig(axisConfig, { scalesById: {}, axisGroups })]
      ))

      const advancedPositionedScales = _.fromPairs(_.map(
        advancedPositionedScalesAxisGroups,
        (axisConfig) => [axisConfig.id, getScaleForAxisConfig(axisConfig, { scalesById: simplePositionedScales, axisGroups })]
      ))

      return Object.assign({}, simplePositionedScales, advancedPositionedScales)

      function getScaleForAxisConfig (axisConfig, { scalesById, axisGroups }) {
        const position = getPositionOfAxis(axisConfig, { scalesById, axisGroups })
        const dimension = ChartAxis.getAxisDimension(position)

        const scale = ChartScale.getNewScale({
          id: axisConfig.id,
          dimension,
          scale: axisConfig.scale
        }, chart)
        return scale
      }
    },

    guidelinesConfigs () {
      return _.filter(_.map(this.config.guidelinesGroups, 'axisConfig'))
    },

    axesConfigById () {
      return _.fromPairs(_.map(this.config.axisGroups, (axisConfig) => {
        return [axisConfig.id, parseAxisConfig(this, axisConfig)]
      }))
    },

    debouncedRedraw () {
      return _.debounce(this.redraw.bind(this), 10, {
        leading: true,
        trailing: false
      })
    }
  },
  watch: {
    config () {
      this.debouncedRedraw()
    },

    'config.chart.size': {
      handler () {
        this.debouncedRedraw()
      },
      deep: true
    },

    'config.chart.margin': {
      handler () {
        this.debouncedRedraw()
      },
      deep: true
    },

    'config.axisGroups': {
      handler () {
        this.debouncedRedraw()
      },
      deep: true
    },

    size: {
      handler () {
        this.debouncedRedraw()
      },
      deep: true
    }
  },
  mounted () {
    this.reloadSize()
  },
  beforeDestroy () {
    this.cleanupData()
  },
  methods: {
    redraw () {
      this.adjustSize()
      this.redrawGuidelines()
      this.updateData()
      this.redrawAxes()
    },

    reloadSize () {
      const boundingRect = this.$el.getBoundingClientRect()
      this.size.width = boundingRect.width
      this.size.height = boundingRect.height
      this.debouncedRedraw()
    },

    adjustSize () {
      if (!this.d3Instance) return
      const svgBoundingClientRect = this.svgElement.getBoundingClientRect()
      this.svgSize = {
        height: svgBoundingClientRect.height,
        width: svgBoundingClientRect.width
      }
    },

    redrawAxes () {
      const axesConfig = Object.values(this.axesConfigById)

      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)
      const globalAxesConfig = {
        chart: {
          animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
          size: chartSize,
          margin: chartMargin
        }
      }

      ChartAxis.render(this.d3Instance, axesConfig, globalAxesConfig)
    }
  }
}
</script>
