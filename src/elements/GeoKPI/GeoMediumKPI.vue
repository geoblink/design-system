<template src="./GeoKPI.template.html" />

<script>
import mixin, { TYPES } from './GeoKPI.mixin'

/**
 * [GeoKPI](./GeoKPI) using predefined `medium` type.
 *
 * See [GeoKPI](./GeoKPI) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoMediumKPI',
  status: 'ready',
  release: '29.6.0',
  mixins: [mixin],
  computed: {
    isPrimary () {
      return this.data.isPrimary
    },
    type () {
      return TYPES.medium
    }
  }
}
</script>
