<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div class="geo-calendar__granularity-selectors">
      <slot name="pickerGranularity" />
      <!-- TODO: Put aliases in different slot -->
      <!-- <slot name="aliases" /> -->
    </div>
    <div class="geo-calendar__picker-controls">
      <!-- TODO Add Input ranges -->
      <div class="geo-calendar__input-ranges">
        <div class="geo-calendar__input geo-calendar__input--start">
          <geo-input
            :placeholder="fromInputPlaceholder"
            :show-buttons="false"
          />
          <geo-tertiary-button>
            {{ earliestDatePlaceholder }}
          </geo-tertiary-button>
        </div>
        <font-awesome-icon
          :icon="inputRangeIcon"
          fixed-width
        />
        <div class="geo-calendar__input geo-calendar__input--end">
          <geo-input
            :placeholder="toInputPlaceholder"
            :show-buttons="false"
          />
          <geo-tertiary-button>
            {{ latestDatePlaceholder }}
          </geo-tertiary-button>
        </div>
      </div>
      <!-- TODO: Bind props to component -->
      <geo-calendar-picker />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoCalendar',
  status: 'missing-tests',
  release: 'CHANGE ME',
  mixins: [cssSuffix],
  props: {
    inputRangeIcon: {
      type: Array,
      default () {
        return ['fal', 'arrow-right']
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

    earliestDatePlaceholder: {
      type: String,
      required: false
    },

    latestDatePlaceholder: {
      type: String,
      required: false
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
