<template>
  <geo-dropdown
    ref="dropdown"
    :opened="isCalendarPopupOpened"
    :popup-class="['geo-calendar-dropdown__popup', popupClass]"
    @click-outside="handleClickOutside"
  >
    <!-- @slot Use this slot to customize the button used to toggle the calendar -->
    <slot
      slot="toggleButton"
      name="toggleButton"
      :toggle-calendar-popup="toggleCalendarPopup"
    />
    <geo-bordered-box slot="popupContent">
      <geo-bordered-box-header
        :trailing-icon="closeCalendarIcon"
        @click-trailing-icon="closeCalendar"
      >
        <!-- @slot Use this slot to customize the text displayed on the calendar's header -->
        <slot name="calendarHeaderTitle" />
      </geo-bordered-box-header>

      <geo-scrollable-container>
        <geo-calendar
          ref="calendar"
          :calendar-navigation-select-icon="calendarNavigationSelectIcon"
          :earliest-date="earliestDate"
          :default-from-date="defaultFromDate"
          :default-to-date="defaultToDate"
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
          :is-from-date-disabled="isFromDateDisabled"
          :is-to-date-disabled="isToDateDisabled"
          @emit-from-date="emitFromDate"
          @emit-to-date="emitToDate"
        >
          <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
          <slot
            slot="pickerGranularity"
            name="pickerGranularity"
          />
          <!-- @slot Use this slot to customize the sidebar with the different granularities handled by the calendar -->
          <slot
            slot="pickerAliases"
            name="pickerAliases"
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
      </geo-scrollable-container>

      <geo-bordered-box-footer>
        <!-- @slot Use this slot to customize the footer of the calendar -->
        <slot
          name="calendarFooter"
          :apply-range-selection="applyRangeSelection"
        />
      </geo-bordered-box-footer>
    </geo-bordered-box>
  </geo-dropdown>
</template>

<script>
import _ from 'lodash'
import GeoCalendarRootMixin from './GeoCalendarRoot.mixin'
import GeoCalendarGranularityIdMixin from './GeoCalendarGranularityId.mixin'
import GeoCalendarPickerDateUnitMixin from './GeoCalendarPickerDateUnit.mixin'
import * as GeoCalendarConstants from './GeoCalendar.utils'

/**
 * `GeoCalendarDropdown` renders a button that when clicked, displays a calendar
 * with two inputs where you can enter date ranges and manually select dates
 * clicking on the displayed grid.
 *
 * To use this component you must
 * [install date-fns](https://github.com/date-fns/date-fns) in your application.
 *
 * ::: tip
 * [GeoCalendar](./GeoCalendar) can be used independently from
 * `GeoCalendarDropdown` if you want to display the calendar directly embed in
 * your application.
 * :::
 */
export default {
  name: 'GeoCalendarDropdown',
  status: 'ready',
  release: '23.2.0',
  constants: GeoCalendarConstants,
  mixins: [
    GeoCalendarPickerDateUnitMixin,
    GeoCalendarGranularityIdMixin,
    GeoCalendarRootMixin
  ],
  data () {
    return {
      isCalendarPopupOpened: false
    }
  },
  methods: {
    closeCalendar () {
      this.isCalendarPopupOpened = false
    },

    handleClickOutside ($event) {
      // The calendar itself has two selects to navigate through months and years.
      // When clicking on one of those, we have to intercept that click to check that we haven't actually clicked outside the calendar popup
      // and accidentally close it when we're just selecting a different month or year to go to.
      const popup = _.get(this.$refs.calendar, '$refs.calendarPicker.$refs.calendarNavigationWrapper.$refs.calendarNavigation.$refs.calendarNavigationSelect')
      if (popup && popup.contains($event.target)) return
      this.closeCalendar()
    },

    emitFromDate ({ fromDate }) {
      /**
       * User sets an initial date.
       *
       * @event emit-from-date
       * @type {Date}
       */
      this.$emit('emit-from-date', { fromDate })
    },

    emitToDate ({ toDate }) {
      /**
       * User set an end date.
       *
       * @event emit-to-date
       * @type {Date}
       */
      this.$emit('emit-to-date', { toDate })
    },

    toggleCalendarPopup () {
      this.isCalendarPopupOpened = !this.isCalendarPopupOpened
    },

    applyRangeSelection () {
      this.closeCalendar()
      this.$emit('apply-range-selection')
    }
  }
}
</script>
