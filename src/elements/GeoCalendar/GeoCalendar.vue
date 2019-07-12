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
            v-model="formattedFromDate"
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
            input-type="normal"
          />
          <geo-link-button
            css-modifier="calendar-picker-button"
            @click="setEarliestDate"
          >
            {{ earliestDatePlaceholder }}
          </geo-link-button>
        </div>
        <font-awesome-icon
          :icon="inputRangeIcon"
          class="geo-calendar__input-range-icon"
          fixed-width
        />
        <div class="geo-calendar__input geo-calendar__input--end">
          <geo-input
            v-model="formattedToDate"
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
            input-type="normal"
          />
          <geo-link-button
            css-modifier="calendar-picker-button"
            @click="setLatestDate"
          >
            {{ latestDatePlaceholder }}
          </geo-link-button>
        </div>
      </div>
      <!-- TODO: Bind props to component -->
      <geo-calendar-picker
        ref="calendarPicker"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :picker-date-unit="pickerDateUnit"
        :granularity-id="granularityId"
        :locale="locale"
        :earliest-date="earliestDate"
        :latest-date="latestDate"
        @select-day="selectDay"
      />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import { format, isBefore } from 'date-fns'

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

    calendarNavigationSelectIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
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

    earliestDate: {
      type: Date,
      required: true
    },

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    latestDate: {
      type: Date,
      required: true
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
      fromDate: null,
      toDate: null
    }
  },
  computed: {
    formattedFromDate () {
      return this.fromDate ? this.formatDate(this.fromDate) : null
    },

    formattedToDate () {
      return this.toDate ? this.formatDate(this.toDate) : null
    }
  },
  methods: {
    setEarliestDate () {
      this.fromDate = this.formatDate(this.earliestDate)
    },

    setLatestDate () {
      this.toDate = this.formatDate(this.latestDate)
    },

    selectDay (day) {
      if (!this.fromDate || (this.fromDate && isBefore(day, this.fromDate))) {
        this.fromDate = day
      } else {
        this.toDate = day
      }
    },

    formatDate (date) {
      return format(date, 'DD/MM/YYYY')
    }
  }
}
</script>
