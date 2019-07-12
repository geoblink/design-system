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
          v-for="(day, index) in week"
          :key="`week-${weekIndex}_day${index}`"
          :class="{
            'days-container__day-picker--today': isToday(day),
            'days-container__day-picker--out-of-boundaries': isDayOutOfBoundaries(day),
            'days-container__day-picker--no-data': isDayWithoutData(day),
            'days-container__day-picker--selected': day === currentSelectedDay
          }"
          class="days-container__day-picker"
          @click="selectDay(day)"
        >
          <span>{{ getDate(day) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
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
  addDays,
  isToday,
  isSameMonth,
  getDaysInMonth,
  isAfter,
  isBefore
} from 'date-fns'

export default {
  name: 'GeoCalendarDayGrid',
  props: {
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

  data () {
    return {
      currentSelectedDay: null
    }
  },

  computed: {
    getDate () {
      return getDate
    },

    totalDaysInWeek () {
      return 7
    },

    today () {
      return new Date()
    },

    currentDate () {
      return new Date(this.currentYear, this.currentMonth)
    },

    startOfMonth () {
      return startOfMonth(this.currentDate)
    },

    endOfMonth () {
      return endOfMonth(this.currentDate)
    },

    firstDayOfMonthInWeek () {
      // TODO: Take a look at this and find a better way of handling sundays 1st of month
      const firstDayInWeek = getDay(this.startOfMonth)
      return firstDayInWeek === 0 ? 7 : firstDayInWeek
    },

    orderedDaysOfWeek () {
      return eachDay(startOfWeek(this.currentDate, { weekStartsOn: 1 }), endOfWeek(this.currentDate, { weekStartsOn: 1 }))
    },

    numberOfWeeksInMonth () {
      const daysInMonth = getDaysInMonth(this.currentDate)
      const fullWeeksInMonth = differenceInWeeks(this.endOfMonth, this.startOfMonth, { weekStartsOn: 1 })
      const hasExtraWeek = daysInMonth % fullWeeksInMonth !== 0
      return hasExtraWeek ? fullWeeksInMonth + 1 : fullWeeksInMonth
    },

    displayedFirstDayInCalendar () {
      return this.firstDayOfMonthInWeek > 1
        ? subDays(startOfMonth(this.currentDate), this.firstDayOfMonthInWeek - 1)
        : this.startOfMonth
    },

    fullDaysInDisplayedCalendar () {
      const displayedDays = []
      const daysBeforeStartOfMonth = this.firstDayOfMonthInWeek > 1
        ? eachDay(this.displayedFirstDayInCalendar, subDays(this.startOfMonth, 1))
        : []
      const daysInCurrentMonth = eachDay(startOfMonth(this.currentDate), this.endOfMonth)
      displayedDays.push(
        ...daysBeforeStartOfMonth,
        ...daysInCurrentMonth
      )

      const groupedDaysByWeek = _.chunk(displayedDays, this.totalDaysInWeek)

      const remainingDaysForDisplayedGrid = this.totalDaysInWeek - _.last(groupedDaysByWeek).length
      const remainingDatesForGrid = remainingDaysForDisplayedGrid > 0
        ? eachDay(addDays(this.endOfMonth, 1), addDays(this.endOfMonth, remainingDaysForDisplayedGrid))
        : []

      _.last(groupedDaysByWeek).push(...remainingDatesForGrid)

      return groupedDaysByWeek
    },

    weekDays () {
      // TODO: Handle start of week
      return _.map(this.orderedDaysOfWeek, (d) => format(d, 'ddd', { locale: this.locale }))
    }
  },

  methods: {
    isDayOutOfBoundaries (day) {
      return !isSameMonth(new Date(day), this.currentDate)
    },

    isToday (day) {
      return isToday(day)
    },

    isDayWithoutData (day) {
      return isBefore(day, this.earliestDate) || isAfter(day, this.latestDate)
    },

    selectDay (day) {
      if (this.isDayWithoutData(day)) return
      this.currentSelectedDay = day
      this.$emit('select-day', day)
    }
  }
}
</script>
