---
title: Anchored shapes
---

Anchored shapes charts are collections of shapes that are tied to a certain axis.
This chart can be used in combination with [GeoChartLineSegments](./#/Elements/Charts?id=geochartlinesegments)
to compare several values across an axis, each shape being the value that is
being represented as the desired shape.

To add anchored shapes **groups** to a chart, add an array to `anchoredShapesGroups`
key of [GeoChart](./#/Elements/Charts?id=introduction)'s config. Each item of the
array must be an object with the following:

## Required properties

- `data`: Array of objects, each one representing a single shape that will be
distributed across the axis.
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
- `getAnchorPosition`: Function to set the shape either on top/left (`leading`)
or at the bottom/right (`trailing`) of the axis. Should return a value of named
export `DIMENSIONS.ANCHORED_POSITIONS_1D`.
- `getShapeSize`: Function to get the dimensions (width/height) of the desired
shape.
- `getShapePath`: Function to create the path of the shape. The returned value
of this function should be valid as input for `svg` polygon data.

**Note:** `idHorizontalAxis` and `idVerticalAxis` must be IDs of registered axes.
See [Axes](./#/Elements/Charts?id=axes) for more info.

## Optional properties

- **Offset** defines the translation in the **normal dimension** that must be
applied to the shapes in order to not overlap with the axis they're been positioned.
(Can be set using **natural** units)

- **text** object takes a function (content) that lets you shape the format of
each one of the labels that will be tied to your shapes. The function should
return an array of objects, each one with the properties `text` and `cssClass`.

- **trackByKey** Define this function to let D3 know which property of your data
will be used to track changes in it.

There are 2 exclusive properties available to customize the **offset**:

- `offset` if you want to use **absolute** units.
- `naturalNormalOffset` if you want to use **natural** units.

> **Note:** You can't set both `offset` and `naturalNormalOffset`.
Doing so will throw an invalid config error.

```vue live
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
        class="u-geo-chart--hidden-axis"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')
const { getTriangleShapePath } = require('@/elements/GeoChart/GeoChartAnchoredShapes/GeoChartAnchoredShapes')

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
          data: this.dataDistribution,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          getAnchorPosition (d, i) {
            return d.isUp
              ? CONSTANTS.DIMENSIONS.ANCHOR_POSITIONS_1D.leading
              : CONSTANTS.DIMENSIONS.ANCHOR_POSITIONS_1D.trailing
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

```vue live
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
        class="u-geo-chart--hidden-axis"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
const CONSTANTS = require('@/elements/GeoChart/constants')
const { getTriangleShapePath } = require('@/elements/GeoChart/GeoChartAnchoredShapes/GeoChartAnchoredShapes')

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
            end: 250
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
          data: this.dataDistribution,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          lineWidth: 2,
          circleRadius: 3,
          circleMargin: 4,
          idHorizontalAxis: this.numericalAxisConfig.id,
          idVerticalAxis: this.linearAxisConfig.id,
          trackByKey (d, i) {
            return d.id
          }
        }],
        anchoredShapesGroups: [{
          normalValue: this.normalValue,
          naturalNormalOffset: 0.03,
          data: this.dataDistribution,
          mainDimension: CONSTANTS.DIMENSIONS.DIMENSIONS_2D.horizontal,
          idVerticalAxis: this.linearAxisConfig.id,
          idHorizontalAxis: this.numericalAxisConfig.id,
          getAnchorPosition (d, i) {
            return d.isUp
              ? CONSTANTS.DIMENSIONS.ANCHOR_POSITIONS_1D.leading
              : CONSTANTS.DIMENSIONS.ANCHOR_POSITIONS_1D.trailing
          },
          trackByKey (d, i) {
            return d.id
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
