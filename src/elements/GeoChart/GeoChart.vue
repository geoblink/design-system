<template>
  <svg
    ref="svgRoot"
    :class="{
      [`geo-chart${cssSuffix}`]: true,
      [`geo-chart--debug${cssSuffix}`]: debug
    }"
  />
</template>

<script>
import _ from 'lodash'
import cssSuffix from '../../mixins/cssModifierMixin'
import * as ChartAxis from './GeoChartAxis'
import * as ChartSizing from './GeoChartSizing'
import * as ChartBars from './GeoChartBars'
import * as ChartLabels from './GeoChartLabels'
import * as ChartConfig from './GeoChartConfig'
import * as ChartScale from './GeoChartScale'

const d3 = (function () {
  try {
    return require('d3')
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
  status: 'missing-tests',
  release: '9.1.0',
  mixins: [cssSuffix],
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
      svgSize: null
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

    animationsDurationInMilliseconds () {
      return _.isFinite(this.config.chart.animationsDurationInMilliseconds)
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

      const axisGroups = this.config.axisGroups

      const [
        simplePositionScalesAxisGroups,
        advancedPositionedScalesAxisGroups
      ] = _.partition(axisGroups, (axisConfig) => axisConfig.position.type in ChartAxis.SIMPLE_POSITIONS)

      const simplePositionedScales = _.fromPairs(_.map(
        simplePositionScalesAxisGroups,
        (axisConfig) => getScaleForAxisConfig(axisConfig, { scalesById: {}, axisGroups })
      ))

      const advancedPositionedScales = _.fromPairs(_.map(
        advancedPositionedScalesAxisGroups,
        (axisConfig) => getScaleForAxisConfig(axisConfig, { scalesById: simplePositionedScales, axisGroups })
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
        return [axisConfig.id, scale]
      }
    },

    axisConfigById () {
      const chartSize = this.svgSize
      const chartMargin = _.get(this.config.chart, 'margin', ChartSizing.EMPTY_MARGIN)

      return _.fromPairs(_.map(this.config.axisGroups, (axisConfig) => {
        const scale = this.scalesById[axisConfig.id]
        const position = getPositionOfAxis(axisConfig, {
          scalesById: this.scalesById,
          axisGroups: this.config.axisGroups
        })

        return [axisConfig.id, {
          id: axisConfig.id,
          keyForValues: axisConfig.keyForValues,
          position,
          chart: {
            animationsDurationInMilliseconds: this.animationsDurationInMilliseconds,
            size: chartSize,
            margin: chartMargin
          },
          scale,
          cssClasses: axisConfig.cssClasses,
          ticks: axisConfig.ticks
        }]
      }))
    },

    addAxis () {
      if (!this.d3Instance) return

      return ChartAxis.factory(this.d3Instance)
    },

    addBarGroup () {
      if (!this.d3Instance) return

      return ChartBars.groupFactory(this.d3Instance)
    },

    addLabelGroup () {
      if (!this.d3Instance) return

      return ChartLabels.groupFactory(this.d3Instance)
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
    }
  },
  mounted () {
    this.debouncedRedraw()
  },
  methods: {
    redraw () {
      this.adjustSize()
      this.updateData()
      this.redrawAxes()
    },

    adjustSize () {
      if (!this.d3Instance) return

      if (!_.isNil(this.height)) {
        this.d3Instance.style('height', this.height)
      }

      if (!_.isNil(this.width)) {
        this.d3Instance.style('width', this.width)
      }

      const svgBoundingClientRect = this.svgElement.getBoundingClientRect()
      this.svgSize = {
        height: svgBoundingClientRect.height,
        width: svgBoundingClientRect.width
      }
    },

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
          horizontal: this.axisConfigById[barGroupConfig.idHorizontalAxis],
          vertical: this.axisConfigById[barGroupConfig.idVerticalAxis]
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
          vertical: this.axisConfigById[labelGroupConfig.idVerticalAxis]
        }
        this.addLabelGroup({
          id,
          chart,
          axis,
          data: labelGroupConfig.data
        })
      }
    },

    redrawAxes () {
      const axes = Object.values(this.axisConfigById)
      for (const axisConfig of axes) {
        this.addAxis(axisConfig)
      }
    }
  }
}

function getPositionOfAxis (axisConfig, { scalesById, axisGroups }) {
  if (axisConfig.position.type === ChartAxis.POSITIONS.anchoredToAxis) {
    return getPositionOfAnchoredToAxisPositionedAxis(axisConfig.position, { scalesById, axisGroups })
  }

  return {
    type: axisConfig.position.type
  }
}

function getPositionOfAnchoredToAxisPositionedAxis (position, { scalesById, axisGroups }) {
  const relativeAxisConfig = _.find(axisGroups, {
    id: position.relativeToAxis
  })

  if (!relativeAxisConfig) {
    throw new Error(`GeoChart [component] :: Tried to add an axis relative to unknown axis ${position.relativeToAxis}`)
  }

  const scale = scalesById[position.relativeToAxis]

  return {
    type: ChartAxis.POSITIONS.anchoredToAxis,
    value: position.value,
    scale,
    relativeAxisPosition: getPositionOfAxis(relativeAxisConfig, { scalesById, axisGroups })
  }
}
</script>
