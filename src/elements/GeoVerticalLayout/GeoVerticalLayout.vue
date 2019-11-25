<template>
  <div class="geo-vertical-layout">
    <!-- @slot Use this slot to set the content that will be displayed in the top of the layout -->
    <slot name="header" />
    <geo-scrollable-container>
      <!-- @slot Use this slot to customize content displayed inside the layout -->
      <slot />
    </geo-scrollable-container>
    <!-- @slot Use this slot to set the content that will be displayed in the bottom of the layout -->
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'GeoVerticalLayout',
  status: 'missing-tests',
  release: '28.0.1'
}
</script>
