<template>
  <geo-alert
    v-bind="$attrs"
    :class="$attrs.class"
    :icon="['fal', 'exclamation-triangle']"
    :variant="VARIANTS.error"
  >
    <!-- @slot Use this slot to customize alert's content -->
    <slot />
  </geo-alert>
</template>

<script>
import { VARIANTS } from './GeoAlert.constants'

/**
 * [GeoAlert](./GeoAlert) using predefined `error` variant.
 *
 * `error` variant is normally used to give feedback about potential unexpected
 * errors.
 *
 * See [GeoAlert](./GeoAlert) for a complete list of supported properties and
 * features.
 */
export default {
  name: 'GeoErrorAlert',
  status: 'ready',
  release: '22.0.0',
  data() {
    return {
      VARIANTS
    }
  }
}
</script>
