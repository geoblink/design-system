<template>
  <div
    :class="`geo-suffix${cssSuffix}`"
  >
    <!-- @slot Use this slot to customize what's displayed as a suffix -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSuffix',
  status: 'ready',
  release: '27.0.0',
  mixins: [cssSuffix]
}
</script>
