`GeoSelectMoreResults` is used as a footer for the Geo Select when it has
too many options to show. It works similar to a paginator, showing for each click
a specific number of more options

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">More results button with more results to show</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-more-results>
        <template slot="moreResultsContent">Load more results</template>
      </geo-select-more-results>
    </div>
    <h3 class="element-demo__header">More results button with no more results to show</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-select-more-results>
        <template slot="noResultsContent">No more results</template>
      </geo-select-more-results>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
```
