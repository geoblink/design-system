<template>
  <div :class="`geo-segmented-control${cssSuffix}`">
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSegmentedControl',
  mixins: [cssSuffix]
}
</script>
