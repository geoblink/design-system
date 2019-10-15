<template>
  <div :class="`geo-scrollable-container${cssSuffix}`">
    <div
      ref="scrollableContainer"
      :class="`geo-scrollable-container__body${cssSuffix}`"
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
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoScrollableContainer',
  status: 'ready',
  release: '7.1.0',
  mixins: [cssSuffix],
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
