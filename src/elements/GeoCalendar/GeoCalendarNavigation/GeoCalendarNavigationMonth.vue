<template>
  <div class="geo-calendar-navigation__selects-container geo-calendar-navigation--month">
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
import _ from 'lodash'
import { differenceInCalendarYears, getYear } from 'date-fns'
import GeoCalendarDateIndicators from '../GeoCalendarDateIndicators.mixin'

export default {
  name: 'GeoCalendarNavigationMonth',
  status: 'missing-tests',
  release: '22.3.0',
  mixins: [GeoCalendarDateIndicators],
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
      isYearSelectionOpened: false
    }
  },
  computed: {
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
    closeYearSelection () {
      this.isYearSelectionOpened = false
    },

    goToYear (year) {
      this.closeYearSelection()
      /**
       * User displays a different year in the current grid
       *
       * @event go-to-year
       * @type {Number}
       */
      this.$emit('go-to-year', year)
    },

    toggleYearSelection () {
      this.isYearSelectionOpened = !this.isYearSelectionOpened
    }
  }
}
</script>
