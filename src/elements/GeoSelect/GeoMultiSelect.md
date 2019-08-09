`GeoMultiSelect` is a component aimed to allow multiple options selection in a
`<select>` like UI including chunked load and search capabilities.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple multi select</h3>
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="itemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :pill-close-icon="['fas', 'times']"
        key-for-id="id"
        placeholder="Choose an option"
        v-model="selectedOptions[0]"
      >
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
      </geo-multi-select>
    </div>
    Model: {{ selectedOptions[0] }}

    <h3 class="element-demo__header">Select with search</h3>
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="itemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :pill-close-icon="['fas', 'times']"
        :searchable="true"
        key-for-id="id"
        key-for-label="label"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
        v-model="selectedOptions[1]"
      >
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
      </geo-multi-select>
    </div>
    Model: {{ selectedOptions[1] }}

    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="itemsLongList"
        :dropdown-icon="['fas', 'chevron-down']"
        :pill-close-icon="['fas', 'times']"
        :pill-max-width="100"
        :page-size="10"
        key-for-id="id"
        key-for-label="label"
        placeholder="Choose an option"
        v-model="selectedOptions[2]"
      >
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-multi-select>
    </div>
    Model: {{ selectedOptions[2] }}

    <h3 class="element-demo__header">Select with opt-groups</h3>
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="optGroupsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :pill-close-icon="['fas', 'times']"
        :grouped="true"
        :searchable="true"
        key-for-id="id"
        key-for-label="label"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
        v-model="selectedOptions[3]"
      >
        <template slot="noResults">No Results found</template>
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
      </geo-multi-select>
    </div>
    Model: {{ selectedOptions[3] }}
  </div>
</template>

<script>
export default {
  name: 'GeoMultiSelectDemo',
  data () {
    return {
      selectedOptions: [undefined, [], [], []],
      itemsList: _.times(5, idx => { return {label: `Item ${idx}`, id: idx} }),
      itemsLongList: _.times(25, idx => { return {label: `${idx} Item with long label that doesn't fit in the select ${idx}`, id: idx} }),
      optGroupsList: [
        {
          isOptGroup: true,
          label: 'First Group',
          items: _.times(4, idx => { return {label: `Item ${idx}`, id: `First${idx}`} }),
        },
        {
          isOptGroup: true,
          label: 'Second Group',
          items: _.times(4, idx => { return {label: `Item ${idx}`, id: `Second${idx}`} }),
        },
      ]
    }
  }
}
</script>
```
