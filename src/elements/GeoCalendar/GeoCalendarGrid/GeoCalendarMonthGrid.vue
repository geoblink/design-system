<template>
  <div class="geo-calendar-grid">
    <div class="geo-calendar-grid__months-container">
      <div
        v-for="(quarter, index) in monthsByQuarters"
        :key="index"
        :class="{
          'months-container__quarter': true,
          'months-container__quarter-actionable': canQuarterBeHighlighted
        }"
      >
        <div
          v-for="month in quarter"
          :key="month.index"
          :class="{
            'quarter__month-unit': true,
            'quarter__month-unit--selected': isDateInMonth(month.index),
            'quarter__month-unit--within-range': isDateWithinSelectedMonths(month.index),
            'quarter__month-unit--no-data': isMonthWithoutData(month.index),
            'quarter__month-unit--hovered-quarter': isMonthWithinHoveredQuarter(month.index),
            'quarter__month-unit--from-date': getMonth(selectedFromDay) === month.index,
            'quarter__month-unit--to-date': getMonth(selectedToDay) === month.index
          }"
          @click="selectMonth(month.index)"
        >
          <p class="month-unit__month-name">
            {{ month.name }}
          </p>
        </div>
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
  getQuarter,
  isAfter,
  isBefore,
  addMonths
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
    canQuarterBeHighlighted () {
      return this.granularityId === GRANULARITY_IDS.quarter
    },

    getMonth () {
      return getMonth
    },

    dayPerMonthInYear () {
      const today = new Date()
      const daysInYear = eachDay(startOfYear(today), endOfYear(today))
      const uniqDaysPerMonth = _.uniqBy(daysInYear, (day) => getMonth(day))
      return uniqDaysPerMonth
    },

    monthsByQuarters () {
      return _.chunk(_.map(this.dayPerMonthInYear, (d) => {
        return {
          index: getMonth(d),
          name: format(d, 'MMMM', { locale: this.locale })
        }
      }), 3)
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

    isDateWithinSelectedMonths () {
      return (monthIndex) => {
        return (
          (
            this.selectedFromDay &&
            isAfter(addMonths(new Date(this.currentYear, monthIndex), 1), this.selectedFromDay)
          ) && (
            this.selectedToDay &&
            isBefore(new Date(this.currentYear, monthIndex), this.selectedToDay)
          )
        )
      }
    },

    isMonthWithoutData () {
      return (monthIndex) => {
        return (
          (
            isBefore(new Date(this.earliestDate, monthIndex), this.selectedFromDay)
          ) || (
            isAfter(new Date(this.latest, monthIndex), this.selectedToDay)
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
    }
  }
}
</script>
