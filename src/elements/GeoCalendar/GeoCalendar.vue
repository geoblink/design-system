<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div class="geo-calendar__granularity-selectors">
      <slot name="pickerGranularity" />
      <!-- TODO: Put aliases in different slot -->
      <!-- <slot name="aliases" /> -->
    </div>
    <div class="geo-calendar__picker-controls">
      <div class="geo-calendar__input-ranges">
        <div class="geo-calendar__input geo-calendar__input--start">
          <geo-input
            v-model="fromFormattedDate"
            v-click-outside="unfocusDateInput"
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
            :is-focused="isFromDateInputFocused"
            input-type="normal"
            @click="isFromDateInputFocused = true"
          />
          <geo-link-button
            css-modifier="calendar-picker-button"
            @click="setEarliestDate"
          >
            {{ earliestDatePlaceholder }}
          </geo-link-button>
        </div>
        <font-awesome-icon
          :icon="inputRangeIcon"
          class="geo-calendar__input-range-icon"
          fixed-width
        />
        <div class="geo-calendar__input geo-calendar__input--end">
          <geo-input
            v-model="toFormattedDate"
            v-click-outside="unfocusDateInput"
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
            :is-focused="isToDateInputFocused"
            input-type="normal"
            @click="isToDateInputFocused = true"
          />
          <geo-link-button
            css-modifier="calendar-picker-button"
            @click="setLatestDate"
          >
            {{ latestDatePlaceholder }}
          </geo-link-button>
        </div>
      </div>
      <!-- TODO: Bind props to component -->
      <geo-calendar-picker
        ref="calendarPicker"
        :previous-date-in-selected-granularity-icon="previousDateInSelectedGranularityIcon"
        :next-date-in-selected-granularity-icon="nextDateInSelectedGranularityIcon"
        :calendar-navigation-select-icon="calendarNavigationSelectIcon"
        :picker-date-unit="pickerDateUnit"
        :granularity-id="granularityId"
        :locale="locale"
        :earliest-date="earliestDate"
        :latest-date="latestDate"
        :input-selected-from-date="fromRawDate"
        :input-selected-to-date="toRawDate"
        @select-day="selectDay"
      />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import ClickOutside from '../../directives/GeoClickOutside'
import { isBefore, format, isValid, isAfter } from 'date-fns'

export default {
  name: 'GeoCalendar',
  status: 'missing-tests',
  release: 'CHANGE ME',
  directives: {
    ClickOutside
  },
  mixins: [cssSuffix],
  props: {
    inputRangeIcon: {
      type: Array,
      default () {
        return ['fal', 'arrow-right']
      }
    },

    previousDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-left']
      }
    },

    nextDateInSelectedGranularityIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-right']
      }
    },

    calendarNavigationSelectIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
      }
    },

    fromInputPlaceholder: {
      type: String,
      required: false
    },

    toInputPlaceholder: {
      type: String,
      required: false
    },

    earliestDate: {
      type: Date,
      required: true
    },

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    latestDate: {
      type: Date,
      required: true
    },

    latestDatePlaceholder: {
      type: String,
      required: false
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
  },
  data () {
    return {
      fromRawDate: null,
      toRawDate: null,
      isFromDateInputFocused: false,
      isToDateInputFocused: false
    }
  },
  computed: {
    fromFormattedDate: {
      get () {
        return this.fromRawDate ? this.formatDate(this.fromRawDate) : null
      },

      set (newFromDate) {
        const parsedDate = this.parseDate(newFromDate)
        if (isValid(parsedDate) && this.isDateWithinBounds(parsedDate)) {
          this.fromRawDate = this.parseDate(newFromDate)
        }
      }
    },

    toFormattedDate: {
      get () {
        return this.toRawDate ? this.formatDate(this.toRawDate) : null
      },

      set (newToDate) {
        const parsedDate = this.parseDate(newToDate)
        if (isValid(parsedDate) && this.isDateWithinBounds(parsedDate)) {
          this.toRawDate = this.parseDate(newToDate)
        }
      }
    },

    areSelectedBoundsValid () {
      return !!this.fromRawDate && !!this.toRawDate && !isAfter(this.fromRawDate, this.toRawDate)
    }
  },
  methods: {
    setEarliestDate () {
      this.fromRawDate = this.earliestDate
    },

    setLatestDate () {
      this.toRawDate = this.latestDate
    },

    selectDay (day) {
      if (!this.fromRawDate || (this.fromRawDate && isBefore(day, this.fromRawDate))) {
        this.fromRawDate = day
      } else {
        this.toRawDate = day
      }
    },

    parseDate (date) {
      if (!date) return
      const [day, month, year] = date.split('/').map(n => parseInt(n))
      return new Date(year, month - 1, day)
    },

    formatDate (date) {
      return format(date, 'DD/MM/YYYY')
    },

    unfocusDateInput () {
      this.isFromDateInputFocused = false
      this.isToDateInputFocused = false
    },

    isDateWithinBounds (date) {
      return !isBefore(date, this.earliestDate) && !isAfter(date, this.latestDate)
    }
  }
}

</script>
