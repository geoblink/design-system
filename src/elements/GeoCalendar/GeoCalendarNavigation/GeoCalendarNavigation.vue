<template>
  <div class="geo-calendar-navigation">
    <font-awesome-icon
      :icon="previousDateInSelectedGranularityIcon"
      :class="{
        'geo-calendar-navigation__nav-icon': true,
        'geo-calendar-navigation__nav-icon--previous': true,
        'geo-calendar-navigation__nav-icon--disabled': isPreviousPickerDateSelectorDisabled
      }"
      fixed-width
      @click="goToPreviousPickerDate"
    />
    <component
      :is="selectedGranularityNavigation"
      ref="calendarNavigation"
      :calendar-navigation-select-icon="calendarNavigationSelectIcon"
      :current-month="currentMonth"
      :current-year="currentYear"
      :current-initial-year-in-range="currentInitialYearInRange"
      :current-end-year-in-range="currentEndYearInRange"
      :is-disabled="isPreviousPickerDateSelectorDisabled && isNextPickerDateSelectorDisabled"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      :locale="locale"
      @go-to-month="goToMonth"
      @go-to-year="goToYear"
      @go-to-year-range="goToYearRange"
    />
    <font-awesome-icon
      :icon="nextDateInSelectedGranularityIcon"
      :class="{
        'geo-calendar-navigation__nav-icon': true,
        'geo-calendar-navigation__nav-icon--next': true,
        'geo-calendar-navigation__nav-icon--disabled': isNextPickerDateSelectorDisabled
      }"
      fixed-width
      @click="goToNextPickerDate"
    />
  </div>
</template>

<script>
import { PICKER_DATE_UNITS } from '../GeoCalendar.utils'
import GeoCalendarDateIndicatorsMixin from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarPickerDateUnitMixin from '../GeoCalendarPickerDateUnit.mixin'

import GeoCalendarNavigationDay from './GeoCalendarNavigationDay'
import GeoCalendarNavigationMonth from './GeoCalendarNavigationMonth'
import GeoCalendarNavigationYear from './GeoCalendarNavigationYear'

export default {
  name: 'GeoCalendarNavigation',
  status: 'missing-tests',
  release: '22.3.0',
  mixins: [
    GeoCalendarDateIndicatorsMixin,
    GeoCalendarPickerDateUnitMixin
  ],
  props: {
    /**
     * Font Awesome 5 icon to be displayed in the selects of the navigation menu.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    calendarNavigationSelectIcon: {
      type: Array,
      required: true
    },

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
    },

    /**
     * Whether is it possible to go forward in the calendar selected granularity
     */
    isNextPickerDateSelectorDisabled: {
      type: Boolean,
      required: false
    },

    /**
     * Whether is it possible to go backwards in the calendar selected granularity
     */
    isPreviousPickerDateSelectorDisabled: {
      type: Boolean,
      required: false
    },
    /**
     * Font Awesome 5 icon to navigate forward through different time units
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    /**
     * Font Awesome 5 icon to navigate backwards through different time units
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    }
  },

  computed: {
    selectedGranularityNavigation () {
      const componentForGranularity = {
        [PICKER_DATE_UNITS.day]: GeoCalendarNavigationDay,
        [PICKER_DATE_UNITS.month]: GeoCalendarNavigationMonth,
        [PICKER_DATE_UNITS.year]: GeoCalendarNavigationYear
      }
      return componentForGranularity[this.pickerDateUnit]
    }
  },

  methods: {
    goToNextPickerDate () {
      if (this.isNextPickerDateSelectorDisabled) return
      /**
       * User clicks to navigate forward on time
       *
       * @event go-to-next-picker-date
       * @type {MouseClickEvent}
      */
      this.$emit('go-to-next-picker-date')
    },

    goToPreviousPickerDate () {
      if (this.isPreviousPickerDateSelectorDisabled) return
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
       * @type {Array}
       */
      this.$emit('go-to-year', year)
    },

    goToYearRange (yearRange) {
      /**
       * User displays a different year range in the current grid
       *
       * @event go-to-year-range
       * @type {Array}
       */
      this.$emit('go-to-year-range', yearRange)
    }
  }
}
</script>
