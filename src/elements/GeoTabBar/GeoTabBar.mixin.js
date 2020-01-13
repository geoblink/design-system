import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

const VARIANTS = {
  default: 'default',
  modal: 'modal'
}

export { VARIANTS }

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Variant of the tab bar, supporting:
     *
     * - `default`
     * - `modal`
     *
     * Those values are exported under `VARIANTS` name. See
     * [Component Constants](/docs/guides/using-constants) for more info on how to
     * use those constants in your code.
     *
     * Variant only affects default CSS styling and no icon nor behaviour is
     * affected. However, using
     */
    variant: enumPropertyFactory({
      componentName: 'GeoTabBar',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      defaultValue: VARIANTS.default
    })
  }
}
