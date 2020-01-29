#### Scatter Plot with data groups by radius with click event

```vue live
<template>
  <div class="element-demo">
    <div style="resize: both; display: flex; flex-direction: row;">
      <div
        class="element-demo__bordered-box element-demo__block--chart-container"
        style="resize: both;"
      >
        <geo-chart
          v-if="chartConfig && isGraphVisible"
          :config="chartConfig"
        />
      </div>
      <geo-bordered-box
        v-if="isGraphVisible"
        style="height: 100px"
      >
        <geo-bordered-box-header>
          Click on a dot to get info
        </geo-bordered-box-header>
        <geo-list-item>
          {{ popupText }}
        </geo-list-item>
      </geo-bordered-box>
    </div>
    <label>
      GroupKey: <select
        v-model="currentGroupKey"
      >
        <option value="x">x</option>
        <option value="y">y</option>
      </select>
    </label>
    <geo-primary-button @click="randomizeData()">
        Randomize Data
    </geo-primary-button>
    <geo-secondary-button @click="toggleGraph()">
      Toggle Graph
    </geo-secondary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoScatterPlotDemo',
  data () {
    return {
      isGraphVisible: true,
      randomValue: _.random(0, 10),
      randomValue2: _.random(0, 10),
      randomValue3: _.random(0, 10),
      randomValue4: _.random(0, 10),
      currentGroupKey: 'x',
      hasDotClicked: false,
      popupText: 'No information'
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 1000,
            end: 0
          }
        }
      }
    },
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'x',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25000
          }
        }
      }
    },
    scatterPlotData () {
      return _.times(this.randomValue, (i) => {
        return {
          x: _.random(0, 25000),
          y: _.random(0, 1000)
        }
      })
    },

    scatterPlotData2 () {
      return _.times(this.randomValue2, (i) => {
        return {
          x: _.random(0, 25000),
          y: _.random(0, 1000)
        }
      })
    },

    scatterPlotData3 () {
      return _.times(this.randomValue3, (i) => {
        return {
          x: _.random(0, 25000),
          y: _.random(0, 1000)
        }
      })
    },

    scatterPlotData4 () {
      return _.times(this.randomValue4, (i) => {
        return {
          x: _.random(0, 25000),
          y: _.random(0, 1000)
        }
      })
    },

    chartConfig () {
      if (!this.scatterPlotData) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 50
          },
          animationsDurationInMilliseconds: 800
        },
        axisGroups: [
          this.linearAxisConfig,
          this.numericalAxisConfig
        ],
        scatterPlotGroups: [
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.scatterPlotData,
            fillColor: '#2ca02c',
            onDotClick: this.showPopup,
            groupKey: this.currentGroupKey,
            tooltip: {
              content: (d, i) => {
                return `x: ${d.x} y: ${d.y}`
              },
              offset: () => null
            }
          },
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.scatterPlotData2,
            fillColor: '#d62727',
            onDotClick: this.showPopup,
            groupKey: this.currentGroupKey,
            tooltip: {
              content: (d, i) => {
                return `x: ${d.x} y: ${d.y}`
              },
              offset: () => null
            }
          },
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.scatterPlotData3,
            fillColor: '#9367bd',
            onDotClick: this.showPopup,
            groupKey: this.currentGroupKey,
            tooltip: {
              content: (d, i) => {
                return `x: ${d.x} y: ${d.y}`
              },
              offset: () => null
            }
          },
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.scatterPlotData4,
            fillColor: '#ff7e0e',
            onDotClick: this.showPopup,
            groupKey: this.currentGroupKey,
            tooltip: {
              content: (d, i) => {
                return `x: ${d.x} y: ${d.y}`
              },
              offset: () => null
            }
          }
        ]
      }
    }
  },
  methods: {
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    },

    randomizeData () {
      this.randomValue = _.random(0, 50)
      this.randomValue2 = _.random(0, 50)
      this.randomValue3 = _.random(0, 50)
      this.randomValue4 = _.random(0, 50)
      this.showPopup(null, null)
    },

    showPopup (d, i) {
      if (d === null) {
        this.hasDotClicked = false
        this.popupText = `No information`
      } else {
        this.hasDotClicked = true
        this.popupText = `x=${d.x} y=${d.y}`
      }
    }
  }
}
</script>
```
