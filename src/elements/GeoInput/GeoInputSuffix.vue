<template>
  <div class="geo-input-suffix">
    <!-- @slot Use this slot to customize what's displayed as a suffix -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoInputSuffix` component can be added as an accesory item to a `GeoInput`
 * component.
 */
export default {
  name: 'GeoInputSuffix',
  status: 'ready',
  release: '27.0.0'
}
</script>
