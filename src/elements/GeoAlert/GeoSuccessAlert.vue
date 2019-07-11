<template functional>
  <geo-alert
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
  </geo-alert>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

import { VARIANTS } from './GeoAlert.constants'

export default {
  name: 'GeoSuccessAlert',
  status: 'ready',
  release: '22.0.0',
  helpers: {
    VARIANTS
  },
  mixins: [cssSuffix]
}
</script>
