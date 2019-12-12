<template>
  <div :class="`geo-segmented-control${outlineSuffix}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GeoSegmentedControl',
  status: 'ready',
  release: '6.2.0',
  props: {
    /**
     * Whether this control should be displayed using outline style (`true`) or
     * not.
     *
     * Outline style takes more vertical space while default style is more
     * compact.
     */
    outline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    outlineSuffix () {
      return this.outline ? '--outline' : ''
    }
  }
}
</script>
