<template>
  <form :class="`geo-bordered-box-header-search-form${cssSuffix}`">
    <font-awesome-icon
      :icon="searchIcon"
      class="geo-bordered-box-header-search-form__icon"
    />
    <input
      :class="{
        'geo-bordered-box-header-search-form__input': true,
        [`geo-bordered-box-header-search-form__input--empty${cssSuffix}`]: !value
      }"
      :value="value"
      :placeholder="placeholder"
      type="text"
      @keyup="searchPattern($event)"
      @keypress.enter.prevent
    >
  </form>
</template>

<script>
import _ from 'lodash'
import throttle from '../../utils/throttle'
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoBorderedBoxHeaderSearchForm',
  status: 'ready',
  release: '8.0.0',
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
      default: function () {
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
      return throttle(function ($event) {
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
