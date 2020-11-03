<template>
  <geo-segmented-control-item
    v-bind="$attrs"
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
 * `GeoSuccessSegmentedControlItem` is a component designed to nicely fit as one
 * of the options of a [GeoSegmentedControl](./GeoSegmentedControl).
 */
export default {
  name: 'GeoSuccessSegmentedControlItem',
  status: 'ready',
  release: '20.1.0',
  mixins: [geoSegmentedControlItemMixin, customListenersMixin],
  helpers: {
    variant: VARIANTS.success
  }
}
</script>
