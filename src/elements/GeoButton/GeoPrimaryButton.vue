<template>
  <geo-button
    v-bind="$props"
    :type="type"
    @click="$emit('click', $event)"
  >
    <!-- @slot Use this slot to customize what's displayed in button's label -->
    <slot />
    <!-- @slot Use this slot to customize what's displayed when the button is in loading state -->
    <slot
      slot="loading"
      name="loading"
    />
  </geo-button>
</template>

<script>
import { TYPES } from './GeoButton.vue'

export default {
  name: 'GeoPrimaryButton',
  status: 'ready',
  release: '4.2.0',
  computed: {
    type () {
      return TYPES.primary
    }
  }
}
</script>
