<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.class,
      data.staticClass,
      'geo-alert',
      `geo-alert--${props.variant}`
    ]"
    v-on="listeners"
  >
    <font-awesome-icon
      :icon="props.icon"
      class="geo-alert__icon"
      fixed-width
    />

    <div class="geo-alert__content">
      <!-- @slot Use this slot to customize alert's content -->
      <slot />
    </div>
  </div>
</template>

<script>
import { VARIANTS } from './GeoAlert.constants'

export default {
  name: 'GeoAlert',
  status: 'ready',
  release: '22.0.0',
  constants: {
    VARIANTS
  },
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
     * > `leftAccessoryItem` you should use a `GeoAlert`.
     *
     * | variant  | Specific component                                            |
     * |----------|---------------------------------------------------------------|
     * | success  | [GeoSuccessAlert](./#/Elements/GeoAlert?id=geosuccessalertcallout)   |
     * | info     | [GeoInfoAlert](./#/Elements/GeoAlert?id=geoinfoalertcallout)         |
     * | warning  | [GeoWarningAlert](./#/Elements/GeoAlert?id=geowarningalertcallout)   |
     * | error    | [GeoErrorAlert](./#/Elements/GeoAlert?id=geoerroralertcallout)       |
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
     */
    variant: {
      type: String,
      required: true,
      validator (value) {
        if (value in VARIANTS) return true

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoAlert [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
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
