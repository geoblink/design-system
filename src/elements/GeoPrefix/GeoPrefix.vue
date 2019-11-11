<template>
  <div
    :class="`geo-prefix${cssSuffix}`"
  >
    <!-- @slot Use this slot to customize what's displayed as a prefix -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoPrefix',
  status: 'ready',
  release: '27.0.0',
  mixins: [cssSuffix]
}
</script>
