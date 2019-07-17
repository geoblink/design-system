<template>
  <geo-calendar-day-grid
    v-if="isDayGrid"
    :locale="locale"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    :current-month="currentMonth"
    :current-year="currentYear"
    :earliest-date="earliestDate"
    :latest-date="latestDate"
    :granularity-id="granularityId"
    @select-day="selectDay"
    @select-week="selectWeek"
  />
  <geo-calendar-month-grid
    v-else-if="isMonthGrid"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    :current-year="currentYear"
    @select-month="selectMonth"
  />
  <geo-calendar-year-grid
    v-else-if="isYearGrid"
    :locale="locale"
  />
</template>

<script>
import { PICKER_DATE_UNITS } from './GeoCalendar.utils'

export default {
  name: 'GeoCalendarGrid',
  props: {
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
    },

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

    latestDate: {
      type: Date,
      required: true
    },

    granularityId: {
      type: String,
      required: true
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

    selectWeek ({ fromDate, toDate }) {
      this.$emit('select-week', { fromDate, toDate })
    },

    selectMonth (monthIndex) {
      this.$emit('select-month', monthIndex)
    }
  }
}
</script>
