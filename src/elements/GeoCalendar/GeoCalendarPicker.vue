<template>
  <div class="geo-calendar-picker">
    <geo-calendar-navigation
      ref="calendarNavigationWrapper"
      :calendar-navigation-select-icon="calendarNavigationSelectIcon"
      :current-month="currentMonth"
      :current-year="currentYear"
      :current-initial-year-in-range="currentInitialYearInRange"
      :current-end-year-in-range="currentEndYearInRange"
      :earliest-date="earliestDate"
      :is-next-picker-date-selector-disabled="!canSelectNextDates"
      :is-previous-picker-date-selector-disabled="!canSelectPastDates"
      :latest-date="latestDate"
      :locale="locale"
      :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
      :picker-date-unit="pickerDateUnit"
      :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
      @go-to-next-picker-date="goToNextPickerDate"
      @go-to-previous-picker-date="goToPreviousPickerDate"
      @go-to-month="goToMonth"
      @go-to-year="goToYear"
      @go-to-year-range="goToYearRange"
    />
    <geo-calendar-grid
      :current-month="currentMonth"
      :current-year="currentYear"
      :current-initial-year-in-range="currentInitialYearInRange"
      :current-end-year-in-range="currentEndYearInRange"
      :earliest-date="earliestDate"
      :granularity-id="granularityId"
      :latest-date="latestDate"
      :locale="locale"
      :picker-date-unit="pickerDateUnit"
      :selected-from-day="selectedFromDay"
      :selected-to-day="selectedToDay"
      @select-day="selectDay($event)"
      @select-week="selectWeek($event)"
      @select-month="selectMonth"
      @select-quarter="selectQuarter($event)"
      @select-year="selectYear($event)"
    />
  </div>
</template>

<script>
import { PICKER_DATE_UNITS, YEAR_GRID_CONSTANTS } from './GeoCalendar.utils'
import GeoCalendarDateIndicators from './GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'

import {
  addMonths,
  addYears,
  getMonth,
  getYear,
  subMonths,
  subYears,
  isBefore,
  isAfter
} from 'date-fns'

export default {
  name: 'GeoCalendarPicker',
  status: 'missing-tests',
  release: '23.2.0',
  mixins: [
    GeoCalendarDateIndicators,
    GeoCalendarGranularityIdMixin,
    GeoCalendarPickerDateUnitMixin
  ],
  props: {
    /**
     * Font Awesome 5 icon to be displayed in the selects of the navigation menu.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    calendarNavigationSelectIcon: {
      type: Array,
      required: true
    },

    /**
     * Initial year within the actual grid year range
     */
    currentInitialYearInRange: {
      type: Number,
      required: true
    },

    /**
     * End year within the actual grid year range
     */
    currentEndYearInRange: {
      type: Number,
      required: true
    },

    /**
     * Font Awesome 5 icon to navigate forward through different time units
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    /**
     * Font Awesome 5 icon to navigate backwards through different time units
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    /**
     * Selected initial date
     */
    selectedFromDay: {
      type: Date,
      required: false
    },

    /**
     * Selected end date
     */
    selectedToDay: {
      type: Date,
      required: false
    }
  },

  computed: {
    currentDate () {
      return new Date(this.currentYear, this.currentMonth)
    },

    canSelectNextDates () {
      if (!this.latestDate) return true
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day:
        case PICKER_DATE_UNITS.month:
          return isBefore(addMonths(new Date(this.currentYear, this.currentMonth), 1), this.latestDate)
        case PICKER_DATE_UNITS.year:
          return isBefore(new Date(this.currentEndYearInRange, this.currentMonth), this.latestDate)
        default:
          throw new Error(`Unknown pickerDateUnit «${this.pickerDateUnit}»`)
      }
    },

    canSelectPastDates () {
      if (!this.earliestDate) return true
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day:
        case PICKER_DATE_UNITS.month:
          return isAfter(new Date(this.currentYear, this.currentMonth), this.earliestDate)
        case PICKER_DATE_UNITS.year:
          return isAfter(subYears(new Date(this.currentInitialYearInRange, this.currentMonth), 1), this.earliestDate)
        default:
          throw new Error(`Unknown pickerDateUnit «${this.pickerDateUnit}»`)
      }
    }
  },

  methods: {
    goToNextPickerDate () {
      if (!this.canSelectNextDates) return
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day: {
          if (this.currentMonth === 11) {
            const nextYear = getYear(addYears(this.currentDate, 1))
            this.goToYear(nextYear)
          }
          const nextMonth = getMonth(addMonths(this.currentDate, 1))
          this.goToMonth(nextMonth)
          break
        }
        case PICKER_DATE_UNITS.month:
          const nextYear = getYear(addYears(this.currentDate, 1))
          this.goToYear(nextYear)
          break
        case PICKER_DATE_UNITS.year:
          const nextInitialYearInRange = this.currentInitialYearInRange + YEAR_GRID_CONSTANTS.YEARS_IN_GRID
          const nextLastYearInRange = this.currentEndYearInRange + YEAR_GRID_CONSTANTS.YEARS_IN_GRID
          if (nextInitialYearInRange > getYear(this.latestDate)) return
          this.goToYearRange([nextInitialYearInRange, nextLastYearInRange])
          break
      }
    },

    goToPreviousPickerDate () {
      if (!this.canSelectPastDates) return
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day: {
          if (this.currentMonth === 0) {
            const previousYear = getYear(subYears(this.currentDate, 1))
            this.goToYear(previousYear)
          }
          const previousMonth = getMonth(subMonths(this.currentDate, 1))
          this.goToMonth(previousMonth)
          break
        }
        case PICKER_DATE_UNITS.month:
          const previousYear = getYear(subYears(this.currentDate, 1))
          this.goToYear(previousYear)
          break
        case PICKER_DATE_UNITS.year:
          const previousInitialYearInRange = this.currentInitialYearInRange - YEAR_GRID_CONSTANTS.YEARS_IN_GRID
          const previousLastYearInRange = this.currentEndYearInRange - YEAR_GRID_CONSTANTS.YEARS_IN_GRID
          if (previousLastYearInRange < getYear(this.earliestDate)) return
          this.goToYearRange([previousInitialYearInRange, previousLastYearInRange])
          break
      }
    },

    goToMonth (monthIndex) {
      /**
       * User displays a different month in the current grid
       *
       * @event go-to-month
       * @type {Number}
       */
      this.$emit('go-to-month', monthIndex)
    },

    goToYear (year) {
      /**
       * User displays a different year in the current grid
       *
       * @event go-to-year
       * @type {Number}
       */
      this.$emit('go-to-year', year)
    },

    goToYearRange (yearRange) {
      /**
       * User displays a different year range in the current grid
       *
       * @event go-to-year-range
       * @type {Array}
       */
      this.$emit('go-to-year-range', yearRange)
    },

    selectDay (day) {
      /**
       * User selects a particular day within the day grid
       *
       * @event select-day
       * @type {Date}
       */
      this.$emit('select-day', day)
    },

    selectMonth (monthIndex) {
      /**
       * User selects a particular month within the month grid
       *
       * @event select-month
       * @type {Number}
       */
      this.$emit('select-month', monthIndex)
    },

    selectQuarter (monthIndex) {
      /**
       * User selects a particular quarter within the month grid
       *
       * @event select-quarter
       * @type {Number}
       */
      this.$emit('select-quarter', monthIndex)
    },

    selectWeek ({ fromDate, toDate }) {
      /**
       * User selects a particular week within the day grid
       *
       * @event select-week
       * @type {{ fromDate: Date, toDate: Date }}
       */
      this.$emit('select-week', { fromDate, toDate })
    },

    selectYear (year) {
      /**
       * User selects a particular year within the years grid
       *
       * @event select-year
       * @type {Number}
       */
      this.$emit('select-year', year)
    }
  }
}
</script>