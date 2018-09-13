<template>
  <div :class="`geo-dropdown__footer${cssSuffix}`">
    <!-- @slot Use this slot to customize footer's content -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GeoDropdownFooter',
  status: 'missing-tests',
  release: '8.0.0',
  props: {
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-button-make('modifier-name');` to your SCSS
     * styles.
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
