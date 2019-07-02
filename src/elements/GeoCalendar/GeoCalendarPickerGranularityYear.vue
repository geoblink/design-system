<template>
  <geo-calendar-picker-granularity-base
    :picker-granularity-icon="pickerGranularityIcon"
    :is-valid="isValid"
    :picker-date-unit="pickerDateUnit"
    :granularity-id="granularityId"
    @click.native="handleClick($event)"
  >
    <slot />
  </geo-calendar-picker-granularity-base>
</template>

<script>
import GeoCalendarPickerGranularityBase from './GeoCalendarPickerGranularityBase'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from './GeoCalendar.utils'

export default {
  name: 'GeoCalendarPickerGranularityYear',
  components: {
    GeoCalendarPickerGranularityBase
  },

  props: {
    pickerGranularityIcon: {
      type: Array,
      required: false
    }
  },

  computed: {
    isValid (date) {
      // TODO Implement validation
      return function () {}
    },

    pickerDateUnit () {
      return PICKER_DATE_UNITS.year
    },

    granularityId () {
      return GRANULARITY_IDS.year
    }
  },

  methods: {
    handleClick ($event) {
      this.$emit('click', {
        event: $event,
        isValid: this.isValid,
        pickerDateUnit: this.pickerDateUnit,
        granularityId: this.granularityId
      })
    }
  }
}
</script>
