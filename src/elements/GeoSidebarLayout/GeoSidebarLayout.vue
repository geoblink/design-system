<template>
  <aside class="geo-sidebar-layout">
    <geo-vertical-layout>
      <!-- @slot Use this slot to place the content that will be in the upper part of the sidebar -->
      <slot
        slot="header"
        name="header"
      />
      <!-- @slot The content that is not assigned to a slot will be rendered here, being the main content of the sidebar -->
      <slot />
      <!-- @slot Use this slot to place the content that will be in the lower part of the sidebar -->
      <slot
        slot="footer"
        name="footer"
      />
    </geo-vertical-layout>
  </aside>
</template>

<script>
export default {
  name: 'GeoSidebarLayout',
  status: 'ready',
  release: '28.1.0'
}
</script>
