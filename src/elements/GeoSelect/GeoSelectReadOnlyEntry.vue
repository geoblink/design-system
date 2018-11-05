<template>
  <div :class="`geo-select-read-only-entry__container${cssSuffix}`">
    <!-- @slot Use this slot to add elements to leading edge -->
    <slot name="leadingAccessoryItem" />
    <div :class="`geo-select-read-only-entry__content${cssSuffix}`">
      <!-- @slot Use this slot to customize content displayed in this entry -->
      <slot />
    </div>
    <!-- @slot Use this slot to add elements to trailing edge -->
    <slot name="trailingAccessoryItem" />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectReadOnlyEntry',
  status: 'deprecated',
  alternative: 'GeoListClearItem',
  release: '4.1.0',
  mixins: [cssSuffix]
}
</script>
