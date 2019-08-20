<template>
  <!-- mousedown event is used because it is fired before blur event on GeoInput -->
  <!-- blur event won't be fired but that's fine because we want this handler to prevail over the blur one -->
  <button
    :class="{
      'geo-calendar-grid__day-unit': true,
      'geo-calendar-grid__date-picker-unit': true,
      'geo-calendar-grid__date-picker-unit--today': isToday,
      'geo-calendar-grid__date-picker-unit--out-of-boundaries': isDayOutOfBoundaries,
      'geo-calendar-grid__date-picker-unit--unavailable': isDayUnavailable,
      'geo-calendar-grid__date-picker-unit--selected': isSelectedDay,
      'geo-calendar-grid__date-picker-unit--from-date': isEqual(day, selectedFromDay),
      'geo-calendar-grid__date-picker-unit--to-date': isEqual(day, selectedToDay),
      'geo-calendar-grid__date-picker-unit--within-range': isDayWithinRanges
    }"
    @mousedown="selectDay($event)"
  >
    <div class="geo-calendar-grid__date-picker-unit__placeholder">
      {{ dayNumber }}
    </div>
  </button>
</template>

<script>
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'
import { isBefore, isEqual, isAfter, isWithinRange } from '../GeoCalendar.utils'

import {
  isToday,
  isSameMonth,
  getDate
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
      return isEqual(this.day, this.selectedFromDay) || isEqual(this.day, this.selectedToDay)
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
