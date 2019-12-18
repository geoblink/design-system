```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-calendar-picker
        :previous-date-in-selected-granularity-icon="['fas', 'chevron-left']"
        :next-date-in-selected-granularity-icon="['fas', 'chevron-right']"
        :calendar-navigation-select-icon="['fas', 'chevron-down']"
        :current-month="currentMonth"
        :current-year="currentYear"
        :current-initial-year-in-range="currentYear"
        :current-end-year-in-range="currentYear"
        :earliest-date="dataEarliestDate"
        :latest-date="dataLatestDate"
        :picker-date-unit="selectedPickerDateUnit"
        :granularity-id="selectedGranularityId"
        :locale="locale"
        class="u-full-width"
      />
    </div>
  </div>
</template>

<script>
const ES_LOCALE = require('date-fns/locale').es
const subYears = require('date-fns').subYears
const addYears = require('date-fns').addYears
const startOfToday = require('date-fns').startOfToday
const { GRANULARITY_IDS } = require('@/elements/GeoCalendar/GeoCalendar.utils')

export default {
  name: 'GeoCalendarDemo',
  data () {
    return {
      selectedPickerDateUnit: 'day',
      selectedGranularityId: 'day'
    }
  },
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    },

    currentMonth () {
      return (new Date()).getMonth()
    },

    dataEarliestDate () {
      return subYears(startOfToday(), 4)
    },

    dataLatestDate () {
      return addYears(startOfToday(), 2)
    },

    locale () {
      return ES_LOCALE
    },

    GRANULARITY_IDS () {
      return GRANULARITY_IDS
    }
  }
}
</script>

<style scope>
.u-full-width {
  width: 100%;
}
</style>
```
