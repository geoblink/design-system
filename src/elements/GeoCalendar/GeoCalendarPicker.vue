<template>
  <div class="geo-calendar-picker">
    <geo-calendar-navigation
      ref="calendarNavigationWrapper"
      :calendar-navigation-select-icon="calendarNavigationSelectIcon"
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
      :granularity-id="granularityId"
      :latest-date="latestDate"
      :locale="locale"
      :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
      :picker-date-unit="pickerDateUnit"
      :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
      @go-to-next-picker-date="goToNextPickerDate"
      @go-to-previous-picker-date="goToPreviousPickerDate"
      @go-to-month="goToMonth"
      @go-to-year="goToYear"
    />
    <geo-calendar-grid
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
      :granularity-id="granularityId"
      :latest-date="latestDate"
      :locale="locale"
      :picker-date-unit="pickerDateUnit"
      :selected-from-day="selectedFromDay"
      :selected-to-day="selectedToDay"
      @select-day="selectDay"
      @select-week="selectWeek"
      @select-month="selectMonth"
      @select-quarter="selectQuarter"
    />
  </div>
</template>

<script>
import { PICKER_DATE_UNITS } from './GeoCalendar.utils'

import {
  addMonths,
  addYears,
  getMonth,
  getYear,
  subMonths,
  subYears
} from 'date-fns'

export default {
  name: 'GeoCalendarPicker',
  props: {
    calendarNavigationSelectIcon: {
      type: Array,
      required: true
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

    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    previousDateInSelectedGranularityIcon: {
      type: Array,
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
    currentDate () {
      return new Date(this.currentYear, this.currentMonth)
    }
  },

  methods: {
    goToNextPickerDate () {
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day:
          if (this.currentMonth === 11) {
            const nextYear = getYear(addYears(this.currentDate, 1))
            this.goToYear(nextYear)
          }
          const nextMonth = getMonth(addMonths(this.currentDate, 1))
          this.goToMonth(nextMonth)
          break
        case PICKER_DATE_UNITS.month:
          const nextYear = getYear(addYears(this.currentDate, 1))
          this.goToYear(nextYear)
          break
        case PICKER_DATE_UNITS.year:
          // TODO: Range of years
          break
      }
    },

    goToPreviousPickerDate () {
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day:
          if (this.currentMonth === 0) {
            const previousYear = getYear(subYears(this.currentDate, 1))
            this.goToYear(previousYear)
          }
          const previousMonth = getMonth(subMonths(this.currentDate, 1))
          this.goToMonth(previousMonth)
          break
        case PICKER_DATE_UNITS.month:
          const previousYear = getYear(subYears(this.currentDate, 1))
          this.goToYear(previousYear)
          break
        case PICKER_DATE_UNITS.year:
          // TODO: Range of years
          break
      }
    },

    goToMonth (monthIndex) {
      this.$emit('go-to-month', monthIndex)
    },

    goToYear (year) {
      this.$emit('go-to-year', year)
    },

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
