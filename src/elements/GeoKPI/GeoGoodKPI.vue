<template src="./GeoKPI.template.html" />

<script>
import mixin, { TYPES } from './GeoKPI.mixin'

/**
 * [GeoKPI](./GeoKPI) using predefined `good` type.
 *
 * See [GeoKPI](./GeoKPI) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoGoodKPI',
  status: 'ready',
  release: '29.6.0',
  mixins: [mixin],
  computed: {
    isPrimary () {
      return this.data.isPrimary
    },
    type () {
      return TYPES.good
    }
  }
}
</script>
