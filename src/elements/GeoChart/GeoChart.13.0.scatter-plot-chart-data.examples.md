## Scatter Plot charts

Use this chart to represent values related to two different numerical variables. The position of each dot represents a single value of your data. This chart is designed to represent relationships between each variable of each one of the axes.

To add scatter plot **groups** to a chart, add an array to `scatterPlotGroups` key of [GeoChart](#geochart)'s config. Each item of the array must be an object with the following:

### Required properties

- `data` - array of objects, each one representing an item with two values that will be converted into `x, y` point coordinates across the axes.
- `mainDimension` - a value of `DIMENSIONS.DIMENSIONS_2D` named export (either `horizontal` or `vertical`).
- `idHorizontalAxis` - the ID of the axis defining the `horizontal` dimension.
- `idVerticalAxis` - the ID of the axis defining the `vertical` dimension.

::: warning NOTE
**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes.
See [axes](#chart-axes) for more info.
:::

### Optional properties

- `getRadius` - function that gives the radius in pixels of each one of the dots of the graph. If no width is provided, a default radius of `2px` will be applied.
- `getFillColor` - function that gives the color in which each dot of the graph should be displayed.
- `getOpacity` - function that gives the opacity with which each dot of the graph should be displayed.
- `groupKey` - property of your data that will be used to compute the radius of each one of the dots.
- `onDotClick` - function executed when clicking on a dot. Only one dot can be clicked at the same time. When unclicking a dot, the function is executed with parameters (`null`, `null`)
- `blockMouseEvents` - boolean that blocks changes on the dot when having mouveover, mouseout and click events

::: tip
If `blockMouseEvents` is set to true but you want a specific dot to be already clicked when rendering the graph, you can return `CONSTANT.FOCUS_ON_DOT` in the `onDotClick` function for this specific dot.
:::

### Tooltips

Each scatterPlotGroup can customize the tooltip displayed when hovering on each one of the dots by setting the key `tooltip`. This key must store an object with the following shape:

- `content` - **required**. Function that takes as parameters the dot
corresponding to the scatter plot group being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset` - *optional*. Function that takes as parameter the event triggering
the tooltip and is expected to return an object with an `x` and a `y` property,
both storing numbers that will be used as offset of the tooltip with respect to
event coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each scatter plot group can customize its CSS classes by setting a function for key `cssClasses`. (Use this for give a custom radius or color to each represented group).
This function takes as parameters the array of classes that would be set by
default, the item corresponding to the scatter plot group being customized and its position inside the data array.

### Examples

#### Scatter Plot with data

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig && isGraphVisible"
        :config="chartConfig"
      />
    </div>
    <geo-primary-button @click="randomizeData()">
        Randomize Data
    </geo-primary-button>
    <geo-secondary-button @click="toggleGraph()">
      Toggle Graph
    </geo-secondary-button>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')

export default {
  name: 'GeoScatterPlotDemo',
  data () {
    return {
      isGraphVisible: true,
      randomValue: _.random(1, 200),
      getRadius: function () { return 5 },
      getFillColor: function () { return 'orange' }
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
            start: 1000,
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
            end: 25000
          }
        }
      }
    },
    scatterPlotData () {
      return _.times(this.randomValue, (i) => {
        return {
          x: _.random(0, 25000),
          y: _.random(0, 1000)
        }
      })
    },

    chartConfig () {
      if (!this.scatterPlotData) return null

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
        scatterPlotGroups: [{
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          data: this.scatterPlotData,
          getRadius: this.getRadius,
          getFillColor: this.getFillColor,
          tooltip: {
            content: (d, i) => {
              return `x: ${d.x} y: ${d.y}`
            },
            offset: () => null
          }
        }]
      }
    }
  },
  methods: {
    toggleGraph () {
      this.isGraphVisible = !this.isGraphVisible
    },

    randomizeData () {
      this.randomValue = _.random(200, 1000)
    }
  }
}
</script>
```
