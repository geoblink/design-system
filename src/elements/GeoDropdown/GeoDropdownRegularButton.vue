<template>
  <div
    :class="{
      [`geo-dropdown__regular-button-container${cssSuffix}`]: true,
      [`geo-dropdown__regular-button-container--active${cssSuffix}`]: active,
      [`geo-dropdown__regular-button-container--disabled${cssSuffix}`]: disabled
    }"
    @click="emitClick($event)"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      :class="`geo-dropdown__regular-button-container__icon${cssSuffix}`"
      aria-hidden
      fixed-width
    />
    <div
      v-if="hasContent"
      :class="`geo-dropdown__regular-button-container__string${cssSuffix}`"
    >
      <!-- @slot Use this slot to customize button's content -->
      <slot />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoDropdownRegularButton',
  status: 'ready',
  release: '4.0.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Optional Font Awesome 5 icon to be displayed next to the button's label,
     * on the left.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      required: false
    },

    /**
     * Whether this button is disabled or not. Disabled buttons use a different
     * color scheme and do not emit `click` events.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Whether this button is active or not. Active buttons are higlighted using
     * a different color scheme.
     */
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasContent () {
      return this.$slots && this.$slots.default && this.$slots.default.length
    }
  },
  methods: {
    emitClick ($event) {
      if (this.disabled) return

      /**
       * User clicked this button.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
