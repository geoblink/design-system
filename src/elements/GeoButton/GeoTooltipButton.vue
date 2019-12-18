<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

/**
 * [GeoButton](./GeoButton) using predefined `tooltip` variant.
 *
 * Tooltip buttons are normally used to trigger an action inside a tooltip,
 * usually accepting some terms or closing it.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
 */
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
