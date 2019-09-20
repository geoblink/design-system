<template>
  <div :class="`geo-bordered-box${cssSuffix}`">
    <!-- @slot Use this slot to customize content displayed inside the box -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedBox',
  status: 'ready',
  release: '7.3.0',
  mixins: [cssSuffix]
}
</script>
