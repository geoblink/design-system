<template>
  <geo-button
    v-bind="propsForButton"
    :type="type"
    class="geo-external-link-button"
    @click="handleClick($event)"
  >
    <a
      v-if="href"
      ref="link"
      class="geo-external-link-button__link"
      :href="href"
      :target="target"
    >
      <slot />
    </a>
    <slot v-else />

    <font-awesome-icon
      :icon="icon"
      class="geo-external-link-button__icon"
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

/**
 * [GeoButton](./GeoButton) using predefined `link` variant and featuring an
 * `external` icon.
 *
 * ExternalLink buttons are normally used to open new windows that are not part
 * of the currently used application.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
 */
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
      default: function () {
        return ['fal', 'external-link-square']
      }
    }
  },
  computed: {
    type () {
      return TYPES.tertiary
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
