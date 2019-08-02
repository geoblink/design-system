<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__year-container">
      <geo-calendar-year-grid-year-unit
        v-for="year in totalYearsGrid"
        :key="year"
        :year="year"
        :current-month="currentMonth"
        :current-year="currentYear"
        :earliest-date="earliestDate"
        :latest-date="latestDate"
        :selected-from-day="selectedFromDay"
        :selected-to-day="selectedToDay"
        @select-year-unit="selectYear"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarYearGrid',
  status: 'missing-tests',
  release: '23.2.0',
  mixins: [
    GeoCalendarGridMixin,
    GeoCalendarDateIndicatorsMixin
  ],

  props: {
    /**
     * Initial year within the actual grid year range
     */
    currentInitialYearInRange: {
      type: Number,
      required: true
    },

    /**
     * End year within the actual grid year range
     */
    currentEndYearInRange: {
      type: Number,
      required: true
    }
  },

  computed: {
    numberOfYearsWithinConstraints () {
      return (this.currentEndYearInRange - this.currentInitialYearInRange) + 1
    },

    totalYearsGrid () {
      return _.map(_.times(this.numberOfYearsWithinConstraints), (i) => this.currentInitialYearInRange + i)
    }
  },

  methods: {
    selectYear (year) {
      /**
       * User selects a particular year within the years grid
       *
       * @event select-year
       * @type {Number}
       */
      this.$emit('select-year', year)
    }
  }
}
</script>
