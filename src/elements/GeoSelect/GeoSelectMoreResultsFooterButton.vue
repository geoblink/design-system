<template>
  <div :class="`geo-select-more-results__container${cssSuffix}`">
    <div
      :class="`geo-select-more-results__text-content${cssSuffix}`"
      @click="loadMoreResults">
      <span :class="`geo-select-more-results__text-content--more-results${cssSuffix}`">
        <!-- @slot Use this slot to customize the label of the button -->
        <slot name="moreResultsContent"/>
      </span>
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectMoreResultsFooterButton',
  status: 'missing-tests',
  release: '4.1.0',
  mixins: [cssSuffix],
  methods: {
    loadMoreResults () {
      /**
       * Load more results in GeoSelect options
       *
       * @event load-more-results
       */
      this.$emit('load-more-results')
    }
  }
}
</script>
