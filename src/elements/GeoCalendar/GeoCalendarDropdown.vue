<template>
  <geo-dropdown
    :opened="isCalendarPopupOpened"
    @click-outside="closeCalendar"
  >
    <slot
      slot="toggleButton"
      name="toggleButton"
      :toggle-calendar-popup="toggleCalendarPopup"
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
      isCalendarPopupOpened: false
    }
  },

  methods: {
    toggleCalendarPopup () {
      this.isCalendarPopupOpened = !this.isCalendarPopupOpened
    },

    closeCalendar () {
      this.isCalendarPopupOpened = false
    }
  }
}
</script>
