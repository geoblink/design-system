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
            :is-focused="isFromDateInputFocused"
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
            css-modifier="geo-calendar"
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
            :is-focused="isToDateInputFocused"
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
            css-modifier="geo-calendar"
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
    calendarNavigationSelectIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
      }
    },

    earliestDate: {
      type: Date,
      required: true
    },

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    fromInputPlaceholder: {
      type: String,
      required: false
    },

    granularityId: {
      type: String,
      required: true
    },

    inputRangeIcon: {
      type: Array,
      default () {
        return ['fal', 'arrow-right']
      }
    },

    latestDate: {
      type: Date,
      required: true
    },

    latestDatePlaceholder: {
      type: String,
      required: false
    },

    locale: {
      type: Object,
      required: true
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-right']
      }
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    previousDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-left']
      }
    },

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
      currentYear: getYear(new Date())
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

    isDateWithinBounds () {
      return (date) => !isBefore(date, this.earliestDate) && !isAfter(date, this.latestDate)
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
      this.$emit('set-from-date', { fromDate: this.fromRawDate })
      this.$emit('set-to-date', { toDate: this.toRawDate })
    },

    selectWeek ({ fromDate, toDate }) {
      this.fromRawDate = fromDate
      this.toRawDate = toDate
      this.$emit('set-from-date', { fromDate })
      this.$emit('set-to-date', { toDate })
    },

    setDateInput (day) {
      if (this.isSettingFromInput(day)) {
        this.fromRawDate = day
        this.$emit('set-from-date', {
          fromDate: this.fromRawDate
        })
      } else {
        this.toRawDate = day
        this.$emit('set-to-date', {
          toDate: this.toRawDate
        })
      }
    },

    setEarliestDate () {
      this.fromRawDate = this.earliestDate
    },

    setLatestDate () {
      this.toRawDate = this.latestDate
    },

    unfocusDateInput () {
      this.isFromDateInputFocused = false
      this.isToDateInputFocused = false
    }
  }
}

</script>
