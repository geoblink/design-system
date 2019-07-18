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
    /**
     * Number of the month within a year that is currently being displayed in the grid(ie: `0 -> january`, `11 -> december`)
     */
    currentMonth: {
      type: Number,
      required: true
    },

    /**
     * Year that is currently being displayed in the grid
     */
    currentYear: {
      type: Number,
      required: true
    },

    /**
     * Earliest date that can be selected
     */
    earliestDate: {
      type: Date,
      required: true
    },

    /**
     * Current granularity being displayed on the calendar. `day`, `week`, `month`, `quarter`, `year`
     * Values available in `GRANULARITY_IDS`:
     *
     * - `GRANULARITY_IDS.day`
     * - `GRANULARITY_IDS.week`
     * - `GRANULARITY_IDS.month`
     * - `GRANULARITY_IDS.quarter`
     * - `GRANULARITY_IDS.year`
     */
    granularityId: {
      type: String,
      required: true
    },

    /**
     * Latest date that can be selected
     */
    latestDate: {
      type: Date,
      required: true
    },

    /**
     * Object provided by date-fns specifying the locale being used
     */
    locale: {
      type: Object,
      required: true
    },

    /**
     * Type of grid being displayed. `day`, `month` or `year`
     * Values available in PICKER_DATE_UNITS:
     *
     * - `PICKER_DATE_UNITS.day`
     * - `PICKER_DATE_UNITS.month`
     * - `PICKER_DATE_UNITS.year`
     */
    pickerDateUnit: {
      type: String,
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
       * @type {{ fromDate: Date, toDate: Date}}
       */
      this.$emit('select-week', { fromDate, toDate })
    }
  }
}
</script>
