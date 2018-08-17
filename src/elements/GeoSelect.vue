<template>
  <geo-dropdown
    :opened="isDropdownOpen"
    @click-outside="closeGeoSelect">
    <input
      id="geo-select-main"
      slot="toggleButton"
      type="text"
      name="geo-select-main"
    >
  </geo-dropdown>
</template>

<script>
export default {
  name: 'GeoSelect',
  status: 'ready',
  version: '1.0.1',
  props: {
    /**
     * An array of items that will be displayed as the select options
     */
    itemsList: {
      type: Array,
      required: true
    }
  },
  data () {},
  computed: {},
  methods: {}
}
</script>

