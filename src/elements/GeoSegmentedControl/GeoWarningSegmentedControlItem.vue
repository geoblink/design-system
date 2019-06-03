<template functional>
  <geo-segmented-control-item
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :css-modifier="props.cssModifier"
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
import cssSuffix from '../../mixins/cssModifierMixin'

import geoSegmentedControlItemMixin, { VARIANTS } from './GeoSegmentedControlItem.constants'

export default {
  name: 'GeoWarningSegmentedControlItem',
  status: 'ready',
  release: '20.1.0',
  mixins: [cssSuffix, geoSegmentedControlItemMixin],
  helpers: {
    variant: VARIANTS.warning
  }
}
</script>
