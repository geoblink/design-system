<template>
  <div class="geo-calendar-picker">
    <geo-calendar-navigation
      ref="calendarNavigationWrapper"
      :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
      :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
      :calendar-navigation-select-icon="calendarNavigationSelectIcon"
      :picker-date-unit="pickerDateUnit"
      :granularity-id="granularityId"
      :locale="locale"
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      @go-to-previous-picker-date="goToPreviousPickerDate"
      @go-to-next-picker-date="goToNextPickerDate"
      @go-to-month="goToMonth"
      @go-to-year="goToYear"
    />
    <geo-calendar-grid
      :locale="locale"
      :picker-date-unit="pickerDateUnit"
      :selected-day="selectedDay"
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      :granularity-id="granularityId"
      @select-day="selectDay"
      @select-month="selectMonth"
    />
  </div>
</template>

<script>
import { PICKER_DATE_UNITS } from './GeoCalendar.utils'

import {
  getMonth, getYear, addMonths, subMonths, subYears, addYears
} from 'date-fns'

export default {
  name: 'GeoCalendarPicker',
  props: {
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    calendarNavigationSelectIcon: {
      type: Array,
      required: true
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
    },

    earliestDate: {
      type: Date,
      required: true
    },

    latestDate: {
      type: Date,
      required: true
    },

    selectedDay: {
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
    }
  },

  computed: {
    currentDate () {
      return new Date(this.currentYear, this.currentMonth)
    }
  },

  methods: {
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

    selectDay (day) {
      this.$emit('select-day', day)
    },

    selectMonth (monthIndex) {
      this.$emit('select-month', monthIndex)
    },

    goToMonth (monthIndex) {
      this.$emit('go-to-month', monthIndex)
    },

    goToYear (year) {
      this.$emit('go-to-year', year)
    }
  }
}
</script>
