<template>
  <div
    :class="{
      'geo-calendar-picker-granularity-unit': true,
      'geo-calendar-picker-granularity-unit--active': isActive
    }"
  >
    <slot />
    <font-awesome-icon
      class="geo-calendar-picker-granularity-unit__selector-icon"
      :icon="pickerGranularityIcon"
    />
  </div>
</template>

<script>
export default {
  name: 'GeoCalendarPickerGranularityBase',
  status: 'missing-tests',
  release: '23.2.0',
  props: {
    /**
     * Is current granularity selector active
     */
    isActive: {
      type: Boolean,
      required: true
    },

    /**
     * Font Awesome 5 icon to be displayed next to each granularity selector
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    pickerGranularityIcon: {
      type: Array,
      required: true
    }
  }
}
</script>
