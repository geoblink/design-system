<template>
  <div :class="`geo-select-search-entry__container${cssSuffix}`">
    <form :class="`geo-select-search-entry__search-input__container${cssSuffix}`">
      <font-awesome-icon
        :icon="searchIcon"
        :class="`geo-select-search-entry__search-icon${cssSuffix}`"
      />
      <input
        v-model="searchValue"
        :class="{
          [`geo-select-search-entry__search-input${cssSuffix}`]: true,
          [`geo-select-search-entry__search-input--empty${cssSuffix}`]: !searchValue
        }"
        :placeholder="placeholder"
        type="text"
        @keyup="searchPattern()"
      >
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'GeoSelectSearchEntryForm',
  status: 'missing-tests',
  release: '8.1.0',
  props: {
    /**
     * Icon used for the searchbox
     */
    searchIcon: {
      type: Array,
      default () {
        return ['fal', 'search']
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
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-select-search-entry-form-make('modifier-name');` to
     * your SCSS styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },
    searchPattern () {
      return _.debounce(function () {
        /**
         * Search pattern in options list event
         * @event search-pattern
         * @type {string}
         */
        this.$emit('search-pattern', _.deburr(this.searchValue))
      })
    }
  }
}
</script>
