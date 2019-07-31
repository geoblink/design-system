<template>
  <geo-dropdown
    :css-modifier="`geo-calendar__dropdown${cssSuffix}`"
    :opened="isCalendarPopupOpened"
    @click-outside="handleClickOutside"
  >
    <!-- @slot Use this slot to customize the button used to toggle the calendar -->
    <slot
      slot="toggleButton"
      name="toggleButton"
      :toggle-calendar-popup="toggleCalendarPopup"
    />
    <geo-bordered-box
      slot="popupContent"
      :css-modifier="`geo-calendar__dropdown${cssSuffix}`"
    >
      <geo-bordered-box-header
        :close-icon="['fas', 'times']"
        @close="closeCalendar"
      >
        <!-- @slot Use this slot to customize the text displayed on the calendar's header -->
        <slot name="calendarHeaderTitle" />
      </geo-bordered-box-header>
      <geo-calendar
        ref="calendar"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :css-modifier="cssModifier"
        :earliest-date="earliestDate"
        :from-input-placeholder="fromInputPlaceholder"
        :granularity-id="granularityId"
        :initial-date-in-grid="initialDateInGrid"
        :input-range-icon="inputRangeIcon"
        :latest-date="latestDate"
        :locale="locale"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :picker-date-unit="pickerDateUnit"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :to-input-placeholder="toInputPlaceholder"
        @set-from-date="setFromDate"
        @set-to-date="setToDate"
      >
        <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
        <slot
          slot="pickerGranularity"
          name="pickerGranularity"
        />
        <!-- @slot Use this slot to customize the message shown when there is an error in one of the selected dates -->
        <slot
          slot="formatError"
          name="formatError"
        />
        <!-- @slot Use this slot to customize the text in the button used to apply your earliest available date in the fromDate input  -->
        <slot
          slot="earliestDatePlaceholder"
          name="earliestDatePlaceholder"
        />
        <!-- @slot Use this slot to customize the text in the button used to apply your latest available date in the toDate input  -->
        <slot
          slot="latestDatePlaceholder"
          name="latestDatePlaceholder"
        />
      </geo-calendar>
      <geo-bordered-box-footer>
        <!-- @slot Use this slot to customize the footer of the calendar -->
        <slot name="calendarFooter" />
      </geo-bordered-box-footer>
    </geo-bordered-box>
  </geo-dropdown>
</template>

<script>
import _ from 'lodash'
import cssSuffix from '../../mixins/cssModifierMixin'
import GeoCalendarRootMixin from './GeoCalendarRoot.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'
import * as GeoCalendarConstants from './GeoCalendar.utils'

export default {
  name: 'GeoCalendarDropdown',
  status: 'missing-tests',
  release: '23.2.0',
  constants: GeoCalendarConstants,
  mixins: [
    GeoCalendarPickerDateUnitMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarRootMixin,
    cssSuffix
  ],

  data () {
    return {
      isCalendarPopupOpened: false
    }
  },

  methods: {
    closeCalendar () {
      this.isCalendarPopupOpened = false
      this.resetDates()
    },

    handleClickOutside ($event) {
      // The calendar itself has two selects to navigate through months and years.
      // When clicking on one of those, we have to intercept that click to check that we haven't actually clicked outside the calendar popup
      // and accidentally close it when we're just selecting a different month or year to go to.
      const popup = _.get(this.$refs.calendar, '$refs.calendarPicker.$refs.calendarNavigationWrapper.$refs.calendarNavigation.$refs.calendarNavigationSelect')
      if (popup && popup.contains($event.target)) return
      this.closeCalendar()
    },

    resetDates () {
      this.setFromDate({ fromDate: null })
      this.setToDate({ toDate: null })
    },

    setFromDate ({ fromDate }) {
      /**
       * User set an initial date.
       *
       * @event set-from-date
       * @type {Date}
       */
      this.$emit('set-from-date', { fromDate })
    },

    setToDate ({ toDate }) {
      /**
       * User set an end date.
       *
       * @event set-to-date
       * @type {Date}
       */
      this.$emit('set-to-date', { toDate })
    },

    toggleCalendarPopup () {
      this.isCalendarPopupOpened = !this.isCalendarPopupOpened
    }
  }
}
</script>
