### GeoChart Line Segments

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Horizontal Line Segments chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
        height="300px"
        width="500px"
      />
    </div>
  </div>
</template>

<script>
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

export default {
    name: 'GeoChartLineSegmentsDemo',
    data () {
      return {
        numericalDomain: null,
        chartData: null,
        normalValue: _.random(0, 1, true),
      }
    },
    computed: {
      linearAxisConfig () {
        return {
          id: 'demo-linear-axis',
          keyForValues: 'value',
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
              start: 0,
              end: 1
            }
          }
        }
      },

      numericalAxisConfig () {
        return {
          id: 'demo-numerical-axis',
          keyForValues: 'numerical',
          position: {
            type: POSITIONS.bottom
          },
          scale: {
            type: SCALE_TYPES.linear,
            valueForOrigin: 0,
            domain: {
              start: 0,
              end: 200
            }
          }
        }
      },

      chartConfig () {
        if (!(this.numericalAxisConfig && this.chartData)) return null

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
          lineSegmentsGroups: [{
            normalValue: this.normalValue,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.horizontal,
            lineWidth: 2,
            circleRadius: 3,
            circleMargin: 2,
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.chartData = _.sortBy(_.times(_.random(1, 3), () => {
          return { [this.numericalAxisConfig.keyForValues]: _.random(0, 200) }
        }), this.numericalAxisConfig.keyForValues)
      }
    }
  }
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Vertical Line Segments chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
        height="500px"
        width="200px"
      />
    </div>
  </div>
</template>

<script>
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

export default {
    name: 'GeoChartLineSegmentsDemo',
    data () {
      return {
        numericalDomain: null,
        chartData: null,
        normalValue: _.random(0, 1, true),
      }
    },
    computed: {
      linearAxisConfig () {
        return {
          id: 'demo-linear-axis',
          keyForValues: 'value',
          ticks: {
            count: 2
          },
          position: {
            type: POSITIONS.bottom
          },
          scale: {
            type: SCALE_TYPES.linear,
            valueForOrigin: 0,
            domain: {
              start: 0,
              end: 1
            }
          }
        }
      },

      numericalAxisConfig () {
        return {
          id: 'demo-numerical-axis',
          keyForValues: 'numerical',
          position: {
            type: POSITIONS.left
          },
          scale: {
            type: SCALE_TYPES.linear,
            valueForOrigin: 0,
            domain: {
              start: 0,
              end: 200
            }
          }
        }
      },

      chartConfig () {
        if (!(this.numericalAxisConfig && this.chartData)) return null

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
          lineSegmentsGroups: [{
            normalValue: this.normalValue,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.vertical,
            lineWidth: 2,
            circleRadius: 3,
            circleMargin: 2,
            idHorizontalAxis: this.linearAxisConfig.id,
            idVerticalAxis: this.numericalAxisConfig.id
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.chartData = _.sortBy(_.times(_.random(1, 3), () => {
          return { [this.numericalAxisConfig.keyForValues]: _.random(0, 200) }
        }), this.numericalAxisConfig.keyForValues)
      }
    }
  }
</script>
```