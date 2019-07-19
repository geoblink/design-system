<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div class="geo-calendar__granularity-selectors">
      <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
      <slot name="pickerGranularity" />
      <!-- TODO: Put aliases in different slot -->
      <!-- <slot name="aliases" /> -->
    </div>
    <div class="geo-calendar__picker-controls">
      <div class="geo-calendar__input-ranges">
        <div class="geo-calendar__input geo-calendar__input--start">
          <geo-input
            v-model="fromFormattedDate"
            v-click-outside="unfocusDateInput"
            :is-focused="isFromDateInputFocused"
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
            css-modifier="geo-calendar"
            input-type="normal"
            @click="isFromDateInputFocused = true"
          />
          <!-- TODO: CORE-7312 This should be part of the DS when input results in error -->
          <label
            v-if="showFromFormatError"
            class="input-label--error"
          >
            {{ errorMessageInvalidDateFormat }}
          </label>
          <!-- TODO: CORE-7312 This should be part of the DS when input results in error -->
          <label
            v-if="isFromDateAfterToDate"
            class="input-label--error"
          >
            {{ errorMessageInvalidFromDateRange }}
          </label>
          <geo-link-button
            css-modifier="calendar-picker-button"
            @click="setEarliestDate"
          >
            {{ earliestDatePlaceholder }}
          </geo-link-button>
        </div>
        <font-awesome-icon
          :icon="inputRangeIcon"
          class="geo-calendar__input-range-icon"
          fixed-width
        />
        <div class="geo-calendar__input geo-calendar__input--end">
          <geo-input
            v-model="toFormattedDate"
            v-click-outside="unfocusDateInput"
            :is-focused="isToDateInputFocused"
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
            css-modifier="geo-calendar"
            input-type="normal"
            @click="isToDateInputFocused = true"
          />
          <!-- TODO: CORE-7312 This should be part of the DS when input results in error -->
          <label
            v-if="showToFormatError"
            class="input-label--error"
          >
            {{ errorMessageInvalidDateFormat }}
          </label>
          <!-- TODO: CORE-7312 This should be part of the DS when input results in error -->
          <label
            v-if="isToDateBeforeFromDate"
            class="input-label--error"
          >
            {{ errorMessageInvalidToDateRange }}
          </label>
          <geo-link-button
            css-modifier="calendar-picker-button"
            @click="setLatestDate"
          >
            {{ latestDatePlaceholder }}
          </geo-link-button>
        </div>
      </div>
      <geo-calendar-picker
        ref="calendarPicker"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :current-month="currentMonth"
        :current-year="currentYear"
        :earliest-date="earliestDate"
        :granularity-id="granularityId"
        :latest-date="latestDate"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :locale="locale"
        :picker-date-unit="pickerDateUnit"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :selected-from-day="fromRawDate"
        :selected-to-day="toRawDate"
        @go-to-month="goToMonth"
        @go-to-year="goToYear"
        @select-day="selectDay"
        @select-month="selectMonth"
        @select-quarter="selectQuarter"
        @select-week="selectWeek"
      />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import ClickOutside from '../../directives/GeoClickOutside'
import {
  endOfMonth,
  endOfQuarter,
  format,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isValid,
  startOfQuarter
} from 'date-fns'

export default {
  name: 'GeoCalendar',
  status: 'missing-tests',
  release: 'CHANGE ME',
  directives: {
    ClickOutside
  },
  mixins: [cssSuffix],
  props: {
    /**
     * Icon used for the selects in the navigation menu
     */
    calendarNavigationSelectIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
      }
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
      default () {
        return ['fal', 'arrow-right']
      }
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
      default () {
        return ['fal', 'chevron-right']
      }
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
      default () {
        return ['fal', 'chevron-left']
      }
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
      fromRawDate: null,
      toRawDate: null,
      isFromDateInputFocused: false,
      isToDateInputFocused: false,
      currentMonth: getMonth(new Date()),
      currentYear: getYear(new Date()),
      showFromFormatError: false,
      showToFormatError: false
    }
  },
  computed: {
    areSelectedBoundsValid () {
      return !!this.fromRawDate && !!this.toRawDate && !isAfter(this.fromRawDate, this.toRawDate)
    },

    fromFormattedDate: {
      get () {
        return this.fromRawDate ? this.formatDate(this.fromRawDate) : null
      },

      set (newFromDate) {
        if (newFromDate === '') {
          this.showFromFormatError = false
          this.fromRawDate = null
          return this.setFromDate({ fromDate: null })
        }
        const parsedDate = this.parseDate(newFromDate)
        if (this.isValidDate(parsedDate)) {
          this.showFromFormatError = false
          this.fromRawDate = this.parseDate(newFromDate)
          this.currentMonth = getMonth(this.fromRawDate)
          this.currentYear = getYear(this.fromRawDate)
          this.setFromDate({ fromDate: this.fromRawDate })
        } else {
          this.showFromFormatError = true
          this.setFromDate({ fromDate: null })
        }
      }
    },

    toFormattedDate: {
      get () {
        return this.toRawDate ? this.formatDate(this.toRawDate) : null
      },

      set (newToDate) {
        if (newToDate === '') {
          this.toRawDate = null
          this.showToFormatError = false
          return this.setToDate({ toDate: null })
        }
        const parsedDate = this.parseDate(newToDate)
        if (this.isValidDate(parsedDate)) {
          this.showToFormatError = false
          this.toRawDate = this.parseDate(newToDate)
          this.currentMonth = getMonth(this.toRawDate)
          this.currentYear = getYear(this.toRawDate)
          this.setToDate({ toDate: this.toRawDate })
        } else {
          this.showToFormatError = true
          this.setToDate({ toDate: null })
        }
      }
    },

    isDateWithinBounds () {
      return (date) => !isBefore(date, this.earliestDate) && !isAfter(date, this.latestDate)
    },

    isFromDateAfterToDate () {
      return this.fromRawDate && this.toRawDate && isAfter(this.fromRawDate, this.toRawDate)
    },

    isSettingFromInput () {
      return (day) => {
        return !this.fromRawDate || (this.fromRawDate && isBefore(day, this.fromRawDate))
      }
    },

    isToDateBeforeFromDate () {
      return this.fromRawDate && this.toRawDate && isBefore(this.toRawDate, this.fromRawDate)
    },

    isValidDate () {
      return (date) => date && isValid(date) && this.isDateWithinBounds(date)
    }
  },
  watch: {
    granularityId () {
      this.fromRawDate = null
      this.toRawDate = null
    }
  },
  methods: {
    formatDate (date) {
      return format(date, 'DD/MM/YYYY')
    },

    goToMonth (monthIndex) {
      this.currentMonth = monthIndex
    },

    goToYear (year) {
      this.currentYear = year
    },

    parseDate (date) {
      if (!date || !date.match(/\d{2}\/\d{2}\/\d{4}/)) return null
      const [day, month, year] = date.split('/').map(n => parseInt(n))
      return new Date(year, month - 1, day)
    },

    selectDay (day) {
      this.setDateInput(day)
    },

    selectMonth (monthIndex) {
      this.currentMonth = monthIndex
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth)
      const lastDayOfMonth = endOfMonth(firstDayOfMonth)
      const selectedDate = !this.fromRawDate || (this.fromRawDate && this.currentMonth < getMonth(this.fromRawDate))
        ? firstDayOfMonth
        : lastDayOfMonth
      this.setDateInput(selectedDate)
    },

    selectQuarter (monthIndex) {
      this.fromRawDate = startOfQuarter(new Date(this.currentYear, monthIndex))
      this.toRawDate = endOfQuarter(new Date(this.currentYear, monthIndex))
      this.setFromDate({ fromDate: this.fromRawDate })
      this.setToDate({ toDate: this.toRawDate })
    },

    selectWeek ({ fromDate, toDate }) {
      this.fromRawDate = fromDate
      this.toRawDate = toDate
      this.setFromDate({ fromDate })
      this.setToDate({ toDate })
    },

    setDateInput (day) {
      if (this.isSettingFromInput(day)) {
        this.fromRawDate = day
        this.setFromDate({ fromDate: this.fromRawDate })
      } else {
        this.toRawDate = day
        this.setToDate({ toDate: this.toRawDate })
      }
    },

    setEarliestDate () {
      this.showFromFormatError = false
      this.fromRawDate = this.earliestDate
      this.setFromDate({ fromDate: this.earliestDate })
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

    setLatestDate () {
      this.showToFormatError = false
      this.toRawDate = this.latestDate
      this.setToDate({ toDate: this.latestDate })
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

    unfocusDateInput () {
      this.isFromDateInputFocused = false
      this.isToDateInputFocused = false
    }
  }
}

</script>
