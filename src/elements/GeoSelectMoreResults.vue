<template>
  <div :class="`geo-select-more-results__container${cssSuffix}`">
    <div
      :class="`geo-select-more-results__text-content${cssSuffix}`"
      @click="loadMoreResults">
      <span :class="`geo-select-more-results__text-content--more-results${cssSuffix}`">
        <slot name="moreResultsContent"/>
      </span>
      <span :class="`geo-select-more-results__text-content--no-results${cssSuffix}`">
        <slot name="noResultsContent"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoSelectMoreResults',
  status: 'ready',
  version: '1.0.1',
  props: {
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-activity-indicator-make('modifier-name');` to
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
      this.$emit('load-more-results')
    }
  }
}
</script>

