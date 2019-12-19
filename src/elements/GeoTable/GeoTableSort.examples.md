### Default sorter

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table-sort
          :current-sorting-direction="currentSortingDirection"
          :currently-sorting-table="currentlySortingTable"
          style="visibility: visible"
          @sort="setSortingDirection($event)"
        />
      </div>

      <geo-danger-button @click="resetCurrentlySortingTable()">
        Remove sorting direction
      </geo-danger-button>
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

### Examples

```vue live
<template>
  <div class="element-demo">
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

      <geo-danger-button @click="resetCurrentlySortingTable()">
        Remove sorting direction
      </geo-danger-button>
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
