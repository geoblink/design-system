<template>
  <form
    :class="`geo-bordered-box-header-search-form${cssSuffix}`"
    @submit.prevent
  >
    <geo-input
      v-bind="$attrs"
      v-model="valueInput"
      :leadingAccessoryIcon="searchIcon"
      :placeholder="placeholder"
      type="text"
      @keyup="searchPattern($event)"
      @delete-value="deleteValue"
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
  data () {
    return {
      valueInput: ''
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
  },
  methods: {
    deleteValue () {
      this.valueInput = ''
    }
  }
}
</script>
