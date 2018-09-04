<template>
  <geo-dropdown
    :opened="isDropdownOpen"
    @click-outside="closeGeoSelect">
    <div
      slot="toggleButton"
      :class="`geo-select__placeholder-box__container${cssSuffix}`"
      @click="toggleOptions"
    >
      <label
        :class="{
          [`geo-select__placeholder-box${cssSuffix}`]: true,
          [`geo-select__placeholder-box--empty${cssSuffix}`]: !value
        }"
      > {{ selectPlaceholder }} </label>
      <font-awesome-icon :icon="dropdownIcon"/>
    </div>
    <div slot="popupContent">
      <slot name="searchEntry" />
    </div>
    <div
      slot="popupContent"
      :class="{
        [`geo-select__options-container${cssSuffix}`]: true,
        [`geo-select__options-container--has-opt-groups${cssSuffix}`]: hasOptGroups
      }"
    >
      <template
        v-for="(option, index) in options"
      >
        <slot :option="option" />
        <a
          ref="entries"
          :key="index"
          class="geo-select__hidden-anchor"
        />
      </template>
    </div>
    <div
      v-if="hasMoreResults"
      slot="popupContent"
    >
      <geo-select-more-results
        slot="moreResults"
        @load-more-results="loadNextPage">
        <template
          slot="moreResultsContent"> <slot name="moreResultsTextContent" />
        </template>
      </geo-select-more-results>
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
    },
    /**
     * Whether the select has opt-group entries or not
     */
    // TODO move to computed property
    hasOptGroups: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the select has more results to load or not
     */
    hasMoreResults: {
      type: Boolean,
      default: false
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
    selectPlaceholder () {
      return this.value ? this.value.name : this.placeholder
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.closeGeoSelect()
    }
  },
  methods: {
    closeGeoSelect () {
      this.isDropdownOpen = false
    },
    toggleOptions () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    loadNextPage () {
      this.$emit('load-more-results', {
        lastVisibleEntry: _.last(this.$refs.entries) // eslint-disable-line
      })
    }
  }
}
</script>
