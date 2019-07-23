<template>
  <geo-calendar-picker-granularity-base
    :granularity-id="granularityId"
    :is-active="isActive"
    :is-valid="isValid"
    :picker-granularity-icon="pickerGranularityIcon"
    :picker-date-unit="pickerDateUnit"
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
  status: 'missing-tests',
  release: '22.3.0',
  components: {
    GeoCalendarPickerGranularityBase
  },

  props: {
    isActive: {
      type: Boolean,
      required: true
    },

    pickerGranularityIcon: {
      type: Array,
      required: false
    }
  },

  computed: {
    granularityId () {
      return GRANULARITY_IDS.day
    },

    isValid (date) {
      // TODO Implement validation
      return function () {}
    },

    pickerDateUnit () {
      return PICKER_DATE_UNITS.day
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
