<template>
  <geo-dropdown
    :opened="isCalendarPopupOpened"
    :css-modifier="`geo-calendar__dropdown${cssSuffix}`"
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
      <geo-calendar
        :input-range-icon="inputRangeIcon"
        :from-input-placeholder="fromInputPlaceholder"
        :to-input-placeholder="toInputPlaceholder"
        :earliest-date-placeholder="earliestDatePlaceholder"
        :latest-date-placeholder="latestDatePlaceholder"
      >
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
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoCalendarDropdown',
  mixins: [cssSuffix],
  props: {
    inputRangeIcon: {
      type: Array,
      required: false
    },

    fromInputPlaceholder: {
      type: String,
      required: false
    },

    toInputPlaceholder: {
      type: String,
      required: false
    },

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    latestDatePlaceholder: {
      type: String,
      required: false
    }
  },

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
