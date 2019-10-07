<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

export default {
  name: 'GeoDangerCompactButton',
  status: 'ready',
  release: '24.12.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      required: true
    }
  },
  computed: {
    type () {
      return TYPES.danger
    }
  }
}
</script>
