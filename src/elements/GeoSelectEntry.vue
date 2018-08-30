<template>
  <div
    :class="`geo-select-entry__container${cssSuffix}`"
    @click="changeCurrentSelection">
    <slot name="leftAccessoryItem" />
    <slot name="content" />
    <slot name="rightAccessoryItem" />
  </div>
</template>

<script>
export default {
  name: 'GeoSelectEntry',
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
    changeCurrentSelection () {
      this.$emit('change-current-selection')
    }
  }
}
</script>

