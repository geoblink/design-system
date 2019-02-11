
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

Each slice can customize the tooltip displayed when it's hovered by setting a
function for key `tooltip`. This function takes as parameters the item
corresponding to the slice being customized and its position inside the data array
and is expected to return a HTML string that will be rendered inside a tooltip.

### Customizing CSS classes

Each slice can customize its CSS classes by setting a function for key `cssClasses`.
This functions takes as parameters the array of classes that would be set by
default, the item corresponding to the slice being customized and its position
inside the data array.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Pie chart
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

export default {
  name: 'GeoChartBarsDemo',
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
          innerRadius: 0.3,
          tooltip (d, i) {
            return d.data.value
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
    randomizeData () {
      this.chartData = _.times(_.random(0, 10), function() {
        return {
          value: _.random(100, 1000)
        }
      })
    }
  }
}
</script>
```