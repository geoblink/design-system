<template>
  <label
    :class="{
      [`geo-input${cssSuffix}`]: true,
      [`geo-input--${statusClass}${cssSuffix}`]: statusClass,
      [`geo-input--disabled${cssSuffix}`]: disabled
    }"
  >
    <!-- @slot Use this slot to customize what's displayed as input label -->
    <slot name="label" />

    <div class="geo-input__input-wrapper">
      <font-awesome-icon
        v-if="leadingAccessoryIcon"
        :icon="leadingAccessoryIcon"
        fixed-with
        class="geo-input__icon geo-input__icon--leading"
      />
      <input
        :value="value"
        :disabled="disabled"
        class="geo-input__input"
        v-bind="$attrs"
        v-on="listeners"
        @input="onInput($event)"
      >
      <font-awesome-icon
        v-if="disabled"
        :icon="disabledIcon"
        fixed-with
        class="geo-input__icon geo-input__icon--trailing"
      />
    </div>

    <!-- @slot Use this slot to customize what's displayed as input message -->
    <slot name="message" />
  </label>
</template>

<script>
import _ from 'lodash'
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoInput',
  status: 'ready',
  release: '24.1.0',
  mixins: [cssSuffix],
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
    },

    /**
     * Whether this input is in error state or not. Error inputs use a different
     * color scheme.
     */
    error: {
      type: Boolean,
      default: false
    },

    /**
     * Whether this input is in success state or not. Success inputs use a different
     * color scheme.
     */
    success: {
      type: Boolean,
      default: false
    },

    /**
     * Font Awesome 5 icon to be displayed.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    disabledIcon: {
      type: Array,
      default () {
        return ['fal', 'lock-alt']
      }
    },

    /**
     * Font Awesome 5 icon to be displayed.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    leadingAccessoryIcon: {
      type: Array,
      required: false
    }
  },
  computed: {
    listeners () {
      // input is omitted because we create our own to work with v-model
      return _.omit(this.$listeners, 'input')
    },

    statusClass () {
      if (this.error && this.success) console.warn('GeoInput [component] :: error and success state are true at the same time, GeoInput will be shown as error.')
      if (this.error) return 'error'
      if (this.success) return 'success'
      return null
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
    }
  }
}
</script>
