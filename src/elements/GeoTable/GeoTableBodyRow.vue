<template>
  <div :class="`geo-table-body-row--${variant}`">
    <!-- @slot Use this slot to customize row's content -->
    <slot />
  </div>
</template>

<script>
const VARIANTS = {
  default: 'default',
  highlighted: 'highlighted',
  'highlighted-active': 'highlighted-active',
  active: 'active'
}

export { VARIANTS }

/**
 * `GeoTableBodyRow` is the component that must be used to render body rows in a
 * [GeoTable](./GeoTable).
 *
 * Each instance of this component represents a single `row` of a table and
 * features a slot to render the cells of the table.
 *
 * Although not required, it is encouraged to use
 * [GeoTableBodyRowCell](./GeoTableBodyRowCell) instances as content of this
 * component's slot.
 */
export default {
  name: 'GeoTableBodyRow',
  status: 'ready',
  release: '10.1.0',
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Variant of this row, used to change the color scheme of to adapt to any
     * kind of interaction status.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     *
     * Supported values:
     *
     * - `default`
     * - `highlighted`
     * - `highlighted-active`
     * - `active`
     */
    variant: {
      type: String,
      default: VARIANTS.default,
      validator (value) {
        return value in VARIANTS
      }
    }
  }
}
</script>
