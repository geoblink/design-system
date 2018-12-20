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
    <h3 class="element-demo__header">
      Categorical chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeCategoricalChartData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block">
      <geo-chart
        v-if="categoricalChartConfig"
        :config="categoricalChartConfig"
        :height="heightInPx"
        :width="widthInPx"
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
      debug: true,
      categoricalChartData: null
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
          ticks: {
            count: this.horizontalAxis.ticks
          },
          position: {
            type: this.horizontalAxis.position
          },

          scale: {
            type: SCALE_TYPES.linear,
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
          ticks: {
            count: this.verticalAxis.ticks
          },
          position: {
            type: this.verticalAxis.position
          },

          scale: {
            type: SCALE_TYPES.linear,
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
    },

    categoricalChartValueForOrigin () {
      return 0
    },

    categoricalChartDomain () {
      const limit = 500000
      return {
        start: -limit,
        end: limit
      }
    },

    categoricalChartCategories () {
      return ['First category', 'Second category', 'Third category']
    },

    categoricalChartHorizontalAxisConfig () {
      if (!this.categoricalChartData) return null

      const values = _.map(this.categoricalChartData, 'value')

      return {
        id: 'value',
        ticks: {
          count: 5
        },
        position: {
          type: this.POSITIONS.bottom
        },

        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: this.categoricalChartValueForOrigin,
          domain: {
            start: _.min([...values, this.categoricalChartValueForOrigin]),
            end: _.max([...values, this.categoricalChartValueForOrigin])
          }
        }
      }
    },

    categoricalChartVerticalAxisConfig () {
      return {
        id: 'category',
        ticks: {
          count: this.categoricalChartCategories.length
        },
        labels: {
          transform (d, i, drawingEnvironment) {
            return `translate(-${drawingEnvironment.absolutePosition.x - drawingEnvironment.chartMargin.left}, 0)`
          }
        },
        position: {
          type: this.POSITIONS.anchoredToScale,
          value: this.categoricalChartValueForOrigin,
          relativeToScale: 'value'
        },

        scale: {
          type: SCALE_TYPES.categorical,
          domain: this.categoricalChartCategories,
          padding: {
            outer: 0.2,
            inner: 0.1
          }
        }
      }
    },

    categoricalChartAxisGroups () {
      return [
        this.categoricalChartHorizontalAxisConfig,
        this.categoricalChartVerticalAxisConfig
      ]
    },

    categoricalChartConfig () {
      if (!this.categoricalChartData) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 100
          }
        },
        axisGroups: this.categoricalChartAxisGroups,
        barGroups: [{
          data: this.categoricalChartData,
          dimension: BARS_DIMENSIONS.horizontal,
          idHorizontalAxis: this.categoricalChartHorizontalAxisConfig.id,
          idVerticalAxis: this.categoricalChartVerticalAxisConfig.id
        }]
      }
    }
  },
  mounted () {
    this.randomizeCategoricalChartData()
  },
  methods: {
    randomizeCategoricalChartData () {
      this.categoricalChartData = _.map(this.categoricalChartCategories, (category) => {
        return {
          category,
          value: _.random(
            this.categoricalChartDomain.start,
            this.categoricalChartDomain.end,
            false
          )
        }
      })
    }
  }
}
</script>
```