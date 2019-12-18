<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

/**
 * [GeoCompactButton](./GeoCompactButton) using predefined `danger` variant.
 *
 * Danger buttons are normally used to trigger dangerous actions that cannot be
 * reverted like deleting data.
 *
 * See [GeoCompactButton](./GeoCompactButton) for a complete list of supported
 * properties and features.
 */
export default {
  name: 'GeoDangerCompactButton',
  status: 'ready',
  release: '24.13.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      required: true
    }
  },
  computed: {
    type () {
      return TYPES.danger
    }
  }
}
</script>
