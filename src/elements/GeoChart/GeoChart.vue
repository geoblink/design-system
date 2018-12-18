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
import { POSITIONS, addAxisFactory } from './GeoChart.axis'

const d3 = (function () {
  try {
    return require('d3')
  } catch (error) {
    return null
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
      required: true
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

    axisConfig () {
      const chartSize = this.svgSize
      const chartMargin = this.config.chartMargin

      const horizontalSpaceAvailable = chartSize.width - chartMargin.right
      const verticalSpaceAvailable = chartSize.height - chartMargin.bottom

      const rangeStartForPosition = {
        [POSITIONS.top]: chartMargin.left,
        [POSITIONS.bottom]: chartMargin.left,
        [POSITIONS.verticallyCenteredInTheMiddle]: chartMargin.left,
        [POSITIONS.left]: chartMargin.top,
        [POSITIONS.right]: chartMargin.top,
        [POSITIONS.horizontallyCenteredInTheMiddle]: chartMargin.top
      }

      const rangeEndForPosition = {
        [POSITIONS.top]: horizontalSpaceAvailable,
        [POSITIONS.bottom]: horizontalSpaceAvailable,
        [POSITIONS.verticallyCenteredInTheMiddle]: horizontalSpaceAvailable,
        [POSITIONS.left]: verticalSpaceAvailable,
        [POSITIONS.right]: verticalSpaceAvailable,
        [POSITIONS.horizontallyCenteredInTheMiddle]: verticalSpaceAvailable
      }

      return _.map(this.config.axisGroups, (axisConfig) => {
        const scale = axisConfig.scale.copy().range([
          rangeStartForPosition[axisConfig.position],
          rangeEndForPosition[axisConfig.position]
        ]) // chart dimensions

        return {
          ticks: axisConfig.ticks,
          position: axisConfig.position,
          chartSize,
          chartMargin,
          scale
        }
      })
    },

    addAxis () {
      return addAxisFactory(this.d3Instance)
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

    'config.chartSize': {
      handler () {
        this.debouncedRedraw()
      },
      deep: true
    },

    'config.chartMargin': {
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
      this.updateDummyData()
      this.redrawAxe()
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

    redrawAxe () {
      for (let id = 0; id < this.axisConfig.length; id++) {
        const axisConfig = this.axisConfig[id]
        this.addAxis(_.assign({ id }, axisConfig))
      }
    }
  }
}
</script>
