<template src="./GeoValue.template.html" />

<script>
import mixin, { TYPES } from './GeoValue.mixin'

/**
 * [GeoValue](./GeoValue) using predefined `neutral` type.
 *
 * See [GeoValue](./GeoValue) for a complete list of supported properties and
 * features.
*/
export default {
  name: 'GeoNeutralValue',
  status: 'ready',
  release: '29.6.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.neutral
    }
  }
}
</script>
