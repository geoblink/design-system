### Static table

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <div class="element-demo__bordered-box">
        <geo-table
          :source-data="sourceData"
          :current-page="0"
        >
          <geo-table-header-row slot="header">
            <geo-table-header-row-cell>Name</geo-table-header-row-cell>
            <geo-table-header-row-cell>Allegiance</geo-table-header-row-cell>
          </geo-table-header-row>
          <geo-table-body-row slot="body" slot-scope="row">
            <geo-table-body-row-cell>{{ row.item.name }}</geo-table-body-row-cell>
            <geo-table-body-row-cell>{{ row.item.allegiance }}</geo-table-body-row-cell>
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
      headers: ['Name', 'Allegiance'],
      sourceData: [
        { name: 'Obi-Wan Kenobi', allegiance: 'Republic, democracy' },
        { name: 'Anakin Skywalker', allegiance: 'Republic' },
        { name: 'Sheev Palpatine', allegiance: 'The Senate' },
        { name: 'Darth Sidious', allegiance: 'The Senate' },
        { name: 'Darth Vader', allegiance: 'Galactic Empire' },
        { name: 'Luke Skywalker', allegiance: 'Rebel Alliance' },
        { name: 'Leia Organa', allegiance: 'Rebel Alliance' }
      ]
    }
  }
}
</script>
```

### Table with dynamic data

```vue live
<template>
  <div class="element-demo">
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
    <div class="element-demo__block" style="margin-top: 10px;">
      <geo-primary-button @click="randomizeData">
        Randomize data
      </geo-primary-button>
    </div>
  </div>
</template>

<script>
export default {
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
