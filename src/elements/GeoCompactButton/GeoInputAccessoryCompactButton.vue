<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

export default {
  name: 'GeoInputAccessoryCompactButton',
  status: 'ready',
  release: '26.1.0',
  mixins: [mixin],
  props: {
    icon: {
      type: Array,
      required: true
    }
  },
  computed: {
    type () {
      return TYPES.inputAccessory
    }
  }
}
</script>
