<template>
  <div :class="`geo-table-body-row--${variant}${cssSuffix}`">
    <!-- @slot Use this slot to customize row's content -->
    <slot :css-modifier="cssModifier" />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

const VARIANTS = {
  default: 'default',
  highlighted: 'highlighted',
  'highlighted-active': 'highlighted-active',
  active: 'active'
}

export { VARIANTS }

export default {
  name: 'GeoTableBodyRow',
  status: 'ready',
  release: '10.1.0',
  mixins: [cssSuffix],
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
