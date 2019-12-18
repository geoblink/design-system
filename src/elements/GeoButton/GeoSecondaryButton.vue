<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

/**
 * [GeoButton](./GeoButton) using predefined `secondary` variant.
 *
 * Secondary buttons are normally used to show additional menus or hidden
 * options.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoSecondaryButton',
  status: 'ready',
  release: '4.2.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.secondary
    }
  }
}
</script>
