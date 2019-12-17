<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

/**
 * [GeoButton](./GeoButton) using predefined `tertiary` variant.
 *
 * Tertiary buttons are normally used to trigger an alternative action to the
 * main one like dismissing a form without saving changes.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
 */
export default {
  name: 'GeoTertiaryButton',
  status: 'ready',
  release: '4.2.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.tertiary
    }
  }
}
</script>
