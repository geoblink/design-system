<template>
  <geo-feedback-box
    v-bind="$props"
    :variant="variant"
    @close="$attrs.onClose"
  >
    <template #leadingAccessoryItem>
      <font-awesome-icon
        :icon="icon"
        aria-hidden
        fixed-width
      />
    </template>
    <!-- @slot Use this slot to customized displayed message -->
    <template #content>
      <slot name="content" />
    </template>
    <!-- @slot Use this slot to show additional actions after message -->
    <template #actions>
      <slot name="actions" />
    </template>
  </geo-feedback-box>
</template>
<script>
import mixin, { VARIANTS } from './GeoFeedbackBox.mixin'

/**
 * [GeoFeedbackBox](./GeoFeedbackBox) using predefined `warning` variant.
 *
 * `warning` variant is normally used to show information that might impact how
 * the user will continue using the application or that is required to properly
 * finish the task at hand.
 *
 * See [GeoFeedbackBox](./GeoFeedbackBox) for a complete list of supported
 * properties and features.
 */
export default {
  name: 'GeoWarningFeedbackBox',
  status: 'ready',
  release: '21.0.0',
  mixins: [mixin],
  props: {
    /**
     * Icon to be displayed before feedback box content.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      default: function () {
        return ['fal', 'exclamation-triangle']
      }
    }
  },
  computed: {
    variant () {
      return VARIANTS.warning
    }
  }
}
</script>
