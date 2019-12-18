<template src="./GeoButton.template.html" />

<script>
import mixin, { TYPES } from './GeoButton.mixin'

/**
 * [GeoButton](./GeoButton) using predefined `link` variant.
 *
 * Link buttons are similar to [GeoTertiaryButton](./GeoTertiaryButton), however,
 * this are not box-sized in the same way and look like regular links in a
 * paragraph.
 *
 * See [GeoButton](./GeoButton) for a complete list of supported properties and
 * features.
 */
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
