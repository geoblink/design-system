Axes guidelines are lines that you might want to show in each tick of an axis to ease the viewing
of a chart. Multiple guidelines can be shown associated to different axes, or even to an axis that
is not being displayed in the chart.

To register axes guidelines in [`GeoChart`](./#/Elements/Charts?id=introduction), add an array
as value of `guidelinesGroups` key in the config object. Each item of the array must be
an object with the following...

## Required properties

Each **axis guidelines** **requires** at least one of these properties:

- `idAxis`: The ID of the axis where we want to show guidelines.
- `axisConfig`: Axis config (see [axes config](./#/Elements/Charts?id=axes)) to create guidelines
based on a new configuration instead of an existing axis on the chart.

## Customizing CSS classes

CSS classes added to the axis guidelines can be customized using `cssClasses` key. Its value
should be a function which takes as parameter the classes that would be set by
default. The function should return the CSS final classes you want for that axis guidelines.

> **Note:** even though you can disable some default CSS classes, of of them are
> required internally and will be added regardless what you return in the
> function.

## Customizing guidelines

Guidelines can be customized in several ways. To do so, add a key `guidelines` to the axis
guidelines config object. The value for that key must be an object with the following
properties, all of them optional:

- `count`: to customize the amount of guidelines displayed. Must be an integer number.
- `outerLines`: boolean that indicates whether to show guidelines at the edges of the
domain.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Axes guidelines
      <geo-primary-button @click="randomizeDomain()">
        Randomize data
      </geo-primary-button>
    </h3>
    <div class="element-demo__block">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
        height="300px"
        width="500px"
      />
    </div>
  </div>
</template>

<script>
const d3 = require('d3')
const { DIMENSIONS: BARS_DIMENSIONS } = require('./GeoChartBars')
const { SCALE_TYPES } = require('./GeoChartScale')

export default {
  name: 'GeoChartAxisDemo',
  data () {
    return {
      linearDomain: null
    }
  },
  computed: {
    POSITIONS () {
      const { POSITIONS } = require('./GeoChartAxis')
      return POSITIONS
    },

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
          type: this.POSITIONS.left
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          type: this.POSITIONS.anchoredToAxis,
          value: this.anchoredToValue,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: SCALE_TYPES.categorical,
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

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Axes guidelines customise number of lines and outerlines
      <geo-primary-button @click="randomizeDomain()">
        Randomize data
      </geo-primary-button>
    </h3>
    <div class="element-demo__block">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
        height="300px"
        width="500px"
      />
      <div class="element-demo__block__config">
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
      </div>
    </div>
  </div>
</template>

<script>
const d3 = require('d3')
const { DIMENSIONS: BARS_DIMENSIONS } = require('./GeoChartBars')
const { SCALE_TYPES } = require('./GeoChartScale')

export default {
  name: 'GeoChartAxisDemo',
  data () {
    return {
      linearDomain: null,
      linesCount: 5,
      outerLines: false
    }
  },
  computed: {
    POSITIONS () {
      const { POSITIONS } = require('./GeoChartAxis')
      return POSITIONS
    },

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
          type: this.POSITIONS.left
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          type: this.POSITIONS.anchoredToAxis,
          value: this.anchoredToValue,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: SCALE_TYPES.categorical,
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
            idAxis: this.categoricalAxisAnchoredToZeroAxisConfig.id,
          },
          {
            idAxis: this.linearAxisConfig.id,
            guidelines: {
              count: Number(this.linesCount),
              outerLines: this.outerLines
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

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Axes guidelines passing an axis config
      <geo-primary-button @click="randomizeDomain()">
        Randomize data
      </geo-primary-button>
    </h3>
    <div class="element-demo__block">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
        height="300px"
        width="500px"
      />
    </div>
  </div>
</template>

<script>
const d3 = require('d3')
const { DIMENSIONS: BARS_DIMENSIONS } = require('./GeoChartBars')
const { SCALE_TYPES } = require('./GeoChartScale')

export default {
  name: 'GeoChartAxisDemo',
  data () {
    return {
      linearDomain: null
    }
  },
  computed: {
    POSITIONS () {
      const { POSITIONS } = require('./GeoChartAxis')
      return POSITIONS
    },

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
          type: this.POSITIONS.left
        },
        scale: {
          type: SCALE_TYPES.linear,
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
          type: this.POSITIONS.anchoredToAxis,
          value: this.anchoredToValue,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: SCALE_TYPES.categorical,
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