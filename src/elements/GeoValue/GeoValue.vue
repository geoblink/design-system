<template>
  <div
    :class="valueCssClasses"
  >
    <div class="geo-value__column">
      <slot name="warningTooltip" />
    </div>
    <div class="geo-value__column">
      <div class="geo-value__row">
        <span
          class="geo-value__value"
        >
          {{ value }}
        </span>
        <span
          v-if="unit"
          class="geo-value__unit"
        >
          {{ unit }}
        </span>
      </div>
      <div class="geo-value__row">
        <span
          v-if="description"
          class="geo-value__description"
        >
          {{ description }}
        </span>
        <slot name="descriptionTooltip" />
      </div>
    </div>
  </div>
</template>

<script>
import mixin, { TYPES } from './GeoValue.mixin'
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

/**
 * `GeoValue` is a component for displaying data, specially designed to display Key Performance Indicators
 */

export default {
  name: 'GeoValue',
  status: 'ready',
  release: '29.6.0',
  constants: {
    TYPES
  },
  mixins: [mixin],
  props: {
    /**
     * Predefined type scheme of the GeoValue component
     *
     * > **Note:** There are specific components to avoid explicitly writing this value.
     *
     * | type         |            Specific component           | Proposed usage (example) |
     * |--------------|-----------------------------------------|--------------------------|
     * | `standard`   | [GeoValue](./GeoValue)                  | Standard                 |
     * | `positive`   | [GeoPositiveValue](./GeoPositiveValue)  | Positive value           |
     * | `neutral`    | [GeoNeutralValue](./GeoNeutralValue)    | Neutral value            |
     * | `negative`   | [GeoNegativeValue](./GeoNegativeValue)  | Negative value           |
     *
     * Supported `type` values are exported under `TYPES` named export. See
     * [Component Constants](/docs/guides/using-constants) for more info on how to
     * use those constants in your code.
     */
    type: enumPropertyFactory({
      componentName: 'GeoValue',
      propertyName: 'type',
      enumDictionary: TYPES,
      defaultValue: TYPES.standard
    })
  },
  computed: {
    valueCssClasses () {
      return `geo-value geo-value--${this.type} geo-value--${this.isPrimary ? 'primary' : 'secondary'}`
    }
  }
}
</script>
