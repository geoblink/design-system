<template>
  <div class="geo-input-prefix">
    <!-- @slot Use this slot to customize what's displayed as a prefix -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoInputPrefix` component can be added as an accesory item to a `GeoInput`
 * component.
 */
export default {
  name: 'GeoInputPrefix',
  status: 'ready',
  release: '27.0.0'
}
</script>
