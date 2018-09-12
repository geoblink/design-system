<template>
  <div :class="`geo-select-more-results__container${cssSuffix}`">
    <div
      :class="`geo-select-more-results__text-content${cssSuffix}`"
      @click="loadMoreResults">
      <span :class="`geo-select-more-results__text-content--more-results${cssSuffix}`">
        <!-- @slot Use this slot to customize the label of the button. -->
        <slot name="moreResultsContent"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoSelectMoreResultsFooterButton',
  status: 'ready',
  release: '8.1.0',
  props: {
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-select-more-results-footer-button-make('modifier-name');` to
     * your SCSS styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    }
  },
  methods: {
    loadMoreResults () {
      /**
       * Load more results in GeoSelect options
       * @event load-more-results
       */
      this.$emit('load-more-results')
    }
  }
}
</script>
