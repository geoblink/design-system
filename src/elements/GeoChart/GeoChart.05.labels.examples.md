## Labels

Sometimes you might want to add custom labels to the chart, anchored to the items
already displayed in it, even multiple labels for each item in the chart. A
collection of labels associated to a single item of the chart is what we call a
**label group**.

You can also add labels related to values to the bar charts. To add it, you have to 
add the **isPositioningLabelsInBars** boolean to the bar chart config.

To add **label groups** to a chart, add an array to `labelGroups` key of
[GeoChart](#geochart)'s config. Each item of the array must be an object with
the following…

### Required properties

- `idVerticalAxis` - ID of the axis used to position the label vertically.
- `data` - an array of items to which labels will be added. Each `data` entry must
have a value for the key used by the axis referenced in `idVerticalAxis` and `idHorizontalAxis` (if there is idHorizontalAxis). That
value will be used to compute label's vertical position. There's another key
that must be present: `labels` key. It must be an array whose items follows the
structure describe in _Labels structure_ section.

### Optional properties

- `idHorizontalAxis` - ID of the axis used to position the label horizontally.
- `isVerticalLabel` - Boolean value if there is a vertical label

#### Labels structure

Each label has **only one required property**, `text`, which is the string to be
displayed. However, there are several optional properties:

- `padding` - (_optional_) object with `top`, `right`, `bottom` and `left` keys,
whose values are numbers. It is the padding to be applied to the text.
- `margin` - (_optional_) object with `top`, `right`, `bottom` and `left` keys,
whose values are numbers. It is the margin to be applied to the text container.
You can combine `padding` and `margin` to render boxed text or just add some
space between consecutive labels.
- `cornerRadius` - (_optional_) radius of the border of the box containing the
text, in units of the canvas (usually, you can think of this as just pixels).
- `cssClasses` - function taking as first parameter an array of CSS classes
that would be added by default to the group containing the text. Must return
the array of final CSS classes that container must have. Required classes will
be added regardless you not returning them.

### Examples

#### Pills axis chart

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
        width="500px"
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
      chartData: null
    }
  },
  computed: {
    categoricalDomain () {
      return _.times(5, i => `Category ${i}`)
    },

    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'value',
        ticks: {
          count: 10
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 100,
            end: -100
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
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        cssClasses (originalClasses) {
          return [...originalClasses, 'hide-paths']
        },
        ticks: {
          cssClasses (originalClasses) {
            return [...originalClasses, 'hide-lines', 'hide-text']
          }
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain,
          padding: {
            inner: 0.1,
            outer: 0.2
          }
        }
      }
    },

    labelGroup () {
      if (!this.categoricalDomain) return null
      if (!this.categoricalAxisConfig) return null

      return {
        data: _.map(this.categoricalDomain, (category) => {
          return {
            labels: [{
              text: '»',
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
              },
              margin: {
                top: 0,
                right: 10,
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
            [this.categoricalAxisConfig.keyForValues]: category
          }
        }),
        idVerticalAxis: this.categoricalAxisConfig.id
      }
    },

    chartConfig () {
      if (!this.categoricalAxisConfig) return null
      if (!this.labelGroup) return null
      if (!this.chartData) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 130
          }
        },
        axisGroups: [
          this.linearAxisConfig,
          this.categoricalAxisConfig
        ],
        barGroups: [{
          data: this.chartData,
          mainDimension: 'horizontal',
          idHorizontalAxis: this.linearAxisConfig.id,
          idVerticalAxis: this.categoricalAxisConfig.id
        }],
        labelGroups: [this.labelGroup]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      this.chartData = _.map(this.categoricalDomain, (category) => {
        return {
          [this.categoricalAxisConfig.keyForValues]: category,
          [this.linearAxisConfig.keyForValues]:_.random(
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
#### Bar Chart with Vertical Labels

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
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
              text: this.handleData(this.linearAxisConfigKeyForValues[index]),
              padding: {
                top: 10,
                right: 0,
                bottom: 10,
                left: 0
              },
              cornerRadius: 5,
            }],
            [this.linearAxisConfig.keyForValues]: this.linearAxisConfigKeyForValues[index],
            [this.categoricalAxisConfig.keyForValues]: category,
          }
        }),
        idVerticalAxis: this.linearAxisConfig.id,
        idHorizontalAxis:this.categoricalAxisConfig.id,
        isVerticalLabel:true

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
          isPositioningLabelsInBars:true
        }],
        labelGroups:[this.labelGroup]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    handleData (data){
      if (parseFloat(data) < 1000) {
        return `${parseFloat(data) / 10}%`
      } 
      else if (parseFloat(data) < 1000000) {
        return `${parseFloat(data) / 1000}K`
      } 
      else if (parseFloat(data) < 10000000) {
        return  `${parseFloat(data) / 1000000}M`
      }
      return `${parseFloat(data) / 10}%`
    },
    randomizeData () {
        this.categoricalDomain = _.times(6, i => `Category ${i}`)
        this.chartData = _.map(this.categoricalDomain, (category,index) => {
        /**this.linearAxisConfigKeyForValues.push(_.random(
            this.linearAxisConfig.scale.domain.start,
            this.linearAxisConfig.scale.domain.end,
            false
          ))
          **/
         this.linearAxisConfigKeyForValues = [800,900,40,30,500,30]
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
#### Bar Chart with Horizontal Labels

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block element-demo__block--chart-container">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
        width="500px"
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
      chartData: null,
      linearAxisConfigKeyForValues:[]
    }
  },
  computed: {
    categoricalDomain () {
      return _.times(5, i => `Category ${i}`)
    },

    linearAxisConfig () {
      return {
        id: 'demo-linear-axis',
        keyForValues: 'value',
        ticks: {
          count: 10
        },
        position: {
          type: CONSTANTS.AXIS.POSITIONS.bottom
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 100,
            end: 1000
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
          type: CONSTANTS.AXIS.POSITIONS.anchoredToAxis,
          value: this.linearAxisConfig.scale.valueForOrigin,
          relativeToAxis: this.linearAxisConfig.id
        },
        cssClasses (originalClasses) {
          return [...originalClasses, 'hide-paths']
        },
        ticks: {
          cssClasses (originalClasses) {
            return [...originalClasses, 'hide-lines', 'hide-text']
          }
        },
        scale: {
          type: CONSTANTS.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: _.first(this.categoricalDomain),
          domain: this.categoricalDomain,
          padding: {
            inner: 0.1,
            outer: 0.2
          }
        }
      }
    },

    labelGroup () {
      if (!this.categoricalDomain) return null
      if (!this.categoricalAxisConfig) return null

      return {
        data: _.map(this.categoricalDomain, (category,index) => {
          return {
            labels: [{
              text: this.handleData(this.linearAxisConfigKeyForValues[index]),
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 0
              },
              cornerRadius: 5,
            }],
            [this.categoricalAxisConfig.keyForValues]: category,
            [this.linearAxisConfig.keyForValues]: this.linearAxisConfigKeyForValues[index],
          }
        }),
        idHorizontalAxis:this.linearAxisConfig.id,
        idVerticalAxis:this.categoricalAxisConfig.id
      }
    },

    chartConfig () {
      if (!this.categoricalAxisConfig) return null
      if (!this.labelGroup) return null
      if (!this.chartData) return null

      return {
        chart: {
          margin: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 130
          }
        },
        axisGroups: [
          this.linearAxisConfig,
          this.categoricalAxisConfig
        ],
        barGroups: [{
          data: this.chartData,
          mainDimension: 'horizontal',
          idHorizontalAxis: this.linearAxisConfig.id,
          idVerticalAxis: this.categoricalAxisConfig.id,
          isPositioningLabelsInBars:true
        }],
        labelGroups: [this.labelGroup]
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
     handleData (data){
      if (parseFloat(data) < 1000) {
        return `${parseFloat(data) / 10}%`
      } 
      else if (parseFloat(data) < 1000000) {
        return `${parseFloat(data) / 1000}K`
      } 
      else if (parseFloat(data) < 10000000) {
        return  `${parseFloat(data) / 1000000}M`
      }
      return `${parseFloat(data) / 10}%`
    },
    randomizeData () {
      this.linearAxisConfigKeyForValues=[]
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
