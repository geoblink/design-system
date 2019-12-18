<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass,
      'geo-table-body-row-cell'
    ]"
  >
    <!-- @slot Use this slot to customize cell's content -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GeoTableBodyRowCell',
  status: 'ready',
  release: '10.1.0'
}
</script>
