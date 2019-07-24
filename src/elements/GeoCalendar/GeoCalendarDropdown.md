`GeoCalendar` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.

```vue
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-calendar-dropdown
        :input-range-icon="['fas', 'arrow-right']"
        :previous-date-in-selected-granularity-icon="['fas', 'chevron-left']"
        :next-date-in-selected-granularity-icon="['fas', 'chevron-right']"
        :calendar-navigation-select-icon="['fas', 'chevron-down']"
        :picker-date-unit="selectedPickerDateUnit"
        :granularity-id="selectedGranularityId"
        :locale="locale"
        :earliest-date="dataEarliestDate"
        :latest-date="dataLatestDate"
        from-input-placeholder="From"
        to-input-placeholder="To"
        earliest-date-placeholder="Set earliest date"
        latest-date-placeholder="Set latest date"
        @set-from-date="setFromDate"
        @set-to-date="setToDate"
      >
        <template
          slot-scope="{ toggleCalendarPopup }"
          slot="toggleButton"
        >
          <geo-dropdown-regular-button
            :icon="['fas', 'calendar']"
            @click="toggleCalendarPopup"
          >
            Calendar:
          </geo-dropdown-regular-button>
        </template>
        <span slot="calendarHeaderTitle">Calendar</span>
        <template slot="pickerGranularity">
          <geo-calendar-picker-granularity-day
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="selectedGranularityId === GRANULARITY_IDS.day"
            @click="setGranularityData($event)"
          >
            Day
          </geo-calendar-picker-granularity-day>
          <geo-calendar-picker-granularity-week
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="selectedGranularityId === GRANULARITY_IDS.week"
            @click="setGranularityData($event)"
          >
            Week
          </geo-calendar-picker-granularity-week>
          <geo-calendar-picker-granularity-month
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="selectedGranularityId === GRANULARITY_IDS.month"
            @click="setGranularityData($event)"
          >
            Month
          </geo-calendar-picker-granularity-month>
          <geo-calendar-picker-granularity-quarter
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="selectedGranularityId === GRANULARITY_IDS.quarter"
            @click="setGranularityData($event)"
          >
            Quarter
          </geo-calendar-picker-granularity-quarter>
          <geo-calendar-picker-granularity-year
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="selectedGranularityId === GRANULARITY_IDS.year"
            @click="setGranularityData($event)"
          >
            Year
          </geo-calendar-picker-granularity-year>
        </template>
        <!-- TODO: CORE-7312 This should be part of the DS when input results in error -->
        <p
          slot="formatError"
          class="geo-calendar__input__date-feedback--error"
        >
          The inserted date is not valid
        </p>
        <!-- TODO: CORE-7312 This should be part of the DS when input results in error -->
        <p
          slot="fromDateAfterToDate"
          class="geo-calendar__input__date-feedback--error"
        >
          The initial date cannot be after the end date
        </p>
        <!-- TODO: CORE-7312 This should be part of the DS when input results in error -->
        <p
          slot="toDateAfterToDate"
          class="geo-calendar__input__date-feedback--error"
        >
          The end date cannot be before the initial date
        </p>
        <geo-primary-button
          slot="calendarFooter"
          :disabled="isDateRangeNotValid"
        >
          apply date
        </geo-primary-button>
      </geo-calendar-dropdown>
    </div>
  </div>
</template>

<script>
const ES_LOCALE = require('date-fns/locale/es')
const subYears = require('date-fns').subYears
const addYears = require('date-fns').addYears
const startOfToday = require('date-fns').startOfToday
const isAfter = require('date-fns').isAfter
const isValid = require('date-fns').isValid
const { GRANULARITY_IDS } = require('./GeoCalendar.utils')


export default {
  name: 'GeoCalendarDemo',
  data () {
    return {
      selectedPickerDateUnit: 'day',
      selectedGranularityId: 'day',
      dataEarliestDate: subYears(startOfToday(), 4),
      dataLatestDate: addYears(startOfToday(), 2),
      selectedFromDate: null,
      selectedToDate: null
    }
  },
  computed: {
    locale () {
      return ES_LOCALE
    },

    GRANULARITY_IDS () {
      return GRANULARITY_IDS
    },

    isDateRangeNotValid () {
      return !(this.selectedFromDate && this.selectedToDate) ||
        isAfter(this.selectedFromDate, this.selectedToDate)

    }
  },
  methods: {
    setGranularityData (granularityData) {
      this.selectedPickerDateUnit = granularityData.pickerDateUnit
      this.selectedGranularityId = granularityData.granularityId
      this.selectedFromDate = null
      this.selectedToDate = null
    },

    setFromDate ({ fromDate }) {
      this.selectedFromDate = fromDate
    },

    setToDate ({ toDate }) {
      this.selectedToDate = toDate
    }
  }
}
</script>
```
