<template src="./GeoKPI.template.html" />

<script>
import mixin, { TYPES } from './GeoKPI.mixin'

/**
 * [GeoKPI](./GeoKPI) using predefined `positive` type.
 *
 * See [GeoKPI](./GeoKPI) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoPositiveKPI',
  status: 'ready',
  release: '29.6.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.positive
    }
  }
}
</script>
