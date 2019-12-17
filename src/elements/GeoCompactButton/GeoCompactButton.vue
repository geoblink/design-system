<template>
  <button
    :class="{
      ['geo-compact-button']: true,
      [`geo-compact-button--${type}`]: true,
      [`geo-compact-button--${type}--disabled`]: disabled,
      [`geo-compact-button--${type}--loading`]: loading,
      ['geo-compact-button--disabled']: disabled,
      ['geo-compact-button--loading']: loading
    }"
    @click="onGeoCompactButtonClick($event)"
  >
    <div
      :class="{
        [`geo-button__icon`]: true,
        [`geo-button__icon--loading`]: loading
      }"
    />
    <!-- @slot Use this slot to customize what's displayed when the button is in loading state -->
    <slot
      v-if="loading"
      name="loading"
    >
      <div class="geo-compact-button__activity-indicator">
        <geo-activity-indicator :variant="activityIndicatorVariant" />
      </div>
    </slot>
    <font-awesome-icon
      v-else
      :icon="icon"
      fixed-width
    />
  </button>
</template>

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

/**
 * `GeoCompactButton` is a button designed to be displayed in specially small
 * environments, like actions attached to an input field.
 */
export default {
  name: 'GeoCompactButton',
  status: 'ready',
  release: '24.13.0',
  constants: {
    TYPES
  },
  mixins: [mixin],
  props: {
    /**
     * Predefined color scheme of the button, allowing several common
     * out-of-the-box customizations.
     *
     * > **Note:** There are specific components to avoid explicitly writing this value.
     *
     * | type             | Specific component | Proposed usage (example) |
     * |------------------|--------------------|--------------------------|
     * | `primary`        | [GeoPrimaryCompactButton](./GeoPrimaryCompactButton)               | Main action (saving changes) |
     * | `secondary`      | [GeoSecondaryCompactButton](./GeoSecondaryCompactButton)           | Auxiliar action (cancelling changes) |
     * | `danger`         | [GeoDangerCompactButton](./GeoDangerCompactButton)                 | Dangerous actions (deleting data) |
     * | `inputAccessory` | [GeoInputAccessoryCompactButton](./GeoInputAccessoryCompactButton) | Input accessory actions (input shortcuts) |
     *
     * Supported `type` values are exported under `TYPES` named export. See
     * [Component Constants](/docs/guides/using-constants) for more info on how to
     * use those constants in your code.
     */
    type: {
      type: String,
      validator: function (value) {
        if (value in TYPES) return true

        const supportedValues = Object.values(TYPES).map(i => `«${i}»`).join(', ')
        console.warn(`GeoCompactButton [component] :: Unsupported value («${value}») for «type» property. Use one of ${supportedValues}`)
        return false
      },
      required: true
    },

    icon: {
      type: Array,
      default: function () {
        return ['fal', 'times']
      }
    }
  }
}
</script>
