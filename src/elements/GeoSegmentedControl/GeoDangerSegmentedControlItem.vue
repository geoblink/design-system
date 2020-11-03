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
import extendedListenersMixin from '@/mixins/extendedListenersMixin'

/**
 * `GeoDangerSegmentedControlItem` is a component designed to nicely fit as one
 * of the options of a [GeoSegmentedControl](./GeoSegmentedControl).
 *
 * Use this variant when the option is dangerous or wrong.
 */
export default {
  name: 'GeoDangerSegmentedControlItem',
  status: 'ready',
  release: '20.1.0',
  mixins: [geoSegmentedControlItemMixin, extendedListenersMixin],
  helpers: {
    variant: VARIANTS.danger
  }
}
</script>
