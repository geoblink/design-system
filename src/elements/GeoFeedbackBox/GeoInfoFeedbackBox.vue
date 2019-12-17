<template src="./GeoFeedbackBox.template.html" />

<script>
import mixin, { VARIANTS } from './GeoFeedbackBox.mixin'

/**
 * [GeoFeedbackBox](./GeoFeedbackBox) using predefined `info` variant.
 *
 * `info` variant is normally used to show details that might be useful but
 * knowing them is not required to properly perform the task they are about.
 *
 * See [GeoFeedbackBox](./GeoFeedbackBox) for a complete list of supported
 * properties and features.
 */
export default {
  name: 'GeoInfoFeedbackBox',
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
        return ['fal', 'lightbulb']
      }
    }
  },
  computed: {
    variant () {
      return VARIANTS.info
    }
  }
}
</script>
