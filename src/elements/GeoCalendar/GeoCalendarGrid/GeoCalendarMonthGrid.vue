<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__months-container">
      <geo-calendar-month-grid-quarter-unit
        v-for="(quarter, index) in monthsByQuarters"
        :key="index"
        :quarter="quarter"
        :current-year="currentYear"
        :earliest-date="earliestDate"
        :granularity-id="granularityId"
        :latest-date="latestDate"
        :selected-from-day="selectedFromDay"
        :selected-to-day="selectedToDay"
        @select-month="selectMonth"
        @select-quarter="selectQuarter"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  eachDay,
  endOfYear,
  format,
  getMonth,
  startOfYear
} from 'date-fns'

import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarMonthGrid',
  status: 'missing-tests',
  release: '22.3.0',
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarDateIndicatorsMixin,
    GeoCalendarGranularityIdMixin
  ],

  computed: {
    dayPerMonthInYear () {
      const today = new Date()
      const daysInYear = eachDay(startOfYear(today), endOfYear(today))
      const uniqDaysPerMonth = _.uniqBy(daysInYear, (day) => getMonth(day))
      return uniqDaysPerMonth
    },

    monthsByQuarters () {
      return _.chunk(_.map(this.dayPerMonthInYear, (d) => {
        return {
          index: getMonth(d),
          name: format(d, 'MMMM', { locale: this.locale })
        }
      }), 3)
    }
  },

  methods: {
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
    }
  }
}
</script>
