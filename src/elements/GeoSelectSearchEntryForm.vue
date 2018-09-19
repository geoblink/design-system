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

export default {
  name: 'GeoSelectSearchEntryForm',
  status: 'ready',
  release: '4.1.0',
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
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },
    searchPattern () {
      return _.debounce(function ($event) {
        /**
         * Search pattern in options list event
         * @event input
         * @type {string}
         */
        this.$emit('input', _.deburr($event.target.value))
      })
    }
  }
}
</script>
