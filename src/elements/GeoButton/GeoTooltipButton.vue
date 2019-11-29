<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

export default {
  name: 'GeoTooltipButton',
  status: 'ready',
  release: '28.1.0',
  mixins: [mixin],
  computed: {
    type () {
      return TYPES.tooltip
    }
  }
}
</script>
