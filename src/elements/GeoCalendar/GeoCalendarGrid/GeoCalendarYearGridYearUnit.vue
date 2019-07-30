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
    @click="selectYear"
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
  status: 'missing-tests',
  release: '22.3.0',
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
          isAfter(addYears(new Date(this.year, 0), 1), this.selectedFromDay)
        ) && (
          this.selectedToDay &&
          isBefore(new Date(this.year, 0), this.selectedToDay)
        )
      )
    },

    isYearUnavailable () {
      return (
        (
          isBefore(addYears(new Date(this.year, 0), 1), this.earliestDate)
        ) || (
          isAfter(new Date(this.year, 0), this.latestDate)
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
