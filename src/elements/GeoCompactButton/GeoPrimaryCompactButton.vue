<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

export default {
  name: 'GeoPrimaryCompactButton',
  status: 'ready',
  release: '24.12.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      default: function () {
        return ['fal', 'check']
      }
    }
  },
  computed: {
    type () {
      return TYPES.primary
    }
  }
}
</script>
