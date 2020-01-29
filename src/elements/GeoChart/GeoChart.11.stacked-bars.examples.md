## Stacked bar charts

Stacked bar charts are collections of grouped items within a bar chart item which are displayed as rectangles in a 2-dimensional grid. An arbitrary amount of different collections of items can
be displayed using stacked bar charts, each of those collections are called **groups**.

### Required properties

Each **group requires** these properties:

- `data` - collection being displayed (array).
- `mainDimension` - a value of `DIMENSIONS.DIMENSIONS_2D` named export (either
`horizontal` or `vertical`). The dimension in which the rectangle will grow
depending on the value.
- `idHorizontalAxis` - the ID of the axis defining the `horizontal` dimension.
Will be used to compute proper origin and span of the bar if the dimension is horizontal or the width of each individual group if the dimension is vertical.
- `idVerticalAxis` - the ID of the axis defining the `vertical` dimension. Will be used to compute proper origin and span of the bar if the dimension is vertical or the width of each bar if the dimension is horizontal.

::: warning NOTE
`idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes.
See [Axes](#chart-axes) for more info.
:::

### Optional properties

Optionally you can configure each **group** with a **width**.
This is useful when you want to display multiple collections which have
repeated items for the **normal dimension**.

::: tip
**Normal dimension** is the dimension perpendicular to the group's `mainDimension`.

For instance, if you set `mainDimension` to `horizontal` then the
**normal dimension** will be `vertical`.
:::

To allow maximum flexibility `GeoChart` does not prevent overlaps. To prevent
stacked bars from different **groups** from overlapping you'll have to set a **width**.

- **Width** defines the span of the rectangles of a bar in the **normal dimension**. The
span in the **group** `dimension` is computed just using the value associated to
that item in the corresponding axis.

This property can be expressed either in **absolute** or **natural** units:

- **Absolute** means in the same units as the underlying SVG coordinate space.
You can think of this as just pixels (although they are not strictly just pixels
and they might not directly translate 1:1 to screen pixels).
- **Natural** means in the same units as the axis used for the **normal dimension**.
For instance, if you have an axis of seconds, then a `naturalWidth` of `N` is
a width of `N` seconds. If the axis are categories then the absolute value for
width of `N` is the absolute value for `N` categories.

There are 2 exclusive properties available to customize the **width**:

- `width` - if you want to use **absolute** units.
- `naturalWidth` - if you want to use **natural** units.

::: warning NOTE
You can't set both `width` and `naturalWidth`. Doing so will throw an invalid config error.
:::

### Tooltips

Each stacked bar can customize the tooltip displayed when it's hovered by setting the
key `tooltip`. This key must store an object with the following shape:

- `content` - **Required**. Function that takes as parameters the item
corresponding to the stacked bar being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset` - *Optional*. Function that takes as parameter the event triggering the
tooltip and is expected to return an object with an `x` and a `y` property, both
storing numbers that will be used as offset of the tooltip with respect to event
coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each stacked bar can customize its CSS classes by setting a function for key `cssClasses`.
This function takes as parameters the array of classes that would be set by
default, the item corresponding to the stacked bar being customized and its position
inside the data array.

### Examples

#### Vertical stacked bar chart

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        class="u-geo-chart--stacked-bar-axis"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeData()">
      Randomize data
    </geo-primary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartStackedBarsDemo',
  data () {
    return {
      chartData: null,
      categoricalDomain: null,
      domainLength: 0
    }
  },
  computed: {
    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'numerical',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 200,
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
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain
        }
      }
    },

    chartConfig () {
      if (!(this.numericalAxisConfig && this.chartData)) return null

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
          this.categoricalAxisConfig,
          this.numericalAxisConfig
        ],
        stackedBarGroups: [{
          data: this.chartData,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.vertical,
          width: 20,
          idHorizontalAxis: this.categoricalAxisConfig.id,
          idVerticalAxis: this.numericalAxisConfig.id,
          tooltip: {
            content: (d, i) => {
              const dTotal = d.endValue - d.startValue
              const dPercentage = this.getPercentage(dTotal, this.domainLength)
              return `Total zone ${i}: ${dTotal} (${dPercentage}%)`
            },
            offset: () => null
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
      this.categoricalDomain = _.times(_.random(2, 5), i => `Category ${i}`)

      this.domainLength = Math.abs(this.numericalAxisConfig.scale.domain.end - this.numericalAxisConfig.scale.domain.start)

      this.chartData = _.map(this.categoricalDomain, (category) => {
        const segments = this.getRandomCombinationOfSegments(this.domainLength, _.random(1, 4))
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.numericalAxisConfig.keyForValues]: _.times(segments.length, (idx) => {
            return {
              [this.numericalAxisConfig.keyForValues]: segments[idx],
              id: idx
            }
          })
        }
      })
    },
    getRandomCombinationOfSegments (total, nbOfSegments) {
      let currentTotal = 0
      const allSeg = new Array(nbOfSegments)
      _.times(nbOfSegments - 1, (i) => {
        const seg = _.random(0, total - currentTotal)
        allSeg[i] = seg
        currentTotal += seg
      })
      allSeg[nbOfSegments - 1] = total - currentTotal
      return allSeg
    },
    getPercentage(value, max) {
      return ( value / max ) * 100
    }
  }
}
</script>
```

#### Horizontal stacked bar chart

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        class="u-geo-chart--stacked-bar-axis"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeData()">
      Randomize data
    </geo-primary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoChartStackedBarsDemo',
  data () {
    return {
      chartData: null,
      categoricalDomain: null,
      domainLength: 0
    }
  },
  computed: {
    categoricalAxisConfig () {
      if (!this.categoricalDomain) return null

      return {
        id: 'demo-categorical-axis',
        keyForValues: 'category',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain
        }
      }
    },

    numericalAxisConfig () {
      return {
        id: 'demo-numerical-axis',
        keyForValues: 'numerical',
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 200
          }
        }
      }
    },

    chartConfig () {
      if (!(this.numericalAxisConfig && this.chartData)) return null

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
          this.categoricalAxisConfig,
          this.numericalAxisConfig
        ],
        stackedBarGroups: [{
          data: this.chartData,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          width: 20,
          idHorizontalAxis: this.numericalAxisConfig.id,
          idVerticalAxis: this.categoricalAxisConfig.id,
          tooltip: {
            content: (d, i) => {
              const dTotal = d.endValue - d.startValue
              const dPercentage = this.getPercentage(dTotal, this.domainLength)
              return `Total zone ${i}: ${dTotal} (${dPercentage}%)`
            },
            offset: () => null
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
      this.categoricalDomain = _.times(_.random(2, 5), i => `Cat ${i}`)

      this.domainLength = Math.abs(this.numericalAxisConfig.scale.domain.end - this.numericalAxisConfig.scale.domain.start)

      this.chartData = _.map(this.categoricalDomain, (category) => {
        const segments = this.getRandomCombinationOfSegments(this.domainLength, _.random(1, 4))
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.numericalAxisConfig.keyForValues]: _.times(segments.length, (idx) => {
            return {
              [this.numericalAxisConfig.keyForValues]: segments[idx],
              id: idx
            }
          })
        }
      })
    },
    getRandomCombinationOfSegments (total, nbOfSegments) {
      let currentTotal = 0
      const allSeg = new Array(nbOfSegments)
      _.times(nbOfSegments - 1, (i) => {
        const seg = _.random(0, total - currentTotal)
        allSeg[i] = seg
        currentTotal += seg
      })
      allSeg[nbOfSegments - 1] = total - currentTotal
      return allSeg
    },
    getPercentage(value, max) {
      return (value / max) * 100
    }
  }
}
</script>
```
