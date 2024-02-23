<template>
  <label
    :class="{
      ['geo-input']: true,
      [`geo-input--${statusClass}`]: statusClass,
      ['geo-input--disabled']: disabled
    }"
>
    <!-- @slot Use this slot to customize what's displayed as input label -->
    <slot name="label" />

    <div class="geo-input__input-wrapper">
      <div class="geo-input__input-field">
        <input
          ref="input"
          type="number"
          :value="value"
          :disabled="disabled"
          class="geo-input__input"
          v-bind="$attrs"
          v-on="listeners"
          @input="onInput($event)"
        >
        <div class="geo-input__input-outline" />
      </div>
    </div>

    <!-- @slot Use this slot to customize what's displayed as input message -->
    <slot name="message" />
  </label>
</template>

<script>
import GeoGenericInputMixin from '../../mixins/GeoGenericInput.mixin'

/**
 * `GeoInput` component works like a native input but can be customisable with a
 * label and a message as well as different color schemes to give feedback to
 * the user.
 */
export default {
  name: 'GeoNumberInput',
  status: 'ready',
  release: '24.1.0',
  mixins: [GeoGenericInputMixin],
  props: {
    /**
     * @model
     * Current value shown in the input.
     */
    value: {
      type: [Number, String]
    },

    /**
     * Whether this input is disabled or not. Disabled inputs don't trigger
     * events and show the disabled icon.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput ($event) {
      /**
       * User typed on the input box.
       *
       * @event input
       * @type {KeyboardEvent}
       */
      this.$emit('input', $event.target.value)
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
