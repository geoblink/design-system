<template>
  <div class="geo-calendar-navigation__selects-container geo-calendar-navigation--month">
    <geo-select-base
      :opened="isYearSelectionOpened"
      :fixed-width="false"
      popup-class="geo-calendar-navigation-selection"
      data-ut="year-select"
      @click-outside="closeYearSelection"
    >
      <geo-link-button
        slot="toggleButton"
        css-modifier="calendar-navigation-toggle-button"
        @click="toggleYearSelection"
      >
        {{ currentYear }}
        <font-awesome-icon
          v-if="numYearsWithData"
          class="geo-calendar-navigation-toggle-button-icon"
          fixed-width
          :icon="calendarNavigationSelectIcon"
        />
      </geo-link-button>
      <div ref="calendarNavigationSelect">
        <geo-list-item
          v-for="year in yearsList"
          :key="year"
          @click="goToYear(year)"
        >
          {{ year }}
        </geo-list-item>
      </div>
    </geo-select-base>
  </div>
</template>

<script>
import GeoCalendarDateIndicators from '../GeoCalendarDateIndicators.mixin'
import GeoCalendarNavigationYearMixin from './GeoCalendarNavigationYear.mixin'

export default {
  name: 'GeoCalendarNavigationMonth',
  status: 'ready',
  release: '23.2.0',
  mixins: [
    GeoCalendarDateIndicators,
    GeoCalendarNavigationYearMixin
  ],
  props: {
    /**
     * Font Awesome 5 icon to be displayed in the selects of the navigation menu.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    calendarNavigationSelectIcon: {
      type: Array,
      required: true
    }
  }
}
</script>
