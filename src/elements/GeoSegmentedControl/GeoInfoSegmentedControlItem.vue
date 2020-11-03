<template>
  <geo-segmented-control-item
    :ref="$attrs.ref"
    v-bind="$attrs"
    :class="[
      $attrs.class,
      $attrs.staticClass
    ]"
    :disabled="disabled"
    :outline="outline"
    :active="active"
    :variant="$options.helpers.variant"
    v-on="computedListeners"
  >
    <!-- @slot Use this slot to customize item's content -->
    <slot />
  </geo-segmented-control-item>
</template>

<script>
import geoSegmentedControlItemMixin, { VARIANTS } from './GeoSegmentedControlItem.constants'
import customListenersMixin from '@/mixins/customListenersMixin'

/**
 * `GeoInfoSegmentedControlItem` is a component designed to nicely fit as one of
 * the options of a [GeoSegmentedControl](./GeoSegmentedControl).
 */
export default {
  name: 'GeoInfoSegmentedControlItem',
  status: 'ready',
  release: '20.1.0',
  mixins: [geoSegmentedControlItemMixin, customListenersMixin],
  helpers: {
    variant: VARIANTS.info
  },
  props: {
    /**
     * When is true the component will display an outline style.
     */
    outline: {
      type: Boolean,
      required: false
    },

    /**
     * Whether this item is disabled or not. When disabled it will be displayed
     * greyed out.
     *
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * When is true the component will display an active style.
     */
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
