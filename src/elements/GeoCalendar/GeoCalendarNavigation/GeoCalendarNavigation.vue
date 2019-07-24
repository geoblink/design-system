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
