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
    <geo-bordered-box
      slot="popupContent"
      :css-modifier="`geo-calendar__dropdown${cssSuffix}`"
    >
      <geo-bordered-box-header
        :close-icon="['fas', 'times']"
        @close="closeCalendar"
      >
        <slot name="calendarHeaderTitle" />
      </geo-bordered-box-header>
      <geo-calendar
        ref="calendar"
        :input-range-icon="inputRangeIcon"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :from-input-placeholder="fromInputPlaceholder"
        :to-input-placeholder="toInputPlaceholder"
        :earliest-date="earliestDate"
        :earliest-date-placeholder="earliestDatePlaceholder"
        :latest-date="latestDate"
        :latest-date-placeholder="latestDatePlaceholder"
        :picker-date-unit="pickerDateUnit"
        :granularity-id="granularityId"
        :locale="locale"
        @set-from-date="setFromDate"
        @set-to-date="setToDate"
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

    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: false
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: false
    },

    calendarNavigationSelectIcon: {
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

    earliestDate: {
      type: Date,
      required: true
    },

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    latestDate: {
      type: Date,
      required: true
    },

    latestDatePlaceholder: {
      type: String,
      required: false
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    granularityId: {
      type: String,
      required: true
    },

    locale: {
      type: Object,
      required: true
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

    closeCalendar ($event) {
      const popup = _.get(this.$refs.calendar, '$refs.calendarPicker.$refs.calendarNavigationWrapper.$refs.calendarNavigation.$refs.calendarNavigationSelect')
      if (popup && popup.contains($event.target)) return
      this.isCalendarPopupOpened = false
    },

    setFromDate ({ fromDate }) {
      this.$emit('set-from-date', { fromDate })
    },

    setToDate ({ toDate }) {
      this.$emit('set-to-date', { toDate })
    }
  }
}
</script>
