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
        key-for-label="label"
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
        v-model="currentSelection[2]"
        :options="optGroupsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :grouped="true"
        :searchable="true"
        key-for-label="label"
        css-modifier="select-demo"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
      >
        <template slot="noResults">No Results found</template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with pagination</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection[3]"
        :options="longList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :page-size="20"
        key-for-label="label"
        css-modifier="select-demo"
        placeholder="Choose an option"
      >
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-select>
    </div>
    <h3 class="element-demo__header">Select with marquee options</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection[4]"
        :options="marqueeOptions"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        key-for-label="label"
        css-modifier="select-demo"
        placeholder="Choose an option"
      />
    </div>
    <h3 class="element-demo__header">Select with opt groups and marquee options</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection[5]"
        :grouped="true"
        :options="marqueeOptGroupsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        key-for-label="label"
        css-modifier="select-demo"
        placeholder="Choose an option"
      />
    </div>
    <h3 class="element-demo__header">Disabled select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection[0]"
        :options="itemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        key-for-label="label"
        css-modifier="select-demo"
        placeholder="Choose an option"
        disabled
      />
    </div>
    <h3 class="element-demo__header">Custom select</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection[6]"
        :options="itemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        key-for-label="label"
        css-modifier="select-demo"
        placeholder="Choose an option"
      >
        <geo-select-toggle-button
          slot="toggleButton"
          slot-scope="{ dropdownIcon, cssModifier, isEmpty, disabled, toggleSelect, label }"
          :dropdown-icon="dropdownIcon"
          :css-modifier="cssModifier"
          :is-empty="isEmpty"
          :disabled="disabled"
          @click="toggleSelect"
        >
          (Custom) {{ label }}
        </geo-select-toggle-button>

        <template slot-scope="{ item, suggestedKey, changeCurrentSelection }">
          <geo-list-item
            :key="suggestedKey"
            @click="changeCurrentSelection(item)"
          >
            (Custom) {{ item.label }}
          </geo-list-item>
        </template>
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: [null, null, null, null, null, null, null],
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
