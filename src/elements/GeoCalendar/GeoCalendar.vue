<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div class="geo-calendar__granularity-selectors">
      <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
      <slot name="pickerGranularity" />
      <!-- TODO: CORE-7338 Put aliases in different slot -->
    </div>
    <div class="geo-calendar__picker-controls">
      <div class="geo-calendar__input-ranges">
        <div>
          <geo-editable-input
            v-model="fromFormattedDate"
            v-click-outside="blurFromDateInput"
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
            v-if="showSetEarliestDateButton"
            css-modifier="calendar-picker-button"
            @click="setEarliestDate"
          >
            <!-- @slot Use this slot to customize the text in the button used to apply your earliest available date in the fromDate input  -->
            <slot
              name="earliestDatePlaceholder"
            />
          </geo-link-button>
        </div>
        <font-awesome-icon
          :icon="inputRangeIcon"
          class="geo-calendar__input-range-icon"
          fixed-width
        />
        <div>
          <geo-editable-input
            v-model="toFormattedDate"
            v-click-outside="blurToDateInput"
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
            v-if="showSetLatestDateButton"
            css-modifier="calendar-picker-button"
            @click="setLatestDate"
          >
            <!-- @slot Use this slot to customize the text in the button used to apply your latest available date in the toDate input  -->
            <slot
              name="latestDatePlaceholder"
            />
          </geo-link-button>
        </div>
      </div>
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
        @select-day="selectDay($event)"
        @select-month="selectMonth"
        @select-quarter="selectQuarter($event)"
        @select-week="selectWeek($event)"
        @select-year="selectYear($event)"
      />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import ClickOutside from '../../directives/GeoClickOutside'
import { GRANULARITY_IDS, FOCUSABLE_INPUT_FIELDS } from './GeoCalendar.utils'
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
  endOfYear,
  startOfMonth,
  startOfYear
} from 'date-fns'

import GeoCalendarRootMixin from './GeoCalendarRoot.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'

export default {
  name: 'GeoCalendar',
  status: 'ready',
  release: '23.2.0',
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
      currentEndYearInRange: 0,
      lastInputFieldExplicitlyFocused: null
    }
  },

  computed: {
    fromFormattedDate: {
      get () {
        return this.fromRawDate ? this.formatDate(this.fromRawDate) : null
      },

      set (newFromDate) {
        const parsedDate = this.parseDate(newFromDate)
        const isInputDateValid = this.isValidDate(parsedDate)

        if (isInputDateValid && this.toRawDate && isBefore(this.toRawDate, parsedDate)) {
          this.fromFormattedDate = this.toFormattedDate
          this.toFormattedDate = newFromDate
          return
        }

        if (isInputDateValid) {
          this.showFromFormatError = false
          this.fromRawDate = parsedDate
          this.currentMonth = getMonth(this.fromRawDate)
          this.currentYear = getYear(this.fromRawDate)
        } else {
          this.showFromFormatError = newFromDate !== ''
          this.fromRawDate = null
        }
        this.emitFromDate({ fromDate: this.fromRawDate })
      }
    },

    toFormattedDate: {
      get () {
        return this.toRawDate ? this.formatDate(this.toRawDate) : null
      },

      set (newToDate) {
        const parsedDate = this.parseDate(newToDate)
        const isInputDateValid = this.isValidDate(parsedDate)

        if (isInputDateValid && this.fromRawDate && isAfter(this.fromRawDate, parsedDate)) {
          this.toFormattedDate = this.fromFormattedDate
          this.fromFormattedDate = newToDate
          return
        }

        if (isInputDateValid) {
          this.showToFormatError = false
          this.toRawDate = parsedDate
          this.currentMonth = getMonth(this.toRawDate)
          this.currentYear = getYear(this.toRawDate)
        } else {
          this.showToFormatError = newToDate !== ''
          this.toRawDate = null
        }
        this.emitToDate({ toDate: this.toRawDate })
      }
    },

    showSetEarliestDateButton () {
      return this.earliestDate && this.isGranularityWithoutRangeConstraints
    },

    showSetLatestDateButton () {
      return this.latestDate && this.isGranularityWithoutRangeConstraints
    },

    isGranularityWithoutRangeConstraints () {
      return this.granularityId in {
        [GRANULARITY_IDS.day]: GRANULARITY_IDS.day,
        [GRANULARITY_IDS.month]: GRANULARITY_IDS.month,
        [GRANULARITY_IDS.year]: GRANULARITY_IDS.year
      }
    },

    isDateWithinBounds () {
      return (date) => !isBefore(date, this.earliestDate) && !isAfter(date, this.latestDate)
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
    this.fromRawDate = this.defaultFromDate || null
    this.toRawDate = this.defaultToDate || null
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
      if (!date) return null
      const matches = /(\d{1,2})[^\d](\d{1,2})[^\d](\d{2,4})$/gi.exec(date)
      if (!matches) return null
      const [, day, month, year] = matches
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    },

    selectDay (day) {
      const hasFromDate = !!this.fromRawDate
      const isDayBeforeFromDate = hasFromDate && isBefore(day, this.fromRawDate)
      const isSettingFromDate = !hasFromDate || isDayBeforeFromDate || this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE

      const unverifiedRangeSettings = {
        whenSettingFromDate: {
          start: day,
          end: this.toRawDate
        },
        whenSettingToDate: {
          start: this.fromRawDate,
          end: day
        }
      }

      const unverifiedRange = isSettingFromDate
        ? unverifiedRangeSettings.whenSettingFromDate
        : unverifiedRangeSettings.whenSettingToDate

      const isRangeValid = unverifiedRange.end
        ? isBefore(unverifiedRange.start, unverifiedRange.end)
        : true

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: unverifiedRange.end,
          end: unverifiedRange.start
        }

      this.fromRawDate = validatedRange.start
      this.toRawDate = validatedRange.end

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      if (isSettingFromDate) {
        this.focusToDateInput()
      }
    },

    selectMonth (monthIndex) {
      this.currentMonth = monthIndex
      const firstDayOfMonth = new Date(Date.UTC(this.currentYear, this.currentMonth))
      const lastDayOfMonth = endOfMonth(firstDayOfMonth)

      const hasFromDate = !!this.fromRawDate
      const isMonthBeforeRangeStart = hasFromDate && this.currentMonth < getMonth(this.fromRawDate)
      const isSettingFromDate = !hasFromDate || isMonthBeforeRangeStart || this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE

      const unverifiedRangeSettings = {
        whenSettingFromDate: {
          start: firstDayOfMonth,
          end: this.toRawDate
        },
        whenSettingToDate: {
          start: this.fromRawDate,
          end: lastDayOfMonth
        }
      }

      const unverifiedRange = isSettingFromDate
        ? unverifiedRangeSettings.whenSettingFromDate
        : unverifiedRangeSettings.whenSettingToDate

      const isRangeValid = unverifiedRange.end
        ? isBefore(unverifiedRange.start, unverifiedRange.end)
        : true

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: startOfMonth(unverifiedRange.end),
          end: endOfMonth(unverifiedRange.start)
        }

      this.fromRawDate = validatedRange.start
      this.toRawDate = validatedRange.end

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      if (isSettingFromDate) {
        this.focusToDateInput()
      }
    },

    selectQuarter (monthIndex) {
      this.fromRawDate = startOfQuarter(new Date(this.currentYear, monthIndex))
      this.toRawDate = endOfQuarter(new Date(this.currentYear, monthIndex))
      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })
    },

    selectWeek ({ fromDate, toDate }) {
      this.fromRawDate = fromDate
      this.toRawDate = toDate
      this.emitFromDate({ fromDate })
      this.emitToDate({ toDate })
    },

    selectYear (year) {
      this.currentYear = year
      const firstDayOfYear = new Date(this.currentYear, 0)
      const lastDayOfYear = endOfYear(new Date(this.currentYear, 0))

      const hasFromDate = !!this.fromRawDate
      const isYearBeforeRangeStart = hasFromDate && this.currentYear < getYear(this.fromRawDate)
      const isSettingFromDate = !hasFromDate || isYearBeforeRangeStart || this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE

      const unverifiedRangeSettings = {
        whenSettingFromDate: {
          start: firstDayOfYear,
          end: this.toRawDate
        },
        whenSettingToDate: {
          start: this.fromRawDate,
          end: lastDayOfYear
        }
      }

      const unverifiedRange = isSettingFromDate
        ? unverifiedRangeSettings.whenSettingFromDate
        : unverifiedRangeSettings.whenSettingToDate

      const isRangeValid = unverifiedRange.end
        ? isBefore(unverifiedRange.start, unverifiedRange.end)
        : true

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: startOfYear(unverifiedRange.end),
          end: endOfYear(unverifiedRange.start)
        }

      this.fromRawDate = validatedRange.start
      this.toRawDate = validatedRange.end

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      if (isSettingFromDate) {
        this.focusToDateInput()
      }
    },

    setEarliestDate () {
      if (!this.earliestDate) return
      this.showFromFormatError = false
      this.currentMonth = getMonth(this.earliestDate)
      this.currentYear = getYear(this.earliestDate)
      this.fromRawDate = this.earliestDate
      this.emitFromDate({ fromDate: this.fromRawDate })
    },

    emitFromDate ({ fromDate }) {
      /**
       * User set an initial date.
       *
       * @event emit-from-date
       * @type {Date}
       */
      this.$emit('emit-from-date', { fromDate })
    },

    setLatestDate () {
      if (!this.latestDate) return
      this.showToFormatError = false
      this.currentMonth = getMonth(this.latestDate)
      this.currentYear = getYear(this.latestDate)
      this.toRawDate = this.latestDate
      this.emitToDate({ toDate: this.toRawDate })
    },

    emitToDate ({ toDate }) {
      /**
       * User set an end date.
       *
       * @event emit-to-date
       * @type {Date}
       */
      this.$emit('emit-to-date', { toDate })
    },

    blurFromDateInput () {
      this.isFromDateInputFocused = false
    },

    focusFromDateInput () {
      this.isFromDateInputFocused = true
      this.lastInputFieldExplicitlyFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
    },

    blurToDateInput () {
      this.isToDateInputFocused = false
    },

    focusToDateInput () {
      this.isToDateInputFocused = true
      this.lastInputFieldExplicitlyFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
    }
  }
}

</script>
