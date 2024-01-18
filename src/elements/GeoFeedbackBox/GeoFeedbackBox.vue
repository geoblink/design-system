<template>
  <div
    :class="{
      ['geo-feedback-box']: true,
      ['geo-feedback-box--floating']: floating
    }"
  >
    <div
      :class="{
        ['geo-feedback-box-content']: true,
        [`geo-feedback-box-content--${variant}`]: variant
      }"
    >
      <div
        v-if="hasLeadingAccessoryItem"
        class="geo-feedback-box-content__icon"
      >
        <!-- @slot Use this slot to customized displayed message -->
        <slot name="leadingAccessoryItem" />
      </div>
      <div class="geo-feedback-box-content__body">
        <!-- @slot Use this slot to show the message -->
        <slot name="content" />
      </div>
      <div
        v-if="hasActions"
        class="geo-feedback-box-content__actions"
      >
        <!-- @slot Use this slot to show additional actions after message -->
        <slot name="actions" />
      </div>
      <font-awesome-icon
        v-if="shouldShowCloseButton"
        :icon="closeIcon"
        class="geo-feedback-box-content__close-icon"
        aria-hidden
        fixed-width
        @click="close($event)"
      />
    </div>
  </div>
</template>

<script>
import mixin, { VARIANTS } from './GeoFeedbackBox.mixin'
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

/**
 * Use `GeoFeedbackBox` component to give visual feedback to your users about
 * the result of an action or insights to help them properly finish a task. You
 * can customize the color to change the intention of the feedback and add icons
 * or buttons to allow the user to perform actions right on the Feedback boxes.
 */
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
     * ::: tip
     * There are specific components to avoid explicitly writing this value and
     * performing other common customizations.
     * :::
     *
     * ::: warning NOTE
     * Specific components do not expose the `leftAccessoryItem` slot but an
     * `icon` property which can be used to customized displayed icon. If you
     * want to display something that's not an icon as `leftAccessoryItem` you
     * should use a `GeoFeedbackBox`.
     * :::
     *
     * | variant    | Specific component                                 |
     * |------------|----------------------------------------------------|
     * | `success`  | [GeoSuccessFeedbackBox](./GeoSuccessFeedbackBox)   |
     * | `info`     | [GeoInfoFeedbackBox](./GeoInfoFeedbackBox)         |
     * | `warning`  | [GeoWarningFeedbackBox](./GeoWarningFeedbackBox)   |
     * | `error`    | [GeoErrorFeedbackBox](./GeoErrorFeedbackBox)       |
     * | `progress` | [GeoProgressFeedbackBox](./GeoProgressFeedbackBox) |
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](/docs/guides/using-constants) for more info on how
     * to use those constants in your code.
     */
    variant: enumPropertyFactory({
      componentName: 'GeoFeedbackBox',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      required: true
    })
  }
}
</script>
