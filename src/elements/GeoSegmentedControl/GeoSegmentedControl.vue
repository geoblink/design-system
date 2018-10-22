<template>
  <div :class="`geo-segmented-control${outlineSuffix}${cssSuffix}`">
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSegmentedControl',
  mixins: [cssSuffix],
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
