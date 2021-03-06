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
        @day-unit-mouseover="emitDayUnitMouseover($event)"
        @select-day="selectDay($event)"
        @select-week="selectWeek($event)"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import addDays from 'date-fns/addDays'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfWeek from 'date-fns/endOfWeek'
import endOfMonth from 'date-fns/endOfMonth'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import startOfMonth from 'date-fns/startOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import subDays from 'date-fns/subDays'
import isValid from 'date-fns/isValid'
import { DAY_GRID_CONSTANTS } from '../GeoCalendar.utils'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarDayGrid',
  status: 'ready',
  release: '23.2.0',
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
      if (!isValid(this.currentDate)) return []

      const displayedDays = []
      const daysBeforeStartOfMonth = this.firstDayOfMonthInWeek > DAY_GRID_CONSTANTS.MONDAY_INDEX_IN_WEEK
        ? eachDayOfInterval({
          start: this.displayedFirstDayInCalendar,
          end: subDays(this.startOfMonth, 1)
        })
        : []
      const daysInCurrentMonth = eachDayOfInterval({
        start: startOfMonth(this.currentDate),
        end: this.endOfMonth
      })
      displayedDays.push(
        ...daysBeforeStartOfMonth,
        ...daysInCurrentMonth
      )

      const groupedDaysByWeek = _.chunk(displayedDays, DAY_GRID_CONSTANTS.TOTAL_DAYS_IN_WEEK)

      if (!groupedDaysByWeek.length) return groupedDaysByWeek

      const remainingDaysForDisplayedGrid = DAY_GRID_CONSTANTS.TOTAL_DAYS_IN_WEEK - _.last(groupedDaysByWeek).length
      const remainingDatesForGrid = remainingDaysForDisplayedGrid > 0
        ? eachDayOfInterval({
          start: addDays(this.endOfMonth, 1),
          end: addDays(this.endOfMonth, remainingDaysForDisplayedGrid)
        })
        : []

      _.last(groupedDaysByWeek).push(...remainingDatesForGrid)

      return groupedDaysByWeek
    },

    orderedDaysOfWeek () {
      if (!isValid(this.currentDate)) return []

      return eachDayOfInterval({
        start: startOfWeek(this.currentDate, { weekStartsOn: 1 }),
        end: endOfWeek(this.currentDate, { weekStartsOn: 1 })
      })
    },

    startOfMonth () {
      return startOfMonth(this.currentDate)
    },

    weekDays () {
      return _.map(this.orderedDaysOfWeek, (d) => format(d, 'E', { locale: this.locale }))
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
    },

    emitDayUnitMouseover (day) {
      /**
       * User hovers on a potential selected date
       *
       * @event day-unit-mouseover
       * @type {Date}
       */
      this.$emit('day-unit-mouseover', day)
    }
  }
}
</script>
