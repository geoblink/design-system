<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__weekdays-row-container">
      <p
        v-for="day in weekDays"
        :key="day"
        class="geo-calendar-weekdays-row__weekday-name"
      >
        {{ day }}
      </p>
    </div>
    <div class="geo-calendar-grid__day-container">
      <geo-calendar-day-grid-week-unit
        v-for="(week, weekIndex) in fullDaysInDisplayedCalendar"
        :key="weekIndex"
        :current-date="currentDate"
        :earliest-date="earliestDate"
        :full-month-calendar="fullDaysInDisplayedCalendar"
        :granularity-id="granularityId"
        :latest-date="latestDate"
        :selected-from-day="selectedFromDay"
        :selected-to-day="selectedToDay"
        :week="week"
        :week-index="weekIndex"
        @select-day="selectDay($event)"
        @select-week="selectWeek($event)"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  addDays,
  eachDay,
  endOfWeek,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
  subDays
} from 'date-fns'
import { DAY_GRID_CONSTANTS } from '../GeoCalendar.utils'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarDayGrid',
  status: 'missing-tests',
  release: '22.3.0',
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarDateIndicatorsMixin,
    GeoCalendarGranularityIdMixin
  ],

  computed: {
    currentDate () {
      return new Date(this.currentYear, this.currentMonth)
    },

    displayedFirstDayInCalendar () {
      return this.firstDayOfMonthInWeek > DAY_GRID_CONSTANTS.MONDAY_INDEX_IN_WEEK
        ? subDays(startOfMonth(this.currentDate), this.firstDayOfMonthInWeek - 1)
        : this.startOfMonth
    },

    endOfMonth () {
      return endOfMonth(this.currentDate)
    },

    firstDayOfMonthInWeek () {
      const dayPositionInWeek = getDay(this.startOfMonth)
      return dayPositionInWeek === 0 ? DAY_GRID_CONSTANTS.TOTAL_DAYS_IN_WEEK : dayPositionInWeek
    },

    fullDaysInDisplayedCalendar () {
      const displayedDays = []
      const daysBeforeStartOfMonth = this.firstDayOfMonthInWeek > DAY_GRID_CONSTANTS.MONDAY_INDEX_IN_WEEK
        ? eachDay(this.displayedFirstDayInCalendar, subDays(this.startOfMonth, 1))
        : []
      const daysInCurrentMonth = eachDay(startOfMonth(this.currentDate), this.endOfMonth)
      displayedDays.push(
        ...daysBeforeStartOfMonth,
        ...daysInCurrentMonth
      )

      const groupedDaysByWeek = _.chunk(displayedDays, DAY_GRID_CONSTANTS.TOTAL_DAYS_IN_WEEK)

      const remainingDaysForDisplayedGrid = DAY_GRID_CONSTANTS.TOTAL_DAYS_IN_WEEK - _.last(groupedDaysByWeek).length
      const remainingDatesForGrid = remainingDaysForDisplayedGrid > 0
        ? eachDay(addDays(this.endOfMonth, 1), addDays(this.endOfMonth, remainingDaysForDisplayedGrid))
        : []

      _.last(groupedDaysByWeek).push(...remainingDatesForGrid)

      return groupedDaysByWeek
    },

    orderedDaysOfWeek () {
      return eachDay(startOfWeek(this.currentDate, { weekStartsOn: 1 }), endOfWeek(this.currentDate, { weekStartsOn: 1 }))
    },

    startOfMonth () {
      return startOfMonth(this.currentDate)
    },

    weekDays () {
      return _.map(this.orderedDaysOfWeek, (d) => format(d, 'ddd', { locale: this.locale }))
    }
  },

  methods: {
    selectDay ($event) {
      /**
       * User selects a particular day within the day grid
       *
       * @event select-day
       * @type {Date}
       */
      this.$emit('select-day', $event)
    },

    selectWeek ($event) {
      /**
       * User selects a particular week within the day grid
       *
       * @event select-week
       * @type {{ fromDate: Date, toDate: Date }}
       */
      this.$emit('select-week', $event)
    }
  }
}
</script>
