<template>
  <div class="geo-calendar">
    <div
      v-if="shouldRenderCalendarSidebar"
      class="geo-calendar__sidebar-container"
    >
      <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
      <slot name="pickerGranularity" />
      <!-- @slot Use this slot to include custom aliases that will automatically select a predefined set of ranges -->
      <slot name="pickerAliases" />
    </div>
    <div class="geo-calendar__picker-controls">
      <div class="geo-calendar__input-ranges">
        <div>
          <!-- blur event won't be fired if we handle the mousedown event that would trigger it  -->
          <!-- select-x events from calendar-picker will consume the mousedown event so no blur will be triggered when you click on a datePickerUnit on the grid -->
          <geo-input
            v-model="fromFormattedDate"
            :placeholder="fromInputPlaceholder"
            type="text"
            :read-only="isFromInputReadOnly"
            :error="showFromFormatError"
            :focus="isFromInputFieldFocused"
            @focus="focusFromDateInput"
            @blur="applyFromFormattedDate"
            @delete-value="deleteFromFormattedDate"
            @click.native="focusFromDateInput"
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
            type="text"
            :read-only="isToInputReadOnly"
            :error="showToFormatError"
            :focus="isToInputFieldFocused"
            @focus="focusToDateInput"
            @blur="applyToFormattedDate($event)"
            @delete-value="deleteToFormattedDate"
            @click.native="focusToDateInput"
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
        @day-unit-mouseover="highlightInputForDayUnit($event)"
        @month-unit-mouseover="highlightInputForMonthUnit($event)"
        @year-unit-mouseover="highlightInputForYearUnit($event)"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { GRANULARITY_IDS, FOCUSABLE_INPUT_FIELDS, isBefore, isAfter } from './GeoCalendar.utils'
import endOfWeek from 'date-fns/endOfWeek'
import endOfMonth from 'date-fns/endOfMonth'
import endOfQuarter from 'date-fns/endOfQuarter'
import format from 'date-fns/format'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import isValid from 'date-fns/isValid'
import startOfQuarter from 'date-fns/startOfQuarter'
import endOfYear from 'date-fns/endOfYear'
import startOfMonth from 'date-fns/startOfMonth'
import startOfYear from 'date-fns/startOfYear'
import startOfWeek from 'date-fns/startOfWeek'
import differenceInDays from 'date-fns/differenceInDays'
import differenceInMonths from 'date-fns/differenceInMonths'
import parse from 'date-fns/parse'
import startOfDay from 'date-fns/startOfDay'

import GeoCalendarRootMixin from './GeoCalendarRoot.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'

/**
 * GeoCalendar is the underlying component handling the grid and the interactions
 * on [GeoCalendarDropdown](./GeoCalendarDropdown).
 *
 * ::: tip
 * You should use [GeoCalendarDropdown](./GeoCalendarDropdown) instead of this
 * component since it's a nice wrapper to show calendars on a on-demand dropdown.
 * :::
 */
export default {
  name: 'GeoCalendar',
  status: 'ready',
  release: '23.2.0',
  mixins: [
    GeoCalendarPickerDateUnitMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarRootMixin
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
      isSomeInputFieldExplicitlyFocused: false
    }
  },

  computed: {
    hasFromDate () {
      return !!this.fromRawDate
    },

    shouldRenderCalendarSidebar () {
      return this.$slots.pickerGranularity || this.$slots.pickerAliases
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

    isFromInputFieldFocused () {
      return this.lastInputFieldFocused === FOCUSABLE_INPUT_FIELDS.FROM_DATE
    },

    isToInputFieldFocused () {
      return this.lastInputFieldFocused === FOCUSABLE_INPUT_FIELDS.TO_DATE
    },

    isFromInputFieldExplicitlyFocused () {
      return this.isFromInputFieldFocused && this.isSomeInputFieldExplicitlyFocused
    },

    isToInputFieldExplicitlyFocused () {
      return this.isToInputFieldFocused && this.isSomeInputFieldExplicitlyFocused
    },

    isValidDate () {
      return (date) => date && isValid(date) && this.isDateWithinBounds(date)
    },

    isFromInputReadOnly () {
      return this.granularityId !== GRANULARITY_IDS.day || this.isToDateOnly
    },

    isToInputReadOnly () {
      return this.granularityId !== GRANULARITY_IDS.day || this.isFromDateOnly
    }
  },

  watch: {
    granularityId () {
      this.deleteFromFormattedDate()
      this.deleteToFormattedDate()
      this.lastInputFieldFocused = this.isToDateOnly ? FOCUSABLE_INPUT_FIELDS.TO_DATE : FOCUSABLE_INPUT_FIELDS.FROM_DATE
    },

    defaultFromDate () {
      this.fromRawDate = this.defaultFromDate
      this.setFormattedDates()
    },

    defaultToDate () {
      this.toRawDate = this.defaultToDate
      this.setFormattedDates()
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
    if (this.isFromDateReadOnly) {
      this.focusToDateInput()
    } else if (this.isToDateReadOnly) {
      this.focusFromDateInput()
    }
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
      return format(date, 'dd/MM/yyyy')
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
      const parsedDate = parse(date, 'dd/MM/yyyy', new Date())
      return isValid(parsedDate)
        ? parsedDate
        : null
    },

    selectDay (day) {
      const computedDayForDifference = _.isNull(day)
        ? new Date(0)
        : day
      const isDayBeforeFromDate = this.hasFromDate && isBefore(computedDayForDifference, this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(computedDayForDifference, differenceInDays)

      const isSettingFromDate = this.isToInputFieldExplicitlyFocused || this.isToDateOnly
        ? false
        : this.isFromDateOnly ||
          !this.hasFromDate ||
          isDayBeforeFromDate ||
          this.isFromInputFieldExplicitlyFocused ||
          distanceToFromDate < distanceToToDate

      const unverifiedRange = this.getUnverifiedRange(day, day, isSettingFromDate)

      const unverifiedStart = _.isNull(unverifiedRange.start)
        ? new Date(0)
        : unverifiedRange.start

      const isRangeValid = unverifiedRange.end
        ? isBefore(unverifiedStart, unverifiedRange.end)
        : true

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: unverifiedRange.end,
          end: unverifiedRange.start
        }

      const utcValidatedRange = this.getUTCValidatedRange(validatedRange)
      this.fromRawDate = utcValidatedRange.start
      this.toRawDate = utcValidatedRange.end

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      this.resetInputFocus()
    },

    selectMonth (monthIndex) {
      this.currentMonth = monthIndex
      const firstDayOfMonth = startOfMonth(new Date(this.currentYear, this.currentMonth))
      const possibleFirstDayOfSelectedMonth = isAfter(this.earliestDate, firstDayOfMonth) ? this.earliestDate : firstDayOfMonth
      const lastDayOfMonth = endOfMonth(firstDayOfMonth)
      const possibleLastDayOfSelectedMonth = isBefore(this.latestDate, lastDayOfMonth) ? this.latestDate : lastDayOfMonth

      const isMonthBeforeRangeStart = this.hasFromDate && this.currentMonth < getMonth(this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(firstDayOfMonth, differenceInMonths)

      const isSettingFromDate = this.isToInputFieldExplicitlyFocused || this.isToDateOnly
        ? false
        : this.isFromDateOnly ||
          !this.hasFromDate ||
          isMonthBeforeRangeStart ||
          this.isFromInputFieldExplicitlyFocused ||
          distanceToFromDate < distanceToToDate

      const unverifiedRange = this.getUnverifiedRange(possibleFirstDayOfSelectedMonth, possibleLastDayOfSelectedMonth, isSettingFromDate)

      const isRangeValid = this.validateRange(unverifiedRange.start, unverifiedRange.end)

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: startOfMonth(unverifiedRange.end),
          end: endOfMonth(unverifiedRange.start)
        }

      const utcValidatedRange = this.getUTCValidatedRange(validatedRange)
      this.fromRawDate = utcValidatedRange.start
      this.toRawDate = utcValidatedRange.end

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      this.resetInputFocus()
    },

    selectQuarter (monthIndex) {
      const fromDate = startOfQuarter(new Date(this.currentYear, monthIndex))
      const possibleFirstDayOfSelectedQuarter = isAfter(this.earliestDate, fromDate) ? this.earliestDate : fromDate
      const toDate = endOfQuarter(new Date(this.currentYear, monthIndex))
      const possibleLastDayOfSelectedQuarter = isBefore(this.latestDate, toDate) ? this.latestDate : toDate

      const computedDayForDifference = _.isNull(fromDate)
        ? new Date(0)
        : fromDate
      const isDayBeforeFromDate = this.hasFromDate && isBefore(computedDayForDifference, this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(computedDayForDifference, differenceInDays)

      const isSettingFromDate = this.isToInputFieldExplicitlyFocused || this.isToDateOnly
        ? false
        : this.isFromDateOnly ||
          !this.hasFromDate ||
          isDayBeforeFromDate ||
          this.isFromInputFieldExplicitlyFocused ||
          distanceToFromDate < distanceToToDate

      const unverifiedRange = this.getUnverifiedRange(possibleFirstDayOfSelectedQuarter, possibleLastDayOfSelectedQuarter, isSettingFromDate)

      const unverifiedStart = _.isNull(unverifiedRange.start)
        ? new Date(0)
        : unverifiedRange.start

      const isRangeValid = unverifiedRange.end
        ? isBefore(unverifiedStart, unverifiedRange.end)
        : true

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: startOfQuarter(unverifiedRange.end),
          end: endOfQuarter(unverifiedRange.start)
        }

      const utcValidatedRange = this.getUTCValidatedRange(validatedRange)
      this.fromRawDate = utcValidatedRange.start
      this.toRawDate = utcValidatedRange.end

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      this.resetInputFocus()
    },

    selectWeek ({ fromDate, toDate }) {
      const possibleFirstDayOfSelectedWeek = isAfter(this.earliestDate, fromDate) ? this.earliestDate : fromDate
      const possibleLastDayOfSelectedWeek = isBefore(this.latestDate, toDate) ? this.latestDate : toDate
      const computedDayForDifference = _.isNull(fromDate)
        ? new Date(0)
        : fromDate
      const isDayBeforeFromDate = this.hasFromDate && isBefore(computedDayForDifference, this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(computedDayForDifference, differenceInDays)

      const isSettingFromDate = this.isToInputFieldExplicitlyFocused || this.isToDateOnly
        ? false
        : this.isFromDateOnly ||
          !this.hasFromDate ||
          isDayBeforeFromDate ||
          this.isFromInputFieldExplicitlyFocused ||
          distanceToFromDate < distanceToToDate

      const unverifiedRange = this.getUnverifiedRange(possibleFirstDayOfSelectedWeek, possibleLastDayOfSelectedWeek, isSettingFromDate)

      const unverifiedStart = _.isNull(unverifiedRange.start)
        ? new Date(0)
        : unverifiedRange.start

      const isRangeValid = unverifiedRange.end
        ? isBefore(unverifiedStart, unverifiedRange.end)
        : true

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: startOfWeek(unverifiedRange.end, { locale: this.locale }),
          end: endOfWeek(unverifiedRange.start, { locale: this.locale })
        }

      const utcValidatedRange = this.getUTCValidatedRange(validatedRange)
      this.fromRawDate = utcValidatedRange.start
      this.toRawDate = utcValidatedRange.end

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      this.resetInputFocus()
    },

    selectYear (year) {
      this.currentYear = year
      const firstDayOfYear = new Date(this.currentYear, 0)
      const possibleFirstDayOfSelectedYear = isAfter(this.earliestDate, firstDayOfYear) ? this.earliestDate : firstDayOfYear
      const lastDayOfYear = endOfYear(new Date(this.currentYear, 0))
      const possibleLastDayOfSelectedYear = isBefore(this.latestDate, lastDayOfYear) ? this.latestDate : lastDayOfYear

      const isYearBeforeRangeStart = this.hasFromDate && this.currentYear < getYear(this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(firstDayOfYear, differenceInMonths)

      const isSettingFromDate = this.isToInputFieldExplicitlyFocused || this.isToDateOnly
        ? false
        : this.isFromDateOnly ||
          !this.hasFromDate ||
          isYearBeforeRangeStart ||
          this.isFromInputFieldExplicitlyFocused ||
          distanceToFromDate < distanceToToDate

      const unverifiedRange = this.getUnverifiedRange(possibleFirstDayOfSelectedYear, possibleLastDayOfSelectedYear, isSettingFromDate)

      const isRangeValid = this.validateRange(unverifiedRange.start, unverifiedRange.end)

      const validatedRange = isRangeValid
        ? unverifiedRange
        : {
          start: startOfYear(unverifiedRange.end),
          end: endOfYear(unverifiedRange.start)
        }

      const utcValidatedRange = this.getUTCValidatedRange(validatedRange)
      this.fromRawDate = utcValidatedRange.start
      this.toRawDate = utcValidatedRange.end

      this.setFormattedDates()

      this.emitFromDate({ fromDate: this.fromRawDate })
      this.emitToDate({ toDate: this.toRawDate })

      this.resetInputFocus()
    },

    resetInputFocus () {
      this.isSomeInputFieldExplicitlyFocused = false
      this.lastInputFieldFocused = null
    },

    getDateDistances (start, functionToUse) {
      const distanceToFromDate = Math.abs(functionToUse(start, this.fromRawDate))
      const distanceToToDate = this.toRawDate
        ? Math.abs(functionToUse(start, this.toRawDate))
        : 0
      return { distanceToFromDate, distanceToToDate }
    },

    setEarliestDate () {
      if (!this.earliestDate) return
      this.showFromFormatError = false
      this.currentMonth = getMonth(this.earliestDate)
      this.currentYear = getYear(this.earliestDate)
      const utcValidatedRange = this.getUTCValidatedRange({ start: this.earliestDate })
      this.fromRawDate = utcValidatedRange.start
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
      this.fromFormattedDate = this.fromRawDate
        ? this.formatDate(this.fromRawDate)
        : null
      this.toFormattedDate = this.toRawDate
        ? this.formatDate(this.toRawDate)
        : null

      if (isValid(this.fromRawDate)) this.showFromFormatError = false
      if (isValid(this.toRawDate)) this.showToFormatError = false
    },

    getUTCValidatedRange (validatedRange) {
      // TODO: https://geoblink.atlassian.net/browse/CORE-9234
      // This logic works for any hour in a UTC positive timezone, if we ever care about time or need to use it in a
      // timezone before UTC we'd have to rethink it so it doesn't change the date when transforming to UTC.
      const start = validatedRange.start && this.formatDateToUTC(startOfDay(validatedRange.start))
      const end = validatedRange.end && this.formatDateToUTC(startOfDay(validatedRange.end))
      return { start, end }
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
      const utcValidatedRange = this.getUTCValidatedRange({ end: this.latestDate })
      this.toRawDate = utcValidatedRange.end
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
      if (this.isToDateOnly) return

      this.isSomeInputFieldExplicitlyFocused = true
      this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
    },

    focusToDateInput () {
      if (this.isFromDateOnly) return

      this.isSomeInputFieldExplicitlyFocused = true
      this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
    },

    getUnverifiedRange (firstDay, lastDay, isSettingFromDate) {
      return isSettingFromDate
        ? {
          start: firstDay,
          end: this.toRawDate
        }
        : {
          start: this.fromRawDate,
          end: lastDay
        }
    },

    validateRange (start, end) {
      return start && end ? isBefore(start, end) : true
    },

    highlightInputForDayUnit (day) {
      if (this.isSomeInputFieldExplicitlyFocused) return
      const isDayBeforeFromDate = this.hasFromDate && isBefore(day, this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(day, differenceInDays)

      const shouldSetFromDate = !this.isToDateOnly &&
        (this.isFromDateOnly ||
        !this.hasFromDate ||
        isDayBeforeFromDate ||
        this.isFromInputFieldExplicitlyFocused ||
        distanceToFromDate < distanceToToDate)

      if (shouldSetFromDate) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
      } else {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      }
    },

    highlightInputForMonthUnit (monthIndex) {
      if (this.isSomeInputFieldExplicitlyFocused) return

      const firstDayOfMonth = new Date(Date.UTC(this.currentYear, monthIndex))
      const isMonthBeforeRangeStart = this.hasFromDate && monthIndex < getMonth(this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(firstDayOfMonth, differenceInMonths)

      const shouldSetFromDate = !this.isToDateOnly &&
        (this.isFromDateOnly ||
        !this.hasFromDate ||
        isMonthBeforeRangeStart ||
        this.isFromInputFieldExplicitlyFocused ||
        distanceToFromDate < distanceToToDate)

      if (shouldSetFromDate) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
      } else {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      }
    },

    highlightInputForYearUnit (year) {
      if (this.isSomeInputFieldExplicitlyFocused) return
      const firstDayOfYear = new Date(year, 0)

      const isYearBeforeRangeStart = this.hasFromDate && year < getYear(this.fromRawDate)

      const { distanceToFromDate, distanceToToDate } = this.getDateDistances(firstDayOfYear, differenceInMonths)

      const shouldSetFromDate = !this.isToDateOnly &&
        (this.isFromDateOnly ||
        !this.hasFromDate ||
        isYearBeforeRangeStart ||
        this.isFromInputFieldExplicitlyFocused ||
        distanceToFromDate < distanceToToDate)

      if (shouldSetFromDate) {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.FROM_DATE
      } else {
        this.lastInputFieldFocused = FOCUSABLE_INPUT_FIELDS.TO_DATE
      }
    },

    formatDateToUTC (date) {
      if (!date) return
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }
  }
}

</script>
