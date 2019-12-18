<template functional>
  <geo-alert
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass
    ]"
    :icon="['fal', 'thumbs-up']"
    :variant="$options.helpers.VARIANTS.success"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize alert's content -->
    <slot />
  </geo-alert>
</template>

<script>
import { VARIANTS } from './GeoAlert.constants'

/**
 * [GeoAlert](./GeoAlert) using predefined `success` variant.
 * `success` variant is normally used to tell the user an explicitly started
 * action has finished successfully.
 *
 * See [GeoAlert](./GeoAlert) for a complete list of supported properties and
 * features.
 */
export default {
  name: 'GeoSuccessAlert',
  status: 'ready',
  release: '22.0.0',
  helpers: {
    VARIANTS
  }
}
</script>
