<template functional>
  <geo-segmented-control-item
    :ref="data.ref"
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :disabled="props.disabled"
    :outline="props.outline"
    :active="props.active"
    :variant="$options.helpers.variant"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize item's content -->
    <slot />
  </geo-segmented-control-item>
</template>

<script>
import geoSegmentedControlItemMixin, { VARIANTS } from './GeoSegmentedControlItem.constants'

/**
 * `GeoInfoSegmentedControlItem` is a component designed to nicely fit as one of
 * the options of a [GeoSegmentedControl](./GeoSegmentedControl).
 */
export default {
  name: 'GeoInfoSegmentedControlItem',
  status: 'ready',
  release: '20.1.0',
  mixins: [geoSegmentedControlItemMixin],
  helpers: {
    variant: VARIANTS.info
  }
}
</script>
