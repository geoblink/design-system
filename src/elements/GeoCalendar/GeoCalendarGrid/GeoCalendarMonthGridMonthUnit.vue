<template>
  <!-- mousedown event is used because it is fired before blur event on GeoInput -->
  <!-- blur event won't be fired but that's fine because we want this handler to prevail over the blur one -->
  <!-- https://forum.vuejs.org/t/blur-before-click-only-on-safari/21598/7 -->
  <button
    :class="{
      'geo-calendar-grid__month-unit': true,
      'geo-calendar-grid__date-picker-unit': true,
      'geo-calendar-grid__date-picker-unit--selected': isDateInMonth,
      'geo-calendar-grid__date-picker-unit--within-range': isDateWithinSelectedMonths,
      'geo-calendar-grid__date-picker-unit--unavailable': isMonthUnavailable,
      'geo-calendar-grid__date-picker-unit--from-date': isDayWithinFromMonth,
      'geo-calendar-grid__date-picker-unit--to-date': isDayWithinToMonth
    }"
    @mousedown.prevent="selectMonth($event)"
    @mouseover="emitMonthUnitMouseover($event)"
  >
    <div class="geo-calendar-grid__date-picker-unit__placeholder">
      {{ monthName }}
    </div>
  </button>
</template>

<script>
import addMonths from 'date-fns/addMonths'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import startOfDay from 'date-fns/startOfDay'
import startOfMonth from 'date-fns/startOfMonth'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import { isBefore, isAfter } from '../GeoCalendar.utils'

export default {
  name: 'GeoCalendarMonthGridMonthUnit',
  internal: true,
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarDateIndicatorsMixin
  ],
  props: {
    /**
     * Month name.
     * ie: 'September'
     */
    monthName: {
      type: String,
      required: true
    },

    /**
     * Month index within the year (0 - 11).
     */
    monthIndex: {
      type: Number,
      required: true
    }
  },

  computed: {
    currentDate () {
      return new Date(this.currentYear, this.monthIndex)
    },

    isDateInMonth () {
      return (
        (
          this.selectedFromDay &&
          getMonth(this.selectedFromDay) === this.monthIndex &&
          getYear(this.selectedFromDay) === this.currentYear
        ) || (
          this.selectedToDay &&
          getMonth(this.selectedToDay) === this.monthIndex &&
          getYear(this.selectedToDay) === this.currentYear
        )
      )
    },

    isDateWithinSelectedMonths () {
      return (
        (
          this.selectedFromDay &&
          isAfter(addMonths(this.currentDate, 1), this.selectedFromDay)
        ) && (
          this.selectedToDay &&
          isBefore(startOfDay(this.currentDate), this.selectedToDay)
        )
      )
    },

    isMonthUnavailable () {
      return isBefore(this.currentDate, startOfMonth(this.earliestDate)) ||
        isAfter(this.currentDate, this.latestDate)
    },

    isDayWithinFromMonth () {
      return getMonth(this.selectedFromDay) === this.monthIndex && getYear(this.selectedFromDay) === this.currentYear
    },

    isDayWithinToMonth () {
      return getMonth(this.selectedToDay) === this.monthIndex && getYear(this.selectedToDay) === this.currentYear
    }
  },

  methods: {
    selectMonth () {
      /**
       * User selects a particular month of the year within the grid
       *
       * @event select-month-unit
       * @type {Number}
       */
      this.$emit('select-month-unit', this.monthIndex)
    },

    emitMonthUnitMouseover () {
      /**
       * User hovers on a potential selected month
       *
       * @event month-unit-mouseover
       * @type {Number}
       */
      this.$emit('month-unit-mouseover', this.monthIndex)
    }
  }
}
</script>
