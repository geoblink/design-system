<template>
  <div
    :class="{
      'geo-calendar-days-container__week-unit': true,
      'geo-calendar-days-container__week-unit--unavailable': isWeekGranularity && isWeekUnavailable,
      'geo-calendar-days-container__week-unit--is-week-granularity': isWeekGranularity
    }"
  >
    <geo-calendar-day-grid-day-unit
      v-for="(day, index) in week"
      :key="`week-${weekIndex}_day-${index}`"
      :day="day"
      :current-date="currentDate"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      :selected-from-day="selectedFromDay"
      :selected-to-day="selectedToDay"
      @select-day-unit="selectDay($event)"
    />
  </div>
</template>

<script>
import {
  startOfWeek,
  startOfDay,
  endOfWeek
} from 'date-fns'

import _ from 'lodash'

import { GRANULARITY_IDS, isDayUnavailable } from '../GeoCalendar.utils'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarDayGridWeekUnit',
  mixins: [GeoCalendarGridMixin, GeoCalendarGranularityIdMixin],
  props: {
    /**
     * Current month in year being displayed on the grid
     */
    currentDate: {
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
    },

    /**
     * Array of days pertaining to a certain week within a month
     */
    week: {
      type: Array,
      required: true
    },

    /**
     * Index of the week within the current month
     */
    weekIndex: {
      type: Number,
      required: true
    },

    /**
     * Array of dates pertaining to the current month being displayed.
     */
    fullMonthCalendar: {
      type: Array,
      required: true
    }
  },

  computed: {
    isWeekGranularity () {
      return this.granularityId === GRANULARITY_IDS.week
    },

    isWeekUnavailable () {
      return _.reduce(this.fullMonthCalendar[this.weekIndex], (accum, day) => accum || isDayUnavailable(this, day), false)
    }
  },

  methods: {
    selectDay (day) {
      if (isDayUnavailable(this, day)) return
      if (this.granularityId === GRANULARITY_IDS.day) {
        /**
         * User selects a particular day within the day grid
         *
         * @event select-day
         * @type {Date}
         */
        this.$emit('select-day', day)
      } else if (this.granularityId === GRANULARITY_IDS.week) {
        /**
         * User selects a particular week within the day grid
         *
         * @event select-week
         * @type {{ fromDate: Date, toDate: Date }}
         */
        this.$emit('select-week', {
          fromDate: startOfWeek(day, { weekStartsOn: 1 }),
          toDate: startOfDay(endOfWeek(day, { weekStartsOn: 1 }))
        })
      }
    }
  }
}
</script>
