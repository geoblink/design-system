<template>
  <div :class="`geo-bordered-box-column${cssSuffix}`">
    <!-- @slot Use this slot to customize content displayed inside the column -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedBoxColumn',
  status: 'ready',
  release: '24.12.0',
  mixins: [cssSuffix]
}
</script>
