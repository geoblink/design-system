<template>
  <div :class="`geo-bordered-box${cssSuffix}`">
    <div class="geo-bordered-box__header">
      <slot name="header" />
    </div>
    <div class="geo-bordered-box__body">
      <slot />
    </div>
    <div class="geo-bordered-box__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedBox',
  status: 'missing-tests',
  release: '7.3.0',
  mixins: [cssSuffix],
  props: {},
  computed: {
    hasHeader () {
      return !!this.slots.header.length
    },

    hasFooter () {
      return !!this.slots.footer.length
    }
  }
}
</script>
