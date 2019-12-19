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
/**
 * `GeoTableBodyRowCell` is a component designed to fit nicely in a
 * [GeoTableBodyRow](./GeoTableBodyRow).
 *
 * Each instance of this component represents a single `cell` of a table and
 * features a slot to render any kind of content.
 */
export default {
  name: 'GeoTableBodyRowCell',
  status: 'ready',
  release: '10.1.0'
}
</script>
