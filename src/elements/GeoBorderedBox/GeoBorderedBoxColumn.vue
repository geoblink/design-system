<template>
  <div class="geo-bordered-box-column">
    <!-- @slot Use this slot to customize content displayed inside the column -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoBorderedBoxColumn` is a component designed to show an isolated set of
 * elements or actions inside a `GeoBorderedBox` environment.
 */
export default {
  name: 'GeoBorderedBoxColumn',
  status: 'ready',
  release: '24.12.0'
}
</script>
