Similarly to [Bar charts](./#/Elements/Charts?id=bars), Colored bar charts are collections of grouped bars which are displayed as stacked rectangles in a 2-dimensional grid. An arbitrary amount of different collections of grouped bars can be displayed using colored bar charts, each of those collections are called **groups**.

To add colored bar **groups** to a chart, add an array to `colorBarGroups` key of [GeoChart](./#/Elements/Charts?id=introduction)'s config. Each item of the array
must be an object with the following...

## Required properties

- `data`: Collection of highlighted elements being displayed (array).
- `dimension`: A value of `BARS_DIMENSIONS` named export (either `horizontal` or `vertical`). The dimension in which the stacked rectangles will be positioned.
- `idHorizontalAxis`: The ID of the axis defining the `horizontal` dimension. Will be used to compute proper origin and span of the bar if the dimension is horizontal or the width of each individual group if the dimension is vertical.
- `idVerticalAxis`: The ID of the axis defining the `vertical` dimension. Will be used to compute proper origin and span of the bar if the dimension is vertical or the width of each individual group if the dimension is horizontal.
- `normalValue`: Value to position the colorBar in the normal (numerical) axis. The value must be contained within the linear axis domain.

**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes. See [Axes](./#/Elements/Charts?id=axes) for more info.

## Optional properties

Optionally you can configure each **group** with an **offset** and a **width**.
These are useful when you want to display multiple collections which have repeated
items for the **normal dimension**.

> **Normal dimension** is the dimension perpendicular to the group's `dimension`.
>
> For instance, if you set `dimension` to `horizontal` then the **normal dimension**
> will be `vertical`.

To allow maximum flexibility `GeoChart` does not prevent overlaps. To prevent
bars from different **groups** from overlapping you'll have to set a **width**
and an `offset`.

- **Width** defines the span of the rectangle in the **normal dimension**. The
span in the **group** `dimension` is computed just using the value associated to
that item in the corresponding axis, however, this is not appliable in all the
scenarios (a classic one is a bar chart displaying a set of categories and for
each category a numeric value - like an expenses by category chart - with the
**width** you can customize the span of the bars in the categorical axis).

- **HighlightedWidth** is defined exactly the same as width, with the difference
that this property is only applied to the items passed as data within each of the `colorBarGroups`.
The highlighted items will have by default a black stroke, with the user being able to customize
the extra width applied to each one of the items.

- **Offset** defines the translation in the **normal dimension** that must be
applied to the bars in order to not overlap. This is not enough to prevent
overlapping since by default in some axis the **width** is all the available
space so there doesn't exist a translation which would prevent an overlap.

Both of them can be expressed either in **absolute** or **natural** units:

- **Absolute** means in the same units as the underlying SVG coordinate space.
You can think of this as just pixels (although they are not strictly just pixels
and they might not directly translate 1:1 to screen pixels).
- **Natural** means in the same units as the axis used for the **normal dimension**.
For instance, if you have an axis of seconds, then a `naturalOffset` of `N` is
an offset of `N` seconds. If the axis are categories then the absolute value for
an offset of `N` is the absolute value for `N` categories.

You can choose either **absolute** or **natural** values for **width** and
**offset** independently, so the **offset** can be set to **natural** units
while the **width** is set to **absolute**.

There are 2 exclusive properties available to customize the **width**:

- `width` if you want to use **absolute** units.
- `naturalWidth` if you want to use **natural** units.

There are 2 exclusive properties available to customize the **highlightedWidth**:

- `highlightedWidth` if you want to use **absolute** units.
- `naturalHighlightedWidth` if you want to use **absolute** units.

There are 2 exclusive properties available to customize the **offset**:

- `normalOffset` if you want to use **absolute** units.
- `naturalNormalOffset` if you want to use **natural** units.

> **Note:** You can't set both `width` and `naturalWidth`,
`highlightedWidth` and `naturalHighlightedWidth`, or `normalOffset` and `naturalNormalOffset`.
Doing so will throw an invalid config error.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Horizontal color bar with width and highlightedWidth values
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

  export default {
    name: 'GeoChartColorBarDemo',
    data () {
      return {
        categoricalDomain: _.times(8, i => `Bucket ${i}`),
        chartData: null,
        normalValue: _.random(0, 1, true),
      }
    },
    computed: {
      linearAxisConfig () {
        return {
          id: 'demo-linear-axis',
          keyForValues: 'value',
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
              end: 1
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
        if (!(this.categoricalAxisConfig && this.chartData)) return null

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
          colorBarGroups: [{
            normalValue: this.normalValue,
            width: 12,
            highlightedWidth: 16,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.horizontal,
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.categoricalAxisConfig.id
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.chartData = _.filter(_.map(this.categoricalDomain, (category) => {
          return !!_.random(0, 1)
          ? { [this.categoricalAxisConfig.keyForValues]: category }
          : null
        }))
      }
    }
  }
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Horizontal color bar with naturalWidth and naturalHighlightedWidth values
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

  export default {
    name: 'GeoChartColorBarDemo',
    data () {
      return {
        categoricalDomain: null,
        chartData: null,
        normalValue: null,
      }
    },
    computed: {
      linearAxisConfig () {
        return {
          id: 'demo-linear-axis',
          keyForValues: 'value',
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
              end: 5
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
        if (!(this.categoricalAxisConfig || this.chartData)) return null

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
            this.linearAxisConfig,
            this.categoricalAxisConfig
          ],
          colorBarGroups: [{
            normalValue: this.normalValue,
            naturalWidth: 0.3,
            naturalHighlightedWidth: 0.35,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.horizontal,
            idVerticalAxis: this.linearAxisConfig.id,
            idHorizontalAxis: this.categoricalAxisConfig.id
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.categoricalDomain = _.times(_.random(2, 12), i => `Bucket ${i}`)
        this.normalValue = _.random(0, 1, true)

        this.chartData = _.filter(_.map(this.categoricalDomain, (category) => {
          return !!_.random(0, 1) ?
          { [this.categoricalAxisConfig.keyForValues]: category } :
          null
        }))
      }
    }
  }
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Vertical color bar with width and highlightedWidth values
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

  export default {
    name: 'GeoChartColorBarDemo',
    data () {
      return {
        categoricalDomain: null,
        chartData: null,
        normalValue: null,
      }
    },
    computed: {
      linearAxisConfig () {
        return {
          id: 'demo-linear-axis',
          keyForValues: 'value',
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
              end: 1
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
            type: POSITIONS.left
          },
          scale: {
            type: SCALE_TYPES.categorical,
            valueForOrigin: _.first(this.categoricalDomain),
            domain: this.categoricalDomain
          }
        }
      },

      chartConfig () {
        if (!(this.categoricalAxisConfig || this.chartData)) return null

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
            this.linearAxisConfig,
            this.categoricalAxisConfig
          ],
          colorBarGroups: [{
            normalValue: this.normalValue,
            width: 12,
            highlightedWidth: 16,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.vertical,
            idVerticalAxis: this.categoricalAxisConfig.id,
            idHorizontalAxis: this.linearAxisConfig.id
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.categoricalDomain = _.times(_.random(2, 12), i => `Bucket ${i}`)
        this.normalValue = _.random(0, 1, true)

        this.chartData = _.filter(_.map(this.categoricalDomain, (category) => {
          return !!_.random(0, 1) ?
          { [this.categoricalAxisConfig.keyForValues]: category } :
          null
        }))
      }
    }
  }
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Vertical color bar with naturalWidth and naturalHighlightedWidth values
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

  export default {
    name: 'GeoChartColorBarDemo',
    data () {
      return {
        categoricalDomain: null,
        chartData: null,
        normalValue: null,
      }
    },
    computed: {
      linearAxisConfig () {
        return {
          id: 'demo-linear-axis',
          keyForValues: 'value',
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
              end: 1
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
            type: POSITIONS.left
          },
          scale: {
            type: SCALE_TYPES.categorical,
            valueForOrigin: _.first(this.categoricalDomain),
            domain: this.categoricalDomain
          }
        }
      },

      chartConfig () {
        if (!(this.categoricalAxisConfig || this.chartData)) return null

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
            this.linearAxisConfig,
            this.categoricalAxisConfig
          ],
          colorBarGroups: [{
            normalValue: this.normalValue,
            naturalWidth: .03,
            naturalHighlightedWidth: .035,
            data: this.chartData,
            dimension: BARS_DIMENSIONS.vertical,
            idVerticalAxis: this.categoricalAxisConfig.id,
            idHorizontalAxis: this.linearAxisConfig.id
          }]
        }
      }
    },
    mounted () {
      this.randomizeData()
    },
    methods: {
      randomizeData () {
        this.categoricalDomain = _.times(_.random(2, 12), i => `Bucket ${i}`)
        this.normalValue = _.random(0, 1, true)

        this.chartData = _.filter(_.map(this.categoricalDomain, (category) => {
          return !!_.random(0, 1) ?
          { [this.categoricalAxisConfig.keyForValues]: category } :
          null
        }))
      }
    }
  }
</script>
```