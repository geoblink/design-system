<template>
  <div class="geo-bordered-box">
    <!-- @slot Use this slot to customize content displayed inside the box -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GeoBorderedBox',
  status: 'ready',
  release: '7.3.0'
}
</script>
