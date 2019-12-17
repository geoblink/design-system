<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

/**
 * [GeoCompactButton](./GeoCompactButton) using predefined `primary` variant.
 *
 * Primary buttons are normally used to trigger main actions like saving changes.
 *
 * See [GeoCompactButton](./GeoCompactButton) for a complete list of supported
 * properties and features.
 */
export default {
  name: 'GeoPrimaryCompactButton',
  status: 'ready',
  release: '24.13.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      default: function () {
        return ['fal', 'check']
      }
    }
  },
  computed: {
    type () {
      return TYPES.primary
    }
  }
}
</script>
