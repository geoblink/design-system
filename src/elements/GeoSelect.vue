<template>
  <geo-dropdown
    :opened="isDropdownOpen"
    @click-outside="closeGeoSelect">
    <div
      slot="toggleButton"
      @click="toggleOptions"
    >
      <input
        id="geo-select-main"
        type="text"
        name="geo-select-main"
      >
      <font-awesome-icon :icon="['fas', 'chevron-down']"/>
    </div>
    <template slot="popupContent">
      <p>Hola Dropdown</p>
    </template>
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
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDropdownOpen: false
    }
  },
  computed: {},
  methods: {
    closeGeoSelect () {
      this.isDropdownOpen = false
    },
    toggleOptions () {
      this.isDropdownOpen = !this.isDropdownOpen
    }
  }
}
</script>

