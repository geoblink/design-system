<template>
  <geo-calendar-day-grid
    v-if="isDayGrid"
    :css-modifier="cssModifier"
    :current-month="currentMonth"
    :current-year="currentYear"
    :earliest-date="earliestDate"
    :granularity-id="granularityId"
    :latest-date="latestDate"
    :locale="locale"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    @select-day="selectDay($event)"
    @select-week="selectWeek($event)"
    @day-unit-mouseover="emitDayUnitMouseover($event)"
  />
  <geo-calendar-month-grid
    v-else-if="isMonthGrid"
    :css-modifier="cssModifier"
    :current-month="currentMonth"
    :current-year="currentYear"
    :earliest-date="earliestDate"
    :granularity-id="granularityId"
    :latest-date="latestDate"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    @select-month="selectMonth"
    @select-quarter="selectQuarter($event)"
    @month-unit-mouseover="emitMonthUnitMouseover($event)"
  />
  <geo-calendar-year-grid
    v-else-if="isYearGrid"
    :css-modifier="cssModifier"
    :current-month="currentMonth"
    :current-year="currentYear"
    :current-initial-year-in-range="currentInitialYearInRange"
    :current-end-year-in-range="currentEndYearInRange"
    :earliest-date="earliestDate"
    :granularity-id="granularityId"
    :latest-date="latestDate"
    :selected-from-day="selectedFromDay"
    :selected-to-day="selectedToDay"
    @select-year="selectYear($event)"
    @year-unit-mouseover="emitYearUnitMouseover($event)"
  />
</template>

<script>
import cssSuffix from '../../../mixins/cssModifierMixin'
import { PICKER_DATE_UNITS } from '../GeoCalendar.utils'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from '../GeoCalendarPickerDateUnit.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarGrid',
  status: 'ready',
  release: '23.2.0',
  mixins: [
    GeoCalendarDateIndicatorsMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarPickerDateUnitMixin,
    GeoCalendarGridMixin,
    cssSuffix
  ],

  props: {
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
    },

    emitDayUnitMouseover (day) {
      /**
       * User hovers on a potential selected date
       *
       * @event day-unit-mouseover
       * @type {Date}
       */
      this.$emit('day-unit-mouseover', day)
    },

    emitMonthUnitMouseover (monthIndex) {
      /**
       * User hovers on a potential selected month
       *
       * @event month-unit-mouseover
       * @type {Number}
       */
      this.$emit('month-unit-mouseover', monthIndex)
    },

    emitYearUnitMouseover (year) {
      /**
       * User hovers on a potential selected year
       *
       * @event year-unit-mouseover
       * @type {Number}
       */
      this.$emit('year-unit-mouseover', year)
    }
  }
}
</script>
