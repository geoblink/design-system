<template>
  <div :class="`geo-select-read-only-entry__container${cssSuffix}`">
    <!-- @slot Use this slot to add elements to the read only entry label's leading side (icons, radio buttons, etc) -->
    <slot name="leadingAccessoryItem" />
    <div :class="`geo-select-read-only-entry__content${cssSuffix}`">
      <!-- @slot Use this slot to customize content displayed in this entry. -->
      <slot />
    </div>
    <!-- @slot Use this slot to add elements to the read only entry label's trailing side (icons, radio buttons, etc) -->
    <slot name="trailingAccessoryItem" />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectReadOnlyEntry',
  status: 'missing-tests',
  release: '8.1.0',
  mixins: [cssSuffix]
}
</script>
