Axes are not only used to be rendered in the charts but also as a wrapper on top
of scales. Some charts (like [bar charts](./#/Elements/Charts?id=bar-charts))
might require references to some axes. Those references must match an axis
registered in [`GeoChart`](./#/Elements/Charts?id=introduction).

To register axes in [`GeoChart`](./#/Elements/Charts?id=introduction), add an array
as value of `axisGroup` key in the config object. Each item of the array must be
an object with the following...

## Required properties

Each **axis** **requires** these properties:

- `id`: a unique ([`GeoChart`](./#/Elements/Charts?id=introduction)-instance-level)
identifier for this axis.
- `keyForValues`: the key in each chart item where the value for this axis is
stored.
- `position`: the position of the axis. Should be a value of `POSITIONS` named
export or a **relative position object** if you want an **anchored axis**.
- `scale`: the config object of the scale to be used by this axis. See
[Scales](./#/Elements/Charts?id=scales) for more info.

### Anchored axis

Sometimes you might want to anchor an axis to a specific **relative** position
of the chart. For instance, you might want to display a vertical axis wherever
value `0` is located in the horizontal one.

> **Note:** anchoring the axis to an **absolute** position of the chart can be done
> using [CSS transforms](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform)
> so it's not offered as part of the API.

**Relative** positions are relative to a value of a different axis so you must
provide both: a **value** and the ID of the **axis to which is relative**.

So in order to use an anchored-positioned axis the position you must provide is
an object with the following properties:

- `type`: always set to `POSITIONS.anchoredToAxis`.
- `value`: the value to which is anchored.
- `relativeToAxis`: the ID of the axis to which is anchored.

## Customizing CSS classes

CSS classes added to the axis can be customized using `cssClasses` key. Its value
should be a function which takes as parameter the classes that would be set by
default. The function should return the CSS final classes you want for that axis.

> **Note:** even though you can disable some default CSS classes, of of them are
> required internally and will be added regardless what you return in the
> function.

## Customizing ticks

Ticks can be customized in several ways. To do so, add a key `ticks` to the axis
config object. The value for that key must be an object with the following
properties, all of them optional:

- `count`: to customize the amount of ticks displayed. Must be an integer number.
- `format`: function taking as first parameter the value of the axis in the
domain and as second parameter its index. Should return a string with the text
to be displayed as value for given tick or an array of specially crafted objects
(see _Multiline ticks_ section for more info).

### Multiline ticks

Sometimes the text is long enough to fit nicely in multilple lines. Even if the
text is going to be displayed in a single line, you might be interested in adding
additional CSS classes to further customize the text.

To so so you can return an array of objects instead of a plain string in `format`
method. Those object must have the following shape:

- `text`: a string with the text to be rendered in one isolated line.
- `cssClasses`: an array of CSS classes to be added to the line.

Each entry of the array will be rendered in a different line, wrapped in a rect
with given CSS classes.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Multiple axis
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
      linearDomain: null,
      logarithmicDomain: null
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

    logarithmicAxisConfig () {
      if (!this.logarithmicDomain) return null

      return {
        id: 'demo-logarithmic-axis',
        keyForValues: 'value',
        ticks: {
          count: 10
        },
        position: {
          type: this.POSITIONS.right
        },
        scale: {
          type: SCALE_TYPES.logarithmic,
          valueForOrigin: _.clamp(1, this.logarithmicDomain.start, this.logarithmicDomain.end),
          domain: this.logarithmicDomain,
          base: 2
        }
      }
    },

    categoricalAxisConfig () {
      if (!this.categoricalDomain) return null

      return {
        id: 'demo-categorical-axis',
        keyForValues: 'category',
        position: {
          type: this.POSITIONS.top
        },
        scale: {
          type: SCALE_TYPES.categorical,
          domain: this.categoricalDomain,
          padding: {
            inner: 10,
            outer: 20
          }
        }
      }
    },

    chartConfig () {
      if (!this.linearAxisConfig) return null
      if (!this.logarithmicAxisConfig) return null
      if (!this.categoricalAxisConfig) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 60,
            bottom: 30,
            left: 30
          }
        },
        axisGroups: [
          this.linearAxisConfig,
          this.logarithmicAxisConfig,
          this.categoricalAxisConfig
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
      this.logarithmicDomain = {
        start: 1,
        end: _.random(100, 10000, false)
      }

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
      Anchored axis
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
    <h3 class="element-demo__header">Custom ticks</h3>
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
  computed: {
    POSITIONS () {
      const { POSITIONS } = require('./GeoChartAxis')
      return POSITIONS
    },

    chartConfig () {
      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 200
          }
        },
        axisGroups: [{
          id: 'demo-categorical-anchored-axis',
          keyForValues: 'category',
          position: {
            type: this.POSITIONS.left
          },
          scale: {
            type: SCALE_TYPES.categorical,
            domain: _.times(5, i => `Category ${i}`),
            padding: {
              inner: 10,
              outer: 20
            }
          },
          ticks: {
            format (d, i) {
              return `Tick ${i}: «${d}»`
            }
          }
        }]
      }
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Multiline ticks</h3>
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
  computed: {
    POSITIONS () {
      const { POSITIONS } = require('./GeoChartAxis')
      return POSITIONS
    },

    chartConfig () {
      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 200
          }
        },
        axisGroups: [{
          id: 'demo-categorical-anchored-axis',
          keyForValues: 'category',
          position: {
            type: this.POSITIONS.left
          },
          scale: {
            type: SCALE_TYPES.categorical,
            domain: _.times(5, i => `Category ${i}`),
            padding: {
              inner: 10,
              outer: 20
            }
          },
          ticks: {
            format (d, i) {
              return [{
                text: `Tick ${i}:`,
                cssClasses: ['rect-stroke-red-and-text-fill-black']
              }, {
                text: `«${d}»`,
                cssClasses: ['rect-stroke-red-and-text-fill-black']
              }]
            },
            label: {
              maximumWidth (drawingEnvironment) {
                return drawingEnvironment.chartMargin.left
              }
            }
          }
        }]
      }
    }
  }
}
</script>
```