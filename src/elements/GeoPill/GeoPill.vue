<template>
  <div :class="`geo-pill--${variant}${cssSuffix}`">
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

const VARIANTS = {
  default: 'default',
  light: 'light',
  dark: 'dark',
  opaque: 'opaque'
}

export { VARIANTS }

export default {
  name: 'GeoPill',
  status: 'ready',
  release: '11.3.0',
  constants: {
    VARIANTS
  },
  mixins: [cssSuffix],
  props: {
    /**
     * Variant of this pill, used to change the color scheme.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     *
     * Supported values:
     *
     * - `default`
     * - `light`
     * - `grey`
     * - `opaque`
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
