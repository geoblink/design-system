/**
 * @mixin
 */
export default {
  props: {
    /**
     * Font Awesome 5 icon to be displayed in the selects of the navigation menu.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    calendarNavigationSelectIcon: {
      type: Array,
      required: false,
      default: function () {
        return ['fal', 'chevron-down']
      }
    },

    /**
     * Font Awesome 5 icon to be displayed in `GeoBorderedBoxHeader` in order to close the calendar.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    closeCalendarIcon: {
      type: Array,
      required: false,
      default: function () {
        return ['fal', 'times']
      }
    },

    /**
     * Default date to be displayed as an initial date in the calendar.
     * If it's not provided, the initial range will be empty.
     */
    defaultFromDate: {
      type: Date,
      required: false
    },

    /**
     * Default date to be displayed as an end date in the calendar.
     * If it's not provided, the end range will be empty.
     */
    defaultToDate: {
      type: Date,
      required: false
    },

    /**
     * Earliest date that can be selected.
     * Must be a `Date` object that will serve as a constraint for the earliest
     * date available in the calendar.
     * You won't be able to reach dates earlier than this nor select them as
     * your initial date.
     */
    earliestDate: {
      type: Date,
      required: false
    },

    /**
     * Text displayed on the input that contains the selected 'from' date.
     */
    fromInputPlaceholder: {
      type: String,
      required: false
    },

    /**
     * Providing this prop will set the initial displayed grid in the desired date (Month and year).
     * If nothing is set, the grid will display the month and year from today's date
     */
    initialDateInGrid: {
      type: Date,
      default: function () {
        return new Date()
      }
    },

    /**
     * Font Awesome 5 icon to be displayed as a separator between the two date inputs
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    inputRangeIcon: {
      type: Array,
      required: false,
      default: function () {
        return ['fal', 'arrow-right']
      }
    },

    /**
     * Latest date that can be selected.
     * Must be a `Date` object that will serve as a constraint for the latest
     * date available in the calendar.
     * You won't be able to reach dates later than this nor select them as your
     * end date.
     */
    latestDate: {
      type: Date,
      required: false
    },

    /**
     * Object provided by date-fns specifying the locale being used.
     * To import a locale just require it from date-fns in the following form:
     * require('date-fns/locale')[ISO_CODE_ALPHA_2]
     * See available locales here https://date-fns.org/v1.30.1/docs/I18n#supported-languages
     */
    locale: {
      type: Object,
      required: true
    },

    /**
     * Font Awesome 5 icon to navigate forward through different time units
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: false,
      default: function () {
        return ['fal', 'chevron-right']
      }
    },

    /**
     * Font Awesome 5 icon to navigate backwards through different time units
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: false,
      default: function () {
        return ['fal', 'chevron-left']
      }
    },

    /**
     * Text displayed on the input that contains the selected 'to' date
     */
    toInputPlaceholder: {
      type: String,
      required: false
    },

    /**
     * Class or classes that will be added to the popup element
     */
    popupClass: {
      type: [String, Array, Object],
      required: false
    },

    /**
     * Should appear the calendar opened by default
     */
    openedByDefault: {
      type: Boolean,
      default: false
    }
  }
}
