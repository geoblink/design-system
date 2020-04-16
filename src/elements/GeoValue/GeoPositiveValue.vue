<template src="./GeoValue.template.html" />

<script>
import mixin, { TYPES } from './GeoValue.mixin'

/**
 * [GeoValue](./GeoValue) using predefined `positive` type.
 *
 * See [GeoValue](./GeoValue) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoPositiveValue',
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
