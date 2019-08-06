<template>
  <button
    :class="{
      'geo-calendar-days-container__day-picker': true,
      'geo-calendar-days-container__day-picker--today': isToday,
      'geo-calendar-days-container__day-picker--out-of-boundaries': isDayOutOfBoundaries,
      'geo-calendar-days-container__day-picker--unavailable': isDayUnavailable,
      'geo-calendar-days-container__day-picker--selected': isSelectedDay,
      'geo-calendar-days-container__day-picker--from-date': isEqual(dayStart, selectedFromDayStart),
      'geo-calendar-days-container__day-picker--to-date': isEqual(dayStart, selectedToDayStart),
      'geo-calendar-days-container__day-picker--within-range': isDayWithinRanges
    }"
    @click="selectDay($event)"
  >
    <div class="geo-calendar-day-picker__day-number">
      {{ dayNumber }}
    </div>
  </button>
</template>

<script>
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

import {
  isToday,
  isSameMonth,
  isBefore,
  isAfter,
  isEqual,
  isWithinRange,
  getDate,
  startOfDay
} from 'date-fns'

export default {
  name: 'GeoCalendarDayGridDayUnit',
  mixins: [
    GeoCalendarGridMixin
  ],
  props: {
    /**
     * Current month in year being displayed on the grid
     */
    currentDate: {
      type: Date,
      required: true
    },

    /**
     * Minimal date unit being displayed in the grid
     */
    day: {
      type: Date,
      required: true
    },

    /**
     * Earliest date that can be selected
     */
    earliestDate: {
      type: Date,
      required: false
    },

    /**
     * Latest date that can be selected
     */
    latestDate: {
      type: Date,
      required: false
    }
  },

  computed: {
    dayNumber () {
      return getDate(this.day)
    },

    isEqual () {
      return isEqual
    },

    isToday () {
      return isToday(this.day)
    },

    isDayOutOfBoundaries () {
      return !isSameMonth(new Date(this.day), this.currentDate)
    },

    selectedFromDayStart () {
      return startOfDay(this.selectedFromDay)
    },

    selectedToDayStart () {
      return startOfDay(this.selectedToDay)
    },

    dayStart () {
      return startOfDay(this.day)
    },

    isDayWithinRanges () {
      return this.selectedFromDay &&
        this.selectedToDay &&
        isBefore(this.selectedFromDay, this.selectedToDay) &&
        (isWithinRange(this.day, this.selectedFromDay, this.selectedToDay) ||
        (this.selectedFromDay === this.day || this.selectedToDay === this.day))
    },

    isDayUnavailable () {
      return isBefore(this.day, this.earliestDate) || isAfter(this.day, this.latestDate)
    },

    isSelectedDay () {
      return isEqual(this.dayStart, this.selectedFromDayStart) || isEqual(this.dayStart, this.selectedToDayStart)
    }
  },

  methods: {
    selectDay () {
      /**
       * User selects a particular day of the month within the grid
       *
       * @event select-day-unit
       * @type {Date}
       */
      this.$emit('select-day-unit', this.day)
    }
  }
}
</script>
