<template>
  <form
    class="geo-bordered-box-header-search-form"
    @submit.prevent
  >
    <geo-input
      :value="modelValue"
      :placeholder="placeholder"
      v-bind="$attrs"
      type="text"
      @update:modelValue="searchPattern($event)"
      @delete-value="deleteValue($event)"
    >
      <template #leadingAccessoryItem>
        <!-- @slot Use this slot to customize content displayed before the icon -->
        <slot
          name="beforeSearchIconItem"
        />
        <font-awesome-icon
          :icon="searchIcon"
        />
        <!-- @slot Use this slot to customize content displayed after the icon, on the left of the input -->
        <slot
          name="afterSearchIconItem"
        />
      </template>
      <!-- @slot Use this slot to customize content displayed on the right of the input -->
      <template #trailingAccessoryItem>
        <slot name="trailingAccessoryItem" />
      </template>
    </geo-input>
  </form>
</template>

<script>
import _ from 'lodash'
import throttle from '../../utils/throttle'

/**
 * `GeoBorderedBoxHeaderSearchForm` is a header featuring a search form designed
 * to fit nicely in a [GeoBorderedBox](./GeoBorderedBox).
 *
 * ::: warning NOTE
 * This component is **not responsible** of filtering displayed elements. You
 * might want to use a [GeoSelect](/components/GeoSelect/GeoSelect) for that.
 * :::
 */
export default {
  name: 'GeoBorderedBoxHeaderSearchForm',
  status: 'ready',
  release: '8.0.0',
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
    modelValue: {
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
        this.$emit('update:modelValue', value)
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
