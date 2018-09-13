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
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectSearchEntryForm',
  status: 'missing-tests',
  release: '4.1.0',
  mixins: [cssSuffix],
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
    }
  },
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
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
