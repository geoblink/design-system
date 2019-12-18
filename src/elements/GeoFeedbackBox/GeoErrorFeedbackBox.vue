<template src="./GeoFeedbackBox.template.html" />

<script>
import mixin, { VARIANTS } from './GeoFeedbackBox.mixin'

/**
 * [GeoFeedbackBox](./GeoFeedbackBox) using predefined `error` variant.
 *
 * `error` variant is normally used to give feedback about errors on unexpected
 * situations that prevent users from finished the intended flow.
 *
 * See [GeoFeedbackBox](./GeoFeedbackBox) for a complete list of supported
 * properties and features.
 */
export default {
  name: 'GeoErrorFeedbackBox',
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
      return VARIANTS.error
    }
  }
}
</script>
