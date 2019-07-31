<template>
  <button
    :class="{
      'geo-calendar-quarter__month-unit': true,
      'geo-calendar-quarter__month-unit--selected': isDateInMonth,
      'geo-calendar-quarter__month-unit--within-range': isDateWithinSelectedMonths,
      'geo-calendar-quarter__month-unit--unavailable': isMonthUnavailable,
      'geo-calendar-quarter__month-unit--from-date': isDayWithinFromMonth,
      'geo-calendar-quarter__month-unit--to-date': isDayWithinToMonth
    }"
    @click="selectMonth"
  >
    <div class="month-unit__month-name">
      {{ monthName }}
    </div>
  </button>
</template>

<script>
import {
  addMonths,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  startOfDay
} from 'date-fns'

import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'

export default {
  name: 'GeoCalendarMonthGridMonthUnit',
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarDateIndicatorsMixin
  ],
  props: {
    /**
     * Month name.
     * ie: 'September'
     */
    monthName: {
      type: String,
      required: true
    },

    /**
     * Month index within the year (0 - 11).
     */
    monthIndex: {
      type: Number,
      required: true
    }
  },

  computed: {
    currentDate () {
      return new Date(this.currentYear, this.monthIndex)
    },

    isDateInMonth () {
      return (
        (
          this.selectedFromDay &&
          getMonth(this.selectedFromDay) === this.monthIndex &&
          getYear(this.selectedFromDay) === this.currentYear
        ) || (
          this.selectedToDay &&
          getMonth(this.selectedToDay) === this.monthIndex &&
          getYear(this.selectedToDay) === this.currentYear
        )
      )
    },

    isDateWithinSelectedMonths () {
      return (
        (
          this.selectedFromDay &&
          isAfter(addMonths(this.currentDate, 1), this.selectedFromDay)
        ) && (
          this.selectedToDay &&
          isBefore(startOfDay(this.currentDate), this.selectedToDay)
        )
      )
    },

    isMonthUnavailable () {
      return isBefore(this.currentDate, this.earliestDate) ||
        isAfter(this.currentDate, this.latestDate)
    },

    isDayWithinFromMonth () {
      return getMonth(this.selectedFromDay) === this.monthIndex && getYear(this.selectedFromDay) === this.currentYear
    },

    isDayWithinToMonth () {
      return getMonth(this.selectedToDay) === this.monthIndex && getYear(this.selectedToDay) === this.currentYear
    }
  },

  methods: {
    selectMonth () {
      /**
       * User selects a particular month of the year within the grid
       *
       * @event select-month-unit
       * @type {Number}
       */
      this.$emit('select-month-unit', this.monthIndex)
    }
  }
}
</script>
