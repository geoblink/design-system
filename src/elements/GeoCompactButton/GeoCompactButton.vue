<template>
  <button
    :class="{
      [`geo-compact-button${cssSuffix}`]: true,
      [`geo-compact-button--${type}${cssSuffix}`]: true,
      [`geo-compact-button--${type}--disabled${cssSuffix}`]: disabled,
      [`geo-compact-button--${type}--loading${cssSuffix}`]: loading,
      [`geo-compact-button--disabled${cssSuffix}`]: disabled,
      [`geo-compact-button--loading${cssSuffix}`]: loading
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
      <div :class="`geo-compact-button__activity-indicator${cssSuffix}`">
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
     * | type      | Specific component | Proposed usage (example) |
     * |-----------|--------------------|--------------------------|
     * | primary   | [GeoPrimaryCompactButton](./#/Elements/GeoCompactButton?id=geoprimarycompactbutton)     | Main action (saving changes) |
     * | secondary | [GeoSecondaryCompactButton](./#/Elements/GeoCompactButton?id=geosecondarycompactbutton) | Auxiliar action (cancelling changes) |
     * | danger    | [GeoDangerCompactButton](./#/Elements/GeoCompactButton?id=geodangercompactbutton)       | Dangerous actions (deleting data) |

     * Supported `type` values are exported under `TYPES` named export. See
     * [Component Constants](/docs/components-constants.html) for more info on how to
     * use those constants in your code.
     *
     * > **Note:** You can always override the color scheme of any `GeoCompactButton`
     * > using `cssModifier` prop.
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
