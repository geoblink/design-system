`GeoTable` is a component designed to display large amounts of tabular data in
a table environment, supporting pagination and sorting.

## Headers

`GeoTable` instances need a least one header row, which can have as many cells
as required. Header rows can be set up using `header` named slot. To set up a
header row, put a [GeoTableHeaderRow](./#/Elements/GeoTable?id=geotableheaderrow)
component as content of `header` named slot.

```
<div class="element-demo">
  <h3 class="element-demo__header">Single header row</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table :source-data="[{}]" :current-page="0">
        <geo-table-header-row slot="header">
          <geo-table-header-row-cell>First column</geo-table-header-row-cell>
          <geo-table-header-row-cell>Second column</geo-table-header-row-cell>
          <geo-table-header-row-cell>Third column</geo-table-header-row-cell>
        </geo-table-header-row>
      </geo-table>
    </div>
  </div>
</div>
```

It is possible to show multiple header rows in a single table:

```
<div class="element-demo">
  <h3 class="element-demo__header">Multiple header rows</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box">
      <geo-table :source-data="[{}]" :current-page="0">
        <geo-table-header-row slot="header">
          <geo-table-header-row-cell>First row, first column</geo-table-header-row-cell>
          <geo-table-header-row-cell>First row, second column</geo-table-header-row-cell>
          <geo-table-header-row-cell>First row, third column</geo-table-header-row-cell>
        </geo-table-header-row>
        <geo-table-header-row slot="header" variant="aux">
          <geo-table-header-row-cell>Second row, first column</geo-table-header-row-cell>
          <geo-table-header-row-cell>Second row, second column</geo-table-header-row-cell>
          <geo-table-header-row-cell>Second row, third column</geo-table-header-row-cell>
        </geo-table-header-row>
      </geo-table>
    </div>
  </div>
</div>
```

### Customizing column's width

It is possible to set up a minimum, maximum and a forced width. This is a
applied on per-header-cell basis. When setting a header cell's `columnMinWidth`,
column's final width won't be smaller than it. If there's a `columnMaxWidth`,
column's final width won't exceed it.

If `columnWidth` is set then it will override any minimum or maximum width set.

By default columns will take the width needed to render their content in a
single line, considering both, header and body content. However, you can make
header cells opt out from this behaviour with property `ignoreContentWidth`.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Static columns
      <geo-primary-button @click="randomizeData">
        Randomize data
      </geo-primary-button>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box" style="resize: both;">
        <geo-table :source-data="sourceData" :current-page="0">
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell :column-min-width="200">Min width</geo-table-header-row-cell>
            <geo-table-header-row-cell :column-max-width="150">Max width</geo-table-header-row-cell>
            <geo-table-header-row-cell :column-width="100">Fixed size</geo-table-header-row-cell>
            <geo-table-header-row-cell :ignore-content-width="ignoreContentWidth">
              <geo-trimmed-content>
                <label><input type="checkbox" v-model="ignoreContentWidth"> Ignore cell's width?</label>
              </geo-trimmed-content>
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell v-for="(item, key) of row.item" :key="key">
              {{ item }}
            </geo-table-body-row-cell>
          </geo-table-body-row>
        </geo-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ignoreContentWidth: false,
      sourceData: []
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      this.sourceData = [_.times(4, i => _.random(100, 1000000, false))]
    }
  }
}
</script>
```

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

## Pagination & sorting

You can use [GeoTablePagination](./#/Elements/GeoTable?id=geotablepagination)
and [GeoTableSort](./#/Elements/GeoTable?id=geotablesort) to add pagination and
sorting behaviour to `GeoTable`.

By default `GeoTable` will display up to 10 rows of data. You can override this
with a different value using `forced-page-size` property. Additionally, `GeoTable`
**can infer the amount of rows to be displayed** if you prefer so. Setting
`automatic-page-size` property to `true` will opt in to this feature.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Automatic page size
      <div>
        <label class="element-demo__inline-input-group__field">
          Max height: {{ maxHeight }}
        </label>
        <br>
        <geo-danger-button v-if="automaticMovementInterval" @click="stopAutomaticMovement()">
          Stop animation
        </geo-danger-button>
        <geo-primary-button v-else @click="startAutomaticMovement()">
          Start animation
        </geo-primary-button>
      </div>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box" :style="style">
        <geo-table
          :source-data="sourceData"
          :current-page="currentPage"
          automatic-page-size
          @go-to-page="goToPage($event)"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell
              v-for="(singleHeader, columnIndex) in headers"
              :key="singleHeader"
            >
              {{ singleHeader }}
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell
              v-for="(singleHeader, key) in headers"
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
  data () {
    return {
      maxHeight: 320,
      currentPage: 0,
      automaticMovementInterval: null
    }
  },
  computed: {
    style () {
      return {
        'display': 'flex',
        'max-height': `${this.maxHeight}px`
      }
    },

    headers () {
      return _.times(5, i => `Column ${i}`)
    },

    sourceData () {
      return _.times(27, (rowIndex) => {
        return _.times(this.headers.length, () => _.random(0, 300, false))
      })
    }
  },
  methods: {
    goToPage (page) {
      this.currentPage = page
    },

    startAutomaticMovement () {
      this.stopAutomaticMovement()
      this.automaticMovementInterval = setInterval(() => {
        this.maxHeight += 1
        this.maxHeight %= 390
        this.maxHeight = Math.max(this.maxHeight, 290)
      }, 1)
    },

    stopAutomaticMovement () {
      if (this.automaticMovementInterval) {
        clearInterval(this.automaticMovementInterval)
        this.automaticMovementInterval = null
      }
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Resizable table with sorting
      <div>
        <geo-primary-button @click="randomizeData">
          Randomize data
        </geo-primary-button>
        <br>
        <geo-danger-button @click="resetSorting">
          Reset sorting
        </geo-danger-button>
      </div>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box" style="display: flex; resize: vertical;">
        <geo-table
          :source-data="sortedData"
          :current-page="currentPage"
          automatic-page-size
          style="flex-grow: 0;"
          @go-to-page="goToPage($event)"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell
              v-for="(singleHeader, columnIndex) in headers"
              :key="singleHeader"
            >
              {{ singleHeader }}
              <geo-table-sort
                :current-sorting-direction="sortingDirection"
                :currently-sorting-table="columnIndex === sortingColumnIndex"
                @sort="sort(columnIndex, $event)"
              />
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell
              v-for="(singleHeader, key) in headers"
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
  data () {
    return {
      sortingColumnIndex: 0,
      sortingDirection: 'asc',
      currentPage: 0,
      headers: _.times(5, i => `Column ${i}`),
      sourceData: []
    }
  },
  computed: {
    sortedData () {
      const sortedData = _.sortBy(this.sourceData, this.sortingColumnIndex)

      if (this.sortingDirection === 'desc') {
        _.reverse(sortedData)
      }

      return sortedData
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      const rowsCount = _.random(22, 27, false)

      this.sourceData = _.times(rowsCount, (rowIndex) => {
        return _.times(this.headers.length, () => _.random(0, 100, false))
      })
    },

    goToPage (page) {
      this.currentPage = page
    },

    resetSorting () {
      this.sortingDirection = 'asc'
      this.sortingColumnIndex = 0
    },

    sort (columnIndex, direction) {
      this.sortingDirection = direction
      this.sortingColumnIndex = columnIndex
    }
  }
}
</script>
```

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Forced page size and sorting
      <div>
        <geo-primary-button @click="randomizeData">
          Randomize data
        </geo-primary-button>
        <br>
        <geo-danger-button @click="resetSorting">
          Reset sorting
        </geo-danger-button>
      </div>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table
          :source-data="sortedData"
          :current-page="currentPage"
          :forced-page-size="10"
          style="max-height: 300px"
          automatic-page-size
          @go-to-page="goToPage($event)"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell
              v-for="(singleHeader, columnIndex) in headers"
              :key="singleHeader"
            >
              {{ singleHeader }}
              <geo-table-sort
                :current-sorting-direction="sortingDirection"
                :currently-sorting-table="columnIndex === sortingColumnIndex"
                @sort="sort(columnIndex, $event)"
              />
            </geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell
              v-for="(singleHeader, key) in headers"
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
  data () {
    return {
      sortingColumnIndex: 0,
      sortingDirection: 'asc',
      currentPage: 0,
      headers: _.times(5, i => `Column ${i}`),
      sourceData: []
    }
  },
  computed: {
    sortedData () {
      const sortedData = _.sortBy(this.sourceData, this.sortingColumnIndex)

      if (this.sortingDirection === 'desc') {
        _.reverse(sortedData)
      }

      return sortedData
    }
  },
  mounted () {
    this.randomizeData()
  },
  methods: {
    randomizeData () {
      const rowsCount = _.random(22, 27, false)

      this.sourceData = _.times(rowsCount, (rowIndex) => {
        return _.times(this.headers.length, () => _.random(0, 100, false))
      })
    },

    goToPage (page) {
      this.currentPage = page
    },

    resetSorting () {
      this.sortingDirection = 'asc'
      this.sortingColumnIndex = 0
    },

    sort (columnIndex, direction) {
      this.sortingDirection = direction
      this.sortingColumnIndex = columnIndex
    }
  }
}
</script>
```

## Empty table

If table has no content to be displayed, its `empty` slot will be rendered. You
can use that slot to easily show an empty state for any table.

```
<div class="element-demo">
  <h3 class="element-demo__header">Empty table</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box geo-activity-indicator-demo-box">
      <geo-table :source-data="[]" :current-page="0">
        <p slot="empty">Table is empty!</p>
      </geo-table>
    </div>
  </div>
</div>
```
