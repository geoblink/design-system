<template>
  <geo-alert
    v-bind="$attrs"
    :class="$attrs.class"
    :icon="['fal', 'lightbulb']"
    :variant="VARIANTS.info"
  >
    <!-- @slot Use this slot to customize alert's content -->
    <slot />
  </geo-alert>
</template>

<script>
import { VARIANTS } from './GeoAlert.constants'

/**
 * [GeoAlert](./GeoAlert) using predefined `info` variant.
 *
 * `info` variant is normally used to show details that might be useful but
 * knowing them is not required to properly perform the task they are about.
 *
 * See [GeoAlert](./GeoAlert) for a complete list of supported properties and
 * features.
 */
export default {
  name: 'GeoInfoAlert',
  status: 'ready',
  release: '22.0.0',
  data() {
    return {
      VARIANTS
    }
  }
}
</script>
