<template>
  <div
    :class="{
      [`geo-button${cssSuffix}`]: true,
      [`geo-button--${type}${cssSuffix}`]: true,
      [`geo-button--${type}--disabled${cssSuffix}`]: disabled,
      [`geo-button--disabled${cssSuffix}`]: disabled,
      [`geo-button--loading${cssSuffix}`]: loading
    }"
    @click="onGeoButtonClick($event)"
  >
    <div
      :class="{
        [`geo-button__label${cssSuffix}`]: true,
        [`geo-button__label--loading${cssSuffix}`]: loading
      }"
    >
      <!-- @slot Use this slot for button's label -->
      <slot />
    </div>
    <template v-if="loading">
      <!-- @slot Use this slot to customize what's displayed when the button is in loading state -->
      <slot name="loading">
        <div :class="`geo-button__activity-indicator${cssSuffix}`">
          <geo-activity-indicator :css-modifier="activityIndicatorVariant" />
        </div>
      </slot>
    </template>
  </div>
</template>

<script>
import { VARIANTS as GeoAlertVariants } from './GeoActivityIndicator'

const TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  destructive: 'destructive'
}

export { TYPES }

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
     * Those values are exported under `TYPES` name.
     */
    type: {
      type: String,
      validator: function (value) {
        return value in TYPES
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
     * Whether the button is in loading state or not.
     *
     * When button is in loading state it will show the `loading` slot (by
     * default an indeterminate activity indicator) instead of the label slot.
     */
    loading: {
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
    },

    activityIndicatorVariant () {
      switch (this.type) {
        case TYPES.primary:
          return GeoAlertVariants.primary
        case TYPES.secondary:
          return undefined
        case TYPES.tertiary:
          return undefined
        case TYPES.destructive:
          return GeoAlertVariants.error
      }
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
