<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass,
      'geo-input-label'
    ]"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize content displayed inside the label -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GeoInputLabel',
  status: 'ready',
  release: '24.1.0'
}
</script>
