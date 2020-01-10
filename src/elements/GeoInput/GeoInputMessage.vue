<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass,
      'geo-input-message',
      `geo-input-message--${props.variant}`
    ]"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize content displayed inside the message -->
    <slot />
  </div>
</template>

<script>
import { VARIANTS } from './GeoInputMessage.constants'

/**
 * `GeoInputMessage` is component designed to fit nicely as a help message for
 * `GeoInput`.
 *
 * You can customize the color to change the intention of the message using
 * different variants like `success` or `error`.
 */
export default {
  name: 'GeoInputMessage',
  status: 'ready',
  release: '24.1.0',
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Predefined color scheme of the message, allowing several common
     * out-of-the-box customizations.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](/docs/guides/using-constants) for more info on how
     * to use those constants in your code.
     */
    variant: {
      type: String,
      validator (value) {
        const allValues = Object.values(VARIANTS)
        if (!value || allValues.includes(value)) return true

        const supportedValues = allValues.map(i => `«${i}»`).join(', ')
        console.warn(`GeoInputMessage [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  }
}
</script>
