<template functional>
  <geo-alert-callout
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :icon="['fal', 'lightbulb']"
    :css-modifier="props.cssModifier"
    :variant="$options.helpers.VARIANTS.info"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize alert's content -->
    <slot />
  </geo-alert-callout>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

import { VARIANTS } from './GeoAlertCallout.constants'

export default {
  name: 'GeoInfoAlertCallout',
  status: 'ready',
  release: '18.4.0',
  helpers: {
    VARIANTS
  },
  mixins: [cssSuffix]
}
</script>
