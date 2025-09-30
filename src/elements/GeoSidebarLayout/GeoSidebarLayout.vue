<template>
  <aside class="geo-sidebar-layout">
    <geo-vertical-layout>
      <!-- @slot Use this slot to place the content that will be in the upper part of the sidebar -->
      <template #header>
        <slot
          name="header"
        />
      </template>
      <!-- @slot The content that is not assigned to a slot will be rendered here, being the main content of the sidebar -->
      <slot />
      <!-- @slot Use this slot to place the content that will be in the lower part of the sidebar -->
      <template #footer>
        <slot
          name="footer"
        />
      </template>
    </geo-vertical-layout>
  </aside>
</template>

<script>
/**
 * `GeoSidebarLayout` is a component designed to be displayed together with a
 * step component inside a wizard
 */
export default {
  name: 'GeoSidebarLayout',
  status: 'ready',
  release: '28.1.0'
}
</script>
