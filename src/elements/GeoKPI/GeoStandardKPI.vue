<template src="./GeoKPI.template.html" />

<script>
import mixin, { TYPES } from './GeoKPI.mixin'

/**
 * [GeoButton](./GeoButton) using predefined `danger` variant.
 *
 * Danger buttons are normally used to trigger dangerous actions that cannot be
 * reverted like deleting data.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoStandardKPI',
  status: 'ready',
  release: '29.6.0',
  mixins: [mixin],
  computed: {
    isPrimary () {
      return this.data.isPrimary
    },
    type () {
      return TYPES.bad
    }
  }
}
</script>
