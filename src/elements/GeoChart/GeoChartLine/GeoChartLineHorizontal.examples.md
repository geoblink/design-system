---
title: Line chart (horizontal)
---

```vue live
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
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

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
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
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
      this.lineData = _.times(25, (v) => ({ x: v, y: _.random(0, 20) }))
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
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

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
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          data: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES.curveLinear
        },
        {
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          data: this.lineData2,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES.curveLinear
        }]
      }
    }
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(25, (v) => ({ x: v, y: _.random(0, 20) }))
      this.lineData2 = _.filter(_.times(25, (v) => {
        return _.random(0, 1)
          ? { x: v, y: _.random(0, 20) }
          : null
      }))
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
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

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
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
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
          type: CONSTANTS.AXIS.POSITIONS.top
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
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
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
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
      this.lineData = _.times(25, (v) => ({ x: v, y: -_.random(0, 20) }))
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
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

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
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
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
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
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
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
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
      this.lineData = _.times(25, (v) => ({ x: v, y: -_.random(-20, 20) }))
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
      Line chart (Horizontal - Multilines)
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <geo-primary-button @click="addLine()">
          Add line
        </geo-primary-button>
        <geo-danger-button
          v-for="(lineGroup, index) in extraLineGroups"
          :key="lineGroup.groupKey"
          @click="removeLine(lineGroup.groupKey)"
        >
          Remove line ({{ lineGroup.groupKey }})
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
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: _.times(13, (v) => ({ x: v, y: _.random(0, 20) })),
      isGraphVisible: true,
      extraLineGroups: [],
      lastAddedId: 1
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
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          data: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 6,
          interpolationFn: INTERPOLATION_TYPES.curveCardinal,
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
      const id = this.lastAddedId
      this.extraLineGroups.push({
        idVerticalAxis: this.linearAxisConfig.id,
        idHorizontalAxis: this.numericalAxisConfig.id,
        mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
        data: _.times(13, (v) => ({ x: v, y: _.random(0, 20) })),
        lineWidth: 2,
        hoverCircleRadius: 6,
        interpolationFn: INTERPOLATION_TYPES.curveCardinal,
        tooltip: this.tooltipFunction,
        groupKey: `${id}`
      })
      this.lastAddedId++
    },
    removeLine (lineId) {
      if (!this.extraLineGroups.length) return
      const lineIndex = _.findIndex(this.extraLineGroups, function (lineGroup, i) {
        return lineGroup.groupKey === lineId
      })
      this.extraLineGroups.splice(lineIndex, 1)
    }
  }
}
</script>
```

```vue live
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
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

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
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
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
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
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
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.lineData,
            lineWidth: 2,
            hoverCircleRadius: 4,
            interpolationFn: INTERPOLATION_TYPES.curveLinear,
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
            mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
            data: this.lineData2,
            lineWidth: 4,
            hoverCircleRadius: 4,
            interpolationFn: INTERPOLATION_TYPES.curveLinear,
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

```vue live
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
const CONSTANTS = require('../constants')
const { INTERPOLATION_TYPES } = require('./GeoChartLine')

export default {
  name: 'GeoChartLineDemo',
  data () {
    return {
      lineData: null,
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
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          data: this.lineData,
          lineWidth: 2,
          hoverCircleRadius: 4,
          interpolationFn: INTERPOLATION_TYPES.curveLinear,
          tooltip: {
            content: (d, i) => `x: ${d.item[this.numericalAxisConfig.keyForValues]} y: ${d.item[this.linearAxisConfig.keyForValues]}`,
            offset: () => {
              return { x: 0, y: -15 }
            }
          }
        }],
        barGroups: [{
          data: this.lineData,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.vertical,
          idHorizontalAxis: this.numericalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id,
          naturalNormalOffset: -0.25,
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
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      this.lineData = _.times(24, (v) => ({ x: v + 1, y: _.random(0, 20) }))
    },
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```