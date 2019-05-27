<template>
  <div
    :class="{
      [`geo-select-toggle-button${cssSuffix}`]: true,
      [`geo-select-toggle-button--empty${cssSuffix}`]: isEmpty,
      [`geo-select-toggle-button--disabled${cssSuffix}`]: disabled
    }"
    @click="handleClick($event)"
  >
    <!--
      @slot Use this slot to customize what is displayed in the button.
      **Note:** This will be styled differently when `isEmpty` prop is `true`.
    -->
    <slot />
    <font-awesome-icon
      :icon="dropdownIconForCurrentStatus"
      :class="{
        [`geo-select-toggle-button__toggle-icon${cssSuffix}`]: true
      }"
    />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectToggleButton',
  status: 'ready',
  release: '4.1.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Font Awesome 5 icon to be displayed as dropdown toggle button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    dropdownIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
      }
    },

    /**
     * Font Awesome 5 icon to be displayed as dropdown toggle button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    dropdownDisabledIcon: {
      type: Array,
      default () {
        return ['fal', 'lock']
      }
    },

    /**
     * Whether there's a selected option or just the `GeoSelect` default
     * placeholder.
     *
     * **Note:** It is used to toggle `geo-select__placeholder-box--empty` class.
     */
    isEmpty: {
      type: Boolean,
      required: true
    },

    /**
     * Whether interaction with this button is disabled or not.
     *
     * **Note:** It is used to toggle `geo-select__placeholder-box--disabled`
     * class.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dropdownIconForCurrentStatus () {
      return this.disabled
        ? this.dropdownDisabledIcon
        : this.dropdownIcon
    }
  },
  methods: {
    handleClick ($event) {
      if (this.disabled) return

      /**
       * Click on select event.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
