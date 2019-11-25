<template>
  <aside class="geo-sidebar-layout">
    <geo-vertical-layout>
      <slot
        slot="header"
        name="header"
      />
      <slot />
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
  status: 'missing-tests',
  release: '28.0.1'
}
</script>
