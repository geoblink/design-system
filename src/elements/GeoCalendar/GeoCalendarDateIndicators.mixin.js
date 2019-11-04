/**
 * @mixin
 */
export default {
  props: {
    /**
     * Number of the month within a year that is currently being displayed in the grid (ie: `0 -> january`, `11 -> december`)
     */
    currentMonth: {
      type: Number,
      required: true,
      validator (value) {
        return value >= 0 && value <= 11
      }
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
     * Object provided by date-fns specifying the locale being used.
     * To import a locale just require it from date-fns in the following form:
     * require('date-fns/locale')[ISO_CODE_ALPHA_2]
     * See available locales here https://date-fns.org/v1.30.1/docs/I18n#supported-languages
     */
    locale: {
      type: Object,
      required: false
    }
  }
}
