Line segments charts are collections of grouped segments intersected by circles across an axis.
This chart can be used in combination with [GeoChartAnchoredShapes](./#/Elements/Charts?id=geochartanchoredshapes)
to compare several values across an axis, each stop being the relative position
of each value with the rest.

To add line segments **groups** to a chart, add an array to `lineSegmentsGroups`
key of [GeoChart](./#/Elements/Charts?id=introduction)'s config. Each item of the
array must be an object with the following:

## Required properties

- `data`: Collection of dots (stops) that will be distributed across the axis,
filling the rest with line segments (array).
- `mainDimension`: A value of `DIMENSIONS.DIMENSIONS_2D` named export (either
`horizontal` or `vertical`). The dimension in which the stacked rectangles will
be positioned.
- `idHorizontalAxis`: The ID of the axis defining the `horizontal` dimension.
Will be used to compute proper origin and span of the bar if the dimension is
horizontal or the width of each individual group if the dimension is vertical.
- `idVerticalAxis`: The ID of the axis defining the `vertical` dimension. Will
be used to compute proper origin and span of the bar if the dimension is vertical
or the width of each individual group if the dimension is horizontal.
- `normalValue`: Value to position the colorBar in the normal (numerical) axis.
The value must be contained within the linear axis domain.

**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes.
See [Axes](./#/Elements/Charts?id=axes) for more info.

## Optional properties

- **trackByKey** Define this function to let D3 know which property of your data
will be used to track changes in it.

To set the lines width and the dots size, you'll need to set three different
parameters:

- **lineWidth** defines the span of the line segment in the **normal dimension**.
The span in the **group** `mainDimension` is computed just using the value
associated to that item in the corresponding axis.

- **circleRadius** defines the radius of each one of the dots of your data in
the **main dimension**.

- **circleMargin** defines the amount of margin of each one of the dots of your
data. Take into account that the value you give to this margin will be computed
twice to get the segment width and the total size of the circle. (i.e: If you
define a circle with a radius of `2` and margin of `3`, the total size of the
circle plus its margins will be `10`)

The three of these parameters can be expressed either in **absolute** or
**natural** units:

- **Absolute** means in the same units as the underlying SVG coordinate space.
You can think of this as just pixels (although they are not strictly just pixels
and they might not directly translate 1:1 to screen pixels).
- **Natural** means in the same units as the axis used for the **main dimension**,
except for `lineWidth`, which is relative to the **normal dimension**.
For instance, if you have an axis of seconds, then a `naturalOffset` of `N` is
an offset of `N` seconds. If the axis are categories then the absolute value for
an offset of `N` is the absolute value for `N` categories.

You can choose either **absolute** or **natural** values for **lineWidth**,
**circleRadius** and **circleMargin** independently. Take into account though,
that for ease of use, if you choose to use **circleRadius** in absolute units,
you will need to specify the margin also in absolute units. If you happen to
choose **circleRadius** and **naturalCircleMargin**, the chart validator will
throw an error.

There are 2 exclusive properties available to customize the **lineWidth**:

- `lineWidth` if you want to use **absolute** units.
- `lineNaturalWidth` if you want to use **absolute** units.

There are 2 exclusive properties available to customize the **circleRadius**:

- `circleRadius` if you want to use **absolute** units.
- `circleNaturalRadius` if you want to use **natural** units.

There are 2 exclusive properties available to customize the **circleMargin**:

- `circleMargin` if you want to use **absolute** units.
- `circleNaturalMargin` if you want to use **absolute** units.

> **Note:** You can't set both `lineWidth` and `lineNaturalWidth`,
`circleRadius` and `circleNaturalRadius`, or `circleMargin` and `circleNaturalMargin`.
Doing so will throw an invalid config error.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Horizontal Line Segments chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        css-modifier="hidden-axis"
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('../constants')

export default {
  name: 'GeoChartLineSegmentsDemo',
  data () {
    return {
      normalValue: _.random(0, 1, true),
      randomValue: _.random(1, 3)
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
          type: CONSTANTS.AXIS.POSITIONS.left
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 1
          }
        }
      }
    },

    chartData () {
      return _.sortBy(_.times(this.randomValue, (idx) => {
        return {
          [this.numericalAxisConfig.keyForValues]: _.random(0, 200),
          id: idx
        }
      }), this.numericalAxisConfig.keyForValues)
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
          this.linearAxisConfig,
          this.numericalAxisConfig
        ],
        lineSegmentsGroups: [{
          normalValue: this.normalValue,
          data: this.chartData,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          lineWidth: 2,
          circleNaturalRadius: 3,
          circleNaturalMargin: 6,
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id
        }]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      this.randomValue = _.random(1, 3)
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Vertical Line Segments chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        css-modifier="hidden-axis"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('../constants')

export default {
  name: 'GeoChartLineSegmentsDemo',
  data () {
    return {
      normalValue: _.random(0, 1, true),
      randomValue: _.random(1, 3)
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
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 1
          }
        }
      }
    },

    chartData () {
      return _.sortBy(_.times(this.randomValue, (idx) => {
        return {
          [this.numericalAxisConfig.keyForValues]: _.random(0, 200),
          id: idx
        }
      }), this.numericalAxisConfig.keyForValues)
    },

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
          this.linearAxisConfig,
          this.numericalAxisConfig
        ],
        lineSegmentsGroups: [{
          normalValue: this.normalValue,
          data: this.chartData,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.vertical,
          lineWidth: 2,
          circleNaturalRadius: 3,
          circleNaturalMargin: 2,
          idHorizontalAxis: this.linearAxisConfig.id,
          idVerticalAxis: this.numericalAxisConfig.id
        }]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      this.randomValue = _.random(1, 3)
    }
  }
}
</script>
```