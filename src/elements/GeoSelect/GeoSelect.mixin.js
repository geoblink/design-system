import _ from 'lodash'
import { Y_AXIS_POSITION, X_AXIS_POSITION } from '../GeoDropdown/GeoDropdown.constants'
import { VARIANTS } from './GeoSelectToggleButton.vue'
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'

/**
 * @mixin
 */
export default {
  constants: {
    X_AXIS_POSITION,
    Y_AXIS_POSITION
  },
  props: {
    /**
     * Whether dropdown with options' width should be fixed to the width of the
     * toggle button or not.
     */
    fixedWidth: {
      type: Boolean,
      default: true
    },
    /**
     * Array of options that will be displayed in the select component.
     *
     * **Note:** If you want the options to be displayed as
     * `optgroup`s, the property `isOptGroup` must be set to `true` in every
     * group header and its items must be provided in the `items` property.
     */
    options: {
      type: Array,
      required: true,
      validator (value) {
        for (let i = 0; i < value.length; i++) {
          const item = value[i]

          if ('isOptGroup' in item) {
            if (!_.isBoolean(item.isOptGroup)) {
              console.warn(`GeoMultiSelect [component] :: group[${i}].isOptGroup attribute must be boolean`)
              return false
            }

            if (item.isOptGroup) {
              if (!areChildrenValid(item, i)) {
                return false
              }
            }
          }
        }

        return true

        function areChildrenValid (parent, idParent) {
          const parentPath = `group[${idParent}]`
          const { items } = parent

          if (!_.isArray(items)) {
            console.warn(`GeoMultiSelect [component] :: ${parentPath} must have a «items» attribute which is an array of items`)
            return false
          }

          return true
        }
      }
    },

    /**
     * Key to access the text of the options to display in the list.
     */
    keyForLabel: {
      type: String,
      default: 'label'
    },

    /**
     * Text that will be displayed as placeholder when no options are selected.
     */
    placeholder: {
      type: String,
      required: false
    },

    /**
     * Whether the `GeoSelect` / `GeoMultiSelect` should show a search form or not.
     *
     * **Note:** If set to true then you must provide a `searchInputPlaceholder`
     * and a `noResultsPlaceholder`.
     *
     * **Note:** You might also want to pass a `getMatchesForItem` to customize
     * the search algorithm used.
     */
    searchable: {
      type: Boolean,
      default: false
    },

    /**
     * Whether the `GeoSelect` / `GeoMultiSelect` is going to be grouped by optGroups or not.
     *
     * **Note:** If set to true, the options array must be grouped with the
     * items inside each one of the opt-groups
     */
    grouped: {
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
      type: Function
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
     * Flag to indicate if it should paginate the items inside the groups when the
     * items are grouped.
     */
    isPaginatingGroupItems: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Font Awesome 5 icon to be displayed as dropdown toggle button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    dropdownIcon: {
      type: Array,
      default: function () {
        return ['fal', 'chevron-down']
      }
    },

    /**
     * Font Awesome 5 icon to be displayed as dropdown toggle button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    deleteIcon: {
      type: Array,
      default: function () {
        return ['fas', 'times-circle']
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
      default: function () {
        return ['fal', 'search']
      }
    },

    /**
     * Forced position of the popup relative to the container. `top`, `bottom`
     * or none.
     *
     * If provided, this is the position that the popup will use regardless
     * whether it fits or not. Values available in `Y_AXIS_POSITION`:
     *
     * - `Y_AXIS_POSITION.top`
     * - `Y_AXIS_POSITION.bottom`
     */
    forceYAxisPosition: enumPropertyFactory({
      componentName: 'GeoSelect',
      propertyName: 'forceYAxisPosition',
      enumDictionary: Y_AXIS_POSITION,
      required: false,
      checkUndefined: true
    }),

    /**
     * Whether is possible to delete the selected value.
     *
     * If true, the event delete-value can be used to trigger an action
     * when the delete icon is clicked.
     */
    isValueDeletable: {
      type: Boolean,
      default: false
    },

    /**
     * Whether interaction with this select is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Predefined style scheme of the toggle button, allowing the possibility to use
     * it as regular or as a suffix of an input.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     * See [Component Constants](/docs/guides/using-constants) for more info on how
     * to use those constants in your code.
     */
    variant: enumPropertyFactory({
      componentName: 'GeoSelect',
      propertyName: 'variant',
      enumDictionary: VARIANTS,
      defaultValue: VARIANTS.regular
    }),

    /**
     * Class or classes that will be added to the popup element
     */
    popupClass: {
      type: [String, Array, Object],
      required: false
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
    isGroupedSelect () {
      return this.grouped
    },

    filteredOptions () {
      const self = this
      return _.flatMap(self.options, function (item) {
        const itemWithMatches = getOptGroupHeader(item, item.isOptGroup)

        if (!self.deburredSearchPattern) {
          return itemWithMatches.isOptGroupHeader
            ? _.assign({}, itemWithMatches, { items: _.map(itemWithMatches.items, getOptGroupEntry) })
            : itemWithMatches
        }

        const searchFunction = self.getMatchesForItem || self.defaultGetMatchesForItem
        const matches = searchFunction(itemWithMatches, self.deburredSearchPattern)
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
          [self.keyForLabel]: item[self.keyForLabel],
          items: item.items,
          item
        }
      }

      function getOptGroupEntry (item) {
        const searchFunction = self.getMatchesForItem || self.defaultGetMatchesForItem
        const matches = searchFunction(item, self.deburredSearchPattern)
        return {
          matches,
          isOptGroupHeader: false,
          [self.keyForLabel]: item[self.keyForLabel],
          item
        }
      }
    },

    deburredSearchPattern () {
      return _.deburr(this.searchPattern)
    },

    visibleChunkRange () {
      let end = this.pageSize ? this.lastVisiblePage * this.pageSize : this.filteredOptions.length
      let endGroup
      if (this.hasToCalculatePaginatedGroupItems) {
        _.forEach(this.filteredOptions, (group, index) => {
          const accumulatedItems = _.sumBy(_.slice(this.filteredOptions, 0, index + 1), 'items.length')
          if (end <= accumulatedItems) {
            endGroup = index + 1
            end = end - (accumulatedItems - group.items.length)
            return false
          }
        })
      }
      return {
        start: 0,
        end,
        endGroup
      }
    },

    visibleOptions () {
      if (this.hasToCalculatePaginatedGroupItems) {
        const visibleGroups = _.slice(_.cloneDeep(this.filteredOptions), this.visibleChunkRange.start, this.visibleChunkRange.endGroup)
        const lastGroup = _.last(visibleGroups)
        lastGroup.items = _.slice(lastGroup.items, this.visibleChunkRange.start, this.visibleChunkRange.end)
        return visibleGroups
      } else {
        return this.filteredOptions.slice(this.visibleChunkRange.start, this.visibleChunkRange.end)
      }
    },

    hasMoreResultsToLoad () {
      if (this.hasToCalculatePaginatedGroupItems) {
        const lastGroupIndex = this.filteredOptions.length - 1
        const lastItemIndex = _.get(_.last(this.filteredOptions), 'items.length')
        return this.visibleChunkRange.endGroup < lastGroupIndex || this.visibleChunkRange.end < lastItemIndex
      } else {
        return this.lastVisiblePage * this.pageSize < this.filteredOptions.length
      }
    },

    hasToCalculatePaginatedGroupItems () {
      return this.grouped && this.isPaginatingGroupItems && this.pageSize
    }
  },
  methods: {
    defaultGetMatchesForItem (item, searchPattern) {
      const lowerDeburrLabel = _.deburr(item[this.keyForLabel]).toLowerCase()
      const lowerDeburrSearchPattern = _.deburr(searchPattern).toLowerCase()
      const matches = lowerDeburrLabel.match(lowerDeburrSearchPattern)
      if (matches) {
        return _.map(matches[0].split(''), function (char, i) {
          return i + matches.index
        })
      }
      return []
    },

    closeSelect () {
      this.isOpened = false
      this.$emit('toggle', this.isOpened)
    },

    toggleSelect () {
      if (this.disabled) return

      this.isOpened = !this.isOpened
      this.$emit('toggle', this.isOpened)
    },

    loadNextPage (payload) {
      this.lastVisiblePage++
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    },

    deleteValue () {
      /**
       * User typed on the input box.
       *
       * @event delete-value
       */
      this.$emit('delete-value')
    }
  }
}
