<template>
  <div class="geo-scrollable-container">
    <div
      ref="scrollableContainer"
      class="geo-scrollable-container__body"
    >
      <!-- @slot Use this slot to customize the content that can be scrolled -->
      <slot />
    </div>
    <geo-list-footer-button
      v-if="showMoreResultsButton"
      @click="loadNextPage"
    >
      <!-- @slot Use this slot to customize the button displayed to show more results -->
      <slot name="moreResultsTextContent" />
    </geo-list-footer-button>
  </div>
</template>

<script>
/**
 * `GeoScrollableContainer` is a component designed to wrap a list of items
 * that is too long to display at once. It provides a button to load more items
 * from that list.
 *
 * It's useful to be used altogether with `GeoDropdown` and `GeoSelect`.
 */
export default {
  name: 'GeoScrollableContainer',
  status: 'ready',
  release: '7.1.0',
  props: {
    showMoreResultsButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    loadNextPage () {
      const scrollableContainer = this.$refs.scrollableContainer
      const currentVerticalOffset = scrollableContainer.scrollTop
      const nextPageVerticalOffset = currentVerticalOffset + scrollableContainer.scrollHeight
      /**
       * Load more results in GeoSelect options
       *
       * @event load-more-results
       * @type {{scrollToLastEntry: Function}}
       */
      this.$emit('load-more-results', {
        scrollToLastEntry () {
          scrollableContainer.scrollTop = nextPageVerticalOffset
        }
      })
    }
  }
}
</script>
