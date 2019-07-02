<template>
  <div class="geo-calendar-navigation">
    <font-awesome-icon
      :icon="previousDateInSelectedGranularityIcon"
      class="geo-calendar-navigation__previous-icon"
      fixed-width
    />
    <div class="geo-calendar-navigation__dropdowns-container">
      <component :is="selectedGranularityNavigation" />
    </div>
    <font-awesome-icon
      :icon="nextDateInSelectedGranularityIcon"
      class="geo-calendar-navigation__next-icon"
      fixed-width
    />
  </div>
</template>

<script>
import { PICKER_DATE_UNITS } from './GeoCalendar.utils'

import GeoCalendarNavigationDay from './GeoCalendarNavigationDay'
import GeoCalendarNavigationMonth from './GeoCalendarNavigationMonth'
import GeoCalendarNavigationYear from './GeoCalendarNavigationYear'

export default {
  name: 'GeoCalendarNavigation',
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
    }
  },

  computed: {
    selectedGranularityNavigation () {
      let granularityNavigationComponent
      switch (this.pickerDateUnit) {
        case PICKER_DATE_UNITS.day:
          granularityNavigationComponent = GeoCalendarNavigationDay
          break
        case PICKER_DATE_UNITS.month:
          granularityNavigationComponent = GeoCalendarNavigationMonth
          break
        case PICKER_DATE_UNITS.year:
          granularityNavigationComponent = GeoCalendarNavigationYear
          break
      }
      return granularityNavigationComponent
    }
  }
}
</script>
