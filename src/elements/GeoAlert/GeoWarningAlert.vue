<template>
  <geo-alert
    v-bind="$attrs"
    :class="$attrs.class"
    :icon="['fal', 'exclamation-triangle']"
    :variant="VARIANTS.warning"
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
  data() {
    return {
      VARIANTS
    }
  }
}
</script>
