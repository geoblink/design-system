## Quadrants

Use this component to represent 2 lines separating the chart into 4 quadrants, and name these 4 quadrants.

To add quadrant **groups** to a chart, add an array to `quadrantGroups` key of [GeoChart](#geochart)'s config. Each item of the array must be an object with the following:

### Required properties

- `horizontalAxisConfig` - horizontal axis config of the chart (see [axes config](#chart-axes)), which will create the vertical line of the quadrant.
- `verticalAxisConfig` - vertical axis config of the chart (see [axes config](#chart-axes)), which will create the horizontal line of the quadrant.
- `horizontalThreshold` - relative position of the vertical quadrant line on the horizontal axis of the chart (must be within `horizontalAxisConfig`'s domain). When no threshold is defined, the line isn't shown.
- `verticalThreshold` - relative position of the horizontal quadrant line on the vertical axis of the chart (must be within `verticalAxisConfig`'s domain). When no threshold is defined, the line isn't shown.

### Optional properties

- `quadrantTopLeftName` - name of the top left quadrant (to be displayed on the top left corner of the chart).
- `quadrantTopRightName` - name of the top right quadrant (to be displayed on the top right corner of the chart).
- `quadrantBottomLeftName` - name of the bottom left quadrant (to be displayed on the bottom left corner of the chart).
- `quadrantBottomRightName` - name of the bottom right quadrant (to be displayed on the bottom right corner of the chart).
- `fontSize` - size of the names of the quadrant. It should be a number, that will then be displayed in pixels.

### Tooltips

Each label and each quadrant line can customize the tooltip displayed when it's hovered by setting the key `tooltip`. This key must store an object with the following shape:

- `content` - **Required**. Function that takes as parameters the item
corresponding to the label or axis being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset` - *Optional*. Function that takes as parameter the event triggering the
tooltip and is expected to return an object with an `x` and a `y` property, both
storing numbers that will be used as offset of the tooltip with respect to event
coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each quadrant group can customize its CSS classes by setting a function for key `cssClasses`. (Use this for give a custom radius or color to each represented group).
This function takes as parameters the array of classes that would be set by
default, the item corresponding to the scatter plot group being customized and its position inside the data array.

### Examples

#### Quadrant with tooltip

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeThreshold()">
      Randomize data
    </geo-primary-button>
    <geo-secondary-button @click="toggleGraph()">
      Toggle Graph
    </geo-secondary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartQuadrantDemo',
  data () {
    return {
      xDomain: 1000,
      yDomain: 2000,
      horizontalThreshold: null,
      verticalThreshold: null,
      isGraphVisible: true
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
            start: this.yDomain,
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
            end: this.xDomain
          }
        },
        cssClasses: (original) => [...original, 'geo-chart-axis--with-quadrant']
      }
    },

    chartConfig () {
      if (!this.linearAxisConfig) return
      if (!this.numericalAxisConfig) return

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
            horizontalThreshold: this.horizontalThreshold,
            verticalThreshold: this.verticalThreshold,
            quadrantTopLeftName: 'Quadrant 1',
            quadrantTopRightName: 'Quadrant 2',
            quadrantBottomLeftName: 'Quadrant 3',
            quadrantBottomRightName: 'Quadrant 4',
            fontSize: 11,
            tooltip: {
              content: (d, i) => {
                if (d.id) {
                  switch (d.id) {
                    case 1:
                      return `Top left quadrant: ${d.name}`
                    case 2:
                      return `Top right quadrant: ${d.name}`
                    case 3:
                      return `Bottom left quadrant: ${d.name}`
                    case 4:
                      return `Bottom right quadrant: ${d.name}`
                  }
                } else if (d.dimension) {
                  return d.dimension === CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal
                    ? `Horizontal quadrant axis : threshold of ${this.verticalThreshold}`
                    : `Vertical quadrant axis : threshold of ${this.horizontalThreshold}`
                }
                return
              }
            }
          }
        ]
      }
    }
  },
  created () {
    this.randomizeThreshold()
  },
  methods: {
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    },
    randomizeThreshold () {
      this.horizontalThreshold = _.random(0, this.xDomain)
      this.verticalThreshold = _.random(0, this.yDomain)
    }
  }
}
</script>
```

#### Quadrant with guidelines and categorical axis

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeThreshold()">
      Randomize data
    </geo-primary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartQuadrantDemo',
  data () {
    return {
      yDomain: 10000,
      categoricalDomain: _.times(5, i => `Category ${i}`),
      horizontalThreshold: null,
      verticalThreshold: null
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'linear',
        ticks: {
          count: 5
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: this.yDomain,
            end: 0
          }
        },
        cssClasses: (original) => [...original, 'geo-chart-axis--with-quadrant']
      }
    },
    categoricalAxisConfig () {
      if (!this.categoricalDomain) return null

      return {
        id: 'demo-categorical-axis',
        keyForValues: 'category',
        ticks: {
          count: 5
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain,
        },
        cssClasses: (original) => [...original, 'geo-chart-axis--with-quadrant']
      }
    },

    chartConfig () {
      if (!this.linearAxisConfig) return
      if (!this.categoricalAxisConfig) return

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
          this.categoricalAxisConfig,
          this.linearAxisConfig
        ],
        quadrantGroups: [
          {
            horizontalAxisConfig: this.categoricalAxisConfig,
            verticalAxisConfig: this.linearAxisConfig,
            horizontalThreshold: this.horizontalThreshold,
            verticalThreshold: this.verticalThreshold,
            quadrantTopLeftName: 'Top Left',
            quadrantTopRightName: 'Top Right',
            quadrantBottomLeftName: 'Bottom Left',
            quadrantBottomRightName: 'Bottom Right'
          }
        ],
        guidelinesGroups: [
          {
            idAxis: this.categoricalAxisConfig.id
          },
          {
            idAxis: this.linearAxisConfig.id
          }
        ]
      }
    }
  },
  created () {
    this.randomizeThreshold()
  },
  methods: {
    randomizeThreshold () {
      const index = _.random(0, this.categoricalDomain.length - 1)
      this.horizontalThreshold = this.categoricalDomain[index]
      this.verticalThreshold = _.random(0, this.yDomain)
    }
  }
}
</script>
```

#### One line quadrant with tooltip

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeThreshold()">
      Randomize data
    </geo-primary-button>
    <geo-secondary-button @click="toggleGraph()">
      Toggle Graph
    </geo-secondary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartQuadrantDemo',
  data () {
    return {
      xDomain: 1000,
      yDomain: 1000,
      horizontalThreshold: null,
      isGraphVisible: true
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
            start: this.yDomain,
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
            end: this.xDomain
          }
        },
        cssClasses: (original) => [...original, 'geo-chart-axis--with-quadrant']
      }
    },

    chartConfig () {
      if (!this.linearAxisConfig) return
      if (!this.numericalAxisConfig) return

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
            horizontalThreshold: this.horizontalThreshold,
            quadrantTopLeftName: 'Long quadrant name',
            quadrantTopRightName: 'Very long name for a quadrant',
            fontSize: 11,
            tooltip: {
              content: (d, i) => {
                if (d.id) {
                  switch (d.id) {
                    case 1:
                      return `Left quadrant: ${d.name}`
                    case 2:
                      return `Right quadrant: ${d.name}`
                  }
                } else if (d.dimension) {
                  return `Vertical quadrant axis : threshold of ${this.horizontalThreshold}`
                }
                return
              }
            }
          }
        ]
      }
    }
  },
  created () {
    this.randomizeThreshold()
  },
  methods: {
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    },
    randomizeThreshold () {
      this.horizontalThreshold = _.random(0, this.xDomain)
    }
  }
}
</script>
```
