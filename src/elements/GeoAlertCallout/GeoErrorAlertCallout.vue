<template functional>
  <geo-alert-callout
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :icon="['fal', 'exclamation-triangle']"
    :css-modifier="props.cssModifier"
    :variant="$options.helpers.VARIANTS.error"
    v-on="listeners"
  >
    <slot />
  </geo-alert-callout>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

import { VARIANTS } from './GeoAlertCallout.constants'

export default {
  name: 'GeoErrorAlertCallout',
  status: 'ready',
  release: '18.4.0',
  helpers: {
    VARIANTS
  },
  mixins: [cssSuffix]
}
</script>
