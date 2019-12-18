## Pagination

You can use [GeoTablePagination](./GeoTablePagination) to add pagination
behaviour to a `GeoTable`.

By default `GeoTable` will display up to `10` rows of data. You can override
this with a different value using `forced-page-size` property. Additionally,
`GeoTable` **can infer the amount of rows to be displayed** if you prefer so.
Setting `automatic-page-size` property to `true` will opt in to this feature.

### Examples

#### Default page size

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <div class="element-demo__bordered-box" :style="style">
        <geo-table
          :source-data="sourceData"
          :current-page="currentPage"
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
    <div class="element-demo__block">
      <geo-danger-button class="element-demo__inline-input-group" @click="removeAllData()">
        Remove rows
      </geo-danger-button>
      <geo-primary-button class="element-demo__inline-input-group" @click="addNewRow()">
        Add row
      </geo-primary-button>
      <div class="element-demo__inline-input-group">
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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

#### Automatic page size

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <div class="element-demo__bordered-box" :style="style">
        <geo-table
          :source-data="sourceData"
          :current-page="currentPage"
          automatic-page-size
          @infer-page-size="inferredPageSize = $event"
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
    <div class="element-demo__block">
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
