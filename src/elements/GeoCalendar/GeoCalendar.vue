<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div
      v-if="$slots.pickerGranularity"
      class="geo-calendar__granularity-selectors"
    >
      <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
      <slot name="pickerGranularity" />
      <!-- TODO: CORE-7338 Put aliases in different slot -->
    </div>
    <div
      :class="{
        'geo-calendar__picker-controls': true,
        'geo-calendar__picker-controls--width-100-percent': !$slots.pickerGranularity
      }"
    >
      <div class="geo-calendar__input-ranges">
        <div>
          <!-- blur event won't be fired if we handle the mousedown event that would trigger it  -->
          <!-- select-x events from calendar-picker will consume the mousedown event so no blur will be triggered when you click on a datePickerUnit on the grid -->
          <geo-input
            :value="fromFormattedDate"
            :placeholder="fromInputPlaceholder"
            css-modifier="geo-calendar"
            type="text"
            :error="showFromFormatError"
            :focus="lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE"
            @focus="focusFromDateInput"
            @blur="applyFromFormattedDate"
            @delete-value="deleteFromFormattedDate"
          />
          <!-- @slot Use this slot to customize the message shown when there is an error in one of the selected dates -->
          <geo-input-message
            v-if="showFromFormatError"
            slot="message"
            variant="error"
          >
            <slot name="formatError" />
          </geo-input-message>
          <!-- mousedown event is used because it is fired before blur event on GeoInput -->
          <!-- blur event won't be fired but that's fine because we want this handler to prevail over the blur one -->
          <!-- https://forum.vuejs.org/t/blur-before-click-only-on-safari/21598/7 -->
          <geo-link-button
            v-if="showSetEarliestDateButton"
            css-modifier="calendar-picker-button"
            @mousedown.prevent="setEarliestDate"
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
          <!-- blur event won't be fired if we handle the mousedown event that would trigger it  -->
          <!-- select-x events from calendar-picker will consume the mousedown event so no blur will be triggered when you click on a datePickerUnit on the grid -->
          <geo-input
            :value="toFormattedDate"
            :placeholder="toInputPlaceholder"
            css-modifier="geo-calendar"
            type="text"
            :error="showToFormatError"
            :focus="lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.TO_DATE"
            @focus="focusToDateInput"
            @blur="applyToFormattedDate($event)"
            @delete-value="deleteToFormattedDate"
          />
          <!-- @slot Use this slot to customize the message shown when there is an error in one of the selected dates -->
          <geo-input-message
            v-if="showToFormatError"
            slot="message"
            variant="error"
          >
            <slot name="formatError" />
          </geo-input-message>
          <!-- mousedown event is used because it is fired before blur event on GeoInput -->
          <!-- blur event won't be fired but that's fine because we want this handler to prevail over the blur one -->
          <!-- https://forum.vuejs.org/t/blur-before-click-only-on-safari/21598/7 -->
          <geo-link-button
            v-if="showSetLatestDateButton"
            css-modifier="calendar-picker-button"
            @mousedown.prevent="setLatestDate"
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
        :css-modifier="cssModifier"
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
import { GRANULARITY_IDS, FOCUSABLE_INPUT_FIELDS, isBefore, isAfter } from './GeoCalendar.utils'
import {
  endOfMonth,
  endOfQuarter,
  format,
  getMonth,
  getYear,
  isValid,
  startOfQuarter,
  endOfYear,
  startOfMonth,
  startOfYear,
  differenceInDays,
  differenceInMonths
} from 'date-fns'

import GeoCalendarRootMixin from './GeoCalendarRoot.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'

export default {
  name: 'GeoCalendar',
  status: 'ready',
  release: '23.2.0',
  mixins: [
    GeoCalendarPickerDateUnitMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarRootMixin,
    cssSuffix
  ],

  data () {
    return {
      fromFormattedDate: '',
      toFormattedDate: '',
      fromRawDate: null,
      toRawDate: null,
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
    FOCUSABLE_INPUT_FIELDS () {
      return FOCUSABLE_INPUT_FIELDS
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
      this.deleteFromFormattedDate()
      this.deleteToFormattedDate()
      this.lastInputFieldExplicitlyFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
    }
  },

  beforeMount () {
    this.currentMonth = this.defaultToDate
      ? getMonth(this.defaultToDate)
      : getMonth(this.initialDateInGrid)
    this.currentYear = this.defaultToDate
      ? getYear(this.defaultToDate)
      : getYear(this.initialDateInGrid)
    this.fromRawDate = this.defaultFromDate || null
    this.toRawDate = this.defaultToDate || null
    this.setFormattedDates()
  },

  methods: {
    applyFromFormattedDate () {
      if (!this.fromFormattedDate) {
        this.fromRawDate = null
        this.emitFromDate({ fromDate: this.fromRawDate })
        return
      }
      const parsedDate = this.parseDate(this.fromFormattedDate)
      const isInputDateValid = this.isValidDate(parsedDate)

      if (isInputDateValid) {
        this.fromRawDate = parsedDate
        this.showFromFormatError = false
        this.currentMonth = getMonth(this.fromRawDate)
        this.currentYear = getYear(this.fromRawDate)
      } else {
        this.showFromFormatError = this.fromFormattedDate !== ''
      }
      this.selectDay(parsedDate)
    },

    applyToFormattedDate () {
      if (!this.toFormattedDate) {
        this.toRawDate = null
        this.emitToDate({ toDate: this.toRawDate })
        return
      }
      const parsedDate = this.parseDate(this.toFormattedDate)
      const isInputDateValid = this.isValidDate(parsedDate)

      if (isInputDateValid) {
        this.toRawDate = parsedDate
        this.showToFormatError = false
        this.currentMonth = getMonth(this.toRawDate)
        this.currentYear = getYear(this.toRawDate)
      } else {
        this.showToFormatError = this.toFormattedDate !== ''
      }
      this.selectDay(parsedDate)
    },

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
      const matches = /(0[1-9]|1[0-9]|2[0-9]|3[0-1])[^\d](0[1-9]|1[0-2])[^\d](\d{4})$/gi.exec(date)
      if (!matches) return null
      const [, day, month, year] = matches
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    },

    selectDay (day) {
      const hasFromDate = !!this.fromRawDate
      const isDayBeforeFromDate = hasFromDate && isBefore(day, this.fromRawDate)
      const distanceToFromDate = Math.abs(differenceInDays(day, this.fromRawDate))
      const distanceToToDate = Math.abs(differenceInDays(day, this.toRawDate))

      const isSettingFromDate = this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.TO_DATE
        ? false
        : !hasFromDate ||
          isDayBeforeFromDate ||
          this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE ||
          distanceToFromDate < distanceToToDate

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

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      if (this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE) {
        this.focusToDateInput()
      } else {
        this.lastInputFieldExplicitlyFocused = null
      }
    },

    selectMonth (monthIndex) {
      this.currentMonth = monthIndex
      const firstDayOfMonth = new Date(Date.UTC(this.currentYear, this.currentMonth))
      const lastDayOfMonth = endOfMonth(firstDayOfMonth)
      const hasFromDate = !!this.fromRawDate
      const isMonthBeforeRangeStart = hasFromDate && this.currentMonth < getMonth(this.fromRawDate)

      const distanceToFromDate = Math.abs(differenceInMonths(firstDayOfMonth, this.fromRawDate))
      const distanceToToDate = Math.abs(differenceInMonths(firstDayOfMonth, this.toRawDate))

      const isSettingFromDate = this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.TO_DATE
        ? false
        : !hasFromDate ||
          isMonthBeforeRangeStart ||
          this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE ||
          distanceToFromDate < distanceToToDate

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

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      if (this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE) {
        this.focusToDateInput()
      } else {
        this.lastInputFieldExplicitlyFocused = null
      }
    },

    selectQuarter (monthIndex) {
      this.fromRawDate = startOfQuarter(new Date(this.currentYear, monthIndex))
      this.toRawDate = endOfQuarter(new Date(this.currentYear, monthIndex))
      this.setFormattedDates()
      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })
    },

    selectWeek ({ fromDate, toDate }) {
      this.fromRawDate = fromDate
      this.toRawDate = toDate
      this.setFormattedDates()
      this.emitFromDate({ fromDate })
      this.emitToDate({ toDate })
    },

    selectYear (year) {
      this.currentYear = year
      const firstDayOfYear = new Date(this.currentYear, 0)
      const lastDayOfYear = endOfYear(new Date(this.currentYear, 0))

      const hasFromDate = !!this.fromRawDate
      const isYearBeforeRangeStart = hasFromDate && this.currentYear < getYear(this.fromRawDate)

      const distanceToFromDate = Math.abs(differenceInMonths(firstDayOfYear, this.fromRawDate))
      const distanceToToDate = Math.abs(differenceInMonths(firstDayOfYear, this.toRawDate))

      const isSettingFromDate = this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.TO_DATE
        ? false
        : !hasFromDate ||
          isYearBeforeRangeStart ||
          this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE ||
          distanceToFromDate < distanceToToDate

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

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      if (this.lastInputFieldExplicitlyFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE) {
        this.focusToDateInput()
      } else {
        this.lastInputFieldExplicitlyFocused = null
      }
    },

    setEarliestDate () {
      if (!this.earliestDate) return
      this.showFromFormatError = false
      this.currentMonth = getMonth(this.earliestDate)
      this.currentYear = getYear(this.earliestDate)
      this.fromRawDate = this.earliestDate
      this.fromFormattedDate = this.formatDate(this.fromRawDate)
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

    setFormattedDates () {
      this.fromFormattedDate = this.fromRawDate ? this.formatDate(this.fromRawDate) : null
      this.toFormattedDate = this.toRawDate ? this.formatDate(this.toRawDate) : null
    },

    deleteFromFormattedDate () {
      this.fromFormattedDate = ''
      this.fromRawDate = null
      this.emitFromDate({ fromDate: this.fromRawDate })
    },

    deleteToFormattedDate () {
      this.toFormattedDate = ''
      this.toRawDate = null
      this.emitToDate({ toDate: this.toRawDate })
    },

    setLatestDate () {
      if (!this.latestDate) return
      this.showToFormatError = false
      this.currentMonth = getMonth(this.latestDate)
      this.currentYear = getYear(this.latestDate)
      this.toRawDate = this.latestDate
      this.toFormattedDate = this.formatDate(this.toRawDate)
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

    focusFromDateInput () {
      this.lastInputFieldExplicitlyFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
    },

    focusToDateInput () {
      this.lastInputFieldExplicitlyFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
    }
  }
}

</script>
