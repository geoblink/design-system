<template>
  <div
    :class="{
      'months-container__quarter': true,
      'months-container__quarter--actionable': canQuarterBeHighlighted,
      'months-container__quarter--no-data': isSomeMonthInQuarterWithoutData
    }"
  >
    <geo-calendar-month-grid-month-unit
      v-for="month in quarter"
      :key="month.index"
      :current-year="currentYear"
      :granularity-id="granularityId"
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

import {
  isBefore,
  isAfter
} from 'date-fns'

export default {
  name: 'GeoCalendarMonthGridQuarterUnit',
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarGranularityIdMixin
  ],
  props: {
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
      required: false
    },

    /**
     * Latest date that can be selected
     */
    latestDate: {
      type: Date,
      required: false
    },

    /**
     * Array of months by quarter
     */
    quarter: {
      type: Array,
      required: true
    }
  },

  computed: {
    isSomeMonthInQuarterWithoutData () {
      return _.reduce(this.quarter, (accum, month) => accum || this.isMonthWithoutData(month.index), false)
    },

    canQuarterBeHighlighted () {
      return this.granularityId === GRANULARITY_IDS.quarter
    }
  },

  methods: {
    isMonthWithoutData (monthIndex) {
      return (
        (
          isBefore(new Date(this.currentYear, monthIndex), this.earliestDate)
        ) || (
          isAfter(new Date(this.currentYear, monthIndex), this.latestDate)
        )
      )
    },

    selectMonth (monthIndex) {
      if (this.isMonthWithoutData(monthIndex)) return
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
