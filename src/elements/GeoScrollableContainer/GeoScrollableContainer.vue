<template>
  <div :class="`geo-scrollable-container${cssSuffix}`">
    <div
      ref="scrollableContainer"
      :class="`geo-scrollable-container__body${cssSuffix}`"
    >
      <slot name="scrollableList"/>
    </div>
    <geo-select-more-results-footer-button
      v-if="showMoreResultsButton"
      @load-more-results="loadNextPage">
      <slot
        slot="moreResultsContent"
        name="moreResultsTextContent"
      />
    </geo-select-more-results-footer-button>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoScrollableContainer',
  status: 'missing-tests',
  release: '7.1.0',
  mixins: [cssSuffix],
  props: {
    showMoreResultsButton: {
      type: Boolean,
      required: true
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
