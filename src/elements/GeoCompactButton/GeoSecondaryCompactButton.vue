<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

/**
 * [GeoCompactButton](./GeoCompactButton) using predefined `secondary` variant.
 *
 * Secondary buttons are normally used to show additional menus or hidden options.
 *
 * See [GeoCompactButton](./GeoCompactButton) for a complete list of supported
 * properties and features.
 */
export default {
  name: 'GeoSecondaryCompactButton',
  status: 'ready',
  release: '24.13.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      default: function () {
        return ['fal', 'times']
      }
    }
  },
  computed: {
    type () {
      return TYPES.secondary
    }
  }
}
</script>
