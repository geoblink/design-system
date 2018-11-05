<template>
  <div :class="`geo-bordered-box-footer${cssSuffix}`">
    <!-- @slot Use this slot to customize footer's content -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedBoxFooter',
  status: 'missing-tests',
  release: '7.3.0',
  mixins: [cssSuffix]
}
</script>
