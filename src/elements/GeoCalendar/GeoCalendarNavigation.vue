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
import { PICKER_DATE_UNITS } from './GeoCalendar.utils'

import GeoCalendarNavigationDay from './GeoCalendarNavigationDay'
import GeoCalendarNavigationMonth from './GeoCalendarNavigationMonth'
import GeoCalendarNavigationYear from './GeoCalendarNavigationYear'

export default {
  name: 'GeoCalendarNavigation',
  props: {
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    calendarNavigationSelectIcon: {
      type: Array,
      required: true
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    granularityId: {
      type: String,
      required: true
    },

    locale: {
      type: Object,
      required: true
    },

    currentMonth: {
      type: Number,
      required: true
    },

    currentYear: {
      type: Number,
      required: true
    },

    earliestDate: {
      type: Date,
      required: true
    },

    latestDate: {
      type: Date,
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
    goToPreviousPickerDate () {
      this.$emit('go-to-previous-picker-date')
    },

    goToNextPickerDate () {
      this.$emit('go-to-next-picker-date')
    },

    goToMonth (monthIndex) {
      this.$emit('go-to-month', monthIndex)
    },

    goToYear (year) {
      this.$emit('go-to-year', year)
    }
  }
}
</script>
