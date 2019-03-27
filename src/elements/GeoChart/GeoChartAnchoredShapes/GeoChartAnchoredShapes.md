Anchored shapes charts are collections of shapes that are tied to a certain axis.
This chart can be used in combination with [GeoChartLineSegments](./#/Elements/Charts?id=geochartlinesegments)
to compare several values across an axis, each shape being the value that is being represented as the desired shape.

To add anchored shapes **groups** to a chart, add an array to `anchoredShapesGroups` key of [GeoChart](./#/Elements/Charts?id=introduction)'s config. Each item of the array must be an object with the following:

## Required properties

- `shapeData`: Array of objects, each one representing a single shape that will be distributed across the axis. If you plan the data of your chart to be changing, you should add an `id` property to each one of your data object, so the changes are correctly tracked.
- `dimension`: A value of `BARS_DIMENSIONS` named export (either `horizontal` or `vertical`). The dimension in which the stacked rectangles will be positioned.
- `idHorizontalAxis`: The ID of the axis defining the `horizontal` dimension. Will be used to compute proper origin and span of the bar if the dimension is horizontal or the width of each individual group if the dimension is vertical.
- `idVerticalAxis`: The ID of the axis defining the `vertical` dimension. Will be used to compute proper origin and span of the bar if the dimension is vertical or the width of each individual group if the dimension is horizontal.
- `normalValue`: Value to position the colorBar in the normal (numerical) axis. The value must be contained within the linear axis domain.
- `getAnchorPosition`: Function to set the shape either on top/left (leading) or at the bottom/right (trailing) of the axis.
- `getShapeSize`: Function to get the dimensions (width/height) of the desired shape.
- `getShapePath`: Function to create the path of the shape. The returned value of this function should be valid as input for `svg` polygon data.

**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes. See [Axes](./#/Elements/Charts?id=axes) for more info.

## Optional properties

- **Offset** defines the translation in the **normal dimension** that must be
applied to the shapes in order to not overlap with the axis they're been positioned. (Can be set using **natural** units)

- **text** object takes a function (content) that lets you shape the format of each one of the labels that
will be tied to your shapes. The function should return an array of objects, each one with the properties `text` and `cssClass`.

There are 2 exclusive properties available to customize the **offset**:

- `offset` if you want to use **absolute** units.
- `naturalNormalOffset` if you want to use **natural** units.

> **Note:** You can't set both `offset` and `naturalNormalOffset`.
Doing so will throw an invalid config error.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Horizontal Anchored shapes with texts
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
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
  const { ANCHOR_POSITIONS, getTriangleShapePath } = require('./GeoChartAnchoredShapes')

export default {
  name: 'GeoChartAnchoredShapesDemo',
  data () {
    return {
      normalValue: 0.5,
      randomValue: 5
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

    dataDistribution() {
      return _.sortBy([
        {
          [this.numericalAxisConfig.keyForValues]: this.numericalAxisConfig.scale.domain.start,
          isUp: true,
          id: 0
        },
        {
          [this.numericalAxisConfig.keyForValues]: this.numericalAxisConfig.scale.domain.end,
          isUp: true,
          id: 1
        },
        {
          [this.numericalAxisConfig.keyForValues]: this.randomValue,
          isUp: false,
          id: 2
        }
      ], this.numericalAxisConfig.keyForValues)
    },

    chartConfig () {
      if (!(this.numericalAxisConfig)) return null

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
        anchoredShapesGroups: [{
          normalValue: this.normalValue,
          naturalNormalOffset: .1,
          shapeData: this.dataDistribution,
          dimension: BARS_DIMENSIONS.horizontal,
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          getAnchorPosition (d, i) {
            return d.isUp ? ANCHOR_POSITIONS.leading : ANCHOR_POSITIONS.trailing
          },
          getShapeSize () {
            return {
              width: 12,
              height: 10
            }
          },
          text: {
            content (d, i) {
              return [
                {
                  text: `Label`,
                  cssClass: 'label'
                },
                {
                  text: ' - ',
                  cssClass: 'separator'
                },
                {
                  text: `Value ${d.numerical}`,
                  cssClass: 'value'
                }
              ]
            }
          },
          getShapePath (d, i, { size, shapeOffsetFromAxis, singleGroupOptions }) {
            return getTriangleShapePath(d, i, { size, shapeOffsetFromAxis, singleGroupOptions })
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
      this.randomValue = _.random(0, 200)
    },
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Horizontal anchored shapes with line segments
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
  const d3 = require('d3')
  const { POSITIONS } = require('../GeoChartAxis/GeoChartAxis')
  const { DIMENSIONS: BARS_DIMENSIONS } = require('../GeoChartBars/GeoChartBars')
  const { SCALE_TYPES } = require('../GeoChartScale/GeoChartScale')
  const { ANCHOR_POSITIONS, getTriangleShapePath }= require('./GeoChartAnchoredShapes')

export default {
  name: 'GeoChartAnchoredShapesDemo',
  data () {
    return {
      normalValue: 0.5,
      randomValue: 5
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

    dataDistribution() {
      return _.sortBy([
        {
          [this.numericalAxisConfig.keyForValues]: this.numericalAxisConfig.scale.domain.start,
          isUp: true,
          id: 0
        },
        {
          [this.numericalAxisConfig.keyForValues]: this.numericalAxisConfig.scale.domain.end,
          isUp: true,
          id: 1
        },
        {
          [this.numericalAxisConfig.keyForValues]: this.randomValue,
          isUp: false,
          id: 2
        }
      ], this.numericalAxisConfig.keyForValues)
    },

    chartConfig () {
      if (!(this.numericalAxisConfig)) return null

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
          circleData: this.dataDistribution,
          dimension: BARS_DIMENSIONS.horizontal,
          lineWidth: 2,
          circleRadius: 3,
          circleMargin: 4,
          idHorizontalAxis: this.numericalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id
        }],
        anchoredShapesGroups: [{
          normalValue: this.normalValue,
          naturalNormalOffset: 0.03,
          shapeData: this.dataDistribution,
          dimension: BARS_DIMENSIONS.horizontal,
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          getAnchorPosition (d, i) {
            return d.isUp ? ANCHOR_POSITIONS.leading : ANCHOR_POSITIONS.trailing
          },
          getShapeSize () {
            return {
              width: 12,
              height: 10
            }
          },
          text: {
            content (d, i) {
              return [
                {
                  text: `Label`,
                  cssClass: 'label'
                },
                {
                  text: ' - ',
                  cssClass: 'separator'
                },
                {
                  text: `Value ${d.numerical}`,
                  cssClass: 'value'
                }
              ]
            }
          },
          getShapePath (d, i, { size, shapeOffsetFromAxis, singleGroupOptions }) {
            return getTriangleShapePath(d, i, { size, shapeOffsetFromAxis, singleGroupOptions })
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
      this.randomValue = _.random(180, 250)
    },
  }
}
</script>
```
