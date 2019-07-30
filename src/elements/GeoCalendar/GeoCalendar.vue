<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div class="geo-calendar__granularity-selectors">
      <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
      <slot name="pickerGranularity" />
      <!-- TODO: CORE-7338 Put aliases in different slot -->
    </div>
    <div class="geo-calendar__picker-controls">
      <div class="geo-calendar__input-ranges">
        <div class="geo-calendar__input geo-calendar__input--start">
          <geo-input
            v-model="fromFormattedDate"
            v-click-outside="unfocusFromDateInput"
            :is-focused="isFromDateInputFocused"
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
            css-modifier="geo-calendar"
            input-type="normal"
            @click="focusFromDateInput"
          />
          <!-- @slot Use this slot to customize the message shown when there is an error in one of the selected dates -->
          <slot
            v-if="showFromFormatError"
            name="formatError"
          />
          <geo-link-button
            v-if="earliestDate"
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
            v-click-outside="unfocusToDateInput"
            :is-focused="isToDateInputFocused"
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
            css-modifier="geo-calendar"
            input-type="normal"
            @click="focusToDateInput"
          />
          <!-- @slot Use this slot to customize the message shown when there is an error in one of the selected dates -->
          <slot
            v-if="showToFormatError"
            name="formatError"
          />
          <geo-link-button
            v-if="latestDate"
            css-modifier="calendar-picker-button"
            @click="setLatestDate"
          >
            {{ latestDatePlaceholder }}
          </geo-link-button>
        </div>
      </div>
      <!-- @slot Use this slot to customize the message shown when the initial date is after the end date -->
      <slot
        v-if="areDatesNotConsecutive"
        name="datesNotConsecutive"
      />
      <geo-calendar-picker
        ref="calendarPicker"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :current-month="currentMonth"
        :current-year="currentYear"
        :current-initial-year-in-range="currentInitialYearInRange"
        :current-end-year-in-range="currentEndYearInRange"
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
        @go-to-year-range="goToYearRange"
        @select-day="selectDay"
        @select-month="selectMonth"
        @select-quarter="selectQuarter"
        @select-week="selectWeek"
        @select-year="selectYear"
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
  startOfQuarter,
  endOfYear
} from 'date-fns'

import GeoCalendarRootMixin from './GeoCalendarRoot.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'

export default {
  name: 'GeoCalendar',
  status: 'missing-tests',
  release: '22.3.0',
  directives: {
    ClickOutside
  },

  mixins: [
    GeoCalendarPickerDateUnitMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarRootMixin,
    cssSuffix
  ],

  data () {
    return {
      fromRawDate: null,
      toRawDate: null,
      isFromDateInputFocused: false,
      isToDateInputFocused: false,
      currentMonth: null,
      currentYear: null,
      showFromFormatError: false,
      showToFormatError: false,
      currentInitialYearInRange: 0,
      currentEndYearInRange: 0
    }
  },

  computed: {
    fromFormattedDate: {
      get () {
        return this.fromRawDate ? this.formatDate(this.fromRawDate) : null
      },

      set (newFromDate) {
        const parsedDate = this.parseDate(newFromDate)
        if (this.isValidDate(parsedDate)) {
          this.showFromFormatError = false
          this.fromRawDate = this.parseDate(newFromDate)
          this.currentMonth = getMonth(this.fromRawDate)
          this.currentYear = getYear(this.fromRawDate)
          this.setFromDate({ fromDate: this.fromRawDate })
        } else {
          if (newFromDate === '') {
            this.showFromFormatError = false
            this.fromRawDate = null
          } else {
            this.showFromFormatError = true
          }
          this.setFromDate({ fromDate: null })
        }
      }
    },

    toFormattedDate: {
      get () {
        return this.toRawDate ? this.formatDate(this.toRawDate) : null
      },

      set (newToDate) {
        const parsedDate = this.parseDate(newToDate)
        if (this.isValidDate(parsedDate)) {
          this.showToFormatError = false
          this.toRawDate = this.parseDate(newToDate)
          this.currentMonth = getMonth(this.toRawDate)
          this.currentYear = getYear(this.toRawDate)
          this.setToDate({ toDate: this.toRawDate })
        } else {
          if (newToDate === '') {
            this.showToFormatError = false
            this.toRawDate = null
          } else {
            this.showToFormatError = true
          }
          this.setToDate({ toDate: null })
        }
      }
    },

    isDateWithinBounds () {
      return (date) => !isBefore(date, this.earliestDate) && !isAfter(date, this.latestDate)
    },

    areDatesNotConsecutive () {
      return this.fromRawDate && this.toRawDate && isAfter(this.fromRawDate, this.toRawDate)
    },

    isSettingFromInput () {
      return (day) => {
        return !this.fromRawDate || (this.fromRawDate && isBefore(day, this.fromRawDate))
      }
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

  beforeMount () {
    this.currentMonth = getMonth(this.initialDateInGrid)
    this.currentYear = getYear(this.initialDateInGrid)
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

    goToYearRange (yearRange) {
      [this.currentInitialYearInRange, this.currentEndYearInRange] = yearRange
    },

    parseDate (date) {
      // TODO: CORE-7324 Change when date-fns v2 is release as stable version
      // This should be provided by date-fns, but only is available in alpha and beta versions
      // https://github.com/date-fns/date-fns/issues/942
      // https://github.com/date-fns/date-fns/issues/1064
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

    selectYear (year) {
      this.currentYear = year
      const firstDayOfYear = new Date(this.currentYear, 0)
      const lastDayOfYear = endOfYear(new Date(this.currentYear, 0))
      const selectedDate = !this.fromRawDate || (this.fromRawDate && this.currentYear < getYear(this.fromRawDate))
        ? firstDayOfYear
        : lastDayOfYear
      this.setDateInput(selectedDate)
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

    focusFromDateInput () {
      this.isFromDateInputFocused = true
    },

    unfocusFromDateInput () {
      this.isFromDateInputFocused = false
    },

    focusToDateInput () {
      this.isToDateInputFocused = true
    },

    unfocusToDateInput () {
      this.isToDateInputFocused = false
    }
  }
}

</script>
