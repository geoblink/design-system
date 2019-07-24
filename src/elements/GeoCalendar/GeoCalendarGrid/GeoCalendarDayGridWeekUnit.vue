<template>
  <div
    :class="{
      'days-container__week-unit': true,
      'days-container__week-unit--hovered-week': isWeekHovered,
      'days-container__week-unit--no-data': isWeekHovered && isWeekWithoutData
    }"
    @mouseenter="$set(weekUnits, weekIndex, true)"
    @mouseleave="$set(weekUnits, weekIndex, false)"
  >
    <geo-calendar-day-grid-day-unit
      v-for="(day, index) in week"
      :key="`week-${weekIndex}_day${index}`"
      :day="day"
      :current-date="currentDate"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      :selected-from-day="selectedFromDay"
      :selected-to-day="selectedToDay"
      @select-day-unit="selectDay"
    />
  </div>
</template>

<script>
import {
  isAfter,
  isBefore,
  startOfWeek,
  startOfDay,
  endOfWeek
} from 'date-fns'

import { GRANULARITY_IDS } from '../GeoCalendar.utils'
import GeoCalendarGranularityIdMixin from '../GeoCalendarGranularityId.mixin'
import GeoCalendarGridMixin from './GeoCalendarGrid.mixin'

export default {
  name: 'GeoCalendarDayGridWeekUnit',
  mixins: [GeoCalendarGridMixin, GeoCalendarGranularityIdMixin],
  props: {
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

    week: {
      type: Array,
      required: true
    },

    weekIndex: {
      type: Number,
      required: true
    },

    fullMonthCalendar: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      weekUnits: []
    }
  },

  computed: {
    isWeekHovered () {
      return this.weekUnits[this.weekIndex] && this.granularityId === GRANULARITY_IDS.week
    },

    isWeekWithoutData () {
      return _.reduce(this.fullMonthCalendar[this.weekIndex], (accum, day) => accum || this.isDayWithoutData(day), false)
    }
  },

  methods: {
    isDayWithoutData (day) {
      return isBefore(day, this.earliestDate) || isAfter(day, this.latestDate)
    },

    selectDay (day) {
      if (this.isDayWithoutData(day)) return
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
         * @type {{ fromDate: Date, toDate: Date}}
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
