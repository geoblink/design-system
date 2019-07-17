<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__month-container">
      <div
        v-for="monthObject in monthsInYear"
        :key="monthObject.monthIndex"
        :class="{
          'month-container__month-unit': true,
          'month-container__month-unit--selected': isDateInMonth(monthObject.monthIndex)
        }"
        @click="selectMonth(monthObject.monthIndex)"
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
  startOfYear,
  getYear
} from 'date-fns'

export default {
  name: 'GeoCalendarMonthGrid',
  props: {
    currentYear: {
      type: Number,
      required: true
    },

    selectedFromDay: {
      type: Date,
      required: false
    },

    selectedToDay: {
      type: Date,
      required: false
    }
  },
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

    isDateInMonth () {
      return (monthIndex) => {
        return (
          (
            this.selectedFromDay &&
            getMonth(this.selectedFromDay) === monthIndex &&
            getYear(this.selectedFromDay) === this.currentYear
          ) || (
            this.selectedToDay &&
            getMonth(this.selectedToDay) === monthIndex &&
            getYear(this.selectedToDay) === this.currentYear
          )
        )
      }
    }
  },

  methods: {
    selectMonth (monthIndex) {
      this.$emit('select-month', monthIndex)
    }
  }
}
</script>
