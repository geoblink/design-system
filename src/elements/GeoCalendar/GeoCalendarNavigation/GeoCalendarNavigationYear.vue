<template>
  <div class="geo-calendar-navigation__selects-container geo-calendar-navigation--year">
    <geo-select-base
      :opened="isYearRangeSelectionOpened"
      :fixed-width="false"
      css-modifier="calendar-navigation-selection"
      data-ut="year-range-select"
      @click-outside="closeYearRangeSelection"
    >
      <geo-link-button
        slot="toggleButton"
        css-modifier="calendar-navigation-toggle-button"
        @click="toggleYearRangeSelection"
      >
        {{ displayedInitialYearInRange }} - {{ displayedEndYearInRange }}
        <font-awesome-icon
          v-if="!isDisabled"
          class="geo-calendar-navigation-toggle-button-icon"
          fixed-width
          :icon="calendarNavigationSelectIcon"
        />
      </geo-link-button>
      <div ref="calendarNavigationSelect">
        <geo-list-item
          v-for="yearRange in yearsInRanges"
          :key="`${yearRange[0]}--${yearRange[1]}`"
          @click="selectYearRange(yearRange)"
        >
          {{ yearRange[0] }} - {{ yearRange[1] }}
        </geo-list-item>
      </div>
    </geo-select-base>
  </div>
</template>

<script>
import _ from 'lodash'
import GeoCalendarDateIndicators from '../GeoCalendarDateIndicators.mixin'
import differenceInCalendarYears from 'date-fns/differenceInCalendarYears'
import getYear from 'date-fns/getYear'
import subYears from 'date-fns/subYears'
import addYears from 'date-fns/addYears'
import { YEAR_GRID_CONSTANTS } from '../GeoCalendar.utils'

export default {
  name: 'GeoCalendarNavigationYear',
  status: 'ready',
  release: '23.2.0',
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
    },

    /**
     * Initial year within the actual grid year range
     */
    currentInitialYearInRange: {
      type: Number,
      required: true
    },

    /**
     * End year within the actual grid year range
     */
    currentEndYearInRange: {
      type: Number,
      required: true
    },

    /**
     * Whether more options in the select can be selected.
     * If the range with data fits in one grid this should be disabled
     */
    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      isYearRangeSelectionOpened: false,
      displayedInitialYearInRange: null,
      displayedEndYearInRange: null
    }
  },

  computed: {
    earliestDateInCalendar () {
      return this.earliestDate
        ? subYears(this.earliestDate, YEAR_GRID_CONSTANTS.YEARS_IN_GRID)
        : new Date(YEAR_GRID_CONSTANTS.MIN_YEAR, 0)
    },

    latestDateInCalendar () {
      return this.latestDate
        ? addYears(this.latestDate, YEAR_GRID_CONSTANTS.YEARS_IN_GRID)
        : new Date(YEAR_GRID_CONSTANTS.MAX_YEAR, 0)
    },

    numberOfYearsWithinConstraints () {
      return differenceInCalendarYears(this.latestDateInCalendar, this.earliestDateInCalendar)
    },

    totalYearsGrid () {
      let earliestYearInCalendar = getYear(this.earliestDateInCalendar)
      return _.chunk(_.times(this.numberOfYearsWithinConstraints, () => {
        return earliestYearInCalendar++
      }), YEAR_GRID_CONSTANTS.YEARS_IN_GRID)
    },

    yearsInRanges () {
      return _.map(this.totalYearsGrid, (yearGrid) => [_.first(yearGrid), _.last(yearGrid)])
    },

    currentGridYearIndex () {
      return _.findIndex(this.totalYearsGrid, (yearGrid) => _.includes(yearGrid, this.currentInitialYearInRange || this.currentYear))
    }
  },
  watch: {
    currentInitialYearInRange (value) {
      this.displayedInitialYearInRange = value
    },

    currentEndYearInRange (value) {
      this.displayedEndYearInRange = value
    }
  },
  mounted () {
    const initialYearInRange = this.yearsInRanges[this.currentGridYearIndex]
    this.displayedInitialYearInRange = initialYearInRange[0]
    this.displayedEndYearInRange = initialYearInRange[1]
    this.selectYearRange(initialYearInRange)
  },
  methods: {
    closeYearRangeSelection () {
      this.isYearRangeSelectionOpened = false
    },

    selectYearRange (yearRange) {
      this.closeYearRangeSelection()
      /**
       * User displays a different year in the current grid
       *
       * @event go-to-year-range
       * @type {Array}
       */
      this.$emit('go-to-year-range', yearRange)
    },

    toggleYearRangeSelection () {
      if (this.isDisabled) return
      this.isYearRangeSelectionOpened = !this.isYearRangeSelectionOpened
    }
  }
}
</script>
