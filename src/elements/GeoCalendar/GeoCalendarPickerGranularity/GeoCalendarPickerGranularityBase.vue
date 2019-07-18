<template>
  <div
    :class="{
      'geo-calendar-picker-granularity-unit': true,
      'geo-calendar-picker-granularity-unit--active': isActive
    }"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <slot />
    <font-awesome-icon
      v-if="isHovering || isActive"
      class="geo-calendar-picker-granularity-unit__selector-icon"
      :icon="pickerGranularityIcon"
    />
  </div>
</template>

<script>
export default {
  name: 'GeoCalendarPickerGranularityBase',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },

    pickerGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'arrow-right']
      }
    }
  },

  data () {
    return {
      isHovering: false
    }
  }
}
</script>
