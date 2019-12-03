<template>
  <!-- mousedown event is used because it is fired before blur event on GeoInput -->
  <!-- blur event won't be fired but that's fine because we want this handler to prevail over the blur one -->
  <!-- https://forum.vuejs.org/t/blur-before-click-only-on-safari/21598/7 -->
  <button
    :class="{
      'geo-calendar-grid__year-unit': true,
      'geo-calendar-grid__date-picker-unit': true,
      'geo-calendar-grid__date-picker-unit--selected': isDateInYear,
      'geo-calendar-grid__date-picker-unit--within-range': isDateWithinSelectedYears,
      'geo-calendar-grid__date-picker-unit--unavailable': isYearUnavailable,
      'geo-calendar-grid__date-picker-unit--from-date': isDayWithinFromYear,
      'geo-calendar-grid__date-picker-unit--to-date': isDayWithinToYear
    }"
    @mousedown.prevent="selectYear($event)"
    @mouseover="emitYearUnitMouseover($event)"
  >
    <div class="geo-calendar-grid__date-picker-unit__placeholder">
      {{ year }}
    </div>
  </button>
</template>

<script>
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import { isBefore, isAfter } from '../GeoCalendar.utils'
import getYear from 'date-fns/getYear'
import addYears from 'date-fns/addYears'

export default {
  name: 'GeoCalendarYearGridYearUnit',
  status: 'ready',
  release: '23.2.0',
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarDateIndicatorsMixin
  ],

  props: {
    year: {
      type: Number,
      required: true
    }
  },

  computed: {
    currentFormattedYear () {
      return new Date(this.year, 0)
    },

    isDateInYear () {
      return (
        (
          this.selectedFromDay &&
          getYear(this.selectedFromDay) === this.year
        ) || (
          this.selectedToDay &&
          getYear(this.selectedToDay) === this.year
        )
      )
    },

    isDateWithinSelectedYears () {
      return (
        (
          this.selectedFromDay &&
          isAfter(addYears(this.currentFormattedYear, 1), this.selectedFromDay)
        ) && (
          this.selectedToDay &&
          isBefore(this.currentFormattedYear, this.selectedToDay)
        )
      )
    },

    isYearUnavailable () {
      return (
        (
          isBefore(addYears(this.currentFormattedYear, 1), this.earliestDate)
        ) || (
          isAfter(this.currentFormattedYear, this.latestDate)
        )
      )
    },

    isDayWithinFromYear () {
      return getYear(this.selectedFromDay) === this.year
    },

    isDayWithinToYear () {
      return getYear(this.selectedToDay) === this.year
    }
  },

  methods: {
    selectYear () {
      if (this.isYearUnavailable) return
      /**
       * User selects a particular month of the year within the grid
       *
       * @event select-year-unit
       * @type {Number}
       */
      this.$emit('select-year-unit', this.year)
    },

    emitYearUnitMouseover () {
      /**
       * User hovers on a potential selected year
       *
       * @event year-unit-mouseover
       * @type {Number}
       */
      this.$emit('year-unit-mouseover', this.year)
    }
  }
}
</script>
