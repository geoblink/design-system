`GeoCalendar` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.

```vue
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-calendar-dropdown
        :input-range-icon="['fas', 'arrow-right']"
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
          <geo-calendar-picker-granularity-day :picker-granularity-icon="['fas', 'arrow-right']">
            Day
          </geo-calendar-picker-granularity-day>
          <geo-calendar-picker-granularity-week :picker-granularity-icon="['fas', 'arrow-right']">
            Week
          </geo-calendar-picker-granularity-week>
          <geo-calendar-picker-granularity-month :picker-granularity-icon="['fas', 'arrow-right']">
            Month
          </geo-calendar-picker-granularity-month>
          <geo-calendar-picker-granularity-quarter :picker-granularity-icon="['fas', 'arrow-right']">
            Quarter
          </geo-calendar-picker-granularity-quarter>
          <geo-calendar-picker-granularity-year :picker-granularity-icon="['fas', 'arrow-right']">
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
export default {
  name: 'GeoCalendarDemo',
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
```
