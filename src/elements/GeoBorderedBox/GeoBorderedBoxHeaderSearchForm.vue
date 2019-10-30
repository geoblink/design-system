<template>
  <form
    :class="`geo-bordered-box-header-search-form${cssSuffix}`"
    @submit.prevent
  >
    <geo-input
      :leading-accessory-icon="searchIcon"
      :value="value"
      :placeholder="placeholder"
      type="text"
      v-bind="$attrs"
      @input="searchPattern($event)"
      @delete-value="deleteValue($event)"
    />
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
     * Text to be displayed when no value is written.
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
      return throttle(function (value) {
        /**
         * User wrote something in the select search form.
         * @event input
         * @type {string}
         */
        this.$emit('input', _.deburr(value))
      })
    }
  },
  methods: {
    deleteValue () {
      this.searchPattern('')
    }
  }
}
</script>
