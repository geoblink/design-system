<template>
  <div :class="`geo-select-read-only-entry__container${cssSuffix}`">
    <!-- @slot Use this slot to add elements to the read only entry label's leading side (icons, radio buttons, etc) -->
    <slot name="leadingAccessoryItem" />
    <div :class="`geo-select-read-only-entry__content${cssSuffix}`">
      <!-- @slot Use this slot to customize content displayed in this entry. -->
      <slot />
    </div>
    <!-- @slot Use this slot to add elements to the read only entry label's trailing side (icons, radio buttons, etc) -->
    <slot name="trailingAccessoryItem" />
  </div>
</template>

<script>
export default {
  name: 'GeoSelectReadOnlyEntry',
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
  }
}
</script>
