<template>
  <div
    :class="{
      'geo-calendar-grid__quarter-unit': true,
      'geo-calendar-grid__quarter-unit--actionable': canQuarterBeHighlighted,
      'geo-calendar-grid__quarter-unit--unavailable': canQuarterBeHighlighted && isSomeMonthInQuarterUnavailable
    }"
  >
    <geo-calendar-month-grid-month-unit
      v-for="month in quarter"
      :key="month.index"
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
      :granularity-id="granularityId"
      :latest-date="latestDate"
      :month-name="month.name"
      :month-index="month.index"
      :selected-from-day="selectedFromDay"
      :selected-to-day="selectedToDay"
      @select-month-unit="selectMonth($event)"
      @month-unit-mouseover="emitMonthUnitMouseover($event)"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { GRANULARITY_IDS, isBefore, isAfter } from '../GeoCalendar.utils'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import startOfMonth from 'date-fns/startOfMonth'

export default {
  name: 'GeoCalendarMonthGridQuarterUnit',
  internal: true,
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarDateIndicatorsMixin
  ],
  props: {
    /**
     * Array of months by quarter
     */
    quarter: {
      type: Array,
      required: true
    }
  },

  computed: {
    isSomeMonthInQuarterUnavailable () {
      return _.reduce(this.quarter, (accum, month) => accum || this.isMonthUnavailable(month.index), false)
    },

    canQuarterBeHighlighted () {
      return this.granularityId === GRANULARITY_IDS.quarter
    }
  },

  methods: {
    isMonthUnavailable (monthIndex) {
      return (
        (
          isBefore(new Date(this.currentYear, monthIndex), startOfMonth(this.earliestDate))
        ) || (
          isAfter(new Date(this.currentYear, monthIndex), this.latestDate)
        )
      )
    },

    selectMonth (monthIndex) {
      if (this.isMonthUnavailable(monthIndex)) return
      if (this.granularityId === GRANULARITY_IDS.month) {
        /**
         * User selects a particular month within the month grid
         *
         * @event select-month
         * @type {Number}
         */
        this.$emit('select-month', monthIndex)
      } else {
        /**
         * User selects a particular quarter within the month grid
         *
         * @event select-quarter
         * @type {Number}
         */
        this.$emit('select-quarter', monthIndex)
      }
    },

    emitMonthUnitMouseover (monthIndex) {
      /**
       * User hovers on a potential selected month
       *
       * @event month-unit-mouseover
       * @type {Number}
       */
      this.$emit('month-unit-mouseover', monthIndex)
    }
  }
}
</script>
