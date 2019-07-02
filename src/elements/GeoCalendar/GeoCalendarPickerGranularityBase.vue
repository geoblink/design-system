<template>
  <div>
    <slot />
    <font-awesome-icon :icon="pickerGranularityIcon" />
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
  }
}
</script>
