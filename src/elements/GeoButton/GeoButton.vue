<template>
  <div
    :class="{
      ['geo-button']: true,
      [`geo-button--${type}`]: true,
      [`geo-button--${type}--disabled`]: disabled,
      [`geo-button--${type}--loading`]: loading,
      ['geo-button--disabled']: disabled,
      ['geo-button--loading']: loading
    }"
    @click="onGeoButtonClick($event)"
  >
    <div
      :class="{
        ['geo-button__label']: true,
        ['geo-button__label--loading']: loading
      }"
    >
      <!-- @slot Use this slot to customize what's displayed in button's label -->
      <slot />
    </div>
    <template v-if="loading">
      <!-- @slot Use this slot to customize what's displayed when the button is in loading state -->
      <slot name="loading">
        <div class="geo-button__activity-indicator">
          <geo-activity-indicator :variant="activityIndicatorVariant" />
        </div>
      </slot>
    </template>
  </div>
</template>

<script>
import mixin, { TYPES } from './GeoButton.mixin'

/**
 * Use `GeoButton` to add button-like elements to your app with a single tag,
 * being able to customize its color scheme to show the user the intention of
 * the element.
 */
export default {
  name: 'GeoButton',
  status: 'ready',
  release: '1.1.0',
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
     * | primary   | [GeoPrimaryButton](./#/Elements/GeoButton?id=geoprimarybutton)      | Main action (saving changes) |
     * | secondary | [GeoSecondaryButton](./#/Elements/GeoButton?id=geosecondarybutton)  | Auxiliar action (showing an options menu) |
     * | link      | [GeoLinkButton](./#/Elements/GeoButton?id=geolinkbutton)            | Alternative action to the main one (dismissing a form without saving changes) |
     * | dangerLink| [GeoDangerLinkButton](./#/Elements/GeoButton?id=geodangerlinkbutton)| Potentially wrong actions (choosing potentially wrong option) |
     * | danger    | [GeoDangerButton](./#/Elements/GeoButton?id=geodangerbutton)        | Dangerous actions (deleting data) |
     * | tooltip   | [GeoTooltipButton](./#/Elements/GeoButton?id=geotooltipbutton)      | Tooltips action button (Generally accepting some warning or closing it) |
     *
     * Supported `type` values are exported under `TYPES` named export. See
     * [Component Constants](/docs/components-constants.html) for more info on how to
     * use those constants in your code.
     */
    type: {
      type: String,
      validator: function (value) {
        if (value in TYPES) return true

        const supportedValues = Object.values(TYPES).map(i => `«${i}»`).join(', ')
        console.warn(`GeoButton [component] :: Unsupported value («${value}») for «type» property. Use one of ${supportedValues}`)
        return false
      },
      required: true
    }
  }
}
</script>
