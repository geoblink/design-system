<template>
  <div :class="`geo-horizontal-layout${cssSuffix}`">
    <!-- @slot Use this slot to customize content displayed inside the layout -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoHorizontalLayout',
  status: 'ready',
  release: '24.12.0',
  mixins: [cssSuffix]
}
</script>
