## Headers

`GeoTable` instances need a least one header row, which can have as many cells
as required. Header rows can be set up using `header` named slot. To set up a
header row, put a [GeoTableHeaderRow](./#/Elements/GeoTable?id=geotableheaderrow)
component as content of `header` named slot.

```jsx live
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

```jsx live
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

It is possible to set up a minimum, maximum and a forced width. This is applied
on per-header-cell basis. When setting a header cell's `columnMinWidth`,
column's final width won't be smaller than it. If there's a `columnMaxWidth`,
column's final width won't exceed it.

If `columnWidth` is set then it will override any minimum or maximum width set.

By default columns will take the width needed to render their content in a
single line, considering both, header and body content. However, you can make
header cells opt out from this behaviour with property `ignoreContentWidth`.

To opt out of `GeoTable` automatic growing for some column, set property
`growingDisabled` to `true`.

```vue live
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
            <geo-table-header-row-cell growing-disabled ignore-content-width>
              <geo-trimmed-content>Not growing</geo-trimmed-content>
            </geo-table-header-row-cell>
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
      this.sourceData = [_.times(5, i => _.random(100, 1000000, false))]
    }
  }
}
</script>
```

