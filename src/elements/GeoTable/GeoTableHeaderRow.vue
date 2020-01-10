<template>
  <div :class="`geo-table-header-row--${variant}`">
    <!-- @slot Use this slot to customize row's content -->
    <slot :variant="variant" />
  </div>
</template>

<script>
import { HEADER_VARIANTS as VARIANTS } from './GeoTable.constants'
import { enumDefaultPropertyFactory } from '../../utils/enumPropertyFactory'

export { VARIANTS }

/**
 * `GeoTableHeaderRow` is the component that must be used to render header rows
 * in a [GeoTable](./GeoTable).
 *
 * Each instance of this component represents a single `row` of a table and
 * features a slot to render the cells of the table's header.
 *
 * ::: tip
 * Although not required, it is encouraged to use
 * [GeoTableHeaderRowCell](./GeoTableHeaderRowCell) instances as content of this
 * component's slot.
 * :::
 */
export default {
  name: 'GeoTableHeaderRow',
  status: 'ready',
  release: '10.1.0',
  constants: { VARIANTS },
  props: {
    /**
     * When set to `true`, the width of this cell's content won't take part in
     * determining column's width.
     */
    ignoreForResize: {
      type: Boolean,
      default: false
    },

    /**
     * Variant of this table header, used to change the color scheme and size of
     * the row to adapt to different common use cases.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     *
     * Supported values:
     *
     * - `main`
     * - `aux`
     * - `single`
     */
    variant: enumDefaultPropertyFactory({
      componentName: 'GeoTableHeaderRow',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      defaultValue: VARIANTS.main
    })
  }
}
</script>
