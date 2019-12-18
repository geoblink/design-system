<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

/**
 * [GeoButton](./GeoButton) using predefined `dangerLink` variant.
 *
 * DangerLink buttons are normally used to trigger dangerous actions that cannot
 * be reverted like deleting data.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
 */
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
