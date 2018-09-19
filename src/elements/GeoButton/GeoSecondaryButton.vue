<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

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
