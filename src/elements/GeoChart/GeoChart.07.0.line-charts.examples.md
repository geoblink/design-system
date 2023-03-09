## Line charts

Use this chart to display information as a series of data points connected by
straight line segments. This chart can be used in combination with
[GeoChartBars](#chart-bars).

To add line **groups** to a chart, add an array to `lineGroups` key of
[GeoChart](#geochart)'s config. Each item of the array must be an object with
the following:

### Required properties

- `data` - array of objects, each one representing an item with two values that
will be converted into `x, y` point coordinates across the axes.
- `mainDimension` - a value of `DIMENSIONS.DIMENSIONS_2D` named export (either
`horizontal` or `vertical`).
- `idHorizontalAxis` - the ID of the axis defining the `horizontal` dimension.
- `idVerticalAxis` - the ID of the axis defining the `vertical` dimension.

::: warning NOTE
**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes.
See [axes](#chart-axes) for more info.
:::

### Optional properties

- `lineWidth` - width in pixels of each one of the lines. If no width is
provided, a default width of `2px` will be applied.
- `hoverCircleRadius` - radius in pixels of the circles that will be displayed
when hovering on the graph. If no width is provided, a default width of `2px`
will be applied.
- `interpolationFn` - choose one of the functions provided by D3 to handle the
interpolation of the segments connecting each one of your data points. Defaults
to `d3.curveLinear`.
- `trackByKey` - define this function to let D3 know which property of your data
will be used to track changes in it.
- `isInteractiveOnHover` - set this flag to false to disable interactions when
hovering the mouse over a line group, defaults to true.

### Tooltips

Each line can customize the tooltip displayed when it's hovered by setting the
key `tooltip`. This key must store an object with the following shape:

- `content` - **required**. Function that takes as parameters the item
corresponding to the line being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset` - *optional*. Function that takes as parameter the event triggering
the tooltip and is expected to return an object with an `x` and a `y` property,
both storing numbers that will be used as offset of the tooltip with respect to
event coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each line can customize its CSS classes by setting a function for key `cssClasses`.
This function takes as parameters the array of classes that would be set by
default, the item corresponding to the line being customized and its position
inside the data array.

### Examples

#### Horizontal line chart without data

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
    <geo-secondary-button @click="toggleGraph()">
      Toggle Graph
    </geo-secondary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')
const { INTERPOLATION_TYPES } = require('@/elements/GeoChart/GeoChartLine/GeoChartLine')

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
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    }
  }
}
</script>
```
