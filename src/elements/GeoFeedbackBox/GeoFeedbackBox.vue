<template>
  <div
    :class="{
      [`geo-feedback-box${cssSuffix}`]: true,
      [`geo-feedback-box--floating${cssSuffix}`]: floating
    }"
  >
    <div
      :class="{
        [`geo-feedback-box__content${cssSuffix}`]: true,
        [`geo-feedback-box__content--${variant}${cssSuffix}`]: variant
      }"
    >
      <div
        v-if="hasLeadingAccessoryItem"
        :class="`geo-feedback-box__content__icon${cssSuffix}`"
      >
        <!-- @slot Use this slot to customize what's displayed before alert message -->
        <slot name="leadingAccessoryItem" />
      </div>
      <div :class="`geo-feedback-box__content__body${cssSuffix}`">
        <!-- @slot Use this slot to show the alert message -->
        <slot name="content" />
      </div>
      <div
        v-if="hasActions"
        :class="`geo-feedback-box__content__actions${cssSuffix}`"
      >
        <!-- @slot Use this slot to show additional actions after alert message -->
        <slot name="actions" />
      </div>
      <font-awesome-icon
        v-if="shouldShowCloseButton"
        :icon="closeIcon"
        :class="`geo-feedback-box__content__close-icon${cssSuffix}`"
        aria-hidden
        fixed-width
        @click="close($event)"
      />
    </div>
  </div>
</template>

<script>
import mixin, { VARIANTS, DEPRECATED_VARIANTS } from './GeoFeedbackBox.mixin'

export default {
  name: 'GeoFeedbackBox',
  status: 'ready',
  release: '21.0.0',
  mixins: [mixin],
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Predefined color scheme of the feedback box, allowing several common
     * out-of-the-box customizations.
     *
     * > **Note:** There are specific components to avoid explicitly writing
     * > this value and performing other common customizations.
     *
     * > **Note:** Specific components do not expose the `leftAccessoryItem`
     * > slot but an `icon` property which can be used to customized displayed
     * > icon. If you want to display something that's not an icon as
     * > `leftAccessoryItem` you should use a `GeoFeedbackBox` with a proper
     * > `cssModifier`.
     *
     * | variant  | Specific component                                                              |
     * |----------|---------------------------------------------------------------------------------|
     * | success  | [GeoSuccessFeedbackBox](./#/Elements/GeoFeedbackBox?id=geosuccessfeedbackbox)   |
     * | info     | [GeoInfoFeedbackBox](./#/Elements/GeoFeedbackBox?id=geoinfofeedbackbox)         |
     * | warning  | [GeoWarningFeedbackBox](./#/Elements/GeoFeedbackBox?id=geowarningfeedbackbox)   |
     * | error    | [GeoErrorFeedbackBox](./#/Elements/GeoFeedbackBox?id=geoerrorfeedbackbox)       |
     * | progress | [GeoProgressFeedbackBox](./#/Elements/GeoFeedbackBox?id=geoprogressfeedbackbox) |
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
     *
     * > **Note:** You can always override the color scheme of any `GeoFeedbackBox`
     * > using `cssModifier` prop.
     */
    variant: {
      type: String,
      required: true,
      validator (value) {
        if (value in VARIANTS) return true

        if (value in DEPRECATED_VARIANTS) {
          console.warn(`GeoFeedbackBox [component] :: «${value}» is a deprecated variant. Please, use «${DEPRECATED_VARIANTS[value]}» instead`)
          return true
        }

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoFeedbackBox [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  }
}
</script>
