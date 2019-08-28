```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Vertical - Right Axis)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div
      class="element-demo__bordered-box element-demo__block--chart-container"
      style="width: 300px; height: 400px"
    >
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: _.random(0, 20), y: v })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'x',
        ticks: {
          count: 2
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
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
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'y',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.right
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 25,
            end: 0
          }
        }
      }
    },
    chartConfig () {
      if (!this.lineData) return null

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
        lineGroups: [{
          idVerticalAxis: this.numericalAxisConfig.id,
          idHorizontalAxis: this.linearAxisConfig.id,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.vertical,
          data: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES.curveLinear
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: _.random(0, 20), y: v }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Vertical - Left Axis)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div
      class="element-demo__bordered-box element-demo__block--chart-container"
      style="width: 300px; height: 400px"
    >
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: _.random(0, 20), y: v })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'x',
        ticks: {
          count: 2
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 20
          }
        }
      }
    },
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'y',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 25,
            end: 0
          }
        }
      }
    },
    chartConfig () {
      if (!this.lineData) return null

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
        lineGroups: [{
          idVerticalAxis: this.numericalAxisConfig.id,
          idHorizontalAxis: this.linearAxisConfig.id,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.vertical,
          data: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES.curveLinear
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: _.random(0, 20), y: v }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Vertical - Anchored Axis)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div
      class="element-demo__bordered-box element-demo__block--chart-container"
      style="width: 300px; height: 400px"
    >
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: _.random(-20, 20), y: v })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'x',
        ticks: {
          count: 2
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: -20,
            end: 20
          }
        }
      }
    },
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'y',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 25,
            end: 0
          }
        }
      }
    },
    chartConfig () {
      if (!this.lineData) return null

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
        lineGroups: [{
          idVerticalAxis: this.numericalAxisConfig.id,
          idHorizontalAxis: this.linearAxisConfig.id,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.vertical,
          data: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES.curveLinear
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: _.random(-20, 20), y: v }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```