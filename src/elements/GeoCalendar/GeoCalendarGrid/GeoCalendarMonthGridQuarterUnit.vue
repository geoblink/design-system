<template>
  <div
    :class="{
      'geo-calendar-months-container__quarter': true,
      'geo-calendar-months-container__quarter--actionable': canQuarterBeHighlighted,
      'geo-calendar-months-container__quarter--unavailable': canQuarterBeHighlighted && isSomeMonthInQuarterUnavailable
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
      :month="month"
      :selected-from-day="selectedFromDay"
      :selected-to-day="selectedToDay"
      @select-month-unit="selectMonth"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { GRANULARITY_IDS } from '../GeoCalendar.utils'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'

import {
  isBefore,
  isAfter
} from 'date-fns'

export default {
  name: 'GeoCalendarMonthGridQuarterUnit',
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
          isBefore(new Date(this.currentYear, monthIndex), this.earliestDate)
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
    }
  }
}
</script>
