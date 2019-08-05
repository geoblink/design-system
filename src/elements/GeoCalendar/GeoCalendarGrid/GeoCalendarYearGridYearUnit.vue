<template>
  <button
    :class="{
      'geo-calendar-years__year-unit': true,
      'geo-calendar-years__year-unit--selected': isDateInYear,
      'geo-calendar-years__year-unit--within-range': isDateWithinSelectedYears,
      'geo-calendar-years__year-unit--unavailable': isYearUnavailable,
      'geo-calendar-years__year-unit--from-date': isDayWithinFromYear,
      'geo-calendar-years__year-unit--to-date': isDayWithinToYear
    }"
    @click="selectYear($event)"
  >
    <div class="year-unit__year-number">
      {{ year }}
    </div>
  </button>
</template>

<script>
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import {
  getYear,
  isAfter,
  isBefore,
  addYears
} from 'date-fns'

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
      this.$emit('select-year-unit', this.year)
    }
  }
}
</script>
