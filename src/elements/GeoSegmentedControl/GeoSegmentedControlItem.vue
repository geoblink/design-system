<template>
  <div
    :class="{
      [`geo-segmented-control-item${outlineSuffix}${cssSuffix}`]: true,
      [`geo-segmented-control-item--${variant}${outlineSuffix}${cssSuffix}`]: true,
      [`geo-segmented-control-item${outlineSuffix}--active${cssSuffix}`]: active,
      [`geo-segmented-control-item--${variant}${outlineSuffix}--active${cssSuffix}`]: active,
      [`geo-segmented-control-item${outlineSuffix}--disabled${cssSuffix}`]: disabled,
      [`geo-segmented-control-item--${variant}${outlineSuffix}--disabled${cssSuffix}`]: disabled
    }"
    @click="handleClick($event)"
  >
    <!-- @slot Use this slot to customize item's content -->
    <slot />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

import geoSegmentedControlItemMixin, { VARIANTS } from './GeoSegmentedControlItem.constants'

export default {
  name: 'GeoSegmentedControlItem',
  status: 'ready',
  release: '6.2.0',
  mixins: [cssSuffix, geoSegmentedControlItemMixin],
  props: {
    /**
     * Predefined color scheme of the segmented control item, allowing several
     * common out-of-the-box customizations.
     *
     * > **Note:** There are specific components to avoid explicitly writing
     * > this value and performing other common customizations.
     *
     *
     * | variant  | Specific component                                            |
     * |----------|---------------------------------------------------------------|
     * | success  | [GeoSuccessSegmentedControlItem](./#/Elements/GeoSegmentedControlItem?id=geosuccesssegmentedcontrolitem)   |
     * | info     | [GeoInfoSegmentedControlItem](./#/Elements/GeoSegmentedControlItem?id=geoinfosegmentedcontrolitem)         |
     * | warning  | [GeoWarningSegmentedControlItem](./#/Elements/GeoSegmentedControlItem?id=geowarningsegmentedcontrolitem)   |
     * | error    | [GeoErrorSegmentedControlItem](./#/Elements/GeoSegmentedControlItem?id=geoerrorsegmentedcontrolitem)       |
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](./#/Component%20Constants) for more info on how
     * to use those constants in your code.
     *
     * > **Note:** You can always override the color scheme of any
     * > `GeoSegmentedControlItem` using `cssModifier` prop.
     */
    variant: {
      type: String,
      default: VARIANTS.info,
      validator (value) {
        if (value in VARIANTS) return true

        const supportedValues = Object.values(VARIANTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoSegmentedControlItem [component] :: Unsupported value («${value}») for «variant» property. Use one of ${supportedValues}`)
        return false
      }
    }
  },
  computed: {
    outlineSuffix () {
      const isOutline = this.outline || this.$parent.outline
      return isOutline ? '--outline' : ''
    }
  },
  methods: {
    handleClick ($event) {
      if (this.disabled) return

      /**
       * User clicked on the item.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
