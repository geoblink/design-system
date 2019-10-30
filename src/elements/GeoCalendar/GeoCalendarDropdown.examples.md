`GeoCalendarDropdown` renders a button that when clicked, displays a calendar with two inputs where you can enter date ranges and manually select dates clicking on the displayed grid.
To use this component you must [install date-fns](https://github.com/date-fns/date-fns) in your application.
`GeoCalendar` can be used independently from `GeoCalendarDropdown` if you want to display the calendar directly embed in your application.
___
### GRANULARITY IDS

Alternatively, you can attach to the `GeoCalendarDropdown` via slots, a sidebar to be able to select different date granularities if you want your calendar to display several types of ranges.

- `day`: You will be able to select an initial and end days, creating a range of `n` days. The displayed grid will be days.

- `week`: You will be able to select a range of one week. No matter the day you click on, the selected range will consist of the start and the end of the week containing the selected day. The displayed grid will be days.

- `month`: You will be able to select an initial and end months, creating a range of `n` months. The displayed grid will be months.

- `quarter`: You will be able to select a range of one quarter. No matter the month you click on, the selected range will consist of the start and the end of the quarter containing the selected month. The displayed grid will be months.

- `year`: You will be able to select an initial and end years, creating a range of `n` years. The displayed grid will be years.
___
### PICKER DATE UNITS

The displayed grid for each granularity will depend on the provided `pickerDateUnit`. This will determine the minimal date unit that can be selected. These can be as follows:

- `day`: The minimal date unit available. The grid will consist of each one of the days pertaining to the current month in the current selected year, with the days pertaining to the previous and next month greyed out.

- `month`: The grid will consist of the 12 months of the year distributed in quarters. This grid is visually constant, no matter which year is selected.

- `year`: The maximum date unit available. The grid will consist of 16 year ranges.

## Optional properties

- `earliestDate`: must be a Date object that will serve as a constraint for the earliest date available in the calendar. You won't be able to reach dates earlier than this nor select them as your initial date.

- `latestDate`: must be a Date object that will serve as a constraint for the latest date available in the calendar. You won't be able to reach dates later than this nor select them as your end date.

**Note:** If you choose not to provide these properties, you'll be able to virtually navigate backwards and forwards as much as you want and select any date.

## Required properties

- `granularityId`: Current selected granularity (see above).
- `pickerDateUnit`: Current selected date unit. (see above).

```vue live
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
        <template slot="pickerGranularity">
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
        <template slot="pickerAliases">
          <h5 class="element-demo__header">
            Date ranges
          </h5>
          <geo-calendar-picker-granularity-base
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="false"
            @click.native="setAliasRange(0)"
          >
            Last quarter
          </geo-calendar-picker-granularity-base>
          <geo-calendar-picker-granularity-base
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="false"
            @click.native="setAliasRange(1)"
          >
            Last week
          </geo-calendar-picker-granularity-base>
          <geo-calendar-picker-granularity-base
            :picker-granularity-icon="['fas', 'arrow-right']"
            :is-active="false"
            @click.native="setAliasRange(2)"
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
