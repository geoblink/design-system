<template>
  <nav :class="`geo-tab-bar${cssSuffix}`">
    <!-- @slot Use this slot to customize the tabs displayed in this navigation bar -->
    <slot />
  </nav>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoTabBar',
  status: 'missing-tests',
  release: '8.5.0',
  mixins: [cssSuffix]
}
</script>
