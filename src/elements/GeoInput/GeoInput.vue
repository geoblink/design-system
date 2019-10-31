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
      <div
        v-if="hasPrefix"
        class="geo-input__prefix"
        @click.prevent
      >
        <!-- @slot Use this slot to customize what's displayed as a prefix -->
        <slot name="prefix" />
      </div>
      <div class="geo-input__input-field">
        <font-awesome-icon
          v-if="leadingAccessoryIcon"
          :icon="leadingAccessoryIcon"
          fixed-with
          class="geo-input__icon geo-input__icon--leading"
        />
        <input
          ref="input"
          :value="value"
          :disabled="disabled"
          :class="{
            'geo-input__input': true,
            'geo-input__input--leading-space': !!leadingAccessoryIcon,
            'geo-input__input--delete-icon-space': isDeleteIconVisible,
            'geo-input__input--prefix': hasPrefix,
            'geo-input__input--suffix': hasSuffix
          }"
          v-bind="$attrs"
          v-on="listeners"
          @input="onInput($event)"
        >
        <!-- mousedown event is used because it is fired before blur event on GeoInput -->
        <!-- blur event won't be fired but that's fine because we want this handler to prevail over the blur one -->
        <!-- https://forum.vuejs.org/t/blur-before-click-only-on-safari/21598/7 -->
        <font-awesome-icon
          v-if="isDeleteIconVisible"
          :icon="deleteInputValueIcon"
          fixed-with
          class="geo-input__icon geo-input__icon--trailing geo-input__icon--delete"
          :class="{
            'geo-input__icon--delete-with-type-number': isTypeNumber
          }"
          @mousedown.prevent="deleteValue"
        />
        <font-awesome-icon
          v-if="disabled"
          :icon="disabledIcon"
          fixed-with
          class="geo-input__icon geo-input__icon--trailing"
        />
      </div>
      <div
        v-if="hasSuffix"
        class="geo-input__suffix"
        @click.prevent
      >
        <!-- @slot Use this slot to customize what's displayed as a suffix -->
        <slot name="suffix" />
      </div>
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
    leadingAccessoryIcon: {
      type: Array,
      required: false
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

    hasPrefix () {
      return !_.isEmpty(this.$slots.prefix)
    },

    hasSuffix () {
      return !_.isEmpty(this.$slots.suffix)
    },

    isDeleteIconVisible () {
      return !this.disabled && !!this.value && !!this.$listeners['delete-value']
    },

    isTypeNumber () {
      return this.$attrs.type === 'number'
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
