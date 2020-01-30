#### Scatter Plot with data groups by color

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
      randomValue: _.random(1, 200),
      getRadius: function () { return 4 }
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
            tooltip: {
              content: (d, i) => {
                return `x: ${d.x} y: ${d.y}`
              },
              offset: () => null
            }
          }
        ]
      }
    }
  },
  methods: {
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    },

    getFillColor (d, i) {
      const randomPartInGreen = _.random(0, this.randomValue)
      const randomPartInOrange = _.random(randomPartInGreen, this.randomValue)
      if (i < randomPartInGreen) {
        return 'green'
      } else if (i < randomPartInOrange) {
        return 'orange'
      } else {
        return 'red'
      }
    },

    randomizeData () {
      this.randomValue = _.random(0, 1200)
    }
  }
}
</script>
```
