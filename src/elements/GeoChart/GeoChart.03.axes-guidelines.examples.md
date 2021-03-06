## Axes guidelines

Axes guidelines are lines that you might want to show in each tick of an axis to
ease the viewing of a chart. Multiple guidelines can be shown associated to
different axes, or even to an axis that is not being displayed in the chart.

To register axes guidelines in [`GeoChart`](#geochart), add an array as value
of `guidelinesGroups` key in the config object. Each item of the array must be
an object with the following…

### Required properties

Each **axis guideline** **requires** only one of these properties:

- `idAxis` - the ID of the axis where we want to show guidelines.
- `axisConfig` - axis config (see [axes config](#chart-axes)) to create
guidelines based on a new configuration instead of an existing axis on the chart.

### Customizing CSS classes

CSS classes added to the axes guidelines can be customized using `cssClasses` key.
Its value should be a function which takes as parameter the classes that would be
set by default. The function should return the CSS final classes you want for
that axis guidelines.

::: warning NOTE
Even though you can disable some default CSS classes, of of them are required
internally and will be added regardless what you return in the function.
:::

### Customizing guidelines

Guidelines can be customized in several ways. To do so, add a key `guidelines`
to the axes guidelines config object. The value for that key must be an object
with the following properties, all of them optional:

- `count` - to customize the amount of guidelines displayed. Must be an integer
number.
- `outerLines` - boolean that indicates whether to show guidelines at the edges
of the domain.

### Examples

#### Axes guidelines

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeDomain()">
      Randomize data
    </geo-primary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartAxisDemo',
  data () {
    return {
      linearDomain: null
    }
  },
  computed: {
    categoricalDomain () {
      return _.times(5, i => `Category ${i}`)
    },

    anchoredToValue () {
      if (!this.linearDomain) return null

      return _.random(this.linearDomain.start, this.linearDomain.end, false)
    },

    linearAxisConfig () {
      if (!this.linearDomain) return null

      return {
        id: 'demo-linear-axis',
        keyForValues: 'value',
        ticks: {
          count: 10
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: _.clamp(0, this.linearDomain.start, this.linearDomain.end),
          domain: this.linearDomain
        }
      }
    },

    categoricalAxisAnchoredToZeroAxisConfig () {
      if (!this.categoricalDomain) return null
      if (!this.linearAxisConfig) return null

      return {
        id: 'demo-categorical-anchored-axis',
        keyForValues: 'category',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.anchoredToValue,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain,
          padding: {
            inner: 10,
            outer: 20
          }
        }
      }
    },

    chartConfig () {
      if (!this.categoricalAxisAnchoredToZeroAxisConfig) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          }
        },
        axisGroups: [
          this.categoricalAxisAnchoredToZeroAxisConfig,
          this.linearAxisConfig
        ],
        guidelinesGroups: [
          {
            idAxis: this.categoricalAxisAnchoredToZeroAxisConfig.id
          },
          {
            idAxis: this.linearAxisConfig.id,
            guidelines: {
              cssClasses (originalClasses, d, i) {
                return [...originalClasses, 'my-class']
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.randomizeDomain()
  },
  methods: {
    randomizeDomain () {
      this.linearDomain = getRandomDomain(-500, 500)

      function getRandomDomain (minValue, maxValue) {
        const rawData = _.sortBy([
          _.random(minValue, maxValue, false),
          _.random(minValue, maxValue, false)
        ])
        return {
          start: _.first(rawData),
          end: _.last(rawData)
        }
      }
    }
  }
}
</script>
```

#### Customizable axes guidelines

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />

      <div class="element-demo__block__config">
        <geo-primary-button @click="randomizeDomain()">
          Randomize data
        </geo-primary-button>

        <label class="element-demo__inline-input-group__field">
          lines count linearAxis: <input
            :style="{
              width: '40px'
            }"
            type="number"
            min="0"
            v-model="linesCount"
          >
        </label>
        <label class="element-demo__inline-input-group__field">
          show outer lines linearAxis: <input
            :style="{
              width: '40px'
            }"
            type="checkbox"
            v-model="outerLines"
          >
        </label>
        <label class="element-demo__inline-input-group__field">
          show categorical guidelines: <input
            :style="{
              width: '40px'
            }"
            type="checkbox"
            v-model="showGuidelinesCategorical"
          >
        </label>
        <label class="element-demo__inline-input-group__field">
          show linear guidelines: <input
            :style="{
              width: '40px'
            }"
            type="checkbox"
            v-model="showGuidelinesLinear"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartAxisDemo',
  data () {
    return {
      linearDomain: null,
      linesCount: 5,
      outerLines: false,
      showGuidelinesCategorical: true,
      showGuidelinesLinear: true
    }
  },
  computed: {
    categoricalDomain () {
      return _.times(5, i => `Category ${i}`)
    },

    anchoredToValue () {
      if (!this.linearDomain) return null

      return _.random(this.linearDomain.start, this.linearDomain.end, false)
    },

    linearAxisConfig () {
      if (!this.linearDomain) return null

      return {
        id: 'demo-linear-axis',
        keyForValues: 'value',
        ticks: {
          count: 10
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: _.clamp(0, this.linearDomain.start, this.linearDomain.end),
          domain: this.linearDomain
        }
      }
    },

    categoricalAxisAnchoredToZeroAxisConfig () {
      if (!this.categoricalDomain) return null
      if (!this.linearAxisConfig) return null

      return {
        id: 'demo-categorical-anchored-axis',
        keyForValues: 'category',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.anchoredToValue,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain,
          padding: {
            inner: 10,
            outer: 20
          }
        }
      }
    },

    guidelinesConfigLinear () {
      return {
        idAxis: this.linearAxisConfig.id,
        guidelines: {
          count: Number(this.linesCount),
          outerLines: this.outerLines
        }
      }
    },

    guidelinesConfigCategorical () {
      return {
        idAxis: this.categoricalAxisAnchoredToZeroAxisConfig.id,
      }
    },

    guidelinesGroups () {
      if (this.showGuidelinesCategorical && this.showGuidelinesLinear) {
        return [this.guidelinesConfigCategorical, this.guidelinesConfigLinear]
      } else if (this.showGuidelinesCategorical) {
        return [this.guidelinesConfigCategorical]
      } else if (this.showGuidelinesLinear) {
        return [this.guidelinesConfigLinear]
      } else {
        return []
      }
    },

    chartConfig () {
      if (!this.categoricalAxisAnchoredToZeroAxisConfig) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          }
        },
        axisGroups: [
          this.categoricalAxisAnchoredToZeroAxisConfig,
          this.linearAxisConfig
        ],
        guidelinesGroups: this.guidelinesGroups
      }
    }
  },
  mounted () {
    this.randomizeDomain()
  },
  methods: {
    randomizeDomain () {
      this.linearDomain = getRandomDomain(-500, 500)

      function getRandomDomain (minValue, maxValue) {
        const rawData = _.sortBy([
          _.random(minValue, maxValue, false),
          _.random(minValue, maxValue, false)
        ])
        return {
          start: _.first(rawData),
          end: _.last(rawData)
        }
      }
    }
  }
}
</script>
```

#### Axes guidelines passing  an axis  config

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeDomain()">
      Randomize data
    </geo-primary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartAxisDemo',
  data () {
    return {
      linearDomain: null
    }
  },
  computed: {
    categoricalDomain () {
      return _.times(5, i => `Category ${i}`)
    },

    anchoredToValue () {
      if (!this.linearDomain) return null

      return _.random(this.linearDomain.start, this.linearDomain.end, false)
    },

    linearAxisConfig () {
      if (!this.linearDomain) return null

      return {
        id: 'demo-linear-axis',
        keyForValues: 'value',
        ticks: {
          count: 10
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: _.clamp(0, this.linearDomain.start, this.linearDomain.end),
          domain: this.linearDomain
        }
      }
    },

    categoricalAxisAnchoredToZeroAxisConfig () {
      if (!this.categoricalDomain) return null
      if (!this.linearAxisConfig) return null

      return {
        id: 'demo-categorical-anchored-axis',
        keyForValues: 'category',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.anchoredToValue,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain,
          padding: {
            inner: 10,
            outer: 20
          }
        }
      }
    },

    chartConfig () {
      if (!this.categoricalAxisAnchoredToZeroAxisConfig) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          }
        },
        axisGroups: [
          this.linearAxisConfig
        ],
        guidelinesGroups: [
          {
            axisConfig: this.categoricalAxisAnchoredToZeroAxisConfig
          },
          {
            idAxis: this.linearAxisConfig.id
          }
        ]
      }
    }
  },
  mounted () {
    this.randomizeDomain()
  },
  methods: {
    randomizeDomain () {
      this.linearDomain = getRandomDomain(-500, 500)

      function getRandomDomain (minValue, maxValue) {
        const rawData = _.sortBy([
          _.random(minValue, maxValue, false),
          _.random(minValue, maxValue, false)
        ])
        return {
          start: _.first(rawData),
          end: _.last(rawData)
        }
      }
    }
  }
}
</script>
```