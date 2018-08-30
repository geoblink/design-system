<template>
  <geo-dropdown
    :opened="isDropdownOpen"
    @click-outside="closeGeoSelect">
    <div
      slot="toggleButton"
      :class="`geo-select__input-box__container${cssSuffix}`"
      :style="{
        width: `${constantWidth}px`
      }"
      @click="toggleOptions"
    >
      <input
        id="geo-select-main"
        :class="{
          [`geo-select__input-box${cssSuffix}`]: true,
          [`geo-select__input-box--empty${cssSuffix}`]: !value
        }"
        :value="computedCurrentSelection"
        type="text"
        name="geo-select-main"
      >
      <font-awesome-icon :icon="dropdownIcon"/>
    </div>
    <div
      slot="popupContent"
      :style="{
        width: dropdownContentWidth
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
     * Current selected value from options array
     */
    value: {
      type: Object,
      required: false
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
    },
    /**
     * Font Awesome 5 icon to be displayed as close button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    dropdownIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
      }
    },
    /**
     * Default text to be displayed when no option is selected
     */
    placeholder: {
      type: String,
      required: false
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
    },
    computedCurrentSelection () {
      return this.value ? this.value.name : this.placeholder
    },
    dropdownContentWidth () {
      // TODO: Find better way to compute this. 20 is the padding of the input
      return `${this.constantWidth + 20}px`
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.isDropdownOpen = false
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
