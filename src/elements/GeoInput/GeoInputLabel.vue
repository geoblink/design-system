<template>
  <div
    v-bind="$attrs"
    :class="[
      $attrs.class,
      'geo-input-label'
    ]"
  >
    <!-- @slot Use this slot to customize content displayed inside the label -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoInputLabel` is component designed to fit nicely as a label for `GeoInput`.
 */
export default {
  name: 'GeoInputLabel',
  status: 'ready',
  release: '24.1.0'
}
</script>
