<template>
  <geo-select-base
    :opened="isOpened"
    :css-modifier="cssModifier"
    :has-more-results="hasMoreResultsToLoad"
    @click-outside="closeSelect"
    @load-more-results="loadNextPage">
    <geo-select-toggle-button
      slot="toggleButton"
      :dropdown-icon="['fas', 'chevron-down']"
      :css-modifier="cssModifier"
      :is-empty="!value"
      @click="toggleSelect">
      {{ toggleButtonLabel }}
    </geo-select-toggle-button>
    <geo-select-search-entry-form
      v-if="searchable"
      :search-icon="['fas', 'search']"
      :css-modifier="cssModifier"
      :placeholder="searchInputPlaceholder"
      @search-pattern="setSearchPattern($event)"
    />
    <div
      ref="content"
      :class="`geo-select__options-list-container${cssSuffix}`"
    >
      <template v-if="visibleOptions.length">
        <component
          v-for="(option, index) in visibleOptions"
          :is="option.component"
          :css-modifier="cssModifier"
          :key="index"
          :option="option"
          @change-current-selection="changeCurrentSelection(option)">
          <geo-highlighted-string
            v-if="isSearching"
            :css-modifier="cssModifier"
            :matched-chars-position="option.matches"
            :reference-string="option.label"
          />
          <template v-else>{{ option.label }}</template>
        </component>
      </template>
      <geo-select-read-only-entry v-else>
        {{ noResultsPlaceholder }}
      </geo-select-read-only-entry>
    </div>
    <!-- @slot This slot will display the text for loading more results when there are too many options -->
    <slot
      slot="moreResultsTextContent"
      name="moreResultsTextContent"
    />
  </geo-select-base>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'GeoSelect',
  status: 'ready',
  version: '1.0.0',
  props: {
    /**
     * Array of options that will be displayed in the select component.
     */
    options: {
      type: Array,
      required: true,
      validator (value) {
        for (let i = 0; i < value.length; i++) {
          const item = value[i]

          if ('isOptGroup' in item) {
            if (!_.isBoolean(item.isOptGroup)) {
              console.warn(`GeoSelect group[${i}].isOptGroup must be a boolean`)
              return false
            }

            if (item.isOptGroup) {
              if (!isLabelAttributeValid(item)) {
                console.warn(`GeoSelect group[${i}] must have a «label» attribute which is a string`)
                return false
              }

              if (!areChildrenValid(item, i)) {
                return false
              }
            }
          } else {
            if (!isLabelAttributeValid(item)) {
              console.warn(`GeoSelect option[${i}] must have a «label» attribute which is a string`)
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
            console.warn(`GeoSelect ${parentPath} must have a «items» attribute which is an array of items`)
            return false
          }

          for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (!isLabelAttributeValid(item)) {
              console.warn(`GeoSelect ${parentPath}.items[${i}] must have a «label» attribute which is a string`)
              return false
            }
          }

          return true
        }
      }
    },
    /**
     * Current selected option that is displayed as the select placeholder.
     */
    value: {
      type: Object,
      required: false,
      validator (value) {
        return _.isString(value.label)
      }
    },
    /**
     * Default text that will be displayed when no option is selected.
     */
    placeholder: {
      type: String,
      required: true
    },
    /**
     * Whether the `GeoSelect` should show a search form or not.
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * Default text that will be displayed in the search form when no input is provided.
     */
    searchInputPlaceholder: {
      type: String,
      required: false
    },
    /**
     * Text that will be displayed when no option is found after having provided an input.
     */
    noResultsPlaceholder: {
      type: String,
      required: false
    },
    /**
     * Search algorithm that will be used to look for matches between the provided options and the search pattern.
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
     * Max number of items per click that will be displayed when a long list is provided.
     */
    pageSize: {
      type: Number,
      required: false,
      validator (value) {
        if (!_.isNil(value)) return value > 0
        return true
      }
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-selet-make('modifier-name');` to
     * your SCSS styles.
     */
    cssModifier: {
      type: String,
      default: ''
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
            ? [itemWithMatches, ..._.map(itemWithMatches.items, getOptGroupEntry)]
            : itemWithMatches
        }

        const matches = self.getMatchesForItem(itemWithMatches, self.deburredSearchPattern)
        itemWithMatches.matches = matches

        if (itemWithMatches.isOptGroupHeader) {
          if (matches.length) {
            return [itemWithMatches, ..._.map(itemWithMatches.items, getOptGroupEntry)]
          } else {
            const childrenWithMatches = _.map(itemWithMatches.items, getOptGroupEntry)
            const filteredChildren = _.filter(childrenWithMatches, function (child) {
              return !!child.matches.length
            })
            return filteredChildren.length ? [itemWithMatches, ...filteredChildren] : []
          }
        } else {
          return matches.length ? [itemWithMatches] : []
        }
      })

      function getOptGroupHeader (item, isOptGroupHeader) {
        return {
          matches: [],
          isOptGroupHeader,
          isOptGroupEntry: false,
          component: isOptGroupHeader ? 'geo-select-opt-group-header' : 'geo-select-entry',
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
          isOptGroupEntry: true,
          component: 'geo-select-opt-group-entry',
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
    },

    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
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
      this.$emit('input', option.item)
      this.closeSelect()
    },

    setSearchPattern (pattern) {
      this.searchPattern = pattern
    },

    loadNextPage () {
      this.lastVisiblePage++
      const popup = this.$refs.content
      const currentVerticalOffset = popup.scrollTop
      const nextPageVerticalOffset = currentVerticalOffset + popup.scrollHeight
      this.$nextTick(function () {
        popup.scrollTop = nextPageVerticalOffset
      })
    }
  }
}
</script>
