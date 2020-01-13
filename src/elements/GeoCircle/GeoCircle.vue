<template>
  <div
    :class="{
      ['geo-circle']: true,
      [`geo-${variant}-circle`]: true
    }"
  />
</template>

<script>
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

const VARIANTS = {
  default: 'default',
  primary: 'primary',
  success: 'success',
  info: 'info',
  warn: 'warn',
  error: 'error',
  disabled: 'disabled'
}

/**
 * `GeoCircle` is a component which just renders a small colored circle. It's
 * aimed to display steps in a wizard.
 */
export default {
  name: 'GeoCircle',
  status: 'ready',
  release: '8.5.0',
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Variant of this circle, used to change the color scheme of
     * the indicator to adapt to any kind of background.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     *
     * Supported values:
     *
     * - `default`
     * - `primary`
     * - `success`
     * - `info`
     * - `warn`
     * - `error`
     * - `disabled`
     */
    variant: enumPropertyFactory({
      componentName: 'GeoCircle',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      defaultValue: VARIANTS.default
    })
  }
}
</script>
