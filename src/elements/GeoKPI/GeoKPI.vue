<template>
  <div
    class="geo-KPI"
    :class="[`geo-KPI${valueCSSSuffix}`,{
      'geo-KPI--is-primary' : data.isPrimary,
      'geo-KPI--is-secondary' : !data.isPrimary,
    }]"
  >
    <div class="geo-KPI__column">
      <slot name="warningTooltip" />
    </div>
    <div class="geo-KPI__column">
      <div class="geo-KPI__row">
        <span
          class="geo-KPI__value"
        >
          {{ data.value }}
        </span>
        <span
          v-if="data.unit"
          class="geo-KPI__unit"
        >
          {{ data.unit }}
        </span>
      </div>
      <div class="geo-KPI__row">
        <span
          v-if="data.description"
          class="geo-KPI__description"
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
     * Object containing all the KPI data
     *
     * **Note:** value and isPrimary properties are required, check examples to get more details.
     */
    data: {
      type: Object,
      required: true,
      validator (data) {
        return _.isBoolean(data.isPrimary) && data.value
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    valueCSSSuffix () {
      return this.data.colorHighlight && _.includes(COLOR_MODIFIERS, this.data.colorHighlight) ? `--${this.data.colorHighlight}` : ''
    }
  },
  methods: {

  }
}
</script>
