<template>
  <geo-dropdown
    :css-modifier="`geo-calendar__dropdown${cssSuffix}`"
    :opened="isCalendarPopupOpened"
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
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :earliest-date="earliestDate"
        :earliest-date-placeholder="earliestDatePlaceholder"
        :from-input-placeholder="fromInputPlaceholder"
        :granularity-id="granularityId"
        :input-range-icon="inputRangeIcon"
        :latest-date="latestDate"
        :latest-date-placeholder="latestDatePlaceholder"
        :locale="locale"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :picker-date-unit="pickerDateUnit"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :to-input-placeholder="toInputPlaceholder"
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
    calendarNavigationSelectIcon: {
      type: Array,
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

    fromInputPlaceholder: {
      type: String,
      required: false
    },

    granularityId: {
      type: String,
      required: true
    },

    inputRangeIcon: {
      type: Array,
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

    locale: {
      type: Object,
      required: true
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: false
    },

    pickerDateUnit: {
      type: String,
      required: true
    },

    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: false
    },

    toInputPlaceholder: {
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
    },

    toggleCalendarPopup () {
      this.isCalendarPopupOpened = !this.isCalendarPopupOpened
    }
  }
}
</script>
