<template src="./GeoAlert.template.html" />

<script>
import mixin, { VARIANTS } from './GeoAlert.mixin'

export default {
  name: 'GeoSuccessAlert',
  status: 'ready',
  release: '4.2.0',
  mixins: [mixin],
  props: {
    /**
     * Icon to be displayed before alert content.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      default () {
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
