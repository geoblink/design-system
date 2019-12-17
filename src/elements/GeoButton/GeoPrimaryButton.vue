<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

/**
 * [GeoButton](./GeoButton) using predefined `primary` variant.
 *
 * Primary buttons are normally used to trigger main actions like saving changes.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoPrimaryButton',
  status: 'ready',
  release: '4.2.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.primary
    }
  }
}
</script>
