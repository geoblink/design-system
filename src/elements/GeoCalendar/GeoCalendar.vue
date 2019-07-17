<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div class="geo-calendar__granularity-selectors">
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
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
            :is-focused="isFromDateInputFocused"
            input-type="normal"
            @click="isFromDateInputFocused = true"
          />
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
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
            :is-focused="isToDateInputFocused"
            input-type="normal"
            @click="isToDateInputFocused = true"
          />
          <geo-link-button
            css-modifier="calendar-picker-button"
            @click="setLatestDate"
          >
            {{ latestDatePlaceholder }}
          </geo-link-button>
        </div>
      </div>
      <!-- TODO: Bind props to component -->
      <geo-calendar-picker
        ref="calendarPicker"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :picker-date-unit="pickerDateUnit"
        :granularity-id="granularityId"
        :locale="locale"
        :earliest-date="earliestDate"
        :latest-date="latestDate"
        :current-month="currentMonth"
        :current-year="currentYear"
        :selected-from-day="fromRawDate"
        :selected-to-day="toRawDate"
        @select-day="selectDay"
        @select-week="selectWeek"
        @select-month="selectMonth"
        @go-to-month="goToMonth"
        @go-to-year="goToYear"
      />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import ClickOutside from '../../directives/GeoClickOutside'
import { isBefore, format, isValid, isAfter, getMonth, getYear, endOfMonth } from 'date-fns'

export default {
  name: 'GeoCalendar',
  status: 'missing-tests',
  release: 'CHANGE ME',
  directives: {
    ClickOutside
  },
  mixins: [cssSuffix],
  props: {
    inputRangeIcon: {
      type: Array,
      default () {
        return ['fal', 'arrow-right']
      }
    },

    previousDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-left']
      }
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-right']
      }
    },

    calendarNavigationSelectIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
      }
    },

    fromInputPlaceholder: {
      type: String,
      required: false
    },

    toInputPlaceholder: {
      type: String,
      required: false
    },

    earliestDate: {
      type: Date,
      required: true
    },

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    latestDate: {
      type: Date,
      required: true
    },

    latestDatePlaceholder: {
      type: String,
      required: false
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    granularityId: {
      type: String,
      required: true
    },

    locale: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fromRawDate: null,
      toRawDate: null,
      isFromDateInputFocused: false,
      isToDateInputFocused: false,
      currentMonth: getMonth(new Date()),
      currentYear: getYear(new Date())
    }
  },
  computed: {
    fromFormattedDate: {
      get () {
        return this.fromRawDate ? this.formatDate(this.fromRawDate) : null
      },

      set (newFromDate) {
        const parsedDate = this.parseDate(newFromDate)
        if (parsedDate === '') this.fromRawDate = null
        if (this.isValidFromDate(parsedDate)) {
          this.fromRawDate = this.parseDate(newFromDate)
          this.currentMonth = getMonth(this.fromRawDate)
          this.currentYear = getYear(this.fromRawDate)
        }
      }
    },

    toFormattedDate: {
      get () {
        return this.toRawDate ? this.formatDate(this.toRawDate) : null
      },

      set (newToDate) {
        const parsedDate = this.parseDate(newToDate)
        if (parsedDate === '') this.toRawDate = null
        if (this.isValidToDate(parsedDate)) {
          this.toRawDate = this.parseDate(newToDate)
          this.currentMonth = getMonth(this.toRawDate)
          this.currentYear = getYear(this.toRawDate)
        }
      }
    },

    areSelectedBoundsValid () {
      return !!this.fromRawDate && !!this.toRawDate && !isAfter(this.fromRawDate, this.toRawDate)
    },

    isSettingFromInput () {
      return (day) => {
        return !this.fromRawDate || (this.fromRawDate && isBefore(day, this.fromRawDate))
      }
    },

    isValidDate () {
      return (date) => date && isValid(date) && this.isDateWithinBounds(date)
    },

    isValidFromDate () {
      return (date) => this.isValidDate(date) && (this.toRawDate && isBefore(date, this.toRawDate))
    },

    isValidToDate () {
      return (date) => this.isValidDate(date) && (this.toRawDate && isAfter(date, this.fromRawDate))
    }
  },
  watch: {
    granularityId () {
      this.fromRawDate = null
      this.toRawDate = null
    }
  },
  methods: {
    setEarliestDate () {
      this.fromRawDate = this.earliestDate
    },

    setLatestDate () {
      this.toRawDate = this.latestDate
    },

    selectDay (day) {
      this.setDateInput(day)
    },

    selectWeek ({ fromDate, toDate }) {
      this.fromRawDate = fromDate
      this.toRawDate = toDate
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

    setDateInput (day) {
      if (this.isSettingFromInput(day)) {
        this.fromRawDate = day
      } else {
        this.toRawDate = day
      }
    },

    parseDate (date) {
      if (!date || !date.match(/\d{2}\/\d{2}\/\d{4}/)) return null
      const [day, month, year] = date.split('/').map(n => parseInt(n))
      return new Date(year, month - 1, day)
    },

    formatDate (date) {
      return format(date, 'DD/MM/YYYY')
    },

    unfocusDateInput () {
      this.isFromDateInputFocused = false
      this.isToDateInputFocused = false
    },

    isDateWithinBounds (date) {
      return !isBefore(date, this.earliestDate) && !isAfter(date, this.latestDate)
    },

    goToMonth (monthIndex) {
      this.currentMonth = monthIndex
    },

    goToYear (year) {
      this.currentYear = year
    }
  }
}

</script>
