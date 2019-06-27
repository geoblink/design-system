<template>
  <div @click="handleClick">
    <slot />
    <font-awesome-icon />
  </div>
</template>

<script>
import geoCalendarUtils from './GeoCalendar.utils'

export default {
  name: 'GeoCalendarPickerGranularityBase',
  props: {
    isValid: {
      type: Function,
      required: true
    },

    pickerDateUnit: {
      type: String,
      required: true,
      validator (value) {
        if (value in geoCalendarUtils.PICKER_DATE_UNITS) return true

        const supportedValues = Object.values(geoCalendarUtils.PICKER_DATE_UNITS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoCalendarPickerGranularityBase [component] :: Unsupported value («${value}») for «pickerDateUnit» property. Use one of ${supportedValues}`)
        return false
      }
    },

    /**
     * Unique identifier to know if this specific granularity is active or not
     */
    granularityId: {
      type: String,
      required: true
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
