<template>
  <div :class="`geo-input-suffix${cssSuffix}`">
    <!-- @slot Use this slot to customize what's displayed as a suffix -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoInputSuffix',
  status: 'ready',
  release: '27.0.0',
  mixins: [cssSuffix]
}
</script>
