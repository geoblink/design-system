<template>
  <geo-dropdown
    :opened="isCalendarOpened"
    @click-outside="closeCalendar"
  >
    <slot
      slot="toggleButton"
      name="toggleCalendarButton"
    />
    <!-- TODO: Bind props to geoCalendar -->
    <geo-bordered-box slot="popupContent">
      <geo-bordered-box-header
        :close-icon="['fas', 'times']"
        @close="closeCalendar"
      >
        <slot name="calendarHeaderTitle" />
      </geo-bordered-box-header>
      <geo-calendar>
        <slot
          slot="pickerGranularity"
          name="pickerGranularity"
        />
      </geo-calendar>
      <geo-bordered-box-footer>
        <slot name="calendarFooter" />
      </geo-bordered-box-footer>
    </geo-bordered-box>
  </geo-dropdown>
</template>

<script>
export default {
  name: 'GeoCalendarDropdown',
  data () {
    return {
      isCalendarOpened: true
    }
  },

  methods: {
    toggleMenu () {
      this.isCalendarOpened = !this.isCalendarOpened
    },

    closeCalendar () {
      this.isCalendarOpened = false
    }
  }
}
</script>
