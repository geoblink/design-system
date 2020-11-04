<template>
  <div class="geo-calendar-navigation__selects-container geo-calendar-navigation--day">
    <geo-select-base
      ref="selectBaseMonth"
      :opened="isMonthSelectionOpened"
      :fixed-width="false"
      popup-class="geo-calendar-navigation-selection"
      data-ut="month-select"
      @click-outside="closeMonthSelection"
    >
      <geo-link-button
        slot="toggleButton"
        @click="toggleMonthSelection"
      >
        {{ currentSelectedMonth }}
        <font-awesome-icon
          class="geo-calendar-navigation-toggle-button-icon"
          fixed-width
          :icon="calendarNavigationSelectIcon"
        />
      </geo-link-button>
      <div>
        <geo-list-item
          v-for="monthObject in monthsInYear"
          :key="monthObject.index"
          @click="goToMonth(monthObject.index)"
        >
          {{ monthObject.name }}
        </geo-list-item>
      </div>
    </geo-select-base>
    <geo-select-base
      ref="selectBaseYear"
      :opened="isYearSelectionOpened"
      :fixed-width="false"
      popup-class="geo-calendar-navigation-selection"
      data-ut="year-select"
      @click-outside="closeYearSelection"
    >
      <geo-link-button
        slot="toggleButton"
        @click="toggleYearSelection"
      >
        {{ currentYear }}
        <font-awesome-icon
          v-if="numYearsWithData"
          class="geo-calendar-navigation-toggle-button-icon"
          fixed-width
          :icon="calendarNavigationSelectIcon"
        />
      </geo-link-button>
      <div>
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
import _ from 'lodash'
import format from 'date-fns/format'
import getMonth from 'date-fns/getMonth'
import GeoCalendarDateIndicators from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarNavigationYearMixin from './GeoCalendarNavigationYear.mixin'
import { MONTH_GRID_CONSTANTS } from '../GeoCalendar.utils'

export default {
  name: 'GeoCalendarNavigationDay',
  status: 'ready',
  release: '23.2.0',
  mixins: [
    GeoCalendarDateIndicators,
    GeoCalendarNavigationYearMixin
  ],
  props: {
    /**
     * Font Awesome 5 icon to be displayed in the selects of the navigation menu.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    calendarNavigationSelectIcon: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isMonthSelectionOpened: false
    }
  },
  computed: {
    currentSelectedMonth () {
      return _.get(this.monthsInYear[this.currentMonth], 'name')
    },

    monthsInYear () {
      if (!this.currentYear) return []

      return _.times(MONTH_GRID_CONSTANTS.NUMBER_OF_MONTHS_IN_GREGORIAN_CALENDAR, (i) => {
        const date = new Date(this.currentYear, i)
        return {
          index: getMonth(date),
          name: format(date, 'MMMM', { locale: this.locale })
        }
      })
    }
  },
  methods: {
    closeMonthSelection () {
      this.isMonthSelectionOpened = false
    },

    goToMonth (monthIndex) {
      this.closeMonthSelection()
      /**
       * User displays a different month in the current grid
       *
       * @event go-to-month
       * @type {Number}
       */
      this.$emit('go-to-month', monthIndex)
    },

    toggleMonthSelection () {
      this.isMonthSelectionOpened = !this.isMonthSelectionOpened
    }
  }
}
</script>
