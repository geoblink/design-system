```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      GeoCalendarDropdown
    </h3>
    <div class="element-demo__block">
      <p>
        <label for="toggle-earliest-date">Toggle earliestDate</label>
        <input type="checkbox" id="toggle-earliest-date" name="toggle-earliest-date" v-model="hasEarliestDateConstraints">
      </p>
      <p>
        <label for="toggle-granularities">Toggle granularities</label>
        <input type="checkbox" id="toggle-granularities" name="toggle-granularities" v-model="hasGranularities">
      </p>
      <p>
        <label for="toggle-latest-date">Toggle latestDate</label>
        <input type="checkbox" id="toggle-latest-date" name="toggle-latest-date" v-model="hasLatestDateConstraints">
      </p>
      <p>
        <label for="toggle-aliases">Toggle Calendar aliases</label>
        <input type="checkbox" id="toggle-aliases" name="toggle-aliases" v-model="hasAliases">
      </p>
    </div>
    <div class="element-demo__block">
      <geo-calendar-dropdown
        :input-range-icon="['fas', 'arrow-right']"
        :previous-date-in-selected-granularity-icon="['fas', 'chevron-left']"
        :next-date-in-selected-granularity-icon="['fas', 'chevron-right']"
        :calendar-navigation-select-icon="['fas', 'chevron-down']"
        :close-calendar-icon="['fas', 'times']"
        :default-from-date="selectedFromDay"
        :default-to-date="selectedToDay"
        :earliest-date="dataEarliestDate"
        :latest-date="dataLatestDate"
        :picker-date-unit="selectedPickerDateUnit"
        :granularity-id="selectedGranularityId"
        :locale="locale"
        from-input-placeholder="From"
        to-input-placeholder="To"
        @emit-from-date="setFromDate"
        @emit-to-date="setToDate"
        @apply-range-selection="applyDates"
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
        <template
          v-if="hasGranularities"
          slot="pickerGranularity"
        >
          <h5 class="element-demo__header">
            Browse by
          </h5>
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
        <template
          v-if="hasAliases"
          slot="pickerAliases"
        >
          <h5 class="element-demo__header">
            Date ranges
          </h5>
          <geo-calendar-picker-granularity-base
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="false"
            @click="setAliasRange(0)"
          >
            Last quarter
          </geo-calendar-picker-granularity-base>
          <geo-calendar-picker-granularity-base
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="false"
            @click="setAliasRange(1)"
          >
            Last week
          </geo-calendar-picker-granularity-base>
          <geo-calendar-picker-granularity-base
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="false"
            @click="setAliasRange(2)"
          >
            Last year
          </geo-calendar-picker-granularity-base>
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
        <template
          slot-scope="{ applyRangeSelection }"
          slot="calendarFooter"
        >
          <geo-primary-button
            :disabled="isDateRangeNotValid"
            @click="applyRangeSelection"
          >
            apply date
          </geo-primary-button>
        </template>
      </geo-calendar-dropdown>
    </div>
  </div>
</template>

<script>
const ES_LOCALE = require('date-fns/locale').es
const subYears = require('date-fns').subYears
const subMonths = require('date-fns').subMonths
const addMonths = require('date-fns').addMonths
const addYears = require('date-fns').addYears
const addDays = require('date-fns').addDays
const subDays = require('date-fns').subDays
const startOfToday = require('date-fns').startOfToday
const startOfMonth = require('date-fns').startOfMonth
const startOfWeek = require('date-fns').startOfWeek
const startOfYear = require('date-fns').startOfYear
const endOfMonth = require('date-fns').endOfMonth
const startOfQuarter = require('date-fns').startOfQuarter
const isAfter = require('date-fns').isAfter
const isValid = require('date-fns').isValid
const { GRANULARITY_IDS } = require('@/elements/GeoCalendar/GeoCalendar.utils')


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
      hasGranularities: true,
      hasLatestDateConstraints: true,
      hasAliases: true
    }
  },
  computed: {
    aliases () {
      return [
        {
          fromDate: startOfMonth(subMonths(startOfQuarter(new Date()), 3)),
          toDate: subDays(startOfQuarter(new Date()), 1)
        },
        {
          fromDate: startOfWeek(subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 1), { weekStartsOn: 1 }),
          toDate: subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 1)
        },
        {
          fromDate: startOfYear(subDays(startOfYear(new Date()), 1)),
          toDate: subDays(startOfYear(new Date()), 1)
        }
      ]
    },
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
    },

    setAliasRange (index) {
      this.selectedFromDay = this.aliases[index].fromDate
      this.selectedToDay = this.aliases[index].toDate
    },

    applyDates () {}
  }
}
</script>
```
