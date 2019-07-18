<template>
  <div class="geo-calendar-navigation__selects-container geo-calendar-navigation--day">
    <geo-select-base
      :opened="isMonthSelectionOpened"
      :fixed-width="false"
      css-modifier="calendar-navigation-selection"
      @click-outside="closeMonthSelection"
    >
      <geo-link-button
        slot="toggleButton"
        css-modifier="calendar-navigation-toggle-button"
        @click="toggleMonthSelection"
      >
        {{ currentSelectedMonth }}
        <font-awesome-icon
          class="calendar-navigation-toggle-button-icon"
          fixed-width
          :icon="calendarNavigationSelectIcon"
        />
      </geo-link-button>
      <div ref="calendarNavigationSelect">
        <geo-list-item
          v-for="monthObject in monthsInYear"
          :key="monthObject.monthIndex"
          @click="goToMonth(monthObject.monthIndex)"
        >
          {{ monthObject.month }}
        </geo-list-item>
      </div>
    </geo-select-base>
    <geo-select-base
      :opened="isYearSelectionOpened"
      :fixed-width="false"
      css-modifier="calendar-navigation-selection"
      @click-outside="closeYearSelection"
    >
      <geo-link-button
        slot="toggleButton"
        css-modifier="calendar-navigation-toggle-button"
        @click="toggleYearSelection"
      >
        {{ currentYear }}
        <font-awesome-icon
          v-if="numYearsWithData"
          class="calendar-navigation-toggle-button-icon"
          fixed-width
          :icon="calendarNavigationSelectIcon"
        />
      </geo-link-button>
      <div ref="calendarNavigationSelect">
        <geo-list-item
          v-for="year in yearsList"
          :key="year"
          @click="goToYear(year)"
        >
          {{ year }}
        </geo-list-item>
      </div>
    </geo-select-base>
  </div>
</template>

<script>
import { eachDay, startOfYear, endOfYear, getMonth, format, differenceInCalendarYears, getYear } from 'date-fns'
export default {
  name: 'GeoCalendarNavigationDay',
  props: {
    calendarNavigationSelectIcon: {
      type: Array,
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
    },

    locale: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isMonthSelectionOpened: false,
      isYearSelectionOpened: false
    }
  },
  computed: {
    currentSelectedMonth () {
      return this.monthsInYear[this.currentMonth].month
    },

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

    numYearsWithData () {
      return differenceInCalendarYears(this.latestDate, this.earliestDate) + 1
    },

    yearsList () {
      let earliestYear = getYear(this.earliestDate)
      return _.times(this.numYearsWithData, (i) => {
        return earliestYear++
      })
    }
  },
  methods: {
    closeMonthSelection () {
      this.isMonthSelectionOpened = false
    },

    closeYearSelection () {
      this.isYearSelectionOpened = false
    },

    goToMonth (monthIndex) {
      this.closeMonthSelection()
      this.$emit('go-to-month', monthIndex)
    },

    goToYear (year) {
      this.closeYearSelection()
      this.$emit('go-to-year', year)
    },

    toggleMonthSelection () {
      this.isMonthSelectionOpened = !this.isMonthSelectionOpened
    },

    toggleYearSelection () {
      this.isYearSelectionOpened = !this.isYearSelectionOpened
    }
  }
}
</script>
