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
      @go-to-previous-picker-date="goToPreviousPickerDate"
      @go-to-next-picker-date="goToNextPickerDate"
      @select-month="selectMonth"
    />
    <geo-calendar-grid
      :locale="locale"
      :picker-date-unit="pickerDateUnit"
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      @select-day="selectDay"
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
    }
  },
  data () {
    return {
      currentMonth: getMonth(new Date()),
      currentYear: getYear(new Date())
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
          if (this.currentMonth === 0) this.currentYear = getYear(subYears(this.currentDate, 1))
          this.currentMonth = getMonth(subMonths(this.currentDate, 1))
          break
        case PICKER_DATE_UNITS.month:
          this.currentYear = getYear(subYears(this.currentYear, 1))
          break
        case PICKER_DATE_UNITS.year:
          // TODO: Range of years
          break
      }
    },

    goToNextPickerDate () {
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day:
          if (this.currentMonth === 11) this.currentYear = getYear(addYears(this.currentDate, 1))
          this.currentMonth = getMonth(addMonths(this.currentDate, 1))
          break
        case PICKER_DATE_UNITS.month:
          this.currentYear = getYear(addYears(this.currentYear, 1))
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
      this.currentMonth = monthIndex
    }
  }
}
</script>
