<template>
  <label
    :class="{
      'geo-switch': true,
      'geo-switch--disabled': disabled,
      'geo-switch--checked': value
    }"
  >
    <div class="geo-switch__background">
      <div class="geo-switch__handle" />
    </div>

    <!-- @slot Use this slot to customize title displayed next to input -->
    <slot />

    <input
      :checked="value"
      :disabled="disabled"
      type="checkbox"
      class="geo-switch__input"
      @change="handleCheckboxChange($event)"
    >
  </label>
</template>

<script>
/**
 * `GeoSwitch` is a component aimed to replace inputs of type `checkbox`.
 * It offers a similar API with a modern design.
 */
export default {
  name: 'GeoSwitch',
  status: 'ready',
  release: '16.2.0',
  props: {
    /**
     * Value bound to this input. Can be used together with v-model.
     */
    value: {
      type: Boolean,
      required: true
    },
    /**
     * Whether this input should be rendered as disabled or not. When input is
     * disabled user interaction won't have any effect.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCheckboxChange ($event) {
      if (this.disabled) return

      /**
       * User clicked on switch and its value changed.
       *
       * @event input
       * @type {Boolean}
       */
      this.$emit('input', $event.target.checked)
    }
  }
}
</script>
