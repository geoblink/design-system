<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass,
      `geo-alert-callout${$options.helpers.getCSSSuffix(props.cssModifier)}`,
      `geo-alert-callout--${props.variant}${$options.helpers.getCSSSuffix(props.cssModifier)}`
    ]"
    v-on="listeners"
  >
    <font-awesome-icon
      :icon="props.icon"
      class="geo-alert-callout__icon"
      fixed-width
    />

    <div class="geo-alert-callout__content">
      <slot />
    </div>
  </div>
</template>

<script>
import cssSuffix, { getCSSSuffix } from '../../mixins/cssModifierMixin'

import { VARIANTS } from './GeoAlertCallout.constants'

export default {
  name: 'GeoAlertCallout',
  status: 'ready',
  release: '18.4.0',
  helpers: {
    getCSSSuffix
  },
  mixins: [cssSuffix],
  props: {
    /**
     * Predefined color scheme of the alert, allowing several common
     * out-of-the-box customizations.
     *
     * > **Note:** There are specific components to avoid explicitly writing
     * > this value and performing other common customizations.
     *
     * > **Note:** Specific components do not expose the `leftAccessoryItem`
     * > slot but an `icon` property which can be used to customized displayed
     * > icon. If you want to display something that's not an icon as
     * > `leftAccessoryItem` you should use a `GeoAlert` with a proper
     * > `cssModifier`.
     *
     * | variant  | Specific component                                            |
     * |----------|---------------------------------------------------------------|
     * | success  | [GeoSuccessAlertCallout](./#/Elements/GeoAlertCallout?id=geosuccessalertcallout)   |
     * | info     | [GeoInfoAlertCallout](./#/Elements/GeoAlertCallout?id=geoinfoalertcallout)         |
     * | warning  | [GeoWarningAlertCallout](./#/Elements/GeoAlertCallout?id=geowarningalertcallout)   |
     * | error    | [GeoErrorAlertCallout](./#/Elements/GeoAlertCallout?id=geoerroralertcallout)       |
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](./#/Component%20Constants) for more info on how
     * to use those constants in your code.
     *
     * > **Note:** You can always override the color scheme of any
     * > `GeoAlertCallout` using `cssModifier` prop.
     */
    variant: {
      type: String,
      required: true,
      validator (value) {
        if (value in VARIANTS) return true

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoAlertCallout [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    },

    /**
     * Font Awesome 5 icon to be displayed next to the content, on the leading
     * edge.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      required: true
    }
  }
}
</script>
