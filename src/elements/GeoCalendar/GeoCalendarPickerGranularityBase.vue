<template>
  <div @click="handleClick">
    <slot />
    <font-awesome-icon :icon="pickerGranularityIcon" />
  </div>
</template>

<script>
import { PICKER_DATE_UNITS } from './GeoCalendar.utils'

export default {
  name: 'GeoCalendarPickerGranularityBase',
  props: {
    isValid: {
      type: Function,
      required: true
    },

    pickerGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'arrow-right']
      }
    },

    pickerDateUnit: {
      type: String,
      required: true,
      validator (value) {
        if (value in PICKER_DATE_UNITS) return true

        const supportedValues = Object.values(PICKER_DATE_UNITS).map(i => `«${i}»`).join(', ')
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
