### Simple select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="itemsList"
        :dropdown-icon="['fas', 'chevron-down']"
        :search-icon="['fas', 'search']"
        :is-value-deletable="true"
        placeholder="Choose an option"
        v-model="currentSelection"
        @delete-value="deleteSelection()"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} })
    }
  },
  methods: {
    deleteSelection () {
      this.currentSelection = null
    }
  }
}
</script>
```

### Searchable select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        :options="itemsList"
        :searchable="true"
        key-for-label="label"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
        v-model="currentSelection"
      >
        <template slot="noResults">No Results found</template>
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} })
    }
  }
}
</script>
```

### Select with opt-groups

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection"
        :options="optGroupsList"
        :grouped="true"
        :searchable="true"
        key-for-label="label"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
      >
        <template slot="noResults">No Results found</template>
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
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
      ]
    }
  },
  methods: {
    deleteSelection () {
      this.currentSelection = null
    }
  }
}
</script>
```

### Paginated select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection"
        :options="longList"
        :page-size="20"
        key-for-label="label"
        placeholder="Choose an option"
      >
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
      longList: _.times(500, idx => { return {label: `Item ${idx}`} })
    }
  }
}
</script>
```

### Select with marquee options

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection"
        :options="marqueeOptions"
        key-for-label="label"
        placeholder="Choose an option"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
      marqueeOptions: _.times(4, idx => { return {label: `Super long name so it doesn't fit in the box ${idx}`} })
    }
  }
}
</script>
```

### Select with opt-groups and marquee options

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection"
        :grouped="true"
        :options="marqueeOptGroupsList"
        key-for-label="label"
        placeholder="Choose an option"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
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
      ]
    }
  }
}
</script>
```

### Disabled select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection"
        :options="itemsList"
        key-for-label="label"
        placeholder="Choose an option"
        disabled
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSelection: null,
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} })
    }
  }
}
</script>
```

### Custom select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select
        v-model="currentSelection"
        :options="itemsList"
        key-for-label="label"
        placeholder="Choose an option"
      >
        <geo-select-toggle-button
          slot="toggleButton"
          slot-scope="{ dropdownIcon, isEmpty, disabled, toggleSelect, label }"
          :dropdown-icon="dropdownIcon"
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
      currentSelection: null,
      itemsList: _.times(4, idx => { return {label: `Item ${idx}`} })
    }
  }
}
</script>
```
