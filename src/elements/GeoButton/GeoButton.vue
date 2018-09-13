<template>
  <div
    :class="{
      [`geo-button${cssSuffix}`]: true,
      [`geo-button--${type}${cssSuffix}`]: true,
      [`geo-button--${type}--disabled${cssSuffix}`]: disabled,
      [`geo-button--${type}--loading${cssSuffix}`]: loading,
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
      <!-- @slot Use this slot to customize what's displayed in button's label -->
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
import { VARIANTS as GeoAlertVariants } from '../GeoActivityIndicator/GeoActivityIndicator'
import cssSuffix from '../../mixins/cssModifierMixin'

const TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  link: 'link',
  danger: 'danger'
}

export { TYPES }

export default {
  name: 'GeoButton',
  status: 'ready',
  release: '1.1.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Predefined color scheme of the button, allowing several common
     * out-of-the-box customizations.
     *
     * > **Note:** There are specific components to avoid explicitly writing this value.
     *
     * | type      | Specific component | Proposed usage (example) |
     * |-----------|--------------------|--------------------------|
     * | primary   | [GeoPrimaryButton](./#/Elements/GeoButton?id=geoprimarybutton)     | Main action (saving changes) |
     * | secondary | [GeoSecondaryButton](./#/Elements/GeoButton?id=geosecondarybutton) | Auxiliar action (showing an options menu) |
     * | link      | [GeoLinkButton](./#/Elements/GeoButton?id=geolinkbutton)           | Alternative action to the main one (dismissing a form without saving changes) |
     * | danger    | [GeoDangerButton](./#/Elements/GeoButton?id=geodabgerbutton)       | Dangerous actions (deleting data) |
     *
     * Supported `type` values are exported under `TYPES` name.
     *
     * > **Note:** You can always override the color scheme of any `GeoButton`
     * > using `cssModifier` prop.
     */
    type: {
      type: String,
      validator: function (value) {
        if (value in TYPES) return true
        const supportedValues = Object.values(TYPES).map(i => `«${i}»`).join(', ')
        console.warn(`geo-button :: Unsupported value («${value}») for «type» property. Use one of ${supportedValues}`)
        return false
      },
      required: true
    },
    /**
     * Whether the button is disabled (and can't be interacted with - `true`) or
     * not.
     *
     * When disabled the button won't emit `click` events but will allow other
     * mouse events like hover.
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
    }
  },
  computed: {
    activityIndicatorVariant () {
      switch (this.type) {
        case TYPES.primary:
          return GeoAlertVariants.primary
        case TYPES.secondary:
          return undefined
        case TYPES.tertiary:
          return undefined
        case TYPES.danger:
          return GeoAlertVariants.error
      }
    }
  },
  methods: {
    onGeoButtonClick: function ($event) {
      if (this.disabled) {
        $event.stopPropagation()
      } else {
        /**
         * User clicked on the button.
         *
         * @event click
         * @type {MouseEvent}
         */
        this.$emit('click', $event)
      }
    }
  }
}
</script>
