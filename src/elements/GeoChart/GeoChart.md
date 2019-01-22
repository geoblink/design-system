`GeoChart` provides a convenient wrapper on top of D3 to display reactive data,
hiding all the complexities of [D3](https://d3js.org/). To use this component
you must [install D3](https://github.com/d3/d3/wiki#installing) in your application.

To ease integration of `GeoChart` there's an extensive config validator. The
JSON schema of the config is available in `GeoChartConfig.js`.

Axis and data representation are completely decoupled. Each different kind of
chart has a different set of requirements regarding axis and other parameters.
Check out the documentation of each specific data representation for more info.

**Note** that `GeoChart` API is different from [D3's]() so you need no knowledge
of [D3](https://d3js.org/) to use it.

## Optional properties

- `margin`: must be an object with `top`, `right`, `bottom` and `left` keys,
which values are numbers. Applies this margin to the entire chart.
- `animationsDurationInMilliseconds`: must be a number, allows customizing the
duration of the animations.

> We encourage you take a look at `GeoChartConfig.js` for more info about global
> settings.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Empty chart</h3>
    <div class="element-demo__block">
      <geo-chart
        :config="config"
        height="300px"
        width="500px"
        debug
      />
    </div>
  </div>
</template>

<script>
const d3 = require('d3')
const { DIMENSIONS: BARS_DIMENSIONS } = require('./GeoChartBars')
const { SCALE_TYPES } = require('./GeoChartScale')

export default {
  name: 'GeoChartDemo',
  computed: {
    config () {
      return {
        axisGroups: [{
          id: 'horizontal',
          keyForValues: 'x',
          position: {
            type: 'left'
          },
          scale: {
            type: 'linear',
            valueForOrigin: 0,
            domain: {
              start: 0,
              end: 100
            }
          }
        }]
      }
    }
  }
}
</script>
```

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
const d3 = require('d3')
const { DIMENSIONS: BARS_DIMENSIONS } = require('./GeoChartBars')
const { SCALE_TYPES } = require('./GeoChartScale')

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
        position: 'top'
      },
      verticalAxis: {
        domain: {
          start: 0,
          end: 100
        },
        ticks: 10,
        position: 'right'
      },
      debug: true
    }
  },
  computed: {
    POSITIONS () {
      const { POSITIONS } = require('./GeoChartAxis')
      return POSITIONS
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
            type: SCALE_TYPES.linear,
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
            type: SCALE_TYPES.linear,
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