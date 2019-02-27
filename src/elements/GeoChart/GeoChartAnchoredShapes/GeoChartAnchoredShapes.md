
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
  const { ANCHOR_POSITIONS, getTriangleShapePath }= require('./GeoChartAnchoredShapes')

export default {
    name: 'GeoChartLineSegmentsDemo',
    data () {
      return {
        chartData: null,
        normalValue: 0.5,
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
          anchoredShapesGroups: [{
            normalValue: this.normalValue,
            normalOffset: 6,
            shapeData: this.getRandomShapeDistribution(),
            dimension: BARS_DIMENSIONS.horizontal,
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            getAnchorPosition (d, i) {
              return d.isUp ? ANCHOR_POSITIONS.leading : ANCHOR_POSITIONS.trailing
            },
            getShapeSize () {
              return {
                width: 12,
                height: 10
              }
            },
            getAnchoredText (d, i, axis) {
              return `Label ${i} - Value ${d[axis.keyForValues]}`
            },
            getShapePath (d, i, { size, shapeOffsetFromAxis, singleGroupOptions }) {
              return getTriangleShapePath(d, i, { size, shapeOffsetFromAxis, singleGroupOptions })
            }
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.chartData = this.getRandomShapeDistribution()
      },
      getRandomShapeDistribution () {
        return [
          {
            [this.numericalAxisConfig.keyForValues]: this.numericalAxisConfig.scale.domain.start,
            isUp: true
          },
          {
            [this.numericalAxisConfig.keyForValues]: this.numericalAxisConfig.scale.domain.end,
            isUp: true
          },
          {
            [this.numericalAxisConfig.keyForValues]: _.random(0, 200),
            isUp: false
          }
        ]
      }
    }
  }
</script>
```
