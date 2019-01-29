`GeoTableSort` is a component which fits nicely in a
[GeoTable](./#/Elements/GeoTable?id=geotable-1) header. It's designed to display
buttons to sort data in a table by their values in a specific column.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Default sorter
      <geo-danger-button @click="resetCurrentlySortingTable()">
        Remove sorting direction
      </geo-danger-button>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table-sort
          :current-sorting-direction="currentSortingDirection"
          :currently-sorting-table="currentlySortingTable"
          style="visibility: visible"
          @sort="setSortingDirection($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSortingDirection: 'asc',
      currentlySortingTable: false
    }
  },
  methods: {
    resetCurrentlySortingTable () {
      this.currentlySortingTable = false
    },

    setSortingDirection (direction) {
      this.currentlySortingTable = true
      this.currentSortingDirection = direction
    }
  }
}
</script>
```

## Customization

Sorting buttons can be customized using `sortAscButton` and `sortDescButton`
scoped slots. Both of them have a property `isCurrentSortingDirection` which is
`true` iff sorting criteria represented by this sorted is the current one and
the sorting direction is ascending or descending (respectively).

Additionally, a property `action` is also passed. It's the method to be called
to sort the data in each direction.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Custom sorter
      <geo-danger-button @click="resetCurrentlySortingTable()">
        Remove sorting direction
      </geo-danger-button>
    </h3>
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table-sort
          :current-sorting-direction="currentSortingDirection"
          :currently-sorting-table="currentlySortingTable"
          style="visibility: visible"
          @sort="setSortingDirection($event)"
        >
          <p slot="sortAscButton" slot-scope="{ isCurrentSortingDirection, action }">
            <a v-if="!isCurrentSortingDirection" @click="action()">
              Sort data ASC
            </a>
            <template v-else>
              » Data is sorted ASC «
            </template>
          </p>
          <p slot="sortDescButton" slot-scope="{ isCurrentSortingDirection, action }">
            <a v-if="!isCurrentSortingDirection" @click="action()">
              Sort data DESC
            </a>
            <template v-else>
              » Data is sorted DESC «
            </template>
          </p>
        </geo-table-sort>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSortingDirection: 'asc',
      currentlySortingTable: false
    }
  },
  methods: {
    resetCurrentlySortingTable () {
      this.currentlySortingTable = false
    },

    setSortingDirection (direction) {
      this.currentlySortingTable = true
      this.currentSortingDirection = direction
    }
  }
}
</script>
```
