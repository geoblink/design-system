<template>
  <div :class="`geo-scrollable-container__container${cssSuffix}`">
    <div
      ref="scrollableContent"
      :class="`geo-scrollable-container__container__scrollable-content${cssSuffix}`"
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
  release: '7.0.1',
  mixins: [cssSuffix],
  props: {
    showMoreResultsButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    loadNextPage () {
      const popup = this.$refs.scrollableContent
      const currentVerticalOffset = popup.scrollTop
      const nextPageVerticalOffset = currentVerticalOffset + popup.scrollHeight
      /**
       * Load more results in GeoSelect options
       *
       * @event load-more-results
       * @type {{scrollToLastEntry: Function}}
       */
      this.$emit('load-more-results', {
        scrollToLastEntry () {
          popup.scrollTop = nextPageVerticalOffset
        }
      })
    }
  }
}
</script>
