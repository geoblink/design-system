<template>
  <geo-button
    v-bind="propsForButton"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />

    <font-awesome-icon
      :icon="icon"
      fixed-width
      aria-hidden
    />

    <slot
      slot="loading"
      name="loading"
    />
  </geo-button>
</template>

<script>
import _ from 'lodash'
import mixin, { TYPES } from './GeoButton.mixin'

export default {
  name: 'GeoExternalLinkButton',
  status: 'ready',
  release: '24.5.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      default () {
        return ['fal', 'external-link-square']
      }
    }
  },
  computed: {
    type () {
      return TYPES.link
    },

    propsForButton () {
      return _.omit(this.$props, 'icon')
    }
  }
}
</script>
