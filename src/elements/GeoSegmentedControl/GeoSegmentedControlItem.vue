<template>
  <div
    :class="{
      [`geo-segmented-control-item${outlineSuffix}${cssSuffix}`]: true,
      [`geo-segmented-control-item${outlineSuffix}--active${cssSuffix}`]: active,
      [`geo-segmented-control-item${outlineSuffix}--disabled${cssSuffix}`]: disabled
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
    /**
     * Whether this item should be styled as active (`true`) or not (default).
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * Whether this item should be displayed using outline style (`true`) or not.
     *
     * Outline style takes more vertical space while default style is more
     * compact.
     */
    outline: {
      type: Boolean,
      default: false
    },
    /**
     * Whether this item is disabled (`true`) or not be (default).
     *
     * Disabled items won't emit click events.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    outlineSuffix () {
      const isOutline = this.outline || this.$parent.outline
      return isOutline ? '--outline' : ''
    }
  },
  methods: {
    handleClick ($event) {
      if (this.disabled) return

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
