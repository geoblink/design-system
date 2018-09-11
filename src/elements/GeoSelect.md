`GeoSelect` is a combination of a button and a popup which is toggled in and
out using that button. It's suitable for dropdown menus and actions which
require additional or complex user input like handling filters.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="itemsList"
        css-modifier="select-demo"
        placeholder="Choose an option"
        v-model="currentSelection[0]"
      />
    </div>
    <h3 class="element-demo__header">Select with search option</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="itemsList"
        :searchable="true"
        css-modifier="select-demo"
        placeholder="Choose an option"
        no-results-placeholder="No results found"
        search-input-placeholder="Search for an option"
        v-model="currentSelection[1]"
      />
    </div>
    <h3 class="element-demo__header">Select with opt-groups</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="optGroupsList"
        :searchable="true"
        css-modifier="select-demo"
        placeholder="Choose an option"
        no-results-placeholder="No results found"
        search-input-placeholder="Search for an option"
        v-model="currentSelection[2]"
      />
    </div>
    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="longList"
        :page-size="20"
        css-modifier="select-demo"
        placeholder="Choose an option"
        v-model="currentSelection[3]">
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: [null, null, null, null],
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} }),
      optGroupsList: [
        {
          isOptGroup: true,
          label: 'First Group',
          items: [
            {
              label: 'item 1'
            },
            {
              label: 'item 2'
            },
            {
              label: 'item 3'
            },
            {
              label: 'item 4'
            }
          ]
        },
        {
          isOptGroup: true,
          label: 'Second Group',
          items: [
            {
              label: 'item 5'
            },
            {
              label: 'item 6'
            },
            {
              label: 'item 7'
            },
            {
              label: 'item 8'
            }
          ]
        },
      ],
      longList: _.times(500, idx => { return {label: `Item ${idx}`} }),
    }
  }
}
</script>
```
