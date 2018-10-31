<template>
  <geo-select-base
    ref="selectBase"
    :opened="isOpened"
    :css-modifier="cssModifier"
    :has-more-results="hasMoreResultsToLoad"
    @click-outside="closeSelect"
    @load-more-results="loadNextPage">
    <geo-select-toggle-button
      slot="toggleButton"
      :dropdown-icon="dropdownIcon"
      :css-modifier="cssModifier"
      :is-empty="!value"
      @click="toggleSelect">
      {{ toggleButtonLabel }}
    </geo-select-toggle-button>
    <geo-bordered-box-header-search-form
      v-if="searchable"
      slot="header"
      :search-icon="searchIcon"
      :css-modifier="cssModifier"
      :placeholder="searchInputPlaceholder"
      v-model="searchPattern"
    />
    <template v-if="visibleOptions.length">
      <template v-if="isOptSelect">
        <geo-list-group
          v-for="(option, index) in visibleOptions"
          :key="index"
        >
          <template
            v-if="option.isOptGroupHeader"
            slot="title"
          >
            <geo-highlighted-string
              v-if="isSearching"
              :css-modifier="cssModifier"
              :highlighted-chars="option.matches"
              :reference-string="option.label"
            />
            <template v-else>{{ option.label }}</template>
          </template>
          <geo-list-item
            v-for="(item, index) in option.items"
            slot="item"
            :key="index"
            :css-modifier="cssModifier"
            @click="changeCurrentSelection(item)">
            <geo-highlighted-string
              v-if="isSearching"
              :css-modifier="cssModifier"
              :highlighted-chars="item.matches"
              :reference-string="item.label"
            />
            <template v-else>{{ item.label }}</template>
          </geo-list-item>
        </geo-list-group>
      </template>
      <template v-else>
        <geo-list-item
          v-for="(option, index) in visibleOptions"
          :key="index"
          :css-modifier="cssModifier"
          @click="changeCurrentSelection(option)">
          <geo-highlighted-string
            v-if="isSearching"
            :css-modifier="cssModifier"
            :highlighted-chars="option.matches"
            :reference-string="option.label"
          />
          <template v-else>{{ option.label }}</template>
        </geo-list-item>
      </template>
    </template>
    <geo-list-clear-item
      v-else
      :css-modifier="cssModifier"
    >
      <!--
        @slot Use this slot to customize the label that will be displayed when
        no results are found after searching for an option
      -->
      <slot name="noResults" />
    </geo-list-clear-item>
    <!--
      @slot Use this slot to customize the label of the button allowing to
      display additional options when there are too many to be displayed at once
    -->
    <slot
      slot="moreResultsTextContent"
      name="moreResultsTextContent"
    />
  </geo-select-base>
</template>

<script>
import _ from 'lodash'
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelect',
  status: 'missing-tests',
  release: '4.1.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Array of options that will be displayed in the select component.
     *
     * **Note:** In order for the options to be displayed properly, a property
     * `label` must exist in every object of the array.
     *
     * **Note:** If you want the `GeoSelect` options to be displayed as
     * `optgroup`s, the property `isOptGroup` must be set to `true` in every
     * group header and its items must be provided in the `items` property.
     * Those items must have a `label` property, too.
     */
    options: {
      type: Array,
      required: true,
      validator (value) {
        for (let i = 0; i < value.length; i++) {
          const item = value[i]

          if ('isOptGroup' in item) {
            if (!_.isBoolean(item.isOptGroup)) {
              console.warn(`GeoSelect [component] :: group[${i}].isOptGroup attribute must be boolean`)
              return false
            }

            if (item.isOptGroup) {
              if (!isLabelAttributeValid(item)) {
                console.warn(`GeoSelect [component] :: group[${i}] must have a «label» attribute which is a string`)
                return false
              }

              if (!areChildrenValid(item, i)) {
                return false
              }
            }
          } else {
            if (!isLabelAttributeValid(item)) {
              console.warn(`GeoSelect [component] :: option[${i}] must have a «label» attribute which is a string`)
              return false
            }
          }
        }

        return true

        function isLabelAttributeValid (item) {
          return _.isString(item.label)
        }

        function areChildrenValid (parent, idParent) {
          const parentPath = `group[${idParent}]`
          const { items } = parent

          if (!_.isArray(items)) {
            console.warn(`GeoSelect [component] :: ${parentPath} must have a «items» attribute which is an array of items`)
            return false
          }

          for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (!isLabelAttributeValid(item)) {
              console.warn(`GeoSelect [component] :: ${parentPath}.items[${i}] must have a «label» attribute which is a string`)
              return false
            }
          }

          return true
        }
      }
    },

    /**
     * @model
     * Currently selected option. It is displayed as the select placeholder.
     *
     * A `label` property must be present in the prop in order to be displayed
     * properly by `GeoSelectToggleButton` placeholder.
     */
    value: {
      type: Object,
      required: false,
      validator (value) {
        return _.isString(value.label)
      }
    },

    /**
     * Text that will be displayed as placeholder when no option is selected.
     */
    placeholder: {
      type: String,
      required: true
    },

    /**
     * Whether the `GeoSelect` should show a search form or not.
     *
     * **Note:** If set to true then you must provide a `searchInputPlaceholder`
     * and a  `noResultsPlaceholder`.
     *
     * **Note:** You might also want to pass a `getMatchesForItem` to customize
     * the search algorithm used.
     */
    searchable: {
      type: Boolean,
      default: false
    },

    /**
     * Whether the `GeoSelect` is going to be grouped by optGroups or not.
     *
     * **Note:** If set to true, the options array must be grouped with the items inside each one of the opt-groups
     */
    isOptSelect: {
      type: Boolean,
      default: false
    },

    /**
     * Placeholder text that will be displayed in the search form when no input
     * is provided.
     */
    searchInputPlaceholder: {
      type: String,
      required: false
    },

    /**
     * Search algorithm used to filter items when user provides a search query.
     *
     * Will receive a single item as first parameter and the search query
     * (plain string with [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters converted to basic Latic letters and removing
     * [combining diacritial marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks))
     * as second one.
     *
     * It should return an array containing the indexes of the label characters
     * matching the search query.
     *
     * If there’s no match an empty array should be returned.
     *
     * To provide fuzzy search you might want to use
     * [fuzzaldrin-plus](https://www.npmjs.com/package/fuzzaldrin-plus).
     */
    getMatchesForItem: {
      type: Function,
      default (item, searchPattern) {
        const matches = _.deburr(item.label).match(searchPattern)
        if (matches) {
          return _.map(matches[0].split(''), function (char, i) {
            return i + matches.index
          })
        }
        return []
      }
    },

    /**
     * Maximum amount of items to be displayed in a single chunk.
     *
     * When there are more items than this value a *Load more* button will appear
     * to offer loading the next chunk of data.
     *
     * This is especially important when the dataset is really large and the DOM
     * tree too much complex.
     *
     * New elements will be added in chunks of up to this amount of elements.
     */
    pageSize: {
      type: Number,
      required: false,
      validator (value) {
        if (!_.isFinite(value)) return value > 0
        return true
      }
    },

    /**
     * Font Awesome 5 icon to be displayed as dropdown toggle button.
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
    }
  },
  data () {
    return {
      isOpened: false,
      searchPattern: null,
      lastVisiblePage: 1
    }
  },
  computed: {
    filteredOptions () {
      const self = this
      return _.flatMap(self.options, function (item) {
        const itemWithMatches = getOptGroupHeader(item, item.isOptGroup)

        if (!self.deburredSearchPattern) {
          return itemWithMatches.isOptGroupHeader
            ? _.assign({}, itemWithMatches, { items: _.map(itemWithMatches.items, getOptGroupEntry) })
            : itemWithMatches
        }

        const matches = self.getMatchesForItem(itemWithMatches, self.deburredSearchPattern)
        itemWithMatches.matches = matches

        if (itemWithMatches.isOptGroupHeader) {
          if (matches.length) {
            return _.assign({}, itemWithMatches, { items: _.map(itemWithMatches.items, getOptGroupEntry) })
          } else {
            const childrenWithMatches = _.map(itemWithMatches.items, getOptGroupEntry)
            const filteredChildren = _.filter(childrenWithMatches, function (child) {
              return !!child.matches.length
            })
            return filteredChildren.length ? _.assign({}, itemWithMatches, { items: filteredChildren }) : []
          }
        } else {
          return matches.length ? [itemWithMatches] : []
        }
      })

      function getOptGroupHeader (item, isOptGroupHeader) {
        return {
          matches: [],
          isOptGroupHeader,
          label: item.label,
          items: item.items,
          item
        }
      }

      function getOptGroupEntry (item) {
        const matches = self.getMatchesForItem(item, self.deburredSearchPattern)
        return {
          matches,
          isOptGroupHeader: false,
          label: item.label,
          item
        }
      }
    },

    deburredSearchPattern () {
      return _.deburr(this.searchPattern)
    },

    isSearching () {
      return !!this.searchPattern
    },

    toggleButtonLabel () {
      return _.get(this.value, 'label', this.placeholder)
    },

    visibleChunkRange () {
      return {
        start: 0,
        end: this.pageSize ? this.lastVisiblePage * this.pageSize : this.filteredOptions.length
      }
    },

    visibleOptions () {
      return this.filteredOptions.slice(this.visibleChunkRange.start, this.visibleChunkRange.end)
    },

    hasMoreResultsToLoad () {
      return this.lastVisiblePage * this.pageSize < this.filteredOptions.length
    }
  },
  methods: {
    closeSelect () {
      this.isOpened = false
    },

    toggleSelect () {
      this.isOpened = !this.isOpened
    },

    changeCurrentSelection (option) {
      /**
       * Change GeoSelect selection event
       * @event input
       * @type {object}
       */
      this.$emit('input', option.item)
      this.closeSelect()
    },

    loadNextPage (payload) {
      this.lastVisiblePage++
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    }
  }
}
</script>
