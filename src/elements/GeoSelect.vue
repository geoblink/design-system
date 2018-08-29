<template>
  <geo-dropdown
    :opened="isDropdownOpen"
    @click-outside="closeGeoSelect">
    <div
      slot="toggleButton"
      :style="{
        width: constantWidth
      }"
      @click="toggleOptions"
    >
      <input
        id="geo-select-main"
        :class="`geo-select__input-box${cssSuffix}`"
        type="text"
        name="geo-select-main"
      >
      <font-awesome-icon :icon="['fas', 'chevron-down']"/>
    </div>
    <div
      slot="popupContent"
      :style="{
        width: constantWidth
      }"
      :class="`geo-select__options-container${cssSuffix}`">
      <slot
        v-for="option in options"
        :option="option"
      />
    </div>
  </geo-dropdown>
</template>

<script>
export default {
  name: 'GeoSelect',
  status: 'ready',
  version: '1.0.1',
  props: {
    /**
     * Allows to specify the width of the containers
     */
    constantWidth: {
      type: Number,
      required: false
    },
    /**
     * An array of items that will be displayed as the select options
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-activity-indicator-make('modifier-name');` to
     * your SCSS styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isDropdownOpen: false
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    }
  },
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

