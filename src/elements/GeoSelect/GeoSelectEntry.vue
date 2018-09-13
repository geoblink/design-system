<template>
  <div
    :class="`geo-select-entry__container${cssSuffix}`"
    @click="changeCurrentSelection"
  >
    <!-- @slot Use this slot to add elements to the entry label's leading side (icons, radio buttons, etc) -->
    <slot name="leadingAccessoryItem" />
    <div :class="`geo-select-entry__content${cssSuffix}`">
      <!-- @slot Use this slot to customize this entry’s content. -->
      <slot />
    </div>
    <!-- @slot Use this slot to add elements to the entry label's trailing side (icons, radio buttons, etc) -->
    <slot name="trailingAccessoryItem" />
  </div>
</template>

<script>
export default {
  name: 'GeoSelectEntry',
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
     * have to add `@include geo-select-entry-make('modifier-name');` to
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
    changeCurrentSelection () {
      /**
       * Change GeoSelect selection event
       * @event change-current-selection
       */
      this.$emit('change-current-selection')
    }
  }
}
</script>
