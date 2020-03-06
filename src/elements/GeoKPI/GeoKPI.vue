<template>
  <div class="geo-kpi">
    <font-awesome-icon
      v-if="warningTooltip"
      :icon="statusIcon"
      :style="statusIconStyle"
      fixed-width
      aria-hidden
    />
    <geo-tooltip
      :visible="warningTooltip"
      :position="tooltipPosition"
      :alignment="tooltipAlignment"
    >
      <div ref="tooltipWarningContent" />
    </geo-tooltip>
    <div
      class="geo-kpi_value"
      :style="colorHighlight"
    >
      {kpiValue}
    </div>
    <div
      v-if="kpiUnit"
      class="geo-kpi_unit"
    >
      {kpiUnit}
    </div>
    <div
      v-if="kpiUnit"
      class="geo-kpi_description"
      :style="colorHighlight"
    >
      {kpiDescription}
    </div>
    <geo-tooltip
      :visible="kpiDescriptionTooltip"
      :position="tooltipPosition"
      :alignment="tooltipAlignment"
    >
      <div ref="tooltipContent" />
    </geo-tooltip>
  </div>
</template>

<script>
import { POSITIONS, ALIGNMENTS } from '../GeoTooltip/GeoTooltip.constants'
/**
 * `GeoKPI` is ... TODO: Write description
 */
export default {
  name: 'GeoKPI',
  status: 'missing-tests',
  release: 'CHANGE ME',
  props: {
    /**
     * Tooltip warning text
     */
    warningTooltip: {
      type: String,
      required: false
    },
    /**
     * KPI variable value
     */
    kpiValue: {
      type: String,
      required: true
    },
    /**
     * KPI Unit symbol
     */
    kpiUnit: {
      type: String,
      required: false
    },
    /**
     * KPI description text
     */
    kpiDescription: {
      type: String,
      required: false
    },
    /**
     * KPI description text
     */
    kpiDescriptionTooltip: {
      type: String,
      required: false
    },
    /**
     * KPI is primary or not
     */
    isPrimaryValue: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
