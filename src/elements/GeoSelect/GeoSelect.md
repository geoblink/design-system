`GeoSelect` is a replacement for plain HTML `<select>` tag aimed to offer
a better UX including chunked load and search capabilities.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="itemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        css-modifier="select-demo"
        placeholder="Choose an option"
        v-model="currentSelection[0]"
      />
    </div>
    <h3 class="element-demo__header">Select with search option</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="itemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :searchable="true"
        css-modifier="select-demo"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
        v-model="currentSelection[1]"
      >
        <template slot="noResults">No Results found</template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with opt-groups</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="optGroupsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :is-opt-select="true"
        :searchable="true"
        css-modifier="select-demo"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
        v-model="currentSelection[2]"
      >
        <template slot="noResults">No Results found</template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="longList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :page-size="20"
        css-modifier="select-demo"
        placeholder="Choose an option"
        v-model="currentSelection[3]">
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with marquee options</h3>
    <div class="element-demo__block" style="justify-content: space-around; width: 400px;">
      <geo-select
        style="width: 400px;"
        :options="marqueeOptions"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        css-modifier="select-demo"
        placeholder="Choose an option"
        v-model="currentSelection[4]">
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with opt groups and marquee options</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :is-opt-select="true"
        :options="marqueeOptGroupsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        css-modifier="select-demo"
        placeholder="Choose an option"
        v-model="currentSelection[5]">
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: [null, null, null, null, null, null],
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} }),
      marqueeOptions: _.times(4, idx => { return {label: `Super long name so it doesn't fit in the box ${idx}`} }),
      marqueeOptGroupsList: [
        {
          isOptGroup: true,
          label: 'First Group with absurdingly long name that probably will not fit',
          items: _.times(4, idx => { return {label: `Super long name so it doesn't fit in the box ${idx}`} }),
        },
        {
          isOptGroup: true,
          label: 'Second Group with absurdingly long name that probably will not fit',
          items: _.times(4, idx => { return {label: `Super long name so it doesn't fit in the box ${idx}`} }),
        },
      ],
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
