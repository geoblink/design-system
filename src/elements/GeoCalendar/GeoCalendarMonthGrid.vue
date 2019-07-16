<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__month-container">
      <div
        v-for="monthObject in monthsInYear"
        :key="monthObject.monthIndex"
        class="month-container__month-unit"
      >
        {{ monthObject.month }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  eachDay,
  endOfYear,
  format,
  getMonth,
  startOfYear
} from 'date-fns'

export default {
  name: 'GeoCalendarMonthGrid',
  computed: {
    dayPerMonthInYear () {
      const today = new Date()
      const daysInYear = eachDay(startOfYear(today), endOfYear(today))
      const uniqDaysPerMonth = _.uniqBy(daysInYear, (day) => getMonth(day))
      return uniqDaysPerMonth
    },

    monthsInYear () {
      return _.map(this.dayPerMonthInYear, (d) => {
        return {
          monthIndex: getMonth(d),
          month: format(d, 'MMMM', { locale: this.locale })
        }
      })
    },
  }
}
</script>

