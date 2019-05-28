<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

export default {
  name: 'GeoDangerLinkButton',
  status: 'ready',
  release: '18.2.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.dangerLink
    }
  }
}
</script>
