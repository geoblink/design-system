<template>
  <div
    class="geo-calendar-picker-granularity-unit"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <slot />
    <font-awesome-icon
      v-if="isHovering"
      class="geo-calendar-picker-granularity-unit__selector-icon"
      :icon="pickerGranularityIcon"
    />
  </div>
</template>

<script>
export default {
  name: 'GeoCalendarPickerGranularityBase',
  props: {
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
