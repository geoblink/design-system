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
        <div
          v-if="hasLeadingAccessoryItems"
          class="geo-input__accessory-items geo-input__accessory-items--leading"
        >
          <div
            class="geo-input__accessory-items-item"
            @click.prevent
          >
            <!-- @slot Use this slot to add leading items inside the input -->
            <slot name="leadingAccessoryItem" />
          </div>
        </div>

        <input
          ref="input"
          :value="value"
          :disabled="disabled"
          class="geo-input__input"
          v-bind="$attrs"
          v-on="listeners"
          @input="onInput($event)"
        >

        <div
          v-if="hasTrailingElements"
          class="geo-input__accessory-items geo-input__accessory-items--trailing"
        >
          <!-- mousedown event is used because it is fired before blur event on GeoInput -->
          <!-- blur event won't be fired but that's fine because we want this handler to prevail over the blur one -->
          <!-- https://forum.vuejs.org/t/blur-before-click-only-on-safari/21598/7 -->
          <font-awesome-icon
            v-if="isDeleteIconVisible"
            :icon="deleteInputValueIcon"
            class="geo-input__icon--delete geo-input__accessory-items-item"
            fixed-with
            @mousedown.prevent="deleteValue"
          />

          <font-awesome-icon
            v-if="disabled"
            :icon="disabledIcon"
            fixed-with
            class="geo-input__accessory-items-item"
          />

          <div
            v-if="hasTrailingAccessoryItems"
            class="geo-input__accessory-items-item"
            @click.prevent
          >
            <!-- @slot Use this slot to add trailing items inside the input -->
            <slot name="trailingAccessoryItem" />
          </div>
        </div>
        <div class="geo-input__input-outline" />
      </div>
    </div>

    <!-- @slot Use this slot to customize what's displayed as input message -->
    <slot name="message" />
  </label>
</template>

<script>
import _ from 'lodash'

/**
 * `GeoInput` component works like a native input but can be customisable with a
 * label and a message as well as different color schemes to give feedback to
 * the user.
 */
export default {
  name: 'GeoInput',
  status: 'ready',
  release: '24.1.0',
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
      default: function () {
        return ['fal', 'lock-alt']
      }
    },

    /**
     * Font Awesome 5 icon to be displayed.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    deleteInputValueIcon: {
      type: Array,
      default: function () {
        return ['fas', 'times-circle']
      }
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
    },

    isDeleteIconVisible () {
      return !this.disabled && !!this.value && !!this.$listeners['delete-value']
    },

    hasTrailingAccessoryItems () {
      return !_.isEmpty(this.$slots.trailingAccessoryItem)
    },

    hasLeadingAccessoryItems () {
      return !_.isEmpty(this.$slots.leadingAccessoryItem)
    },

    hasTrailingElements () {
      return this.isDeleteIconVisible || this.disabled || this.hasTrailingAccessoryItems
    }
  },
  mounted () {
    // We use input.focus() because native autofocus is buggy with dynamic elements
    // https://github.com/vuejs/vue/issues/8112
    const autofocus = _.get(this.$attrs, 'autofocus')
    // We need explicit check to '' to allow being used like <geo-input autofocus>
    if (autofocus === '' || autofocus) {
      this.$refs.input.focus()
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
