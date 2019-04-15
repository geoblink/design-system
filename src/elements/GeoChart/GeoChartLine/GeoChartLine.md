Use this chart to display information as a series of data points connected by straight line segments.
This chart can be used in combination with [GeoChartBars](./#/Elements/Charts?id=geochartbars).

To add line **groups** to a chart, add an array to `lineGroups` key of [GeoChart](./#/Elements/Charts?id=introduction)'s config.
Each item of the array must be an object with the following:

## Required properties

- `lineData`: Array of objects, each one representing a with two values that will be converted into x,y point coordinates across the axes.
- `dimension`: A value of `BARS_DIMENSIONS` named export (either `horizontal` or `vertical`).
- `idHorizontalAxis`: The ID of the axis defining the `horizontal` dimension.
- `idVerticalAxis`: The ID of the axis defining the `vertical` dimension.

**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes. See [Axes](./#/Elements/Charts?id=axes) for more info.

## Optional properties


- `lineGroupId`: Unique ID for each line that can be used to track each one of them in case the user wants to add/remove lines from the chart.
- `lineWidth`: Width in pixels of each one of the lines. If no width is provided, a default width of `2px` will be applied.
- `hoverCircleRadius`: Radius in pixels of the circles that will be displayed when hovering on the graph. If no width is provided, a default width of `2px` will be applied.
- `interpolationFn`: Choose one of the functions provided by D3 to handle the interpolation of the segments connecting each one of your data points. If no function is provided,
a default `d3.curveLinear` will be applied.
- `trackByKey`: Define this function to let D3 know which property of your data will be used to track changes in it.

### Tooltips

Each line can customize the tooltip displayed when it's hovered by setting the
key `tooltip`. This key must store an object with the following shape:

- `content`: **Required**. Function that takes as parameters the item
corresponding to the line being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset`: *Optional*. Function that takes as parameter the event triggering the
tooltip and is expected to return an object with an `x` and a `y` property, both
storing numbers that will be used as offset of the tooltip with respect to event
coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each line can customize its CSS classes by setting a function for key `cssClasses`.
This function takes as parameters the array of classes that would be set by
default, the item corresponding to the line being customized and its position
inside the data array.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Horizontal - No Data)
      <div class="element-demo__inline-input-group">
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
      lineData: [],
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
      Line chart (Horizontal - Missing some data)
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
      lineData2: _.filter(_.times(25, (v) => {
        return _.random(0, 1) ? {
          x: v,
          y: _.random(0, 20)
        } : null
      })),
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
        },
        {
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          dimension: BARS_DIMENSIONS.horizontal,
          lineData: this.lineData2,
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
      this.lineData2 = _.filter(_.times(25, (v) => {
        return _.random(0, 1) ? {
          x: v,
          y: _.random(0, 20)
        } : null
      }))
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
        <geo-primary-button @click="addLine()">
          Add line
        </geo-primary-button>
        <geo-danger-button
          v-for="lineGroup in extraLineGroups"
          :key="lineGroup.lineGroupId"
          @click="removeLine(lineGroup.lineGroupId)"
        >
          Remove line ({{ lineGroup.lineGroupId }})
        </geo-danger-button>
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
      lineData: _.times(13, (v) => ({ x: v, y: _.random(0, 20) })),
      isGraphVisible: true,
      extraLineGroups: []
    }
  },
  computed: {
    tooltipFunction () {
      return {
        content: (d, i) => `x: ${d.item[this.numericalAxisConfig.keyForValues]} y: ${d.item[this.linearAxisConfig.keyForValues]}`,
        offset: () => {
          return { x: 0, y: -15 }
        }
      }
    },
    lineGroups () {
      return [...this.defaultLineGroup, ...this.extraLineGroups]
    },
    defaultLineGroup () {
      return [
        {
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          dimension: BARS_DIMENSIONS.horizontal,
          lineData: _.times(13, (v) => ({ x: v, y: _.random(0, 20) })),
          lineWidth: 2,
          hoverCircleRadius: 6,
          interpolationFn: INTERPOLATION_TYPES['d3.curveCardinal'],
          tooltip: this.tooltipFunction
        }
      ]
    },
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
            end: 12
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
        lineGroups: this.lineGroups
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(13, (v) => ({ x: v, y: _.random(0, 20) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    },
    addLine () {
      this.extraLineGroups.push({
        lineGroupId: `Line-${this.extraLineGroups.length}`,
        idVerticalAxis: this.linearAxisConfig.id,
        idHorizontalAxis: this.numericalAxisConfig.id,
        dimension: BARS_DIMENSIONS.horizontal,
        lineData: _.times(13, (v) => ({ x: v, y: _.random(0, 20) })),
        lineWidth: 2,
        hoverCircleRadius: 6,
        interpolationFn: INTERPOLATION_TYPES['d3.curveCardinal'],
        tooltip: this.tooltipFunction,
        trackByKey (d, i) {
          return d.lineGroupId
        }
      })
    },
    removeLine (lineId) {
      if (!this.extraLineGroups.length) return
      const lineIndex = _.findIndex(this.extraLineGroups, { lineGroupId: lineId })
      this.extraLineGroups.splice(lineIndex, 1)
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
              content: (d, i) => `x: ${d.item[this.numericalAxisConfig.keyForValues]} y: ${d.item[this.linearAxisConfig.keyForValues]}`,
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
              content: (d, i) => `x: ${d.item[this.numericalAxisConfig.keyForValues]} y: ${d.item[this.linearAxisConfig.keyForValues]}`,
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

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Line chart (Horizontal - Bottom Axis) with Bars
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
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear'],
          tooltip: {
            content: (d, i) => `x: ${d.item[this.numericalAxisConfig.keyForValues]} y: ${d.item[this.linearAxisConfig.keyForValues]}`,
            offset: () => {
              return { x: 0, y: -15 }
            }
          }
        }],
        barGroups: [{
          data: this.lineData,
          dimension: BARS_DIMENSIONS.vertical,
          idHorizontalAxis: this.numericalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id,
          tooltip: {
            content: (d, i) => `x: ${d[this.numericalAxisConfig.keyForValues]} y: ${d[this.linearAxisConfig.keyForValues]}`,
            offset: () => {
              return { x: 0, y: -15 }
            }
          }
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
      Line chart (Horizontal - Categorical Data)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize Data
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
      lineData: [],
      categoricalDomain: null,
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
    categoricalAxisConfig () {
      if (!this.categoricalDomain) return null

      return {
        id: 'demo-categorical-axis',
        keyForValues: 'category',
        position: {
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain
        }
      }
    },
    chartConfig () {
      if (!this.categoricalAxisConfig || !this.lineData) return null

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
          this.categoricalAxisConfig
        ],
        lineGroups: [{
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.categoricalAxisConfig.id,
          dimension: BARS_DIMENSIONS.horizontal,
          lineData: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES['d3.curveLinear']
        }]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      this.categoricalDomain = _.times(_.random(2, 10), i => `Category ${i}`)
      this.lineData = _.map(this.categoricalDomain, (category) => {
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.linearAxisConfig.keyForValues]: _.random(
            this.linearAxisConfig.scale.domain.start,
            this.linearAxisConfig.scale.domain.end,
            false
          )
        }
      })
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```