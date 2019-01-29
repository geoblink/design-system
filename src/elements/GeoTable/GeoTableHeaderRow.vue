<template>
  <div :class="`geo-table-header-row--${variant}${cssSuffix}`">
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
  name: 'GeoTableHeaderRow',
  status: 'missing-tests',
  release: '9.5.0',
  constants: VARIANTS,
  mixins: [cssSuffix],
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
    variant: {
      type: String,
      default: 'main',
      validator (value) {
        if (value in VARIANTS) return true

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoTableHeaderRow [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  }
}
</script>
