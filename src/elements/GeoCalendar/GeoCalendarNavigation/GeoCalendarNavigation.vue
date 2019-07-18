<template>
  <div class="geo-calendar-navigation">
    <font-awesome-icon
      :icon="previousDateInSelectedGranularityIcon"
      class="geo-calendar-navigation__nav-icon geo-calendar-navigation__nav-icon--previous"
      fixed-width
      @click="goToPreviousPickerDate"
    />
    <component
      :is="selectedGranularityNavigation"
      ref="calendarNavigation"
      :calendar-navigation-select-icon="calendarNavigationSelectIcon"
      :current-month="currentMonth"
      :current-year="currentYear"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      :locale="locale"
      @go-to-month="goToMonth"
      @go-to-year="goToYear"
    />
    <font-awesome-icon
      :icon="nextDateInSelectedGranularityIcon"
      class="geo-calendar-navigation__nav-icon geo-calendar-navigation__nav-icon--next"
      fixed-width
      @click="goToNextPickerDate"
    />
  </div>
</template>

<script>
import { PICKER_DATE_UNITS } from '../GeoCalendar.utils'

import GeoCalendarNavigationDay from './GeoCalendarNavigationDay'
import GeoCalendarNavigationMonth from './GeoCalendarNavigationMonth'
import GeoCalendarNavigationYear from './GeoCalendarNavigationYear'

const GeoCalendarNavigationMixin = require('./GeoCalendarNavigation.mixin')

export default {
  name: 'GeoCalendarNavigation',
  mixins: [GeoCalendarNavigationMixin],
  props: {
    /**
     * Icon displayed to navigate forward through different time units
     */
    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    /**
     * Type of grid being displayed. `day`, `month` or `year`
     * Values available in PICKER_DATE_UNITS:
     *
     * - `PICKER_DATE_UNITS.day`
     * - `PICKER_DATE_UNITS.month`
     * - `PICKER_DATE_UNITS.year`
     */
    pickerDateUnit: {
      type: String,
      required: true
    },

    /**
     * Icon displayed to navigate backwards through different time units
     */
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    }
  },

  computed: {
    selectedGranularityNavigation () {
      let granularityNavigationComponent
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day:
          granularityNavigationComponent = GeoCalendarNavigationDay
          break
        case PICKER_DATE_UNITS.month:
          granularityNavigationComponent = GeoCalendarNavigationMonth
          break
        case PICKER_DATE_UNITS.year:
          granularityNavigationComponent = GeoCalendarNavigationYear
          break
      }
      return granularityNavigationComponent
    }
  },

  methods: {
    goToNextPickerDate () {
      /**
       * User clicks to navigate forward on time
       *
       * @event go-to-next-picker-date
       * @type {MouseClickEvent}
      */
      this.$emit('go-to-next-picker-date')
    },

    goToPreviousPickerDate () {
      /**
       * User clicks to navigate backwards on time
       *
       * @event go-to-previous-picker-date
       * @type {MouseClickEvent}
      */
      this.$emit('go-to-previous-picker-date')
    },

    goToMonth (monthIndex) {
      /**
       * User displays a different month in the current grid
       *
       * @event go-to-month
       * @type {Number}
       */
      this.$emit('go-to-month', monthIndex)
    },

    goToYear (year) {
      /**
       * User displays a different year in the current grid
       *
       * @event go-to-year
       * @type {Number}
       */
      this.$emit('go-to-year', year)
    }
  }
}
</script>
