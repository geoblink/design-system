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

import { HEADER_VARIANTS as VARIANTS } from './GeoTable.constants'
export { VARIANTS }

export default {
  name: 'GeoTableHeaderRowCell',
  status: 'ready',
  release: '10.1.0',
  constants: { VARIANTS },
  mixins: [cssSuffix],
  props: {
    /**
     * Maximum width that this cell's column might take.
     */
    columnMaxWidth: {
      type: Number,
      required: false
    },

    /**
     * Minimum width that this cell's column must take.
     */
    columnMinWidth: {
      type: Number,
      required: false
    },

    /**
     * Width that this cell's column must take. Overrides both, minimum and
     * maximum width.
     */
    columnWidth: {
      type: Number,
      required: false
    },

    /**
     * Whether this header row cell should be ignored when computing this cell's
     * column's required width.
     */
    ignoreContentWidth: {
      type: Boolean,
      default: false
    },

    /**
     * If set to `true` this column won't grow after it's content fits,
     * otherwise (default) remaining space will be distributed and this column
     * might grow.
     */
    growingDisabled: {
      type: Boolean,
      default: false
    },

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
