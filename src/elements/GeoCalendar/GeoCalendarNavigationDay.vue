<template>
  <div class="geo-calendar-navigation__selects-container geo-calendar-navigation--day">
    <geo-select-base
      :opened="isMonthSelectionOpened"
      :fixed-width="false"
      css-modifier="calendar-navigation-day--month"
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
          @click="changeCurrentMonth($event, monthObject.monthIndex)"
        >
          {{ monthObject.month }}
        </geo-list-item>
      </div>
    </geo-select-base>
    <geo-select-base
      :opened="isYearSelectionOpened"
      :fixed-width="false"
      css-modifier="calendar-navigation-day--year"
      @click-outside="closeYearSelection"
    >
      <geo-link-button
        slot="toggleButton"
        css-modifier="calendar-navigation-toggle-button"
        @click="toggleYearSelection"
      >
        {{ currentYear }}
        <font-awesome-icon
          class="calendar-navigation-toggle-button-icon"
          fixed-width
          :icon="calendarNavigationSelectIcon"
        />
      </geo-link-button>
      <div ref="calendarNavigationSelect">
        <geo-list-item
          v-for="(year, index) in yearsList"
          :key="index"
          @click="changeCurrentSelection(0, option)"
        >
          {{ year }}
        </geo-list-item>
      </div>
    </geo-select-base>
  </div>
</template>

<script>
import { eachDay, startOfYear, endOfYear, getMonth, format } from 'date-fns'
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

    currentSelectedMonth () {
      return this.monthsInYear[this.currentMonth].month
    },

    yearsList () {
      return []
    }
  },
  methods: {
    toggleMonthSelection () {
      this.isMonthSelectionOpened = !this.isMonthSelectionOpened
    },

    toggleYearSelection () {
      this.isYearSelectionOpened = !this.isYearSelectionOpened
    },

    closeMonthSelection () {
      this.isMonthSelectionOpened = false
    },

    closeYearSelection () {
      this.isYearSelectionOpened = false
    },

    changeCurrentMonth ($event, monthIndex) {
      this.closeMonthSelection()
      this.$emit('select-month', monthIndex)
    }
  }
}
</script>
