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
    :current-month="currentMonth"
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
    :current-month="currentMonth"
    :current-year="currentYear"
    :current-initial-year-in-range="currentInitialYearInRange"
    :current-end-year-in-range="currentEndYearInRange"
    :earliest-date="earliestDate"
    :granularity-id="granularityId"
    :latest-date="latestDate"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    @select-year="selectYear"
  />
</template>

<script>
import { PICKER_DATE_UNITS } from '../GeoCalendar.utils'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from '../GeoCalendarPickerDateUnit.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarGrid',
  status: 'missing-tests',
  release: '22.3.0',
  mixins: [
    GeoCalendarDateIndicatorsMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarPickerDateUnitMixin,
    GeoCalendarGridMixin
  ],

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
