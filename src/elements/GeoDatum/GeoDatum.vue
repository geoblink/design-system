<template>
  <div
    class="geo-datum"
    :class="[`geo-datum${valueCSSSuffix}`,{
      'geo-datum--is-primary' : isPrimaryValue,
      'geo-datum--is-secondary' : !isPrimaryValue,
    }]"
  >
    <div class="geo-datum__row">
      <font-awesome-icon
        v-if="warningTooltip"
        :icon="statusIcon"
        :style="statusIconStyle"
        fixed-width
        aria-hidden
      />
      <!--<geo-tooltip
        :visible="isWarningTooltipVisible"
        :position="tooltipPosition"
        :alignment="tooltipAlignment"
      >
        <div ref="tooltipWarningContent" />
      </geo-tooltip>-->
      <span
        class="geo-datum__value"
      >
        {{ value }}
      </span>
      <span
        v-if="unit"
        class="geo-datum__unit"
      >
        {{ unit }}
      </span>
    </div>
    <div class="geo-datum__row">
      <span
        v-if="description"
        class="geo-datum__description"
        :style="colorHighlight"
      >
        {{ description }}
      </span>
      <font-awesome-icon
        ref="descriptionTooltipIcon"
        class="geo-datum__description-tooltip-icon"
        data-tooltip-id="descriptionTooltipIcon"
        :icon="['fas', 'info-circle']"
      />
      <geo-tooltip :forced-trigger-target="descriptionTooltipIcon">
        {{ descriptionTooltip }}
      </geo-tooltip>
    </div>
  </div>
</template>

<script>
/**
 * `GeoDatum` is ... TODO: Write description
 */

const TEXT_MODIFIERS = {
  green: 'green',
  yellow: 'yellow',
  red: 'red'
}
export default {
  name: 'GeoDatum',
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
     * datum variable value
     */
    value: {
      type: String,
      required: true
    },
    /**
     * datum Unit symbol
     */
    unit: {
      type: String,
      required: false
    },
    /**
     * datum description text
     */
    description: {
      type: String,
      required: false
    },
    /**
     * datum description text
     */
    descriptionTooltip: {
      type: String,
      required: false
    },
    /**
     * datum is primary or not
     */
    isPrimaryValue: {
      type: Boolean,
      required: true
    },
    /**
     * datum color highlight
     */
    colorHighlight: {
      type: String,
      required: false,
      validator (value) {
        return value in TEXT_MODIFIERS
      }
    }
  },
  data () {
    return {
      descriptionTooltipIcon: null
    }
  },
  computed: {
    isDescriptionTooltipVisible () {
      return !!this.descriptionTooltip || false
    },
    valueCSSSuffix () {
      return this.colorHighlight ? `--${this.colorHighlight}` : ''
    }
  },
  mounted () {
    this.descriptionTooltipIcon = this.$refs.descriptionTooltipIcon
  },
  methods: {

  }
}
</script>
