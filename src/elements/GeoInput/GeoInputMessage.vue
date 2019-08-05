<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass,
      `geo-input-message${$options.helpers.getCSSSuffix(props.cssModifier)}`,
      `geo-input-message--${props.variant}${$options.helpers.getCSSSuffix(props.cssModifier)}`
    ]"
    v-on="listeners"
  >
    <!-- @slot Use this slot to customize content displayed inside the message -->
    <slot />
  </div>
</template>

<script>
import cssSuffix, { getCSSSuffix } from '../../mixins/cssModifierMixin'
import { VARIANTS } from './GeoInputMessage.constants'

export default {
  name: 'GeoInputMessage',
  status: 'ready',
  release: '24.1.0',
  constants: {
    VARIANTS
  },
  helpers: {
    getCSSSuffix
  },
  mixins: [cssSuffix],
  props: {
    /**
     * Predefined color scheme of the message, allowing several common
     * out-of-the-box customizations.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](./#/Component%20Constants) for more info on how
     * to use those constants in your code.
     *
     * > **Note:** You can always override the color scheme of any
     * > `GeoInputMessage` using `cssModifier` prop.
     */
    variant: {
      type: String,
      validator (value) {
        if (!value) return true
        if (value in VARIANTS) return true

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoInputMessage [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  }
}
</script>
