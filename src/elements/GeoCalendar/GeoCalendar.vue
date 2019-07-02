<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div class="geo-calendar__granularity-selectors">
      <slot name="pickerGranularity" />
      <!-- TODO: Put aliases in different slot -->
      <!-- <slot name="aliases" /> -->
    </div>
    <div class="geo-calendar__picker-controls">
      <!-- TODO Add Input ranges -->
      <div class="geo-calendar__input-ranges">
        <div class="geo-calendar__input geo-calendar__input--start">
          <geo-input
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
            input-type="normal"
          />
          <geo-tertiary-button css-modifier="calendar-picker-button">
            {{ earliestDatePlaceholder }}
          </geo-tertiary-button>
        </div>
        <font-awesome-icon
          :icon="inputRangeIcon"
          fixed-width
        />
        <div class="geo-calendar__input geo-calendar__input--end">
          <geo-input
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
            input-type="normal"
          />
          <geo-tertiary-button css-modifier="calendar-picker-button">
            {{ latestDatePlaceholder }}
          </geo-tertiary-button>
        </div>
      </div>
      <!-- TODO: Bind props to component -->
      <geo-calendar-picker
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :picker-date-unit="pickerDateUnit"
        :granularity-id="granularityId"
        :locale="locale"
      />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoCalendar',
  status: 'missing-tests',
  release: 'CHANGE ME',
  mixins: [cssSuffix],
  props: {
    inputRangeIcon: {
      type: Array,
      default () {
        return ['fal', 'arrow-right']
      }
    },

    previousDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-left']
      }
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-right']
      }
    },

    fromInputPlaceholder: {
      type: String,
      required: false
    },

    toInputPlaceholder: {
      type: String,
      required: false
    },

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    latestDatePlaceholder: {
      type: String,
      required: false
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    granularityId: {
      type: String,
      required: true
    },

    locale: {
      type: Object,
      required: true
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
