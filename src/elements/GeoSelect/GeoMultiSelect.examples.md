### Simple multi select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="itemsList"
        key-for-id="id"
        placeholder="Choose an option"
        v-model="selectedOptions"
      >
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
      </geo-multi-select>
    </div>

    <div class="element-demo__block" style="margin-top: 10px;">
      Model: {{ selectedOptions }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedOptions: undefined,
      itemsList: _.times(5, idx => { return {label: `Item ${idx}`, id: idx} })
    }
  }
}
</script>
```

### Searchable multi select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="itemsList"
        :searchable="true"
        key-for-id="id"
        key-for-label="label"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
        v-model="selectedOptions"
      >
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
      </geo-multi-select>
    </div>

    <div class="element-demo__block" style="margin-top: 10px;">
      Model: {{ selectedOptions }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedOptions: undefined,
      itemsList: _.times(5, idx => { return {label: `Item ${idx}`, id: idx} })
    }
  }
}
</script>
```

### Paginated multi select

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="itemsLongList"
        :pill-max-width="100"
        :page-size="10"
        key-for-id="id"
        key-for-label="label"
        placeholder="Choose an option"
        v-model="selectedOptions"
      >
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-multi-select>
    </div>

    <div class="element-demo__block" style="margin-top: 10px;">
      Model: {{ selectedOptions }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedOptions: undefined,
      itemsLongList: _.times(25, idx => ({
        label: `${idx} Item with long label that doesn't fit in the select ${idx}`,
        id: idx
      })),
    }
  }
}
</script>
```

### Select with opt-groups

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="margin: auto; width: 300px">
      <geo-multi-select
        :options="optGroupsList"
        :grouped="true"
        :searchable="true"
        key-for-id="id"
        key-for-label="label"
        placeholder="Choose an option"
        search-input-placeholder="Search for an option"
        v-model="selectedOptions"
      >
        <template slot="noResults">No Results found</template>
        <div slot="showMorePills" slot-scope="{ hiddenOptionsSize }">Show {{ hiddenOptionsSize }} more</div>
        <div slot="showLessPills">Show less</div>
      </geo-multi-select>
    </div>

    <div class="element-demo__block" style="margin-top: 10px;">
      Model: {{ selectedOptions }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoMultiSelectDemo',
  data () {
    return {
      selectedOptions: undefined,
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
