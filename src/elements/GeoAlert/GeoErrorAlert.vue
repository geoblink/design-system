<template functional>
  <geo-alert
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :icon="['fal', 'exclamation-triangle']"
    :variant="$options.helpers.VARIANTS.error"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize alert's content -->
    <slot />
  </geo-alert>
</template>

<script>
import { VARIANTS } from './GeoAlert.constants'

export default {
  name: 'GeoErrorAlert',
  status: 'ready',
  release: '22.0.0',
  helpers: {
    VARIANTS
  }
}
</script>
