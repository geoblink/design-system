<template>
  <geo-button
    v-bind="propsForButton"
    :type="type"
    @click="$emit('click', $event)"
  >
    <a
      v-if="href"
      :href="href"
      target="_blank"
    >
      <slot />
    </a>
    <slot v-else />

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
    href: {
      type: String,
      required: false
    },

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
      return _.omit(this.$props, ['icon', 'href'])
    }
  }
}
</script>
