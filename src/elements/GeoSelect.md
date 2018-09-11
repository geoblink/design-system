`GeoSelect` is a replacement for plain HTML `<select>` tag aimed to offer
a better UX including chunked load and search capabilities.

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
          items: _.times(4, idx => { return {label: `Item ${idx}`} }),
        },
        {
          isOptGroup: true,
          label: 'Second Group',
          items: _.times(4, idx => { return {label: `Item ${idx}`} }),
        },
      ],
      longList: _.times(500, idx => { return {label: `Item ${idx}`} }),
    }
  }
}
</script>
```
