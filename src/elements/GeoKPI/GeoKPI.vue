<template>
  <div class="geo-KPI">
    <geo-vertical-layout>
      <geo-datum
        v-for="datum in datums"
        :key="datum"
        :isPrimaryValue="datum.isPrimaryValue"
        :value="datum.value"
      />
    </geo-vertical-layout>
  </div>
</template>

<script>
/**
 * `GeoKPI` is ... TODO: Write description
 */
export default {
  name: 'GeoKPI',
  status: 'missing-tests',
  release: 'CHANGE ME',
  props: {
    /**
     * Datum array
     */
    datums: {
      type: Array,
      required: true,
      validator (datums) {
        return datums.length < 3
      }
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