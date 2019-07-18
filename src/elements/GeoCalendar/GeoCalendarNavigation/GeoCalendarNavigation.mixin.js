module.exports = {
  props: {
    /**
     * Icon used for the selects in the navigation menu
     */
    calendarNavigationSelectIcon: {
      type: Array,
      required: true
    },

    /**
     * Number of the month within a year that is currently being displayed in the grid(ie: `0 -> january`, `11 -> december`)
     */
    currentMonth: {
      type: Number,
      required: true
    },

    /**
     * Year that is currently being displayed in the grid
     */
    currentYear: {
      type: Number,
      required: true
    },

    /**
     * Earliest date that can be selected
     */
    earliestDate: {
      type: Date,
      required: true
    },

    /**
     * Latest date that can be selected
     */
    latestDate: {
      type: Date,
      required: true
    },

    /**
     * Object provided by date-fns specifying the locale being used
     */
    locale: {
      type: Object,
      required: true
    }
  }
}
