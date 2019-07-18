<template>
  <geo-calendar-day-grid
    v-if="isDayGrid"
    :current-month="currentMonth"
    :current-year="currentYear"
    :earliest-date="earliestDate"
    :granularity-id="granularityId"
    :latest-date="latestDate"
    :locale="locale"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    @select-day="selectDay"
    @select-week="selectWeek"
  />
  <geo-calendar-month-grid
    v-else-if="isMonthGrid"
    :current-year="currentYear"
    :earliest-date="earliestDate"
    :granularity-id="granularityId"
    :latest-date="latestDate"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    @select-month="selectMonth"
    @select-quarter="selectQuarter"
  />
  <geo-calendar-year-grid
    v-else-if="isYearGrid"
    :locale="locale"
  />
</template>

<script>
import { PICKER_DATE_UNITS } from '../GeoCalendar.utils'

export default {
  name: 'GeoCalendarGrid',
  props: {
    currentMonth: {
      type: Number,
      required: true
    },

    currentYear: {
      type: Number,
      required: true
    },

    earliestDate: {
      type: Date,
      required: true
    },

    granularityId: {
      type: String,
      required: true
    },

    latestDate: {
      type: Date,
      required: true
    },

    locale: {
      type: Object,
      required: true
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    selectedFromDay: {
      type: Date,
      required: false
    },

    selectedToDay: {
      type: Date,
      required: false
    }
  },

  computed: {
    isDayGrid () {
      return this.pickerDateUnit === PICKER_DATE_UNITS.day
    },

    isMonthGrid () {
      return this.pickerDateUnit === PICKER_DATE_UNITS.month
    },

    isYearGrid () {
      return this.pickerDateUnit === PICKER_DATE_UNITS.year
    }
  },

  methods: {
    selectDay (day) {
      this.$emit('select-day', day)
    },

    selectMonth (monthIndex) {
      this.$emit('select-month', monthIndex)
    },

    selectQuarter (monthIndex) {
      this.$emit('select-quarter', monthIndex)
    },

    selectWeek ({ fromDate, toDate }) {
      this.$emit('select-week', { fromDate, toDate })
    }
  }
}
</script>
