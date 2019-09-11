<template src="./GeoFeedbackBox.template.html" />

<script>
import mixin, { VARIANTS } from './GeoFeedbackBox.mixin'

export default {
  name: 'GeoSuccessFeedbackBox',
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
        return ['fal', 'thumbs-up']
      }
    }
  },
  computed: {
    variant () {
      return VARIANTS.success
    }
  }
}
</script>
