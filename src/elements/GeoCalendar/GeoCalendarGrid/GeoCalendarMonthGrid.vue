<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__months-container">
      <div
        v-for="(quarter, index) in monthsByQuarters"
        :key="index"
        :class="{
          'months-container__quarter': true,
          'months-container__quarter--actionable': canQuarterBeHighlighted,
          'months-container__quarter--no-data': isSomeMonthInQuarterWithoutData(quarter)
        }"
      >
        <div
          v-for="month in quarter"
          :key="month.index"
          :class="{
            'quarter__month-unit': true,
            'quarter__month-unit--selected': isDateInMonth(month.index),
            'quarter__month-unit--within-range': isDateWithinSelectedMonths(month.index),
            'quarter__month-unit--no-data': isMonthWithoutData(month.index),
            'quarter__month-unit--hovered-quarter': isMonthWithinHoveredQuarter(month.index),
            'quarter__month-unit--from-date': isDayWithinMonth(month.index, selectedFromDay),
            'quarter__month-unit--to-date': isDayWithinMonth(month.index, selectedToDay)
          }"
          @click="selectMonth(month.index)"
        >
          <p class="month-unit__month-name">
            {{ month.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GRANULARITY_IDS } from '../GeoCalendar.utils'
import _ from 'lodash'
import {
  addMonths,
  eachDay,
  endOfYear,
  format,
  getMonth,
  getQuarter,
  getYear,
  isAfter,
  isBefore,
  startOfYear,
  startOfDay
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
  data () {
    return {
      hoveredQuarter: null
    }
  },

  computed: {
    canQuarterBeHighlighted () {
      return this.granularityId === GRANULARITY_IDS.quarter
    },

    dayPerMonthInYear () {
      const today = new Date()
      const daysInYear = eachDay(startOfYear(today), endOfYear(today))
      const uniqDaysPerMonth = _.uniqBy(daysInYear, (day) => getMonth(day))
      return uniqDaysPerMonth
    },

    isDateInMonth () {
      return (monthIndex) => {
        return (
          (
            this.selectedFromDay &&
            getMonth(this.selectedFromDay) === monthIndex &&
            getYear(this.selectedFromDay) === this.currentYear
          ) || (
            this.selectedToDay &&
            getMonth(this.selectedToDay) === monthIndex &&
            getYear(this.selectedToDay) === this.currentYear
          )
        )
      }
    },

    isDateWithinSelectedMonths () {
      return (monthIndex) => {
        return (
          (
            this.selectedFromDay &&
            isAfter(addMonths(new Date(this.currentYear, monthIndex), 1), this.selectedFromDay)
          ) && (
            this.selectedToDay &&
            isBefore(startOfDay(new Date(this.currentYear, monthIndex)), this.selectedToDay)
          )
        )
      }
    },

    isDayWithinMonth () {
      return (monthIndex, day) => getMonth(day) === monthIndex && getYear(day) === this.currentYear
    },

    isMonthWithinHoveredQuarter () {
      return (monthIndex) => getQuarter(new Date(this.currentYear, monthIndex)) === this.hoveredQuarter
    },

    isMonthWithoutData () {
      return (monthIndex) => {
        return (
          (
            isBefore(new Date(this.currentYear, monthIndex), this.earliestDate)
          ) || (
            isAfter(new Date(this.currentYear, monthIndex), this.latestDate)
          )
        )
      }
    },

    isSomeMonthInQuarterWithoutData () {
      return (quarter) => _.reduce(quarter, (accum, month) => accum || this.isMonthWithoutData(month.index), false)
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
