`GeoChart` provides a convenient wrapper on top of D3 to display reactive data.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Chart</h3>
    <div class="element-demo__block">
      <geo-chart
        :debug="debug"
        :config="chartConfig"
        :height="heightInPx"
        :width="widthInPx"
      />
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
          > bottom: <input
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
          > domain end: <input
            :style="{
              width: '40px'
            }"
            type="number"
            v-model.number="horizontalAxis.domain.end"
          > position: <select v-model="horizontalAxis.position">
            <option value="hidden">Hidden</option>
            <option :value="POSITIONS.bottom">Bottom</option>
            <option :value="POSITIONS.top">Top</option>
            <option :value="POSITIONS.verticallyCenteredInTheMiddle">Vertically Centered in the Middle</option>
          </select> ticks: <input
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
          > domain end: <input
            :style="{
              width: '40px'
            }"
            type="number"
            v-model.number="verticalAxis.domain.end"
          > position: <select v-model="verticalAxis.position">
            <option value="hidden">Hidden</option>
            <option :value="POSITIONS.left">Left</option>
            <option :value="POSITIONS.right">Right</option>
            <option :value="POSITIONS.horizontallyCenteredInTheMiddle">Horizontally Centered in the Middle</option>
          </select> ticks: <input
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
export default {
  name: 'GeoChartDemo',
  data () {
    return {
      height: '300',
      width: '500',
      chartMargin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      horizontalAxis: {
        domain: {
          start: 0,
          end: 100
        },
        ticks: 10,
        position: 'hidden'
      },
      verticalAxis: {
        domain: {
          start: 0,
          end: 100
        },
        ticks: 10,
        position: 'hidden'
      },
      debug: true
    }
  },
  computed: {
    POSITIONS () {
      const { POSITIONS } = require('./GeoChart.axis')
      return POSITIONS
    },

    heightInPx () {
      return `${this.height}px`
    },

    widthInPx () {
      return `${this.width}px`
    },

    axisGroups () {
      const d3 = require('d3')

      const axe = []

      if (this.horizontalAxis.position in this.POSITIONS) {
        axe.push({
          ticks: this.horizontalAxis.ticks,
          position: this.horizontalAxis.position,

          scale: d3
            .scaleLinear()
            .domain([this.horizontalAxis.domain.start, this.horizontalAxis.domain.end]) // data dimensions
        })
      }

      if (this.verticalAxis.position in this.POSITIONS) {
        axe.push({
          ticks: this.verticalAxis.ticks,
          position: this.verticalAxis.position,

          scale: d3
            .scaleLinear()
            .domain([this.verticalAxis.domain.start, this.verticalAxis.domain.end]) // data dimensions
        })
      }

      return axe
    },

    chartConfig () {
      return {
        chartSize: {
          height: this.heightInPx,
          width: this.widthInPx
        },
        chartMargin: this.chartMargin,
        axisGroups: this.axisGroups
      }
    }
  }
}
</script>
```