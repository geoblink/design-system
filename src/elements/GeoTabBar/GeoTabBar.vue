<template>
  <nav :class="`geo-tab-bar-${variant}${cssSuffix}`">
    <!-- @slot Use this slot to customize the tabs displayed in this navigation bar -->
    <slot />
  </nav>
</template>

<script>
import geoTabBarMixin, { VARIANTS } from './GeoTabBar.mixin'

export default {
  name: 'GeoTabBar',
  status: 'ready-tests',
  release: '8.5.0',
  mixins: [geoTabBarMixin],
  constants: {
    VARIANTS
  }
}
</script>
