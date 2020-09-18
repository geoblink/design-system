<template>
  <geo-trimmed-content
    :class="{
      [`geo-segmented-control-item${outlineSuffix}`]: true,
      [`geo-segmented-control-item--${variant}${outlineSuffix}`]: true,
      [`geo-segmented-control-item${outlineSuffix}--active`]: active,
      [`geo-segmented-control-item--${variant}${outlineSuffix}--active`]: active,
      [`geo-segmented-control-item${outlineSuffix}--disabled`]: disabled,
      [`geo-segmented-control-item--${variant}${outlineSuffix}--disabled`]: disabled
    }"
    @click.native="handleClick($event)"
  >
    <!-- @slot Use this slot to customize item's content -->
    <slot />
  </geo-trimmed-content>
</template>

<script>
import { enumPropertyFactory } from '@/utils/enumPropertyFactory'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent.vue';

import geoSegmentedControlItemMixin, { VARIANTS } from './GeoSegmentedControlItem.constants'

/**
 * `GeoSegmentedControlItem` is a component designed to nicely fit as one of the
 * options of a [GeoSegmentedControl](./GeoSegmentedControl).
 */
export default {
  name: 'GeoSegmentedControlItem',
  status: 'ready',
  release: '6.2.0',
  mixins: [geoSegmentedControlItemMixin],
  components: {
    GeoTrimmedContent
  },
  props: {
    /**
     * Predefined color scheme of the segmented control item, allowing several
     * common out-of-the-box customizations.
     *
     * ::: tip
     * There are specific components to avoid explicitly writing this value and
     * performing other common customizations.
     * :::
     *
     *
     * | variant   | Specific component                                                 |
     * |-----------|--------------------------------------------------------------------|
     * | `success` | [GeoSuccessSegmentedControlItem](./GeoSuccessSegmentedControlItem) |
     * | `info`    | [GeoInfoSegmentedControlItem](./GeoInfoSegmentedControlItem)       |
     * | `warning` | [GeoWarningSegmentedControlItem](./GeoWarningSegmentedControlItem) |
     * | `error`   | [GeoErrorSegmentedControlItem](./GeoErrorSegmentedControlItem)     |
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](/docs/guides/using-constants) for more info on how
     * to use those constants in your code.
     */
    variant: enumPropertyFactory({
      componentName: 'GeoSegmentedControlItem',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      defaultValue: VARIANTS.info
    })
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
