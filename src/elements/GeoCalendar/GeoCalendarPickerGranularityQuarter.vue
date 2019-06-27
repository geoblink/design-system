<template>
  <geo-calendar-picker-granularity-base
    :is-valid="isValid"
    :picker-date-unit="pickerDateUnit"
    :granularity-id="granularityId"
  />
</template>

<script>
import GeoCalendarPickerGranularityBase from './GeoCalendarPickerGranularityBase'
import geoCalendarUtils from './GeoCalendar.utils'

export default {
  name: 'GeoCalendarPickerGranularityQuarter',
  components: {
    GeoCalendarPickerGranularityBase
  },

  computed: {
    isValid (date) {
      // TODO Implement validation
      return true
    },

    pickerDateUnit () {
      return geoCalendarUtils.PICKER_DATE_UNITS.month
    },

    granularityId () {
      return geoCalendarUtils.GRANULARITY_IDS.quarter
    }
  }
}
</script>
