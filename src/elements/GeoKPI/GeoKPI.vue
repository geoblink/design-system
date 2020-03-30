<template>
  <div
    :class="kpiCssClasses"
  >
    <div class="geo-kpi__column">
      <slot name="warningTooltip" />
    </div>
    <div class="geo-kpi__column">
      <div class="geo-kpi__row">
        <span
          class="geo-kpi__value"
        >
          {{ value }}
        </span>
        <span
          v-if="unit"
          class="geo-kpi__unit"
        >
          {{ unit }}
        </span>
      </div>
      <div class="geo-kpi__row">
        <span
          v-if="description"
          class="geo-kpi__description"
        >
          {{ description }}
        </span>
        <slot name="descriptionTooltip" />
      </div>
    </div>
  </div>
</template>

<script>
import mixin, { TYPES } from './GeoKPI.mixin'
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

/**
 * `GeoKPI` is a component for displaying data, specially designed to display Key Performance Indicators
 */

export default {
  name: 'GeoKPI',
  status: 'ready',
  release: '29.6.0',
  constants: {
    TYPES
  },
  mixins: [mixin],
  props: {
    /**
     * Predefined type scheme of the KPI component
     *
     * > **Note:** There are specific components to avoid explicitly writing this value.
     *
     * | type         |          Specific component         | Proposed usage (example) |
     * |--------------|-------------------------------------|--------------------------|
     * | `standard`   | [GeoKPI](./GeoKPI)                  | Standard KPI             |
     * | `positive`   | [GeoPositiveKPI](./GeoPositiveKPI)  | Positive value KPI       |
     * | `neutral`    | [GeoNeutralKPI](./GeoNeutralKPI)    | Neutral value KPI        |
     * | `negative`   | [GeoNegativeKPI](./GeoNegativeKPI)  | Negative value KPI       |
     *
     * Supported `type` values are exported under `TYPES` named export. See
     * [Component Constants](/docs/guides/using-constants) for more info on how to
     * use those constants in your code.
     */
    type: enumPropertyFactory({
      componentName: 'GeoKPI',
      propertyName: 'type',
      enumDictionary: TYPES,
      defaultValue: TYPES.standard
    })
  },
  computed: {
    kpiCssClasses () {
      return `geo-kpi geo-kpi--${this.type} geo-kpi--${this.isPrimary ? 'is-primary' : 'is-secondary'}`
    }
  }
}
</script>
