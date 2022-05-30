## LABEL WITH BAR CHART 2

Sometimes you might want to add custom labels to the chart, anchored to the items
already displayed in it according to their values. A
collection of labels associated to a single item of the chart is what we call a
**label group**.

To add the value labels, you have to add a key of **hasLabelValues** which is a boolean. To add **label groups** to a chart, add an array to `labelGroups` key of
[GeoChart](#geochart)'s config. Each item of the array must be an object with
the following… 

### Required properties

Each **group** **requires** these properties:

- `data` - collection being displayed (array).
- `mainDimension` - a value of `DIMENSIONS.DIMENSIONS_2D` named export (either
`horizontal` or `vertical`). The dimension in which the rectangle will grow
depending on the value.
- `idHorizontalAxis` - the ID of the axis defining the `horizontal` dimension.
Will be used to compute proper origin and span of the bar the horizontal.
- `idVerticalAxis` - the ID of the axis defining the `vertical` dimension. Will
be used to compute proper origin and span of the bar the vertical.

::: warning NOTE
`idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes.
See [Axes](#chart-axes) for more info.
:::

### Optional properties

Optionally you can configure each **group** with an **offset** and a **width**.
These are useful when you want to display multiple collections which have
repeated items for the **normal dimension**.

::: tip
**Normal dimension** is the dimension perpendicular to the group's `mainDimension`.

For instance, if you set `mainDimension` to `horizontal` then the
**normal dimension** will be `vertical`.
:::

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

You can choose either **absolute** or **natural** values for **width** and
**offset** independently, so the **offset** can be set to **natural** units
while the **width** is set to **absolute**.

There are 2 exclusive properties available to customize the **width**:

- `width` - if you want to use **absolute** units.
- `naturalWidth` - if you want to use **natural** units.

There are 2 exclusive properties available to customize the **offset**:

- `normalOffset` - if you want to use **absolute** units.
- `naturalNormalOffset` - if you want to use **natural** units.

::: warning NOTE
You can't set both `width` and `naturalWidth` or `normalOffset` and
`naturalNormalOffset`. Doing so will throw an invalid config error.
:::

### Tooltips

Each bar can customize the tooltip displayed when it's hovered by setting the
key `tooltip`. This key must store an object with the following shape:

- `content` - **Required**. Function that takes as parameters the item
corresponding to the bar being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset` - *Optional*. Function that takes as parameter the event triggering the
tooltip and is expected to return an object with an `x` and a `y` property, both
storing numbers that will be used as offset of the tooltip with respect to event
coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each bar can customize its CSS classes by setting a function for key `cssClasses`.
This function takes as parameters the array of classes that would be set by
default, the item corresponding to the bar being customized and its position
inside the data array.

### Examples

#### Categorical chart

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
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
  name: 'GeoChartBarsDemo',
  data () {
    return {
      categoricalDomain: null,
      chartData: null,
      linearAxisConfigKeyForValues:[]
    }
  },
  computed: {
  labelGroup () {
      if (!this.categoricalDomain) return null
      if (!this.categoricalAxisConfig) return null

      return {
        data: _.map(this.categoricalDomain, (category,index) => {
          return {
            labels: [{
              text: '»',
              padding: {
                top: 10,
                right: 0,
                bottom: 10,
                left: 15
              },
              margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              },
              cornerRadius: 5,
              cssClasses (originalClasses) {
                return [...originalClasses, 'rect-stroke-red-and-text-fill-black']
              }
            }, {
              text: category,
            }],
            [this.linearAxisConfig.keyForValues]: this.linearAxisConfigKeyForValues[index],
            hasVerticalLabel:true
          }
        }),
        idVerticalAxis: this.linearAxisConfig.id,
      }
    },
    linearAxisConfig () {
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
          valueForOrigin: 0,
          domain: {
            start: 500,
            end: 0
          }
        },
        label: {
          content: 'Linear Axis',
          offset: -15
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
          domain: this.categoricalDomain,
          padding: {
            inner: 0.1,
            outer: 0.2
          }
        },
        label: {
          content: 'Categorical Axis',
          offset: -10
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
            right: 10,
            bottom: 40,
            left: 50
          }
        },
        axisGroups: [
          this.linearAxisConfig,
          this.categoricalAxisConfig
        ],
        barGroups: [{
          data: this.chartData,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.vertical,
          idHorizontalAxis: this.categoricalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id,
          hasLabelValues:true
        }],
        labelGroups:[this.labelGroup]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
        this.categoricalDomain = _.times(6, i => `Category ${i}`)
        this.chartData = _.map(this.categoricalDomain, (category,index) => {
        this.linearAxisConfigKeyForValues.push(_.random(
            this.linearAxisConfig.scale.domain.start,
            this.linearAxisConfig.scale.domain.end,
            false
          ))
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.linearAxisConfig.keyForValues]: this.linearAxisConfigKeyForValues[index]
        }
      })
    }
  }
}
</script>
```