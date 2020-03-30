<template src="./GeoKPI.template.html" />

<script>
import mixin, { TYPES } from './GeoKPI.mixin'

/**
 * [GeoKPI](./GeoKPI) using predefined `standard` type.
 *
 * See [GeoKPI](./GeoKPI) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoStandardKPI',
  status: 'ready',
  release: '29.6.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.standard
    }
  }
}
</script>
