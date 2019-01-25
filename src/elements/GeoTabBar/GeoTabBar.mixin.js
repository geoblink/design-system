import cssSuffix from '../../mixins/cssModifierMixin'

const VARIANTS = {
  default: 'default',
  modal: 'modal'
}

export { VARIANTS }

/**
 * @mixin
 */
export default {
  mixins: [cssSuffix],
  props: {
    /**
     * Variant of the tab bar, supporting:
     *
     * - `default`
     * - `modal`
     *
     * Those values are exported under `VARIANTS` name. See
     * [Component Constants](./#/Component%20Constants) for more info on how to
     * use those constants in your code.
     *
     * Variant only affects default CSS styling and no icon nor behaviour is
     * affected. However, using
     */
    variant: {
      type: String,
      default: function () {
        return VARIANTS.default
      },
      validator (value) {
        if (value in VARIANTS) return true

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoTabBar [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  }
}
