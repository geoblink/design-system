<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__month-container">
      <div
        v-for="monthObject in monthsInYear"
        :key="monthObject.monthIndex"
        :class="{
          'month-container__month-unit': true,
          'month-container__month-unit--selected': isDateInMonth(monthObject.monthIndex),
          'month-container__month-unit--no-data': isMonthWithoutData(monthObject.monthIndex),
          'month-container__month-unit--hovered-quarter': isMonthWithinHoveredQuarter(monthObject.monthIndex),
        }"
        @click="selectMonth(monthObject.monthIndex)"
        @mouseenter="highlightQuarter(monthObject.monthIndex)"
        @mouseleave="resetHighlightQuarter(monthObject.monthIndex)"
      >
        {{ monthObject.month }}
      </div>
    </div>
  </div>
</template>

<script>
import { GRANULARITY_IDS } from '../GeoCalendar.utils'
import {
  eachDay,
  endOfYear,
  format,
  getMonth,
  startOfYear,
  getYear,
  getQuarter
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
    },

    earliestDate: {
      type: Date,
      required: true
    },

    latestDate: {
      type: Date,
      required: true
    },

    granularityId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      hoveredQuarter: null
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
    },

    isMonthWithoutData () {
      return (monthIndex) => {
        return (
          (
            getMonth(this.earliestDate) > monthIndex &&
            getYear(this.earliestDate) === this.currentYear
          ) || (
            getMonth(this.latestDate) < monthIndex &&
            getYear(this.latestDate) === this.currentYear
          )
        )
      }
    },

    isMonthWithinHoveredQuarter () {
      return (monthIndex) => getQuarter(new Date(this.currentYear, monthIndex)) === this.hoveredQuarter
    }
  },

  methods: {
    selectMonth (monthIndex) {
      if (this.granularityId === GRANULARITY_IDS.month) {
        this.$emit('select-month', monthIndex)
      } else {
        this.$emit('select-quarter', monthIndex)
      }
    },

    highlightQuarter (monthIndex) {
      if (this.granularityId !== GRANULARITY_IDS.quarter) return
      this.hoveredQuarter = getQuarter(new Date(this.currentYear, monthIndex))
    },

    resetHighlightQuarter (monthIndex) {
      if (this.granularityId !== GRANULARITY_IDS.quarter) return
      this.hoveredQuarter = null
    }
  }
}
</script>
