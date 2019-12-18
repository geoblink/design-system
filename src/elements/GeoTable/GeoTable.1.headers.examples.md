## Headers

`GeoTable` instances need a least one header row, which can have as many cells
as required. Header rows can be set up using `header` named slot. To set up a
header row, put a [GeoTableHeaderRow](./GeoTableHeaderRow) component as content
of `header` named slot.

### Multiple header rows

It is possible to show multiple header rows in a single table.

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
          <geo-table-header-row slot="header" variant="aux">
            <geo-table-header-row-cell>Copy column</geo-table-header-row-cell>
            <geo-table-header-row-cell>Group by this column</geo-table-header-row-cell>
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
