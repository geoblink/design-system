<template>
  <div :class="`geo-dropdown__footer${cssSuffix}`">
    <!-- @slot Use this slot to customize footer's content -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoDropdownFooter',
  status: 'missing-tests',
  release: '4.0.0',
  mixins: [cssSuffix]
}
</script>
