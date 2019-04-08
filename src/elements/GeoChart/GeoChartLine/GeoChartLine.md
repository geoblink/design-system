`GeoChartLine` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: v, y: _.random(0, 20) })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
        ticks: {
          count: 2
        },
        position: {
          type: POSITIONS.left
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 20,
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
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
          }
        }
      }
    },
    chartConfig () {
      if (!this.lineData) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          },
          animationsDurationInMilliseconds: 800
        },
        axisGroups: [
          this.linearAxisConfig,
          this.numericalAxisConfig
        ],
        lineGroups: [{
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          lineData: this.lineData,
          lineWidth: 2,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: v, y: _.random(0, 20) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```
