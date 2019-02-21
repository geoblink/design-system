Bar charts are collection of single items which are displayed as rectangles in a
2-dimensional grid. An arbitrary amount of different collections of items can be
displayed using bar chars, each of those collections are called **groups**.

To add bar **groups** to a chart, add an array to `barGroups` key of
[GeoChart](./#/Elements/Charts?id=introduction)'s config. Each item of the array
must be an object with the following...

## Required properties

Each **group** **requires** these properties:

- `data`: Collection being displayed (array).
- `dimension`: A value of `BARS_DIMENSIONS` named export (either `horizontal` or `vertical`). The dimension in which the rectangle will grow depending on the value.
- `idHorizontalAxis`: The ID of the axis defining the `horizontal` dimension. Will be used to compute proper origin and span of the bar the horizontal.
- `idVerticalAxis`: The ID of the axis defining the `vertical` dimension. Will be used to compute proper origin and span of the bar the vertical.

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

You can chose either **absolute** or **natural** values for **width** and
**offset** independently, so the **offset** can be set to **natural** units
while the **width** is set to **absolute**.

There are 2 exclusive properties available to customize the **width**:

- `width` if you want to use **absolute** units.
- `naturalWidth` if you want to use **natural** units.

There are 2 exclusive properties available to customize the **offset**:

- `normalOffset` if you want to use **absolute** units.
- `naturalNormalOffset` if you want to use **natural** units.

> **Note:** You can't set both `width` and `naturalWidth` or `normalOffset` and
`naturalNormalOffset`. Doing so will throw an invalid config error.

### Tooltips

Each bar can customize the tooltip displayed when it's hovered by setting the
key `tooltip`. This key must store an object with the following shape:

- `content`: **Required**. Function that takes as parameters the item
corresponding to the bar being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset`: *Optional*. Function that takes as parameter the event triggering the
tooltip and is expected to return an object with an `x` and a `y` property, both
storing numbers that will be used as offset of the tooltip with respect to event
coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each bar can customize its CSS classes by setting a function for key `cssClasses`.
This function takes as parameters the array of classes that would be set by
default, the item corresponding to the bar being customized and its position
inside the data array.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Simple categorical chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
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
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { DIMENSIONS: BARS_DIMENSIONS } = require('./GeoChartBars')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

export default {
  name: 'GeoChartBarsDemo',
  data () {
    return {
      categoricalDomain: null,
      chartData: null
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'value',
        ticks: {
          count: 10
        },
        position: {
          type: POSITIONS.left
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 500,
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
          domain: this.categoricalDomain,
          padding: {
            inner: 0.1,
            outer: 0.2
          }
        }
      }
    },

    chartConfig () {
      if (!this.categoricalAxisConfig) return null
      if (!this.chartData) return null

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
        barGroups: [{
          data: this.chartData,
          dimension: BARS_DIMENSIONS.vertical,
          idHorizontalAxis: this.categoricalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id
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

      this.chartData = _.map(this.categoricalDomain, (category) => {
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.linearAxisConfig.keyForValues]: _.random(
            this.linearAxisConfig.scale.domain.start,
            this.linearAxisConfig.scale.domain.end,
            false
          )
        }
      })
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Multiple series with tooltip
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
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
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

export default {
  name: 'GeoChartBarsDemo',
  data () {
    return {
      categoricalDomain: null,
      monthlyTemperatureOf2017: null,
      monthlyTemperatureOf2018: null,
      monthlyTemperatureOf2019: null
    }
  },
  computed: {
    categoricalAxisConfigKeyForValue () {
      return 'month'
    },

    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'temperature',
        ticks: {
          count: 10
        },
        position: {
          type: POSITIONS.left
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 60,
            end: -30
          }
        }
      }
    },

    categoricalAxisConfig () {
      if (!this.linearAxisConfig) return null

      return {
        id: 'demo-categorical-axis',
        keyForValues: this.categoricalAxisConfigKeyForValue,
        position: {
          type: POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        scale: {
          type: SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain,
          padding: {
            inner: 0.1,
            outer: 0.2
          }
        }
      }
    },

    chartConfig () {
      if (!this.monthlyTemperatureOf2017) return null
      if (!this.monthlyTemperatureOf2018) return null
      if (!this.monthlyTemperatureOf2019) return null

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
        barGroups: [{
          data: this.monthlyTemperatureOf2017,
          dimension: BARS_DIMENSIONS.vertical,
          naturalWidth: 0.3,
          idHorizontalAxis: this.categoricalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id,
          tooltip: {
            content: (d, i) => `${d[this.categoricalAxisConfig.keyForValues]} 2017 :: ${d[this.linearAxisConfig.keyForValues]} (position fixed)`,
            offset: () => null
          }
        }, {
          data: this.monthlyTemperatureOf2018,
          dimension: BARS_DIMENSIONS.vertical,
          naturalWidth: 0.3,
          naturalNormalOffset: 0.35,
          idHorizontalAxis: this.categoricalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id,
          tooltip: {
            content: (d, i) => `${d[this.categoricalAxisConfig.keyForValues]} 2018 :: ${d[this.linearAxisConfig.keyForValues]}`
          },
          cssClasses: (original) => [...original, 'fill-red']
        }, {
          data: this.monthlyTemperatureOf2019,
          dimension: BARS_DIMENSIONS.vertical,
          naturalWidth: 0.3,
          naturalNormalOffset: 0.7,
          idHorizontalAxis: this.categoricalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id,
          tooltip: {
            content: (d, i) => `${d[this.categoricalAxisConfig.keyForValues]} 2019 :: ${d[this.linearAxisConfig.keyForValues]}`
          },
          cssClasses: (original) => [...original, 'fill-green']
        }],
        guidelinesGroups: [
          { idAxis: this.linearAxisConfig.id }
        ]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      this.categoricalDomain = _.times(_.random(1, 12), i => {
        const d = new Date()
        d.setMonth(i)
        return d.toLocaleString('en', { month: 'long' })
      })

      this.monthlyTemperatureOf2017 = _.map(this.categoricalDomain, (category) => {
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.linearAxisConfig.keyForValues]: _.random(this.linearAxisConfig.scale.domain.start, this.linearAxisConfig.scale.domain.end, false)
        }
      })

      this.monthlyTemperatureOf2018 = _.map(this.categoricalDomain, (category) => {
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.linearAxisConfig.keyForValues]: _.random(this.linearAxisConfig.scale.domain.start, this.linearAxisConfig.scale.domain.end, false)
        }
      })

      this.monthlyTemperatureOf2019 = _.map(this.categoricalDomain, (category) => {
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.linearAxisConfig.keyForValues]: _.random(this.linearAxisConfig.scale.domain.start, this.linearAxisConfig.scale.domain.end, false)
        }
      })
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Interactive multi-series categorical chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="showAverageSales = !showAverageSales">
          Toggle average sales
        </geo-primary-button>
      </div>
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
const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')

export default {
  name: 'GeoChartBars',
  data () {
    return {
      showAverageSales: false,
      categoricalDomain: null,
      thisYearSales: null,
      averageSales: null
    }
  },
  computed: {
    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'income',
        ticks: {
          count: 3
        },
        position: {
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: -300000,
            end: 300000
          }
        }
      }
    },

    percentageAxisConfig () {
      return {
        id: 'demo-percentage-axis',
        keyForValues: 'percentage-income',
        ticks: {
          count: 3
        },
        position: {
          type: POSITIONS.bottom
        },
        scale: {
          type: SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: -1,
            end: 1
          }
        }
      }
    },

    categoricalAxisConfig () {
      if (!this.linearAxisConfig) return null

      const position = this.showAverageSales
        ? {
          type: POSITIONS.anchoredToAxis,
          value: this.percentageAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.percentageAxisConfig.id
        }
        : {
          type: POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        }

      const domain = _.times(5, i => `Store #${i}`)

      return {
        id: 'demo-categorical-axis',
        keyForValues: 'point_of_sale',
        position,
        scale: {
          type: SCALE_TYPES.categorical,
          valueForOrigin: _.first(domain),
          domain,
          padding: {
            inner: 0.1,
            outer: 0.2
          }
        },
        cssClasses (originalClasses) {
          return [...originalClasses, 'hide-text', 'hide-paths', 'hide-lines']
        }
      }
    },

    chartConfig () {
      if (!this.linearAxisConfig) return null
      if (!this.percentageAxisConfig) return null
      if (!this.categoricalAxisConfig) return null
      if (!this.thisYearSales) return null
      if (!this.averageSales) return null

      const axisGroups = [
        this.categoricalAxisConfig
      ]

      const idHorizontalAxis = this.showAverageSales
        ? this.percentageAxisConfig.id
        : this.linearAxisConfig.id

      const barGroups = [{
        data: this.thisYearSales,
        dimension: BARS_DIMENSIONS.horizontal,
        naturalWidth: 0.45,
        idHorizontalAxis,
        idVerticalAxis: this.categoricalAxisConfig.id,
        cssClasses: (originalClasses, item, index) => [
          ...originalClasses,
          item[this.linearAxisConfig.keyForValues] < 0 ? 'fill-red' : 'fill-green'
        ]
      }]

      if (this.showAverageSales) {
        barGroups.push({
          data: this.averageSales,
          dimension: BARS_DIMENSIONS.horizontal,
          naturalWidth: 0.15,
          naturalNormalOffset: 0.55,
          idHorizontalAxis,
          idVerticalAxis: this.categoricalAxisConfig.id
        })
        axisGroups.push(this.percentageAxisConfig)
      } else {
        axisGroups.push(this.linearAxisConfig)
      }

      const labelGroupsData = _.map(this.categoricalAxisConfig.scale.domain, (category) => {

        const labels = [{ text: category }]

        if (Math.random() > 0.5) {
          labels.push({
            text: '»',
            cornerRadius: _.random(5, 20, false),
            padding: {
              top: 0,
              right: _.random(10, 20, false),
              bottom: 0,
              left: _.random(10, 20, false)
            },
            margin: {
              top: 0,
              right: 0,
              left: _.random(10, 20, false),
              bottom: 0
            },
            cssClasses: (defaultClasses, d, i) => [...defaultClasses, 'rect-stroke-red-and-text-fill-black']
          })
        }

        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          labels
        }
      })

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 250
          }
        },
        axisGroups,
        labelGroups: [{
          data: _.take(labelGroupsData, _.random(1, labelGroupsData.length, false)),
          idVerticalAxis: this.categoricalAxisConfig.id
        }],
        barGroups,
        guidelinesGroups: [{idAxis: idHorizontalAxis}]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      if (!this.categoricalAxisConfig) return
      if (!this.percentageAxisConfig) return
      if (!this.linearAxisConfig) return

      const {
        categoricalAxisConfig,
        percentageAxisConfig,
        linearAxisConfig
      } = this

      this.thisYearSales = getRandomSalesData()
      this.averageSales = getRandomSalesData()

      function getRandomSalesData () {
        return _.map(
          categoricalAxisConfig.scale.domain,
          (category) => {
            return {
              [percentageAxisConfig.keyForValues]: _.random(
                percentageAxisConfig.scale.domain.start,
                percentageAxisConfig.scale.domain.end,
                false
              ),
              [categoricalAxisConfig.keyForValues]: category,
              [linearAxisConfig.keyForValues]: _.random(
                linearAxisConfig.scale.domain.start,
                linearAxisConfig.scale.domain.end,
                false
              )
            }
          }
        )
      }
    }
  }
}
</script>
```
