<template>
  <div class="geo-calendar-picker">
    <geo-calendar-navigation
      :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
      :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
      :picker-date-unit="pickerDateUnit"
      :granularity-id="granularityId"
    />
    <geo-calendar-grid :locale="locale" />
  </div>
</template>

<script>
export default {
  name: 'GeoCalendarPicker',
  props: {
    previousDateInSelectedGranularityIcon: {
      type: Array,
      required: true
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      required: true
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
  }
}
</script>
