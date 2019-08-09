
## Required properties

- `data`: Collection being displayed (array).
- `keyForValues`: the key in each chart item where the value for this axis is stored.

## Optional properties

Optionally you can configure the pie with an **inner radius** and an **outer radius**.
These properties are useful to create different variations of a pie chart, from a full
pie chart to a donut chart.

- `innerRadius`: `[0-1]` defines the **inner radius factor** of the pie being **0** the
default value and **1** the maximum chart radius.

- `outerRadius`: `[0-1]` defines the **outer radius factor** of the pie being **1** the
default value as the maximum radius allowed by the chart height/width, and **0** the minimum
chart radius.

### Tooltips

Each slice can customize the tooltip displayed when it's hovered by setting the
key `tooltip`. This key must store an object with the following shape:

- `content`: **Required**. Function that takes as parameters the item
corresponding to the bar being customized and its position inside the data array.
It's expected to return a HTML string that will be rendered inside a tooltip.
- `offset`: *Optional*. Function that takes as parameter the event triggering the
tooltip and is expected to return an object with an `x` and a `y` property, both
storing numbers that will be used as offset of the tooltip with respect to event
coordinates. By default tooltip will be positioned above cursor.

### Customizing CSS classes

Each slice can customize its CSS classes by setting a function for key `cssClasses`.
This functions takes as parameters the array of classes that would be set by
default, the item corresponding to the slice being customized and its position
inside the data array.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Pie chart
      <div class="element-demo__inline-input-group">
        <geo-primary-button @click="randomizeData()">
          Randomize data
        </geo-primary-button>
        <br>
        <geo-primary-button @click="useData1()">
          Data 1
        </geo-primary-button>
        <br>
        <geo-primary-button @click="useData2()">
          Data 2
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__bordered-box element-demo__block--chart-container" style="resize: both;">
      <geo-chart
        v-if="chartConfig"
        :config="chartConfig"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoChartPieDemo',
  data () {
    return {
      chartData: null
    }
  },
  computed: {
    chartConfig () {
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
        pieConfig: {
          data: this.chartData,
          keyForValues: 'value',
          innerRadius: 0.2,
          outerRadius: 0.8,
          tooltip: {
            content: (d, i) => d.data.value
          },
          text: {
            content (d, i) {
              if (d.data.id === 1) {
                return [
                  {
                    text: d.data.value
                  },
                  {
                    text: 'Other line',
                    newLine: true
                  }
                ]
              } else {
                return [
                  {
                    text: d.data.value
                  }
                ]
              }
            },
            margin: 2
          },
          cssClasses (originalClasses, d, i) {
            return [...originalClasses, 'my-custom-class']
          }
        }
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    useData1 () {
      this.chartData = [
        { id: 1, value: 30},
        { id: 2, value: 100},
        { id: 3, value: 10},
        { id: 4, value: 50},
        { id: 5, value: 20}
      ]
    },
    useData2 () {
      this.chartData = [
        { id: 1, value: 90},
        { id: 2, value: 20},
        { id: 5, value: 50}
      ]
    },
    randomizeData () {
      const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      const rand = _.random(0, 15)
      this.chartData = _.times(rand, function(d) {
        const randId = _.random(0, ids.length-1)
        const id = ids.splice(randId, 1)[0]
        return {
          id: id,
          value: _.random(1, 1000)
        }
      })
    }
  }
}
</script>
```