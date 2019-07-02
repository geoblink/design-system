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
    <slot
      slot="content"
      name="content"
    />
    <slot
      slot="actions"
      name="actions"
    />
  </geo-feedback-box>
</template>

<script>
import mixin, { VARIANTS } from './GeoFeedbackBox.mixin'

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
      default () {
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
