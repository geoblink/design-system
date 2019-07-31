<template>
  <geo-calendar-picker-granularity-base
    :granularity-id="granularityId"
    :is-active="isActive"
    :picker-granularity-icon="pickerGranularityIcon"
    :picker-date-unit="pickerDateUnit"
    @click.native="handleClick($event)"
  >
    <slot />
  </geo-calendar-picker-granularity-base>
</template>

<script>
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '../GeoCalendar.utils'
import GeoCalendarPickerGranularityMixin from './GeoCalendarPickerGranularity.mixin'

export default {
  name: 'GeoCalendarPickerGranularityMonth',
  status: 'missing-tests',
  release: '23.2.0',
  mixins: [GeoCalendarPickerGranularityMixin],
  computed: {
    granularityId () {
      return GRANULARITY_IDS.month
    },

    pickerDateUnit () {
      return PICKER_DATE_UNITS.month
    }
  }
}
</script>
