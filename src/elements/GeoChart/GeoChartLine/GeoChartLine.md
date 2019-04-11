`GeoChartLine` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Horizontal - Bottom Axis)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: v, y: _.random(0, 20) })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
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
            start: 20,
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
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
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
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          dimension: BARS_DIMENSIONS.horizontal,
          lineData: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: v, y: _.random(0, 20) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Horizontal - Top Axis)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: v, y: -_.random(0, 20) })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
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
            end: -20
          }
        }
      }
    },
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'x',
        position: {
          type: POSITIONS.top
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
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
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          dimension: BARS_DIMENSIONS.horizontal,
          lineData: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: v, y: -_.random(0, 20) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Horizontal - Anchored Axis)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: v, y: _.random(-20, 20) })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
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
            start: 20,
            end: -20
          }
        }
      }
    },
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'x',
        position: {
          type: POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
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
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          dimension: BARS_DIMENSIONS.horizontal,
          lineData: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: v, y: -_.random(-20, 20) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```

```vue
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
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

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
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          type: POSITIONS.right
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          dimension: BARS_DIMENSIONS.vertical,
          lineData: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
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

```vue
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
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

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
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          type: POSITIONS.left
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          dimension: BARS_DIMENSIONS.vertical,
          lineData: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
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

```vue
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
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

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
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          type: POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          dimension: BARS_DIMENSIONS.vertical,
          lineData: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
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

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Horizontal - Multilines)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: v, y: _.random(0, 20) })),
      lineData2: _.times(25, (v) => ({ x: v, y: _.random(0, 20) })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
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
            start: 20,
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
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
          }
        }
      }
    },
    chartConfig () {
      if (!this.lineData || !this.lineData2) return null

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
        lineGroups: [
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            dimension: BARS_DIMENSIONS.horizontal,
            lineData: this.lineData,
            lineWidth: 2,
            hoverCircleRadius: 4,
            interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
          },
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            dimension: BARS_DIMENSIONS.horizontal,
            lineData: this.lineData2,
            lineWidth: 4,
            hoverCircleRadius: 4,
            interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
          }
        ]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: v, y: _.random(0, 20) }))
      this.lineData2 = _.times(25, (v) => ({ x: v, y: _.random(0, 20) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Horizontal - Multilines (Negative Values))
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-secondary-button @click="toggleGraph()">
          Toggle Graph
        </geo-secondary-button>
      </div>
    </h3>
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(25, (v) => ({ x: v, y: _.random(0, 20) })),
      lineData2: _.times(25, (v) => ({ x: v, y: _.random(-20, 0) })),
      isGraphVisible: true
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'y',
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
            start: 20,
            end: -20
          }
        }
      }
    },
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'x',
        position: {
          type: POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
          }
        }
      }
    },
    chartConfig () {
      if (!this.lineData || !this.lineData2) return null

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
        lineGroups: [
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            dimension: BARS_DIMENSIONS.horizontal,
            lineData: this.lineData,
            lineWidth: 2,
            hoverCircleRadius: 4,
            interpolationFn: INTERPOLATION_TYPES['d3.curveLinear'],
            tooltip: {
              content: (d, i) => `x: ${d.item[this.numericalAxisConfig.keyForValues]} y: ${d.item[this.linearAxisConfig.keyForValues]} (position fixed)`,
              offset: () => {
                return { x: 0, y: -15 }
              }
            }
          },
          {
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.numericalAxisConfig.id,
            dimension: BARS_DIMENSIONS.horizontal,
            lineData: this.lineData2,
            lineWidth: 4,
            hoverCircleRadius: 4,
            interpolationFn: INTERPOLATION_TYPES['d3.curveLinear'],
            tooltip: {
              content: (d, i) => `x: ${d.item[this.numericalAxisConfig.keyForValues]} y: ${d.item[this.linearAxisConfig.keyForValues]} (position fixed)`,
              offset: () => {
                return { x: 0, y: -15 }
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: v, y: _.random(0, 20) }))
      this.lineData2 = _.times(25, (v) => ({ x: v, y: _.random(-20, 0) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```