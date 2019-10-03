<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

export default {
  name: 'GeoPrimaryCompactButton',
  status: 'ready',
  release: '24.11.1',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.primary
    },
    icon () {
      return ['fal', 'check']
    }
  }
}
</script>
