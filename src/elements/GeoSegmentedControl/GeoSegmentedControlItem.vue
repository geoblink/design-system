<template>
  <div
    :class="{
      [`geo-segmented-control-item${outlineSuffix}`]: true,
      [`geo-segmented-control-item--${variant}${outlineSuffix}`]: true,
      [`geo-segmented-control-item${outlineSuffix}--active`]: active,
      [`geo-segmented-control-item--${variant}${outlineSuffix}--active`]: active,
      [`geo-segmented-control-item${outlineSuffix}--disabled`]: disabled,
      [`geo-segmented-control-item--${variant}${outlineSuffix}--disabled`]: disabled
    }"
    @click="handleClick($event)"
  >
    <!-- @slot Use this slot to customize item's content -->
    <slot />
  </div>
</template>

<script>
import geoSegmentedControlItemMixin, { VARIANTS } from './GeoSegmentedControlItem.constants'

export default {
  name: 'GeoSegmentedControlItem',
  status: 'ready',
  release: '6.2.0',
  mixins: [geoSegmentedControlItemMixin],
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
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
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
      return isOutline
        ? '--outline'
        : ''
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
