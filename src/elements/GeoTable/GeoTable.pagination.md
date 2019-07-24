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
      <geo-danger-button class="element-demo__inline-input-group" @click="removeAllData()">
        Remove rows
      </geo-danger-button>
      <geo-primary-button class="element-demo__inline-input-group" @click="addNewRow()">
        Add row
      </geo-primary-button>
      <div class="element-demo__inline-input-group">
        <span class="element-demo__inline-input-group__field">
          Inferred page size: {{ inferredPageSize }}
        </span>
        <br>
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
          @inferred-page-size-changed="inferredPageSize = $event"
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
      inferredPageSize: null,
      maxHeight: 320,
      currentPage: 0,
      automaticMovementInterval: null,
      sourceData: _.times(27, (rowIndex) => {
        return [rowIndex, ..._.times(4, () => _.random(0, 300, false))]
      })
    }
  },
  computed: {
    style () {
      return {
        'display': 'flex',
        'max-height': `${this.maxHeight}px`,
        'resize': 'vertical'
      }
    },

    headers () {
      return _.times(5, i => `Column ${i}`)
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
    },

    removeAllData () {
      this.sourceData = []
      this.currentPage = 0
    },

    addNewRow () {
      this.sourceData.push([this.sourceData.length, ..._.times(this.headers.length, () => _.random(0, 300, false))])
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
      <div class="element-demo__bordered-box" style="display: flex; flex-direction: column; resize: vertical;">
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
