Line segments charts are collections of grouped segments intersected by circles across an axis.
This chart can be used in combination with [GeoChartTriangles](./#/Elements/Charts?id=geocharttriangles)
to compare several values across an axis, each stop being the relative position of each value with the rest.

To add line segments **groups** to a chart, add an array to `lineSegmentsGroups` key of [GeoChart](./#/Elements/Charts?id=introduction)'s config. Each item of the array
must be an object with the following:

## Required properties

- `circleData`: Collection of dots (stops) that will be distributed across the axis, filling the rest with line segments (array).
- `dimension`: A value of `BARS_DIMENSIONS` named export (either `horizontal` or `vertical`). The dimension in which the stacked rectangles will be positioned.
- `idHorizontalAxis`: The ID of the axis defining the `horizontal` dimension. Will be used to compute proper origin and span of the bar if the dimension is horizontal or the width of each individual group if the dimension is vertical.
- `idVerticalAxis`: The ID of the axis defining the `vertical` dimension. Will be used to compute proper origin and span of the bar if the dimension is vertical or the width of each individual group if the dimension is horizontal.
- `normalValue`: Value to position the colorBar in the normal (numerical) axis. The value must be contained within the linear axis domain.

**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes. See [Axes](./#/Elements/Charts?id=axes) for more info.

## Optional properties

To set the lines width and the dots size, you'll need to set three different parameters:

- **lineWidth** defines the span of the line segment in the **normal dimension**. The
span in the **group** `dimension` is computed just using the value associated to
that item in the corresponding axis.

- **circleRadius** defines the radius of each one of the dots of your data in the **normal dimension**.

- **circleMargin** defines the amount of margin of each one of the dots of your data. Take into account that
the value you give to this margin will be computed twice to get the segment width and the total size of the circle.
(i.e: If you define a circle with a radius of 2 and margin of 3, the total size of the circle plus its margins
will be 10)

The three of these parameters can be expressed either in **absolute** or **natural** units:

- **Absolute** means in the same units as the underlying SVG coordinate space.
You can think of this as just pixels (although they are not strictly just pixels
and they might not directly translate 1:1 to screen pixels).
- **Natural** means in the same units as the axis used for the **normal dimension**.
For instance, if you have an axis of seconds, then a `naturalOffset` of `N` is
an offset of `N` seconds. If the axis are categories then the absolute value for
an offset of `N` is the absolute value for `N` categories.

You can choose either **absolute** or **natural** values for **lineWidth**, **circleRadius** and
**circleMargin** independently.

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
    <div class="element-demo__block">
      <geo-chart
        css-modifier="hidden-axis"
        v-if="chartConfig"
        :config="chartConfig"
        height="20px"
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
    name: 'GeoChartLineSegmentsDemo',
    data () {
      return {
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

      numericalAxisConfig () {
        return {
          id: 'demo-numerical-axis',
          keyForValues: 'numerical',
          position: {
            type: POSITIONS.bottom
          },
          scale: {
            type: SCALE_TYPES.linear,
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
            circleData: this.chartData,
            dimension: BARS_DIMENSIONS.horizontal,
            lineWidth: 2,
            circleRadius: 3,
            circleMargin: 2,
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
        this.chartData = _.sortBy(_.times(_.random(1, 3), () => {
          return { [this.numericalAxisConfig.keyForValues]: _.random(0, 200) }
        }), this.numericalAxisConfig.keyForValues)
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
    <div class="element-demo__block">
      <geo-chart
        v-if="chartConfig"
        css-modifier="hidden-axis"
        :config="chartConfig"
        height="500px"
        width="50px"
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
    name: 'GeoChartLineSegmentsDemo',
    data () {
      return {
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

      numericalAxisConfig () {
        return {
          id: 'demo-numerical-axis',
          keyForValues: 'numerical',
          position: {
            type: POSITIONS.left
          },
          scale: {
            type: SCALE_TYPES.linear,
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
            circleData: this.chartData,
            dimension: BARS_DIMENSIONS.vertical,
            lineWidth: 2,
            circleRadius: 3,
            circleMargin: 2,
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
        this.chartData = _.sortBy(_.times(_.random(1, 3), () => {
          return { [this.numericalAxisConfig.keyForValues]: _.random(0, 200) }
        }), this.numericalAxisConfig.keyForValues)
      }
    }
  }
</script>
```