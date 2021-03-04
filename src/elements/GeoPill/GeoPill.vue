<template>
  <div :class="`geo-pill geo-pill--${variant}`">
    <slot />
  </div>
</template>

<script>
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

const VARIANTS = {
  default: 'default',
  light: 'light',
  dark: 'dark',
  opaque: 'opaque',
  outline: 'outline'
}

export { VARIANTS }

/**
 * `GeoPill` is a component which just renders some inline content inside a
 * round bordered pill.
 */
export default {
  name: 'GeoPill',
  status: 'ready',
  release: '11.3.0',
  constants: {
    VARIANTS
  },
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
    variant: enumPropertyFactory({
      componentName: 'GeoPill',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      defaultValue: VARIANTS.default
    })
  }
}
</script>
