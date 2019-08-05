<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__month-container">
      <geo-calendar-month-grid-quarter-unit
        v-for="(quarter, index) in monthsByQuarters"
        :key="index"
        :quarter="quarter"
        :current-month="currentMonth"
        :current-year="currentYear"
        :earliest-date="earliestDate"
        :granularity-id="granularityId"
        :latest-date="latestDate"
        :selected-from-day="selectedFromDay"
        :selected-to-day="selectedToDay"
        @select-month="selectMonth"
        @select-quarter="selectQuarter($event)"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  format,
  getMonth
} from 'date-fns'

import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import { MONTH_GRID_CONSTANTS } from '../GeoCalendar.utils'

export default {
  name: 'GeoCalendarMonthGrid',
  status: 'ready',
  release: '23.2.0',
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarDateIndicatorsMixin,
    GeoCalendarGranularityIdMixin
  ],

  computed: {
    monthsByQuarters () {
      return _.chunk(_.times(MONTH_GRID_CONSTANTS.NUMBER_OF_MONTHS_IN_GREGORIAN_CALENDAR, (i) => {
        const date = new Date(this.currentYear, i)
        return {
          index: getMonth(date),
          name: format(date, 'MMMM', { locale: this.locale })
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
