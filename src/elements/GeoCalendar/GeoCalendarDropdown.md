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
            @click="setGranularityData($event)"
          >
            Day
          </geo-calendar-picker-granularity-day>
          <geo-calendar-picker-granularity-week
            :picker-granularity-icon="['fas', 'arrow-right']"
            @click="setGranularityData($event)"
          >
            Week
          </geo-calendar-picker-granularity-week>
          <geo-calendar-picker-granularity-month
            :picker-granularity-icon="['fas', 'arrow-right']"
            @click="setGranularityData($event)"
          >
            Month
          </geo-calendar-picker-granularity-month>
          <geo-calendar-picker-granularity-quarter
            :picker-granularity-icon="['fas', 'arrow-right']"
            @click="setGranularityData($event)"
          >
            Quarter
          </geo-calendar-picker-granularity-quarter>
          <geo-calendar-picker-granularity-year
            :picker-granularity-icon="['fas', 'arrow-right']"
            @click="setGranularityData($event)"
          >
            Year
          </geo-calendar-picker-granularity-year>
        </template>
        <geo-primary-button slot="calendarFooter">
          APPLY DATE
        </geo-primary-button>
      </geo-calendar-dropdown>
    </div>
  </div>
</template>

<script>
const ES_LOCALE = require('date-fns/locale/es')
const subYears = require('date-fns').subYears
const addYears = require('date-fns').addYears


export default {
  name: 'GeoCalendarDemo',
  data () {
    return {
      selectedPickerDateUnit: 'day',
      selectedGranularityId: 'day',
      dataEarliestDate: subYears(new Date(), 4),
      dataLatestDate: addYears(new Date(), 2)
    }
  },
  computed: {
    locale () {
      return ES_LOCALE
    }
  },
  methods: {
    setGranularityData (granularityData) {
      this.selectedPickerDateUnit = granularityData.pickerDateUnit
      this.selectedGranularityId = granularityData.granularityId
    }
  }
}
</script>
```
