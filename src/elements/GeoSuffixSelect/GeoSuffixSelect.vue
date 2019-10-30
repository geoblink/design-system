<template>
  <div
    :class="{
      [`geo-suffix-select${cssSuffix}`]: true,
      [`geo-suffix-select--disabled${cssSuffix}`]: disabled
    }"
    @click="handleClick($event)"
  >
    <div class="geo-suffix-select__wrapper">
      <!--@slot Use this slot to customize what is displayed in the button.-->
      <slot />
      <font-awesome-icon
        :icon="dropdownIconForCurrentStatus"
        :class="{
          [`geo-suffix-select__toggle-icon${cssSuffix}`]: true
        }"
      />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSuffixSelect',
  status: 'ready',
  release: 'CHANGE ME',
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
      default: function () {
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
      default: function () {
        return ['fal', 'lock']
      }
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
