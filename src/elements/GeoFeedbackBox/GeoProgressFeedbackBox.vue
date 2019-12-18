<template>
  <geo-feedback-box
    v-bind="$props"
    :variant="variant"
    v-on="$listeners"
  >
    <font-awesome-icon
      slot="leadingAccessoryItem"
      :icon="icon"
      aria-hidden
      fixed-width
      spin
    />
    <!-- @slot Use this slot to customized displayed message -->
    <slot
      slot="content"
      name="content"
    />
    <!-- @slot Use this slot to show additional actions after message -->
    <slot
      slot="actions"
      name="actions"
    />
  </geo-feedback-box>
</template>

<script>
import mixin, { VARIANTS } from './GeoFeedbackBox.mixin'

/**
 * [GeoFeedbackBox](./GeoFeedbackBox) using predefined `progress` variant.
 *
 * `progress` variant is normally used to give feedback about a background
 * process that is not finished and that user might want to wait before
 * proceeding but that does not strictly require them to wait for. For instance,
 * when user asked to download a file but it has to be generated and this
 * process might take some seconds.
 *
 * See [GeoFeedbackBox](./GeoFeedbackBox) for a complete list of supported
 * properties and features.
 */
export default {
  name: 'GeoProgressFeedbackBox',
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
        return ['fal', 'spinner-third']
      }
    }
  },
  computed: {
    variant () {
      return VARIANTS.progress
    }
  }
}
</script>
