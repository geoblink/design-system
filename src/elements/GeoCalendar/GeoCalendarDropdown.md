`GeoCalendar` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.

```vue
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-calendar-dropdown>
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
          <geo-calendar-picker-granularity-day> Day </geo-calendar-picker-granularity-day>
          <geo-calendar-picker-granularity-week> Week </geo-calendar-picker-granularity-week>
          <geo-calendar-picker-granularity-month> Month </geo-calendar-picker-granularity-month>
          <geo-calendar-picker-granularity-quarter> Quarter </geo-calendar-picker-granularity-quarter>
          <geo-calendar-picker-granularity-year> Year </geo-calendar-picker-granularity-year>
        </template>
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
