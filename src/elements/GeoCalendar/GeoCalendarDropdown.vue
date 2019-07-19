<template>
  <geo-dropdown
    :css-modifier="`geo-calendar__dropdown${cssSuffix}`"
    :opened="isCalendarPopupOpened"
    @click-outside="closeCalendar"
  >
    <!-- @slot Use this slot to customize the button used to toggle the calendar -->
    <slot
      slot="toggleButton"
      name="toggleButton"
      :toggle-calendar-popup="toggleCalendarPopup"
    />
    <!-- TODO: Bind props to geoCalendar -->
    <geo-bordered-box
      slot="popupContent"
      :css-modifier="`geo-calendar__dropdown${cssSuffix}`"
    >
      <geo-bordered-box-header
        :close-icon="['fas', 'times']"
        @close="closeCalendar"
      >
        <!-- @slot Use this slot to customize the text displayed on the calendar's header -->
        <slot name="calendarHeaderTitle" />
      </geo-bordered-box-header>
      <geo-calendar
        ref="calendar"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :earliest-date="earliestDate"
        :earliest-date-placeholder="earliestDatePlaceholder"
        :from-input-placeholder="fromInputPlaceholder"
        :granularity-id="granularityId"
        :input-range-icon="inputRangeIcon"
        :latest-date="latestDate"
        :latest-date-placeholder="latestDatePlaceholder"
        :locale="locale"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :picker-date-unit="pickerDateUnit"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :to-input-placeholder="toInputPlaceholder"
        :error-message-invalid-date-format="errorMessageInvalidDateFormat"
        :error-message-invalid-from-date-range="errorMessageInvalidFromDateRange"
        :error-message-invalid-to-date-range="errorMessageInvalidToDateRange"
        @set-from-date="setFromDate"
        @set-to-date="setToDate"
      >
        <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
        <slot
          slot="pickerGranularity"
          name="pickerGranularity"
        />
      </geo-calendar>
      <geo-bordered-box-footer>
        <!-- @slot Use this slot to customize the footer of the calendar -->
        <slot name="calendarFooter" />
      </geo-bordered-box-footer>
    </geo-bordered-box>
  </geo-dropdown>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoCalendarDropdown',
  mixins: [cssSuffix],
  props: {
    /**
     * Icon used for the selects in the navigation menu
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
      required: true
    },

    /**
     * Text displayed in the link button to select the earliest date available
     */
    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    /**
     * Error displayed when the format of one of the input dates is wrong
     */
    errorMessageInvalidDateFormat: {
      type: String,
      required: true
    },

    /**
     * Error displayed when the start date is set after the end date
     */
    errorMessageInvalidFromDateRange: {
      type: String,
      required: true
    },

    /**
     * Error displayed when the end date is set before the start date
     */
    errorMessageInvalidToDateRange: {
      type: String,
      required: true
    },

    /**
     * Text displayed on the input that contains the selected 'from' date
     */
    fromInputPlaceholder: {
      type: String,
      required: false
    },

    /**
     * Current granularity being displayed on the calendar. `day`, `week`, `month`, `quarter`, `year`
     * Values available in `GRANULARITY_IDS`:
     *
     * - `GRANULARITY_IDS.day`
     * - `GRANULARITY_IDS.week`
     * - `GRANULARITY_IDS.month`
     * - `GRANULARITY_IDS.quarter`
     * - `GRANULARITY_IDS.year`
     */
    granularityId: {
      type: String,
      required: true
    },

    /**
     * Icon displayed as a separator between the two date inputs
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
      required: true
    },

    /**
     * Text displayed in the link button to select the latest date available
     */
    latestDatePlaceholder: {
      type: String,
      required: false
    },

    /**
     * Object provided by date-fns specifying the locale being used
     */
    locale: {
      type: Object,
      required: true
    },

    /**
     * Icon displayed to navigate forward through different time units
     */
    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: false
    },

    /**
     * Type of grid being displayed. `day`, `month` or `year`
     * Values available in PICKER_DATE_UNITS:
     *
     * - `PICKER_DATE_UNITS.day`
     * - `PICKER_DATE_UNITS.month`
     * - `PICKER_DATE_UNITS.year`
     */
    pickerDateUnit: {
      type: String,
      required: true
    },

    /**
     * Icon displayed to navigate backwards through different time units
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
  },

  data () {
    return {
      isCalendarPopupOpened: false
    }
  },

  methods: {
    closeCalendar ($event) {
      const popup = _.get(this.$refs.calendar, '$refs.calendarPicker.$refs.calendarNavigationWrapper.$refs.calendarNavigation.$refs.calendarNavigationSelect')
      if (popup && popup.contains($event.target)) return
      this.isCalendarPopupOpened = false
      this.resetDates()
    },

    resetDates () {
      this.setFromDate({ fromDate: null })
      this.setToDate({ toDate: null })
    },

    setFromDate ({ fromDate }) {
      /**
       * User set an initial date.
       *
       * @event set-from-date
       * @type {Date}
       */
      this.$emit('set-from-date', { fromDate })
    },

    setToDate ({ toDate }) {
      /**
       * User set an end date.
       *
       * @event set-to-date
       * @type {Date}
       */
      this.$emit('set-to-date', { toDate })
    },

    toggleCalendarPopup () {
      this.isCalendarPopupOpened = !this.isCalendarPopupOpened
    }
  }
}
</script>
