Similarly to [Bar charts](./#/Elements/Charts?id=bars), Colored bar charts are collections of grouped bars which are displayed as stacked rectangles in a 2-dimensional grid. An arbitrary amount of different collections of grouped bars can be displayed using colored bar charts, each of those collections are called **groups**.

To add colored bar **groups** to a chart, add an array to `coloredBarGroups` key of [GeoChart](./#/Elements/Charts?id=introduction)'s config. Each item of the array
must be an object with the following...

## Required properties

- `data`: Collection being displayed (array).
- `dimension`: A value of `BARS_DIMENSIONS` named export (either `horizontal` or `vertical`). The dimension in which the stacked rectangles will be positioned.
- `idHorizontalAxis`: The ID of the axis defining the `horizontal` dimension. Will be used to compute proper origin and span of the bar if the dimension is horizontal or the width of each individual group if the dimension is vertical.
- `idVerticalAxis`: The ID of the axis defining the `vertical` dimension. Will be used to compute proper origin and span of the bar if the dimension is vertical or the width of each individual group if the dimension is horizontal.

**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes. See [Axes](./#/Elements/Charts?id=axes) for more info.

### TBC

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Simple categorical chart
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
  const { POSITIONS } = require('./GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('./GeoChartBars')
  const { SCALE_TYPES } = require('./GeoChartScale')

  export default {
    name: 'GeoChartColoredBarDemo',
    data () {
      return {
        categoricalDomain: null,
        chartData: null,
        normalValue: null,
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
        if (!(this.categoricalAxisConfig || this.chartData)) return null

        return {
          chart: {
            margin: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 30
            }
          },
          axisGroups: [
            this.linearAxisConfig,
            this.categoricalAxisConfig
          ],
          colorBarGroups: [{
            normalValue: this.normalValue,
            normalOffset: -7.5,
            width: 15,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.horizontal,
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
        this.categoricalDomain = _.times(_.random(2, 15), i => `Bucket ${i}`)
        this.normalValue = _.random(0, 1, true)

        this.chartData = _.filter(_.map(this.categoricalDomain, (category) => {
          return !!_.random(0, 1) ?
          { [this.categoricalAxisConfig.keyForValues]: category } :
          null
        }))
      }
    }
  }
</script>
```