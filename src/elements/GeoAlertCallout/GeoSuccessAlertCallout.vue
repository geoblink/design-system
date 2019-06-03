<template functional>
  <geo-alert-callout
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :icon="['fal', 'thumbs-up']"
    :css-modifier="props.cssModifier"
    :variant="$options.helpers.VARIANTS.success"
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
  name: 'GeoSuccessAlertCallout',
  status: 'ready',
  release: '18.4.0',
  helpers: {
    VARIANTS
  },
  mixins: [cssSuffix]
}
</script>
