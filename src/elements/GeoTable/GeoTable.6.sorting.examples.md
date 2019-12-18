## Sorting

You can use [GeoTableSort](./GeoTableSort) to add sorting behaviour to
`GeoTable`.

```vue live
<template>
  <div class="element-demo">
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
    <div class="element-demo__block">
        <geo-primary-button @click="randomizeData">
          Randomize data
        </geo-primary-button>

        <geo-danger-button @click="resetSorting">
          Reset sorting
        </geo-danger-button>
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
