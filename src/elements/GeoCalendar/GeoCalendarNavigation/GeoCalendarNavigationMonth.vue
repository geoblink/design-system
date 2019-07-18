<template>
  <div class="geo-calendar-navigation__selects-container geo-calendar-navigation--month">
    <geo-select-base
      :opened="isYearSelectionOpened"
      :fixed-width="false"
      css-modifier="calendar-navigation-selection"
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
          class="calendar-navigation-toggle-button-icon"
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
import { differenceInCalendarYears, getYear } from 'date-fns'

export default {
  name: 'GeoCalendarNavigationMonth',
  props: {
    calendarNavigationSelectIcon: {
      type: Array,
      required: true
    },

    currentYear: {
      type: Number,
      required: true
    },

    earliestDate: {
      type: Date,
      required: true
    },

    latestDate: {
      type: Date,
      required: true
    },

    locale: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isYearSelectionOpened: false
    }
  },
  computed: {
    numYearsWithData () {
      return differenceInCalendarYears(this.latestDate, this.earliestDate) + 1
    },

    yearsList () {
      let earliestYear = getYear(this.earliestDate)
      return _.times(this.numYearsWithData, (i) => {
        return earliestYear++
      })
    }
  },
  methods: {
    closeYearSelection () {
      this.isYearSelectionOpened = false
    },

    goToYear (year) {
      this.closeYearSelection()
      this.$emit('go-to-year', year)
    },

    toggleYearSelection () {
      this.isYearSelectionOpened = !this.isYearSelectionOpened
    }
  }
}
</script>
