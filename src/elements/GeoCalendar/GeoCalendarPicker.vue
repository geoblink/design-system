<template>
  <div class="geo-calendar-picker">
    <geo-calendar-navigation
      ref="calendarNavigationWrapper"
      :calendar-navigation-select-icon="calendarNavigationSelectIcon"
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
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
import GeoCalendarDateIndicators from './GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'

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
  status: 'missing-tests',
  release: '22.3.0',
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
       * @type {{ fromDate: Date, toDate: Date}}
       */
      this.$emit('select-week', { fromDate, toDate })
    }
  }
}
</script>
