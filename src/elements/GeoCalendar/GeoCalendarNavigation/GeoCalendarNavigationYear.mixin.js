import _ from 'lodash'
import differenceInCalendarYears from 'date-fns/differenceInCalendarYears'
import getYear from 'date-fns/getYear'
import { YEAR_GRID_CONSTANTS } from '../GeoCalendar.utils'

/**
 * @mixin
 */
export default {
  data () {
    return {
      isYearSelectionOpened: false
    }
  },

  computed: {
    earliestYearInSelect () {
      return this.earliestDate || new Date(YEAR_GRID_CONSTANTS.MIN_YEAR, 0)
    },

    latestYearInSelect () {
      return this.latestDate || new Date(YEAR_GRID_CONSTANTS.MAX_YEAR, 0)
    },

    numYearsWithData () {
      return differenceInCalendarYears(this.latestYearInSelect, this.earliestYearInSelect) + 1
    },

    yearsList () {
      let earliestYear = getYear(this.earliestYearInSelect)
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
