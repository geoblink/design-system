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
