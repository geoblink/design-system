### GeoChart Line Segments

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Horizontal line
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
        categoricalDomain: _.times(2, i => `Segment ${i}`),
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

      categoricalAxisConfig () {
        if (!this.categoricalDomain) return null

        return {
          id: 'demo-categorical-axis',
          keyForValues: 'category',
          position: {
            type: POSITIONS.bottom
          },
          scale: {
            type: SCALE_TYPES.categorical,
            valueForOrigin: _.first(this.categoricalDomain),
            domain: this.categoricalDomain
          }
        }
      },

      chartConfig () {
        if (!(this.categoricalAxisConfig && this.chartData)) return null

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
            this.categoricalAxisConfig
          ],
          lineSegmentsGroups: [{
            normalValue: this.normalValue,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.horizontal,
            lineWidth: 5,
            circleRadius: 2,
            circleMargin: 2,
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.categoricalAxisConfig.id
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.chartData = _.filter(_.map(this.categoricalDomain, (category) => {
          return !!_.random(0, 1)
          ? { [this.categoricalAxisConfig.keyForValues]: category }
          : null
        }))
      }
    }
  }
</script>
```