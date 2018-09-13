<template>
  <div
    :class="{
      [`geo-alert${cssSuffix}`]: true,
      [`geo-alert--floating${cssSuffix}`]: floating
    }"
  >
    <div
      :class="{
        [`geo-alert__content${cssSuffix}`]: true,
        [`geo-alert__content--${variant}${cssSuffix}`]: variant
      }"
    >
      <div
        v-if="hasLeadingAccessoryItem"
        :class="`geo-alert__content__icon${cssSuffix}`"
      >
        <!-- @slot Use this slot to customize what's displayed before alert message -->
        <slot name="leadingAccessoryItem" />
      </div>
      <div :class="`geo-alert__content__body${cssSuffix}`">
        <!-- @slot Use this slot to show the alert message -->
        <slot name="content" />
      </div>
      <div
        v-if="hasActions"
        :class="`geo-alert__content__actions${cssSuffix}`"
      >
        <!-- @slot Use this slot to show additional actions after alert message -->
        <slot name="actions" />
      </div>
      <font-awesome-icon
        v-if="shouldShowCloseButton"
        :icon="closeIcon"
        :class="`geo-alert__content__close-icon${cssSuffix}`"
        aria-hidden
        fixed-width
        @click="close($event)"
      />
    </div>
  </div>
</template>

<script>
import mixin, { VARIANTS, DEPRECATED_VARIANTS } from './GeoAlert.mixin'

export default {
  name: 'GeoAlert',
  status: 'ready',
  release: '1.0.0',
  mixins: [mixin],
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Variant of the alert, supporting:
     *
     * - `success`
     * - `info`
     * - `warning`
     * - `error`
     * - `progress`
     *
     * Those values are exported under `VARIANTS` name. See
     * [Component Constants](./#/Component%20Constants) for more info on how to
     * use those constants in your code.
     *
     * Variant only affects default CSS styling and no icon nor behaviour is
     * affected. However, using
     */

    /**
     * Predefined color scheme of the alert, allowing several common
     * out-of-the-box customizations.
     *
     * > **Note:** There are specific components to avoid explicitly writing
     * > this value and performing other common customizations.
     *
     * > **Note:** Specific components do not expose the `leftAccessoryItem`
     * > slot but an `icon` property which can be used to customized displayed
     * > icon. If you want to display something that's not an icon as
     * > `leftAccessoryItem` you should use a `GeoAlert` with a proper
     * > `cssModifier`.
     *
     * | variant  | Specific component                                            |
     * |----------|---------------------------------------------------------------|
     * | success  | [GeoSuccessAlert](./#/Elements/GeoAlert?id=geosuccessalert)   |
     * | info     | [GeoInfoAlert](./#/Elements/GeoAlert?id=geoinfoalert)         |
     * | warning  | [GeoWarningAlert](./#/Elements/GeoAlert?id=geowarningalert)   |
     * | error    | [GeoErrorAlert](./#/Elements/GeoAlert?id=geoerroralert)       |
     * | progress | [GeoProgressAlert](./#/Elements/GeoAlert?id=geoprogressalert) |
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](./#/Component%20Constants) for more info on how
     * to use those constants in your code.
     *
     * > **Note:** You can always override the color scheme of any `GeoAlert`
     * > using `cssModifier` prop.
     */
    variant: {
      type: String,
      required: true,
      validator (value) {
        if (value in VARIANTS) return true

        if (value in DEPRECATED_VARIANTS) {
          console.warn(`GeoAlert [component] :: «${value}» is a deprecated variant. Please, use «${DEPRECATED_VARIANTS[value]}» instead`)
          return true
        }

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoAlert [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  }
}
</script>
