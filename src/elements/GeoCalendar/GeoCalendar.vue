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
            v-model="fromFormattedDate"
            :placeholder="fromInputPlaceholder"
            css-modifier="geo-calendar"
            type="text"
            :error="showFromFormatError"
            :focus="isFromInputFieldFocused"
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
          <!-- blur event won't be fired if we handle the mousedown event that would trigger it  -->
          <!-- select-x events from calendar-picker will consume the mousedown event so no blur will be triggered when you click on a datePickerUnit on the grid -->
          <geo-input
            v-model="toFormattedDate"
            :placeholder="toInputPlaceholder"
            css-modifier="geo-calendar"
            type="text"
            :error="showToFormatError"
            :focus="isToInputFieldFocused"
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
        @day-unit-mouseover="highlightInputForDayUnit($event)"
        @month-unit-mouseover="highlightInputForMonthUnit($event)"
        @year-unit-mouseover="highlightInputForYearUnit($event)"
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
      lastInputFieldFocused: null,
      isSomeInputExplicitlyFocused: false
    }
  },

  computed: {
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

    isFromInputFieldFocused () {
      return this.lastInputFieldFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE
    },

    isToInputFieldFocused () {
      return this.lastInputFieldFocused === FOCUSABLE_INPUT_FIELDS.TO_DATE
    },

    isValidDate () {
      return (date) => date && isValid(date) && this.isDateWithinBounds(date)
    }
  },

  watch: {
    granularityId () {
      this.deleteFromFormattedDate()
      this.deleteToFormattedDate()
      this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
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
        this.showFromFormatError = false
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
        this.showToFormatError = false
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
      const distanceToToDate = this.toRawDate
        ? Math.abs(differenceInDays(day, this.toRawDate))
        : 0

      const isSettingFromDate = this.isToInputFieldFocused && this.isSomeInputExplicitlyFocused
        ? false
        : !hasFromDate ||
          isDayBeforeFromDate ||
          (this.isFromInputFieldFocused && this.isSomeInputExplicitlyFocused) ||
          distanceToFromDate < distanceToToDate

      const unverifiedRangeSettings = this.getUnverifiedRangeSettings(day, day)

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

      this.isSomeInputExplicitlyFocused = false
      if (this.isFromInputFieldFocused) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      } else {
        this.lastInputFieldFocused = null
      }
    },

    selectMonth (monthIndex) {
      this.currentMonth = monthIndex
      const firstDayOfMonth = new Date(Date.UTC(this.currentYear, this.currentMonth))
      const lastDayOfMonth = endOfMonth(firstDayOfMonth)
      const hasFromDate = !!this.fromRawDate
      const isMonthBeforeRangeStart = hasFromDate && this.currentMonth < getMonth(this.fromRawDate)

      const distanceToFromDate = Math.abs(differenceInMonths(firstDayOfMonth, this.fromRawDate))
      const distanceToToDate = this.toRawDate
        ? Math.abs(differenceInMonths(firstDayOfMonth, this.toRawDate))
        : 0

      const isSettingFromDate = this.isToInputFieldFocused && this.isSomeInputExplicitlyFocused
        ? false
        : !hasFromDate ||
          isMonthBeforeRangeStart ||
          (this.isFromInputFieldFocused && this.isSomeInputExplicitlyFocused) ||
          distanceToFromDate < distanceToToDate

      const unverifiedRangeSettings = this.getUnverifiedRangeSettings(firstDayOfMonth, lastDayOfMonth)

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

      this.isSomeInputExplicitlyFocused = false
      if (this.isFromInputFieldFocused) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      } else {
        this.lastInputFieldFocused = null
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
      const distanceToToDate = this.toRawDate
        ? Math.abs(differenceInMonths(firstDayOfYear, this.toRawDate))
        : 0

      const isSettingFromDate = this.isToInputFieldFocused && this.isSomeInputExplicitlyFocused
        ? false
        : !hasFromDate ||
          isYearBeforeRangeStart ||
          (this.isFromInputFieldFocused && this.isSomeInputExplicitlyFocused) ||
          distanceToFromDate < distanceToToDate

      const unverifiedRangeSettings = this.getUnverifiedRangeSettings(firstDayOfYear, lastDayOfYear)

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

      this.isSomeInputExplicitlyFocused = false
      if (this.isFromInputFieldFocused) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      } else {
        this.lastInputFieldFocused = null
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
      this.showFromFormatError = false
      this.emitFromDate({ fromDate: this.fromRawDate })
    },

    deleteToFormattedDate () {
      this.toFormattedDate = ''
      this.toRawDate = null
      this.showToFormatError = false
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
      this.isSomeInputExplicitlyFocused = true
      this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
    },

    focusToDateInput () {
      this.isSomeInputExplicitlyFocused = true
      this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
    },

    getUnverifiedRangeSettings (firstDay, lastDay) {
      return {
        whenSettingFromDate: {
          start: firstDay,
          end: this.toRawDate
        },
        whenSettingToDate: {
          start: this.fromRawDate,
          end: lastDay
        }
      }
    },

    highlightInputForDayUnit (day) {
      if (this.isSomeInputExplicitlyFocused) return
      const hasFromDate = !!this.fromRawDate
      const isDayBeforeFromDate = hasFromDate && isBefore(day, this.fromRawDate)
      const distanceToFromDate = differenceInDays(day, this.fromRawDate)
      const distanceToToDate = this.toRawDate
        ? differenceInDays(this.toRawDate, day)
        : 0

      const shouldSetFromDate = !hasFromDate ||
        isDayBeforeFromDate ||
        (this.isFromInputFieldFocused && this.isSomeInputExplicitlyFocused) ||
        distanceToFromDate < distanceToToDate

      if (shouldSetFromDate) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
      } else {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      }
    },

    highlightInputForMonthUnit (monthIndex) {
      if (this.isSomeInputExplicitlyFocused) return
      const firstDayOfMonth = new Date(Date.UTC(this.currentYear, monthIndex))
      const hasFromDate = !!this.fromRawDate
      const isMonthBeforeRangeStart = hasFromDate && monthIndex < getMonth(this.fromRawDate)

      const distanceToFromDate = differenceInMonths(firstDayOfMonth, this.fromRawDate)
      const distanceToToDate = this.toRawDate
        ? differenceInMonths(this.toRawDate, firstDayOfMonth)
        : 0

      const shouldSetFromDate = !hasFromDate ||
          isMonthBeforeRangeStart ||
          (this.isFromInputFieldFocused && this.isSomeInputExplicitlyFocused) ||
          distanceToFromDate < distanceToToDate

      if (shouldSetFromDate) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
      } else {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      }
    },

    highlightInputForYearUnit (year) {
      if (this.isSomeInputExplicitlyFocused) return
      const firstDayOfYear = new Date(year, 0)

      const hasFromDate = !!this.fromRawDate
      const isYearBeforeRangeStart = hasFromDate && year < getYear(this.fromRawDate)

      const distanceToFromDate = differenceInMonths(firstDayOfYear, this.fromRawDate)
      const distanceToToDate = this.toRawDate
        ? differenceInMonths(this.toRawDate, firstDayOfYear)
        : 0

      const shouldSetFromDate = !hasFromDate ||
          isYearBeforeRangeStart ||
          (this.isFromInputFieldFocused && this.isSomeInputExplicitlyFocused) ||
          distanceToFromDate < distanceToToDate

      if (shouldSetFromDate) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
      } else {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      }
    }
  }
}

</script>
