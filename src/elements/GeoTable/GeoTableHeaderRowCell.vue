<template>
  <div :class="`geo-table-header-row-cell--${variant}${cssSuffix}`">
    <!-- @slot Use this slot to customize cell's content -->
    <slot
      :variant="variant"
      :css-modifier="cssModifier"
    />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

import GeoTableHeaderRowCellMixin from './GeoTableHeaderRowCellMixin'
import { HEADER_VARIANTS as VARIANTS } from './GeoTable.constants'

export { VARIANTS }

export default {
  name: 'GeoTableHeaderRowCell',
  status: 'ready',
  release: '10.1.0',
  constants: { VARIANTS, GeoTableHeaderRowCellMixin },
  mixins: [cssSuffix, GeoTableHeaderRowCellMixin],
  props: {
    /**
     * Variant of this table header cell, used to change the color scheme and
     * size of the cell to adapt to different common use cases.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     *
     * Supported values:
     *
     * - `main`
     * - `aux`
     * - `single`
     */
    variant: {
      type: String,
      default: 'main',
      validator (value) {
        if (value in VARIANTS) return true

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoTableHeaderRowCell [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  }
}
</script>
