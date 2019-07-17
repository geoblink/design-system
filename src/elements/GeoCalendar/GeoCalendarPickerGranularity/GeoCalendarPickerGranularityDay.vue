<template>
  <geo-calendar-picker-granularity-base
    :picker-granularity-icon="pickerGranularityIcon"
    :is-valid="isValid"
    :picker-date-unit="pickerDateUnit"
    :granularity-id="granularityId"
    :is-active="isActive"
    @click.native="handleClick($event)"
  >
    <slot />
  </geo-calendar-picker-granularity-base>
</template>

<script>
import GeoCalendarPickerGranularityBase from './GeoCalendarPickerGranularityBase'
import { PICKER_DATE_UNITS, GRANULARITY_IDS } from '../GeoCalendar.utils'

export default {
  name: 'GeoCalendarPickerGranularityDay',
  components: {
    GeoCalendarPickerGranularityBase
  },

  props: {
    pickerGranularityIcon: {
      type: Array,
      required: false
    },

    isActive: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    isValid (date) {
      // TODO Implement validation
      return function () {}
    },

    pickerDateUnit () {
      return PICKER_DATE_UNITS.day
    },

    granularityId () {
      return GRANULARITY_IDS.day
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
