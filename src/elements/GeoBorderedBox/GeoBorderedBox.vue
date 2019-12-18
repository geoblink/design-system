<template>
  <div class="geo-bordered-box">
    <!-- @slot Use this slot to customize content displayed inside the box -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoBorderedBox` is a component designed to show an isolated set of elements
 * or actions inside a boxed environment. Use it in dropdowns or modals to offer
 * a consistent experience.
 */
export default {
  name: 'GeoBorderedBox',
  status: 'ready',
  release: '7.3.0'
}
</script>
