<template>
  <div :class="`geo-calendar${cssSuffix}`">
    <div>
      <slot name="pickerGranularity" />
      <!-- TODO: Put aliases in different slot -->
      <!-- <slot name="aliases" /> -->
    </div>
    <!-- TODO Add Input ranges -->
    <div></div>
    <!-- TODO: Bind props to component -->
    <geo-calendar-picker />
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
