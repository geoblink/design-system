<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__weekdays-row-container">
      <span
        v-for="day in weekDays"
        :key="day"
        class="weekdays-row__weekday-name"
      >
        {{ day }}
      </span>
    </div>
    <div class="geo-calendar-grid__days-container">
      <div
        v-for="(week, weekIndex) in fullDaysInDisplayedCalendar"
        :key="weekIndex"
        class="days-container__week-unit"
      >
        <span
          v-for="day in week"
          :key="day"
          :class="{
            'days-container__day-picker--today': isToday(weekIndex, day),
            'days-container__day-picker--out-of-boundaries': isDayOutOfBoundaries(weekIndex, day)
          }"
          class="days-container__day-picker"
        >
          {{ day }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  differenceInDays,
  differenceInWeeks,
  eachDay,
  endOfWeek,
  endOfMonth,
  format,
  getDay,
  getDate,
  startOfMonth,
  startOfWeek,
  subDays,
  getDaysInMonth
} from 'date-fns'

export default {
  name: 'GeoCalendarGrid',
  props: {
    locale: {
      type: Object,
      required: true
    }
  },

  computed: {
    totalDaysInWeek () {
      return 7
    },

    today () {
      return new Date()
    },

    currentDayInWeek () {
      return getDay(this.today)
    },

    currentDayInMonth () {
      return getDate(this.today)
    },

    startOfMonth () {
      return startOfMonth(this.today, { weekStartsOn: 1 })
    },

    firstDayOfMonthInWeek () {
      return getDay(this.startOfMonth)
    },

    orderedDaysOfWeek () {
      return eachDay(startOfWeek(this.today, { weekStartsOn: 1 }), endOfWeek(this.today, { weekStartsOn: 1 }))
    },

    numberOfWeeksInMonth () {
      const daysInMonth = differenceInDays(endOfMonth(this.today), this.startOfMonth)
      const fullWeeksInMonth = differenceInWeeks(endOfMonth(this.today), this.startOfMonth)
      const hasExtraWeek = daysInMonth % fullWeeksInMonth !== 0
      return hasExtraWeek ? fullWeeksInMonth + 1 : fullWeeksInMonth
    },

    displayedFirstDayInCalendar () {
      return this.firstDayOfMonthInWeek > 1
        ? subDays(startOfMonth(this.today), this.firstDayOfMonthInWeek - 1)
        : this.startOfMonth
    },

    fullDaysInDisplayedCalendar () {
      const displayedDays = []
      const daysBeforeStartOfMonth = this.firstDayOfMonthInWeek > 1
        ? eachDay(this.displayedFirstDayInCalendar, subDays(this.startOfMonth, 1))
        : []
      displayedDays.push(
        ..._.map(daysBeforeStartOfMonth, getDate),
        ..._.times(getDaysInMonth(this.today), (d) => d + 1)
      )

      const remainingDaysForDisplayedGrid = (this.totalDaysInWeek * this.numberOfWeeksInMonth) - displayedDays.length
      displayedDays.push(..._.times(remainingDaysForDisplayedGrid, (d) => d + 1))

      return _.chunk(displayedDays, this.totalDaysInWeek)
    },

    weekDays () {
      // TODO: Handle start of week
      return _.map(this.orderedDaysOfWeek, (d) => format(d, 'ddd', { locale: this.locale }))
    }
  },

  methods: {
    isDayOutOfBoundaries (weekIndex, day) {
      if (weekIndex === 0) {
        return day > this.totalDaysInWeek
      } else if (weekIndex === this.fullDaysInDisplayedCalendar.length - 1) {
        return _.includes(this.fullDaysInDisplayedCalendar[0], day)
      } else {
        return false
      }
    },

    isToday (weekIndex, day) {
      return day === this.currentDayInMonth && !this.isDayOutOfBoundaries(weekIndex, day)
    }
  }
}
</script>
