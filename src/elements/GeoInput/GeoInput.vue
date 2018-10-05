<template>
  <div
    :class="{
      [`geo-input__container${cssSuffix}`]: true,
      [`geo-input__container-${inputType}${cssSuffix}`]: true,
      [`geo-input__container--disabled${cssSuffix}`]: disabled,
      [`geo-input__container-${inputType}--edit${cssSuffix}`]: showButtons
    }"
  >
    <geo-dropdown
      :opened="showButtons"
      :css-modifier="`geo-input${cssSuffix}`"
      preferred-x-axis-position="right"
      @click-outside="handleClickOutside($event)"
    >
      <input
        slot="toggleButton"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{
          [`geo-input__container-input${cssSuffix}`]: true,
        }"
        type="text"
        @click="emitClick($event)"
        @input="onInput($event)"
      >

      <div
        slot="popupContent"
        :class="`geo-input__container-buttons${cssSuffix}`"
      >
        <button
          :class="`geo-input__container-buttons__button${cssSuffix} geo-input__container-buttons__button--cancel${cssSuffix}`"
          @click="emitCancel($event)"
        >
          <font-awesome-icon :icon="cancelIcon"/>
        </button>
        <button
          :class="`geo-input__container-buttons__button${cssSuffix} geo-input__container-buttons__button--save${cssSuffix}`"
          @click="emitSave($event)"
        >
          <geo-activity-indicator
            v-if="loading"
            :css-modifier="`geo-input${cssSuffix}`"
            variant="dark-transparent"
          />
          <font-awesome-icon
            v-else
            :icon="saveIcon"
          />
        </button>
      </div>
    </geo-dropdown>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import { POSSIBLE_TYPES } from './GeoInput.constants'

export default {
  name: 'GeoInput',
  status: 'ready',
  release: '6.1.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Input value
     */
    value: {
      type: String,
      required: false
    },
    /**
     * Whether the action buttons are shown (`true`) or not.
     */
    showButtons: {
      type: Boolean,
      required: true
    },
    /**
     * Text to be displayed as placeholder.
     */
    placeholder: {
      type: String,
      required: false
    },
    /**
     * Whether the input is disabled (and can't be interacted with - `true`) or not.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the save button is performing any action and is busy (`true`) or not.
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Font Awesome icon to be displayed in the save button.
     */
    saveIcon: {
      type: Array,
      default: function () {
        return ['fal', 'check']
      }
    },
    /**
     * Font Awesome icon to be displayed in the cancel button.
     */
    cancelIcon: {
      type: Array,
      default: function () {
        return ['fal', 'times']
      }
    },
    /**
     * Defines the style of the input depending on where is goint to be use. `table` or `normal`
     */
    inputType: {
      type: String,
      default: 'table',
      validator: function (value) {
        // The value must match one of these strings
        return value in POSSIBLE_TYPES
      }
    }
  },
  methods: {
    handleClickOutside ($event) {
      /**
       * Click outside GeoInput event
       *
       * @event click-outside
       * @type {MouseEvent}
       */
      this.$emit('click-outside', $event)
    },

    emitClick ($event) {
      /**
       * User clicked the input event.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    },

    emitSave ($event) {
      /**
       * User clicked the save button.
       *
       * @event save
       * @type {MouseEvent}
       */
      this.$emit('save', $event)
    },

    emitCancel ($event) {
      /**
       * User clicked the cancel button.
       *
       * @event cancel
       * @type {MouseEvent}
       */
      this.$emit('cancel', $event)
    },

    onInput ($event) {
      /**
       * User typed on the input box.
       *
       * @event input
       * @type {MouseEvent}
       */
      this.$emit('input', $event.target.value)
    }
  }
}
</script>
