<template>
  <geo-alert
    v-bind="$props"
    :variant="variant"
    @close="$emit('close', $event)"
  >
    <font-awesome-icon
      slot="leadingAccessoryItem"
      :icon="icon"
      aria-hidden
      fixed-width
      spin
    />
    <slot
      slot="content"
      name="content"
    />
    <slot
      slot="actions"
      name="actions"
    />
  </geo-alert>
</template>

<script>
import mixin, { VARIANTS } from './GeoAlert.mixin'

export default {
  name: 'GeoProgressAlert',
  status: 'ready',
  release: '4.2.0',
  mixins: [mixin],
  props: {
    /**
     * Icon to be displayed before alert content.
     */
    icon: {
      type: Array,
      default () {
        return ['fal', 'spinner-third']
      }
    }
  },
  computed: {
    variant () {
      return VARIANTS.progress
    }
  }
}
</script>
