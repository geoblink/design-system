<template>
  <div class="geo-horizontal-layout">
    <!-- @slot Use this slot to customize content displayed inside the layout -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoHorizontalLayout` is a component designed to organise elements it
 * contains in a single row.
 */
export default {
  name: 'GeoHorizontalLayout',
  status: 'ready',
  release: '24.12.0'
}
</script>
