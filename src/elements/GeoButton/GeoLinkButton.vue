<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

export default {
  name: 'GeoLinkButton',
  status: 'ready',
  release: '18.2.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.link
    }
  }
}
</script>
