```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-scrollable-container
        :show-more-results-button="showMoreResultsButton"
        @load-more-results="loadNextPage($event)"
      >
        <p v-for="(item, index) in chunkedList" :key="index">{{ item.label }}</p>
        <template slot="moreResultsTextContent">Load more results</template>
      </geo-scrollable-container>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollableList: _.times(350, idx => { return { label: `Item ${idx}` } }),
      currentPage: 1,
      maxItemsPerPage: 10
    }
  },
  computed: {
    chunkedList () {
      return this.scrollableList.slice(0, this.currentPage * this.maxItemsPerPage)
    },

    showMoreResultsButton () {
      return this.currentPage * this.maxItemsPerPage < this.scrollableList.length
    }
  },
  methods: {
    loadNextPage (payload) {
      this.currentPage++
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    }
  }
}
</script>
```
