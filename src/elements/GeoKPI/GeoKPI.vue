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
          {{ data.value }}
        </span>
        <span
          v-if="data.unit"
          class="geo-kpi__unit"
        >
          {{ data.unit }}
        </span>
      </div>
      <div class="geo-kpi__row">
        <span
          v-if="data.description"
          class="geo-kpi__description"
        >
          {{ data.description }}
        </span>
        <slot name="descriptionTooltip" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * `GeoKPI` is a component for displaying data, specially designed to display Key Performance Indicators
 */
import _ from 'lodash'
const COLOR_MODIFIERS = [
  'green',
  'yellow',
  'red'
]

export default {
  name: 'GeoKPI',
  status: 'ready',
  release: '29.6.0',
  props: {
    /**
     * Object that contains all the KPI data, cotaining following described properties
     *
     * data.isPrimary {Boolean} - Determines if KPI data is primary or not
     *
     * data.value {string|Number} - KPI data value
     *
     * [data.unit] {string} - KPI data unit
     *
     * [data.colorHighlight] {string} - Color of the KPI info
     *
     * [data.description] {string} - KPI data description
     *
     */
    data: {
      type: Object,
      required: true,
      validator (data) {
        if (!_.isBoolean(data.isPrimary)) return false
        if (typeof data.value !== 'string' && typeof data.value !== 'number') return false
        if (data.colorHighlight && !_.includes(COLOR_MODIFIERS, data.colorHighlight)) return false
        return true
      }
    }
  },
  computed: {
    kpiCssClasses () {
      return `geo-kpi ${this.data.colorHighlight ? `geo-kpi--${this.data.colorHighlight}` : ''} 
              geo-kpi--${this.data.isPrimary ? 'is-primary' : 'is-secondary'}`
    }
  }
}
</script>
