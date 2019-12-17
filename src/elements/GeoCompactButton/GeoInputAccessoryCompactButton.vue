<template src="./GeoCompactButton.template.html" />

<script>
import mixin, { TYPES } from './GeoCompactButton.mixin'

/**
 * [GeoCompactButton](./GeoCompactButton) using predefined `inputAccessory`
 * variant.
 *
 * `inputAccessory` buttons are normally used as accessory items in inputs to
 * trigger help actions like picking a predefined value or a shortcut.
 *
 * See [GeoCompactButton](./GeoCompactButton) for a complete list of supported
 * properties and features.
 */
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
