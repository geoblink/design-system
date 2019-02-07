```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Pills axis chart
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

export default {
  name: 'GeoChartBarsDemo',
  data () {
    return {
      chartData: null
    }
  },
  computed: {
    chartConfig () {
      if (!this.chartData) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          }
        },
        pieConfig: {
          data: this.chartData,
          keyForValues: 'value',
          innerRadius: 0.3,
        }
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      const values = _.times(_.random(2, 10), i => _.random(100, 1000))

      this.chartData = _.times(_.random(2, 10), function() {
        return {
          value: _.random(100, 1000)
        }
      })
    }
  }
}
</script>
```