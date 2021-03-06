#### Scatter Plot with data groups in quadrants with click event

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
        style="height: fit-content"
      >
        <geo-bordered-box-header>
          Click on a dot to get info
        </geo-bordered-box-header>
        <div style="height: 100px">
          {{ popupText }}
        </div>
        <geo-bordered-box-footer>
          <geo-secondary-button
            :disabled="!hasDotClicked"
            @click="unclickDot"
          >
            Unclick dot
          </geo-secondary-button>
        </geo-bordered-box-footer>
      </geo-bordered-box>
    </div>
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
      randomValue: _.random(10, 200),
      getRadius: function () { return 6 },
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
        },
        cssClasses: (original) => [...original, 'geo-chart-axis--with-quadrant']
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
            end: 20000
          }
        },
        cssClasses: (original) => [...original, 'geo-chart-axis--with-quadrant']
      }
    },
    scatterPlotData () {
      return _.times(this.randomValue, (i) => {
        return {
          x: _.random(0, 20000),
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
        quadrantGroups: [
          {
            horizontalAxisConfig: this.numericalAxisConfig,
            verticalAxisConfig: this.linearAxisConfig,
            horizontalThreshold: 10000,
            verticalThreshold: 500,
            quadrantTopLeftName: 'Quadrant A',
            quadrantTopRightName: 'Quadrant B',
            quadrantBottomLeftName: 'Quadrant C',
            quadrantBottomRightName: 'Quadrant D',
            tooltip: {
              content: (d, i) => {
                if (d.id) {
                  return `Name: ${d.name}`
                } else if (d.dimension) {
                  return d.dimension === CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal
                    ? `Horizontal quadrant line`
                    : `Vertical quadrant line`
                }
                return
              }
            }
          }
        ],
        scatterPlotGroups: [
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.scatterPlotData,
            getFillColor: this.getFillColor,
            getRadius: this.getRadius,
            onDotClick: this.showPopup,
            tooltip: {
              content: (d, i) => {
                return 'Click for more information'
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

    getFillColor (d, i) {
      if (d.x < 10000) {
        if (d.y < 500) {
          return 'orange'
        } else {
          return 'green'
        }
      } else if (d.x >= 10000) {
        if (d.y < 500) {
          return 'red'
        } else {
          return 'purple'
        }
      }
    },

    randomizeData () {
      this.randomValue = _.random(10, 200)
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
    },

    unclickDot () {
      const dot = document.querySelector('.is-clicked')
      const clickEvent = new MouseEvent('click')
      dot.dispatchEvent(clickEvent)
    }
  }
}
</script>
```
