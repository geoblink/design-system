`GeoCalendar` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      GeoCalendarDropdown
      <div>
        <label for="toggle-earliest-date">Toggle earliestDate</label>
        <input type="checkbox" id="toggle-earliest-date" name="toggle-earliest-date" v-model="hasEarliestDateConstraints">
      </div>
      <div>
        <label for="toggle-latest-date">Toggle latestDate</label>
        <input type="checkbox" id="toggle-latest-date" name="toggle-latest-date" v-model="hasLatestDateConstraints">
      </div>
    </h3>
    <div class="element-demo__block">
      <geo-calendar-dropdown
        :input-range-icon="['fas', 'arrow-right']"
        :previous-date-in-selected-granularity-icon="['fas', 'chevron-left']"
        :next-date-in-selected-granularity-icon="['fas', 'chevron-right']"
        :calendar-navigation-select-icon="['fas', 'chevron-down']"
        :earliest-date="dataEarliestDate"
        :latest-date="dataLatestDate"
        :picker-date-unit="selectedPickerDateUnit"
        :granularity-id="selectedGranularityId"
        :locale="locale"
        from-input-placeholder="From"
        to-input-placeholder="To"
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
        <template slot="calendarHeaderTitle">Calendar</template>
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
        <template slot="earliestDatePlaceholder">
          Set earliest date
        </template>
        <template slot="latestDatePlaceholder">
          Set latest date
        </template>
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
      selectedFromDay: null,
      selectedToDay: null,
      initialDateInGrid: subYears(new Date(), 3),
      hasEarliestDateConstraints: true,
      hasLatestDateConstraints: true
    }
  },
  computed: {
    dataEarliestDate () {
      return this.hasEarliestDateConstraints ? subYears(startOfToday(), 4) : undefined
    },

    dataLatestDate () {
      return this.hasLatestDateConstraints ? addYears(startOfToday(), 2) : undefined
    },

    locale () {
      return ES_LOCALE
    },

    GRANULARITY_IDS () {
      return GRANULARITY_IDS
    },

    isDateRangeNotValid () {
      return !(this.selectedFromDay && this.selectedToDay) ||
        isAfter(this.selectedFromDay, this.selectedToDay)

    }
  },
  methods: {
    setGranularityData (granularityData) {
      this.selectedPickerDateUnit = granularityData.pickerDateUnit
      this.selectedGranularityId = granularityData.granularityId
      this.selectedFromDay = null
      this.selectedToDay = null
    },

    setFromDate ({ fromDate }) {
      this.selectedFromDay = fromDate
    },

    setToDate ({ toDate }) {
      this.selectedToDay = toDate
    }
  }
}
</script>
```
