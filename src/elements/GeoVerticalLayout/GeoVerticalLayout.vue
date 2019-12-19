<template>
  <component
    :is="wrapperTag"
    class="geo-vertical-layout"
  >
    <!-- @slot Use this slot to set the content that will be displayed in the upper part of the layout -->
    <slot name="header" />

    <geo-scrollable-container class="geo-vertical-layout__body">
      <!-- @slot Use this slot to customize content displayed inside the layout, which will have scroll if the max height is met -->
      <slot />
    </geo-scrollable-container>
    <!-- @slot Use this slot to set the content that will be displayed in the bottom of the layout -->
    <slot name="footer" />
  </component>
</template>

<script>
/**
 * `GeoVerticalLayout` is a component designed to organise elements it contains
 * in a column direction, having an optional header and footer, and the main
 * content with a scrollable container.
 */
export default {
  name: 'GeoVerticalLayout',
  status: 'ready',
  release: '28.1.0',
  props: {
    /**
     * HTML tag that will be used as a wrapper of the GeoVerticalLayout
     */
    wrapperTag: {
      type: String,
      default: 'div'
    }
  }
}
</script>
