<template>
  <div :class="`geo-select-search-entry-form__container${cssSuffix}`">
    <form :class="`geo-select-search-entry-form__search-input__container${cssSuffix}`">
      <font-awesome-icon
        :icon="searchIcon"
        :class="`geo-select-search-entry-form__search-icon${cssSuffix}`"
      />
      <input
        ref="search-input"
        :class="{
          [`geo-select-search-entry-form__search-input${cssSuffix}`]: true,
          [`geo-select-search-entry-form__search-input--empty${cssSuffix}`]: !value
        }"
        :value="value"
        :placeholder="placeholder"
        type="text"
        @keyup="searchPattern($event)"
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
     * Icon used for the search box.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    searchIcon: {
      type: Array,
      default () {
        return ['fal', 'search']
      }
    },

    /**
     * Text to be displayed when no option is selected.
     */
    placeholder: {
      type: String,
      required: false
    },

    /**
     * @model
     * Current search pattern used for filtering available options
     */
    value: {
      type: String,
      required: false,
      validator (value) {
        return _.isString(value)
      }
    }

  },
  computed: {
    searchPattern () {
      return _.debounce(function ($event) {
        /**
         * User wrote something in the select search form.
         * @event input
         * @type {string}
         */
        this.$emit('input', _.deburr($event.target.value))
      })
    }
  }
}
</script>
