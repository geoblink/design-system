<template>
  <div
    :class="{
      [`geo-button${cssSuffix}`]: true,
      [`geo-button--${type}${cssSuffix}`]: true,
      [`geo-button--${type}--disabled${cssSuffix}`]: disabled,
      [`geo-button--disabled${cssSuffix}`]: disabled
    }"
    @click="onGeoButtonClick($event)"
  >
    <!-- @slot Use this slot for button's label -->
    <slot />
  </div>
</template>

<script>
var AVAILABLE_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  destructive: 'destructive'
}

export { AVAILABLE_TYPES }

export default {
  name: 'GeoButton',
  status: 'ready',
  release: '1.0.0',
  props: {
    /**
     * Variation of button, supporting:
     *
     * - `primary`
     * - `secondary`
     * - `tertiary`
     * - `destructive`
     *
     * Those values are exported under `AVAILABLE_TYPES` name.
     */
    type: {
      type: String,
      validator: function (value) {
        return value in AVAILABLE_TYPES
      },
      required: true
    },
    /**
     * Whether the button is disabled (and can't be interacted with) or not.
     *
     * When disabled the button won't allow any mouse event.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-button-make('modifier-name');` to your SCSS
     * styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    }
  },
  methods: {
    onGeoButtonClick: function ($event) {
      if (this.disabled) {
        $event.stopPropagation()
      } else {
        this.$emit('click', $event)
      }
    }
  }
}
</script>
