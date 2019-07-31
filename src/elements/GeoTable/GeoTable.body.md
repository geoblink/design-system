## Body

Usually you'll want to display not only headers but also some data in table's
body. Similar to headers, `GeoTable` has a `body` named slot just for that.
However, there's an important difference: `GeoTable` will handle pagination
automatically so instead of rendering one row per item you should render just
one row, which will be used as template for all the rows being rendered.

Under the hood `GeoTable` is using [Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)
for that. The object passed to the scoped slot has the following shape:

- `item`: a single entry of `sourceData` array, the one being rendered at the time.
- `index`: the row number of the item being rendered. Note that this index is
relative to the beginning of currently displayed page, not the absolute position
of the item in `sourceData`.
- `cssModifier`: the CSS Modifier applied to the table.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Random data
      <geo-primary-button @click="randomizeData">
        Randomize data
      </geo-primary-button>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table
          :source-data="sourceData"
          :current-page="currentPage"
          @go-to-page="goToPage($event)"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell
              v-for="singleHeader in headers"
              :key="singleHeader"
            >
              {{ singleHeader }}
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell v-for="(singleHeader, key) in headers" :key="singleHeader">
              {{ row.item[key] }}
            </geo-table-body-row-cell>
          </geo-table-body-row>
        </geo-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoTableBodyDemo',
  data () {
    return {
      headers: [],
      sourceData: [],
      currentPage: 0
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      const columnsCount = _.random(2, 5, false)
      const rowsCount = _.random(22, 27, false)
      this.headers = _.times(columnsCount, i => `Column ${i}`)
      this.sourceData = _.times(rowsCount, (rowIndex) => {
        return _.times(columnsCount, () => _.random(0, 100, true))
      })
    },

    goToPage (page) {
      this.currentPage = page
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Narrow & wide tables
      <geo-primary-button @click="randomizeData">
        Randomize data
      </geo-primary-button>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table
          :source-data="narrowData.sourceData"
          :current-page="currentPage"
          @go-to-page="goToPage($event)"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell
              v-for="singleHeader in narrowData.headers"
              :key="singleHeader"
            >
              {{ singleHeader }}
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell
              v-for="(singleHeader, key) in narrowData.headers"
              :key="singleHeader"
            >
              {{ row.item[key] }}
            </geo-table-body-row-cell>
          </geo-table-body-row>
        </geo-table>
      </div>
      <div class="element-demo__bordered-box" style="max-width: 300px;">
        <geo-table
          :source-data="wideData.sourceData"
          :current-page="currentPage"
          @go-to-page="goToPage($event)"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell
              v-for="singleHeader in wideData.headers"
              :key="singleHeader"
            >
              {{ singleHeader }}
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell
              v-for="(singleHeader, key) in wideData.headers"
              :key="singleHeader"
            >
              {{ row.item[key] }}
            </geo-table-body-row-cell>
          </geo-table-body-row>
        </geo-table>
      </div>
      <div class="element-demo__bordered-box" style="resize: both;">
        <geo-table
          :source-data="mediumData.sourceData"
          :current-page="currentPage"
          @go-to-page="goToPage($event)"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell
              v-for="singleHeader in mediumData.headers"
              :key="singleHeader"
            >
              {{ singleHeader }}
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell
              v-for="(singleHeader, key) in mediumData.headers"
              :key="singleHeader"
            >
              {{ row.item[key] }}
            </geo-table-body-row-cell>
          </geo-table-body-row>
        </geo-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoTableBodyDemo',
  data () {
    return {
      currentPage: 0,
      narrowData: {
        headers: _.times(2, i => `Column ${i}`),
        sourceData: []
      },
      mediumData: {
        headers: _.times(4, i => `Column ${i}`),
        sourceData: []
      },
      wideData: {
        headers: _.times(5, i => `Column ${i}`),
        sourceData: []
      }
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      const rowsCount = _.random(22, 27, false)

      this.narrowData.sourceData = _.times(rowsCount, (rowIndex) => {
        return _.times(this.narrowData.headers.length, () => _.random(0, 100, false))
      })

      this.mediumData.sourceData = _.times(rowsCount, (rowIndex) => {
        return _.times(this.mediumData.headers.length, () => _.random(0, 100, false))
      })

      this.wideData.sourceData = _.times(rowsCount, (rowIndex) => {
        return _.times(this.wideData.headers.length, () => _.random(0, 100, true))
      })
    },

    goToPage (page) {
      this.currentPage = page
    }
  }
}
</script>
```
