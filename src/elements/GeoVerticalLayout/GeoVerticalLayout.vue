<template>
  <component
    :is="wrapperTag"
    class="geo-vertical-layout"
  >
    <slot name="header" />
    <geo-scrollable-container>
      <!-- @slot Use this slot to customize content displayed inside the layout -->
      <slot />
    </geo-scrollable-container>
    <!-- @slot Use this slot to set the content that will be displayed in the bottom of the layout -->
    <slot name="footer" />
  </component>
</template>

<script>
export default {
  name: 'GeoVerticalLayout',
  status: 'ready',
  release: '28.0.1',
  props: {
    /**
     * HTML Tag that will be used as a wrapper of the GeoListItem
     */
    wrapperTag: {
      type: String,
      default: 'div'
    }
  }
}
</script>
