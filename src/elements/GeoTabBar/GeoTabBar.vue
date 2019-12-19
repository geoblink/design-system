<template>
  <nav :class="`geo-tab-bar-${variant}`">
    <!-- @slot Use this slot to customize the tabs displayed in this navigation bar -->
    <slot />
  </nav>
</template>

<script>
import geoTabBarMixin, { VARIANTS } from './GeoTabBar.mixin'

/**
 * `GeoTabBar` is a component designed to display a collection of tabs
 * horizontally, specially aimed for pages where there are multiple independent
 * modules.
 */
export default {
  name: 'GeoTabBar',
  status: 'ready',
  release: '8.5.0',
  mixins: [geoTabBarMixin],
  constants: {
    VARIANTS
  }
}
</script>
