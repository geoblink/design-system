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
import { addAxisFactory } from './GeoChart.axis'
import { addBarGroupFactory } from './GeoChart.bars'
import { chartConfigJsonSchema } from './GeoChartConfig'
import { getNewScale } from './GeoChart.scale'

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

if (!Ajv) {
  // eslint-disable-next-line no-console
  console.debug('GeoChart [component] :: Install `ajv` to validate charts config')
}

const chartConfigValidator = (function () {
  let validator = null

  return function (value) {
    if (!Ajv) return true
    if (validator) return getValidationResult(validator)

    const ajv = new Ajv({
      allErrors: true
    })
    ajvErrors(ajv)

    const newValidator = ajv.compile(chartConfigJsonSchema)
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
    config: {
      type: Object,
      required: true,
      validator (value) {
        return chartConfigValidator(value)
      }
    },
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
      return d3.select(this.svgElement)
    },

    scalesById () {
      const chartSize = this.svgSize
      const chartMargin = this.config.chart.margin
      const chart = {
        size: chartSize,
        margin: chartMargin
      }

      return _.fromPairs(_.map(this.config.axisGroups, (axisConfig) => {
        const scale = getNewScale(axisConfig, chart)
        return [axisConfig.id, scale]
      }))
    },

    axisConfigById () {
      const chartSize = this.svgSize
      const chartMargin = this.config.chart.margin

      return _.fromPairs(_.map(this.config.axisGroups, (axisConfig) => {
        const scale = this.scalesById[axisConfig.id]

        return [axisConfig.id, {
          id: axisConfig.id,
          ticks: axisConfig.ticks,
          position: axisConfig.position,
          chart: {
            size: chartSize,
            margin: chartMargin
          },
          scale
        }]
      }))
    },

    addAxis () {
      return addAxisFactory(this.d3Instance)
    },

    addBarGroup () {
      return addBarGroupFactory(this.d3Instance)
    },

    debouncedRedraw () {
      return _.debounce(this.redraw.bind(this), 10, {
        leading: true,
        trailing: true
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
      } else {
        this.updateDummyData()
      }
    },

    updateBarGroups () {
      const chartSize = this.svgSize
      const chartMargin = this.config.chart.margin
      const chart = {
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
          dimension: barGroupConfig.dimension
        })
      }
    },

    // TODO: Remove this method
    updateDummyData () {
      const data = [Math.floor(Math.random() * 100)]

      const dummyNumberElements = this.d3Instance
        .selectAll('text.dummy-data')
        .data(data)

      dummyNumberElements
        .enter()
        .append('text')
        .attr('class', 'dummy-data')
        .attr('x', '50%')
        .attr('y', '50%')
        .text(function (d) {
          console.log('Enter!')
          return `I'm number ${d}!`
        })

      dummyNumberElements
        .text(function (d) {
          console.log('Update!')
          return `I'm number ${d}!`
        })

      dummyNumberElements
        .exit()
        .remove()
    },

    redrawAxes () {
      const axes = Object.values(this.axisConfigById)
      for (const axisConfig of axes) {
        this.addAxis(axisConfig)
      }
    }
  }
}
</script>
