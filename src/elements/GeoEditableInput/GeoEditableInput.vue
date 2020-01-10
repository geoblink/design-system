<template>
  <div
    :class="{
      ['geo-editable-input__container']: true,
      [`geo-editable-input__container-${inputType}`]: true,
      ['geo-editable-input__container--disabled']: disabled,
      [`geo-editable-input__container-${inputType}--edit`]: showButtons || isFocused
    }"
  >
    <geo-dropdown
      ref="dropdown"
      :opened="showButtons"
      :popup-class="['geo-editable-input__popup', `geo-editable-input__popup--${inputType}`, popupClass]"
      preferred-x-axis-position="right"
      @click-outside="handleClickOutside($event)"
    >
      <form
        slot="toggleButton"
        class="geo-editable-input__form"
        @submit.prevent="emitSave($event)"
      >
        <slot name="leadingAccessoryItem" />
        <input
          :value="value"
          :placeholder="placeholder"
          :disabled="disabled"
          :type="type"
          class="geo-editable-input__form__input"
          v-bind="$attrs"
          @click="emitClick($event)"
          @input="onInput($event)"
        >
        <slot name="trailingAccessoryItem" />
      </form>

      <div
        v-if="showButtons"
        slot="popupContent"
        class="geo-editable-input__container__buttons"
      >
        <geo-secondary-compact-button
          :icon="cancelIcon"
          @click="emitCancel($event)"
        />

        <geo-primary-compact-button
          :icon="saveIcon"
          :loading="loading"
          @click="emitSave($event)"
        />
      </div>
    </geo-dropdown>
  </div>
</template>

<script>
import { enumDefaultPropertyFactory } from '../../utils/enumPropertyFactory'
import { VARIANTS, TYPES } from './GeoEditableInput.constants'

/**
 * Use `GeoEditableInput` component when you need confirmation feedback from
 * the user on individual input and not in a global form.
 */
export default {
  name: 'GeoEditableInput',
  status: 'ready',
  release: '24.0.0',
  constants: { VARIANTS, TYPES },
  props: {
    /**
     * Input value.
     */
    value: {
      type: [String, Number],
      required: false
    },
    /**
     * Input type (`text` or `number`).
     */
    type: enumDefaultPropertyFactory({
      componentName: 'GeoEditableInput',
      propertyName: 'type',
      enumDictionary: TYPES,
      defaultValue: TYPES.text
    }),
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
     * Whether the input is focused or not.
     */
    isFocused: {
      type: Boolean,
      required: false
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
     * Values available in `VARIANTS`
     * - `VARIANTS.table`
     * - `VARIANTS.normal`
     */
    inputType: enumDefaultPropertyFactory({
      componentName: 'GeoEditableInput',
      propertyName: 'inputType',
      enumDictionary: VARIANTS,
      defaultValue: VARIANTS.table
    }),

    /**
     * Class or classes that will be added to the popup element
     */
    popupClass: {
      type: [String, Array, Object],
      required: false
    }
  },
  methods: {
    handleClickOutside ($event) {
      /**
       * Click outside GeoEditableInput event
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
       * User clicked the save button. The event will be emitted even if the input is with `loading=true`.
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
