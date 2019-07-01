<template functional>
  <geo-alert
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
    <!-- @slot Use this slot to customize alert's content -->
    <slot />
  </geo-alert>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

import { VARIANTS } from './GeoAlert.constants'

export default {
  name: 'GeoErrorAlert',
  status: 'ready',
  release: '22.0.0',
  helpers: {
    VARIANTS
  },
  mixins: [cssSuffix]
}
</script>
