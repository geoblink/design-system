<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

export default {
  name: 'GeoSecondaryCompactButton',
  status: 'ready',
  release: '24.12.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      default: function () {
        return ['fal', 'times']
      }
    }
  },
  computed: {
    type () {
      return TYPES.secondary
    }
  }
}
</script>
