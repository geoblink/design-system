#### Horizontal time line chart

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')
const { INTERPOLATION_TYPES } = require('@/elements/GeoChart/GeoChartLine/GeoChartLine')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      startDate: new Date('2017-10-01'),
      endDate: new Date('2018-06-01')
    }
  },
  computed: {
    timeDomain () {
      return [this.startDate, this.endDate]
    },
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
        ticks: {
          count: 10
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 20,
            end: 0
          }
        }
      }
    },
    timeAxisConfig () {
      if (!this.timeDomain) return null

      return {
        id: 'demo-categorical-axis',
        keyForValues: 'date',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.time,
          valueForOrigin: _.first(this.timeDomain),
          domain: this.timeDomain,
          nice: 'timeMonth'
        }
      }
    },
    chartConfig () {
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
          this.timeAxisConfig
        ],
        lineGroups: [{
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.timeAxisConfig.id,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          data: _.times(6, function (index) {
            return {
              date: new Date(`2018-0${index+1}-01`),
              y: _.random(0, 20)
            }
          }),
          lineWidth: 2,
          hoverCircleRadius: 4
        }]
      }
    }
  }
}
</script>
```