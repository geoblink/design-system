### Playground

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Chart</h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box" style="resize: both;">
        <geo-chart
          :debug="debug"
          :config="chartConfig"
        />
      </div>
      <div class="element-demo__block__config">
        <label class="element-demo__inline-input-group__field">
          Debug grid: <input type="checkbox" v-model="debug">
        </label>
        <label class="element-demo__inline-input-group__field">
          Height: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model="height"
          >
        </label>
        <label class="element-demo__inline-input-group__field">
          Width: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model="width"
          >
        </label>
        <label class="element-demo__inline-input-group__field">
          Margin top: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model.number="chartMargin.top"
          > right: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model.number="chartMargin.right"
          > <br> bottom: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model.number="chartMargin.bottom"
          > left: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model.number="chartMargin.left"
          >
        </label>
        <label class="element-demo__inline-input-group__field">
          Horizontal axis domain start: <input
            :style="{
              width: '40px'
            }"
            type="number"
            v-model.number="horizontalAxis.domain.start"
          > <br> domain end: <input
            :style="{
              width: '40px'
            }"
            type="number"
            v-model.number="horizontalAxis.domain.end"
          > <br> position: <select v-model="horizontalAxis.position">
            <option :value="POSITIONS.bottom">Bottom</option>
            <option :value="POSITIONS.top">Top</option>
            <option :value="POSITIONS.verticallyCenteredInTheMiddle">Vertically Centered</option>
          </select> <br> ticks: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model.number="horizontalAxis.ticks"
          >
        </label>
        <label class="element-demo__inline-input-group__field">
          Vertical axis domain start: <input
            :style="{
              width: '40px'
            }"
            type="number"
            v-model.number="verticalAxis.domain.start"
          > <br> domain end: <input
            :style="{
              width: '40px'
            }"
            type="number"
            v-model.number="verticalAxis.domain.end"
          > <br> position: <select v-model="verticalAxis.position">
            <option :value="POSITIONS.left">Left</option>
            <option :value="POSITIONS.right">Right</option>
            <option :value="POSITIONS.horizontallyCenteredInTheMiddle">Horizontally Centered</option>
          </select> <br> ticks: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model.number="verticalAxis.ticks"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartDemo',
  data () {
    return {
      height: '300',
      width: '500',
      chartMargin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
      },
      horizontalAxis: {
        domain: {
          start: 0,
          end: 100
        },
        ticks: 10,
        position: CONSTANTS.AXIS.POSITIONS.top
      },
      verticalAxis: {
        domain: {
          start: 0,
          end: 100
        },
        ticks: 10,
        position: CONSTANTS.AXIS.POSITIONS.right
      },
      debug: true
    }
  },
  computed: {
    POSITIONS () {
      return CONSTANTS.AXIS.POSITIONS
    },

    heightInPx () {
      return `${this.height}px`
    },

    widthInPx () {
      return `${this.width}px`
    },

    axisGroups () {
      const axes = []

      if (this.horizontalAxis.position in this.POSITIONS) {
        axes.push({
          id: 'horizontal',
          keyForValues: 'x',
          ticks: {
            count: this.horizontalAxis.ticks
          },
          position: {
            type: this.horizontalAxis.position
          },

          scale: {
            type: CONSTANTS.SCALES.SCALE_TYPES.linear,
            valueForOrigin: Math.max(this.horizontalAxis.domain.start, 0),
            domain: {
              start: this.horizontalAxis.domain.start,
              end: this.horizontalAxis.domain.end
            }
          }
        })
      }

      if (this.verticalAxis.position in this.POSITIONS) {
        axes.push({
          id: 'vertical',
          keyForValues: 'y',
          ticks: {
            count: this.verticalAxis.ticks
          },
          position: {
            type: this.verticalAxis.position
          },

          scale: {
            type: CONSTANTS.SCALES.SCALE_TYPES.linear,
            valueForOrigin: Math.max(this.verticalAxis.domain.start, 0),
            domain: {
              start: this.verticalAxis.domain.start,
              end: this.verticalAxis.domain.end
            }
          }
        })
      }

      return axes
    },

    chartConfig () {
      return {
        chart: {
          margin: this.chartMargin,
        },
        axisGroups: this.axisGroups
      }
    }
  }
}
</script>
```