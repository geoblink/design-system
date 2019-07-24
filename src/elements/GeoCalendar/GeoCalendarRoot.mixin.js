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
      required: false
    },

    /**
     * Earliest date that can be selected
     */
    earliestDate: {
      type: Date,
      required: false
    },

    /**
     * Text displayed in the link button to select the earliest date available
     */
    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    /**
     * Text displayed on the input that contains the selected 'from' date
     */
    fromInputPlaceholder: {
      type: String,
      required: false
    },

    /**
     * Font Awesome 5 icon to be displayed as a separator between the two date inputs
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    inputRangeIcon: {
      type: Array,
      required: false
    },

    /**
     * Latest date that can be selected
     */
    latestDate: {
      type: Date,
      required: false
    },

    /**
     * Text displayed in the link button to select the latest date available
     */
    latestDatePlaceholder: {
      type: String,
      required: false
    },

    /**
     * Object provided by date-fns specifying the locale being used.
     * To import a locale just require it from date-fns in the following form:
     * require('date-fns/locale/ISO_CODE_ALPHA_2')
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
      required: false
    },

    /**
     * Font Awesome 5 icon to navigate backwards through different time units
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: false
    },

    /**
     * Text displayed on the input that contains the selected 'to' date
     */
    toInputPlaceholder: {
      type: String,
      required: false
    }
  }
}
