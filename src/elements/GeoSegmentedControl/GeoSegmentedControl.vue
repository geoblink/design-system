<template>
  <div :class="`geo-segmented-control${outlineSuffix}`">
    <!-- @slot Use this slot to customize displayed controls -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoSegmentedControl` is an horizontal control made of multiple segments,
 * each of them functioning as a discrete button.
 *
 * It's designed to work nicely with
 * [GeoSegmentedControlItem](./GeoSegmentedControlItem) out of the box.
 */
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
