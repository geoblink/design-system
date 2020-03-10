#### Scatter Plot focused on a dot

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeData()">
        Randomize Data
    </geo-primary-button>
    <geo-secondary-button @click="toggleGraph()">
      Toggle Graph
    </geo-secondary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoScatterPlotDemo',
  data () {
    return {
      isGraphVisible: true,
      randomValue: _.random(5, 50),
      getRadius: function () { return 5 },
      getFillColor: function () { return 'blue' },
      initialIndex: 2
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 1000,
            end: 0
          }
        }
      }
    },
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'x',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25000
          }
        }
      }
    },
    scatterPlotData () {
      return _.times(this.randomValue, (i) => {
        return {
          x: _.random(0, 25000),
          y: _.random(0, 1000)
        }
      })
    },

    chartConfig () {
      if (!this.scatterPlotData) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 50
          },
          animationsDurationInMilliseconds: 800
        },
        axisGroups: [
          this.linearAxisConfig,
          this.numericalAxisConfig
        ],
        scatterPlotGroups: [
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.scatterPlotData,
            getRadius: this.getRadius,
            getFillColor: this.getFillColor,
            getOpacity: this.getOpacity,
            onDotClick: this.onDotClick,
            blockMouseEvents: true,
            animationsDuration: 0
          }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.manualClick()
    })
  },
  methods: {
    manualClick () {
      const dotToClick = _.last(document.querySelectorAll(`.geo-chart-scatter-plot__dot--${this.initialIndex}`))
      if (!dotToClick) return
      const clickEvent = new MouseEvent('click')
      dotToClick.dispatchEvent(clickEvent)
    },

    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
      if (this.isGraphVisible) {
        this.$nextTick(function () {
          this.manualClick()
        })
      }
    },

    getOpacity (d, i) {
      return d.isClicked
        ? 1
        : 0.2
    },

    onDotClick (d, i) {
      return _.get(d, 'index') === this.initialIndex ? CONSTANTS.FOCUS_ON_DOT : null
    },

    randomizeData () {
      this.randomValue = _.random(10, 50)
    }
  }
}
</script>
```
