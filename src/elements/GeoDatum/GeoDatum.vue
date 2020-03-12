<template>
  <div
    class="geo-datum"
    :class="[`geo-datum${valueCSSSuffix}`,{
      'geo-datum--is-primary' : data.isPrimary,
      'geo-datum--is-secondary' : !data.isPrimary,
    }]"
  >
    <div class="geo-datum__column">
      <font-awesome-icon
        v-if="data.warningTooltip"
        ref="warningTooltipIcon"
        class="geo-datum__warning-tooltip-icon"
        data-tooltip-id="warningTooltipIcon"
        :icon="['fas', 'exclamation-triangle']"
      />
      <geo-tooltip :forced-trigger-target="warningTooltipIcon">
        {{ data.warningTooltip }}
      </geo-tooltip>
    </div>
    <div class="geo-datum__column">
      <div class="geo-datum__row">
        <span
          class="geo-datum__value"
        >
          {{ data.value }}
        </span>
        <span
          v-if="data.unit"
          class="geo-datum__unit"
        >
          {{ data.unit }}
        </span>
      </div>
      <div class="geo-datum__row">
        <span
          v-if="data.description"
          class="geo-datum__description"
        >
          {{ data.description }}
        </span>
        <font-awesome-icon
          ref="descriptionTooltipIcon"
          class="geo-datum__description-tooltip-icon"
          data-tooltip-id="descriptionTooltipIcon"
          :icon="['fas', 'info-circle']"
        />
        <geo-tooltip :forced-trigger-target="descriptionTooltipIcon">
          {{ data.descriptionTooltip }}
        </geo-tooltip>
      </div>
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
     * Object containing all the datum data
     */
    data: {
      type: Object,
      required: true,
      validator (data) {
        return data.value
      }
    }
  },
  data () {
    return {
      descriptionTooltipIcon: null,
      warningTooltipIcon: null
    }
  },
  computed: {
    isDescriptionTooltipVisible () {
      return !!this.data.descriptionTooltip || false
    },
    valueCSSSuffix () {
      return this.data.colorHighlight ? `--${this.data.colorHighlight}` : ''
    }
  },
  mounted () {
    this.descriptionTooltipIcon = this.$refs.descriptionTooltipIcon
    this.warningTooltipIcon = this.$refs.warningTooltipIcon
  },
  methods: {

  }
}
</script>
