<template>
  <div
    :class="{
      'geo-select-toggle-button': true,
      'geo-select-toggle-button--empty': isEmpty,
      'geo-select-toggle-button--disabled': disabled,
      [`geo-select-toggle-button--${variant}`]: variant
    }"
    @click="handleClick($event)"
  >
    <!--
      @slot Use this slot to customize what is displayed in the button.
      **Note:** This will be styled differently when `isEmpty` prop is `true`.
    -->
    <slot />
    <font-awesome-icon
      v-if="shouldShowDeleteButton"
      :icon="deleteIcon"
      class="geo-select-toggle-button__delete-icon"
      @click.stop="deleteValue($event)"
    />
    <font-awesome-icon
      :icon="dropdownIconForCurrentStatus"
      class="geo-select-toggle-button__toggle-icon"
    />
  </div>
</template>

<script>
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

export const VARIANTS = {
  inputAccessorySuffix: 'inputAccessorySuffix',
  inputAccessoryPrefix: 'inputAccessoryPrefix'
}

/**
 * `GeoSelectToggleButton` is a component designed to look like a modern HTML
 * `<select>` input, displaying a placeholder when no value is chosen and
 * featuring a trailing chevron.
 */
export default {
  name: 'GeoSelectToggleButton',
  status: 'ready',
  release: '4.1.0',
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Font Awesome 5 icon to be displayed as dropdown toggle button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    deleteIcon: {
      type: Array,
      default: function () {
        return ['fas', 'times-circle']
      }
    },

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
     * Whether is possible to delete the selected value.
     *
     * If true, the event delete-value can be used to trigger an action
     * when the delete icon is clicked.
     */
    isValueDeletable: {
      type: Boolean,
      default: false
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
    },

    /**
     * Predefined style scheme of the toggle button, allowing the possibility to use
     * it as regular or as a suffix of an input.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](/docs/guides/using-constants) for more info on how
     * to use those constants in your code.
     */
    variant: enumPropertyFactory({
      componentName: 'GeoSelectToggleButton',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      required: false,
      checkUndefined: true
    })
  },
  computed: {
    dropdownIconForCurrentStatus () {
      return this.disabled
        ? this.dropdownDisabledIcon
        : this.dropdownIcon
    },

    shouldShowDeleteButton () {
      return this.isValueDeletable && !this.isEmpty && !this.disabled
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
    },

    deleteValue () {
      /**
       * User typed on the input box.
       *
       * @event delete-value
       */
      this.$emit('delete-value')
    }
  }
}
</script>
