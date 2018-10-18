<template>
  <div
    :class="{
      [`geo-segmented-control-item${cssSuffix}`]: true,
      [`geo-segmented-control-item--active${cssSuffix}`]: active
    }"
    @click="handleClick($event)"
  >
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSegmentedControlItem',
  mixins: [cssSuffix],
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick ($event) {
      /**
       * User clicked on the item.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
