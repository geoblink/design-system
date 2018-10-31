<template>
  <div :class="`geo-list-clear-item${cssSuffix}`">
    <!-- @slot Use this slot to customize content displayed in this entry -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoListClearItem',
  status: 'missing-tests',
  release: '8.0.0',
  mixins: [cssSuffix]
}
</script>
