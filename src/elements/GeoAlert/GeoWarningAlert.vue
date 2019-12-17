<template functional>
  <geo-alert
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :icon="['fal', 'exclamation-triangle']"
    :variant="$options.helpers.VARIANTS.warning"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize alert's content -->
    <slot />
  </geo-alert>
</template>

<script>
import { VARIANTS } from './GeoAlert.constants'

/**
 * [GeoAlert](./GeoAlert) using predefined `warning` variant.
 *
 * `warning` variant is normally used to show information that might impact how
 * the user will continue using the application or that is required to properly
 * finish the task at hand.
 *
 * See [GeoAlert](./GeoAlert) for a complete list of supported properties and
 * features.
 */
export default {
  name: 'GeoWarningAlert',
  status: 'ready',
  release: '22.0.0',
  helpers: {
    VARIANTS
  }
}
</script>
