<template>
  <geo-button
    v-bind="propsForButton"
    :type="type"
    :class="`geo-external-link-button${cssSuffix}`"
    @click="handleClick($event)"
  >
    <a
      v-if="href"
      ref="link"
      :href="href"
      :target="target"
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

    target: {
      type: String,
      default: '_blank'
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
      return _.omit(this.$props, ['icon', 'href', 'target'])
    }
  },
  methods: {
    handleClick ($event) {
      this.$emit('click', $event)

      if (this.$refs.link) {
        this.$refs.link.click()
      }
    }
  }
}
</script>
