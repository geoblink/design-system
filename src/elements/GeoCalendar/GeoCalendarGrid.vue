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
    <div class="geo-calendar-grid__days-month-container">
      <div
        v-for="(week, index) in fullDaysInDisplayedCalendar"
        :key="index"
        class="days-month-container__week-unit"
      >
        <span
          v-for="day in week"
          :key="day"
          class="days-month-container__day-picker"
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
  subMonths,
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
    today () {
      return subMonths(new Date(), 2)
    },

    currentDayInWeek () {
      return getDay(this.today)
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
      return _.chunk(displayedDays, 7)
    },

    weekDays () {
      // TODO: Handle start of week
      return _.map(this.orderedDaysOfWeek, (d) => format(d, 'ddd', { locale: this.locale }))
    }
  }
}
</script>
