<template>
  <geo-select-base
    ref="selectBase"
    :opened="isOpened"
    :css-modifier="`geo-multi-select${cssSuffix}`"
    :has-more-results="hasMoreResultsToLoad"
    :fixed-width="fixedWidth"
    @click-outside="closeSelect"
    @load-more-results="loadNextPage"
  >
    <!-- @slot _Optional_. Use this slot to customize toggle button. -->
    <slot
      slot="toggleButton"
      name="toggleButton"
      :dropdown-icon="dropdownIcon"
      :css-modifier="`geo-multi-select${cssSuffix}`"
      :is-empty="isEmpty"
      :disabled="disabled"
      :toggle-select="toggleSelect"
      :visible-selected-options="visibleSelectedOptions"
      :hidden-options-size="numberOfHiddenSelectedOptions"
      :show-all="showAllSelectedOptions"
      :toggle-list="toggleList"
      :toggle-option="toggleOption"
    >
      <geo-select-toggle-button
        :dropdown-icon="dropdownIcon"
        :css-modifier="`geo-multi-select${cssSuffix}`"
        :is-empty="isEmpty"
        :disabled="disabled"
        @click="toggleSelect"
      >
        <template v-if="isEmpty">
          {{ placeholder }}
        </template>
        <div
          v-else
          class="geo-multi-select__pills-container"
        >
          <!-- @slot _Optional_. Use this slot to customize the content rendered inside the button. -->
          <slot
            name="buttonContent"
            :visible-selected-options="visibleSelectedOptions"
            :toggle-option="toggleOption"
          >
            <geo-pill
              v-for="(option, index) in visibleSelectedOptions"
              :key="index"
              class="geo-multi-select__pill"
              :variant="geoPillVariant"
            >
              <geo-trimmed-content>{{ option[keyForLabel] }}</geo-trimmed-content>
              <font-awesome-icon
                :icon="pillCloseIcon"
                class="geo-multi-select__pill-remove"
                fixed-width
                @click.stop="toggleOption(option)"
              />
            </geo-pill>
          </slot>

          <!-- @slot _Optional_. Use this slot to customize the buttons to show more/less pills. -->
          <slot
            name="toggleList"
            :hidden-options-size="numberOfHiddenSelectedOptions"
            :show-all="showAllSelectedOptions"
            :toggle-list="toggleList"
          >
            <geo-link-button
              v-if="hasMoreSelectedOptionsThanLimit"
              @click.stop="toggleList()"
            >
              <!-- @slot Use this slot to customize the text to show less pills. -->
              <slot
                v-if="showAllSelectedOptions"
                name="showLessPills"
              />
              <!-- @slot Use this slot to customize the text to show more pills. -->
              <slot
                v-else
                name="showMorePills"
                :hidden-options-size="numberOfHiddenSelectedOptions"
              />
            </geo-link-button>
          </slot>
        </div>
      </geo-select-toggle-button>
    </slot>

    <!-- @slot _Optional_. Use this slot to customize search form. -->
    <slot
      v-if="searchable"
      slot="header"
      name="searchHeader"
      :search-pattern="searchPattern"
    >
      <geo-bordered-box-header-search-form
        v-model="searchPattern"
        :search-icon="searchIcon"
        :css-modifier="`geo-multi-select${cssSuffix}`"
        :placeholder="searchInputPlaceholder"
      />
    </slot>

    <template v-if="visibleOptions.length">
      <template v-if="isGroupedSelect">
        <template v-for="(option, index) in visibleOptions">
          <!--
            @slot _Optional_. Use this slot to customize how groups are displayed
            in grouped `GeoMultiSelect`s
          -->
          <slot
            name="group"
            :option="option"
            :index="index"
            :suggested-key="`${option[keyForLabel]}--${index}`"
            :css-modifier="`geo-multi-select${cssSuffix}`"
          >
            <geo-list-group :css-modifier="`geo-multi-select${cssSuffix}`">
              <slot
                v-if="option.isOptGroupHeader"
                slot="title"
                name="groupTitle"
              >
                <label class="geo-multi-select_label geo-multi-select_label-group">
                  <geo-marquee :css-modifier="`geo-multi-select${cssSuffix}`">
                    <geo-highlighted-string
                      slot-scope="{}"
                      :css-modifier="`geo-multi-select${cssSuffix}`"
                      :highlighted-chars="option.matches"
                      :reference-string="option[keyForLabel]"
                    />
                  </geo-marquee>
                  <input
                    slot="trailingAccessoryItem"
                    :checked="isGroupChecked(option)"
                    :indeterminate.prop="isSomeGroupOptionChecked(option)"
                    type="checkbox"
                    class="geo-multi-select_input"
                    @input="toggleGroup(option)"
                  >
                </label>
              </slot>

              <slot
                v-for="(item, itemIndex) in option.items"
                slot="item"
                name="groupItem"
                :suggested-key="`${item[keyForLabel]}--${itemIndex}`"
                :item-index="itemIndex"
                :item="item"
                :css-modifier="`geo-multi-select${cssSuffix}`"
                :selected-options="selectedOptions"
                :toggle-option="toggleOption"
              >
                <geo-list-item
                  :key="`${item[keyForLabel]}--${itemIndex}`"
                  :css-modifier="`geo-multi-select${cssSuffix}`"
                >
                  <label class="geo-multi-select_label">
                    <geo-marquee :css-modifier="`geo-multi-select${cssSuffix}`">
                      <geo-highlighted-string
                        slot-scope="{}"
                        :css-modifier="`geo-multi-select${cssSuffix}`"
                        :highlighted-chars="item.matches"
                        :reference-string="item[keyForLabel]"
                      />
                    </geo-marquee>
                    <input
                      slot="trailingAccessoryItem"
                      :checked="selectedOptions[item.item[keyForId]]"
                      type="checkbox"
                      class="geo-multi-select_input"
                      @input="toggleOption(item)"
                    >
                  </label>
                </geo-list-item>
              </slot>
            </geo-list-group>
          </slot>
        </template>
      </template>
      <template v-else>
        <template v-for="(option, optionIndex) in visibleOptions">
          <!--
            @slot _Optional_. Use this slot to customize how options are displayed
            in non-grouped `GeoMultiSelect`s
          -->
          <slot
            :item="option"
            :item-index="optionIndex"
            :suggested-key="`${option[keyForLabel]}--${optionIndex}`"
            :css-modifier="`geo-multi-select${cssSuffix}`"
            :selected-options="selectedOptions"
            :toggle-option="toggleOption"
          >
            <geo-list-item
              :key="`${option[keyForLabel]}--${optionIndex}`"
              :css-modifier="`geo-multi-select${cssSuffix}`"
            >
              <label class="geo-multi-select_label">
                <geo-marquee :css-modifier="`geo-multi-select${cssSuffix}`">
                  <geo-highlighted-string
                    slot-scope="{}"
                    :css-modifier="`geo-multi-select${cssSuffix}`"
                    :highlighted-chars="option.matches"
                    :reference-string="option[keyForLabel]"
                  />
                </geo-marquee>
                <input
                  slot="trailingAccessoryItem"
                  :checked="selectedOptions[option.item[keyForId]]"
                  type="checkbox"
                  class="geo-multi-select_input"
                  @input="toggleOption(option)"
                >
              </label>
            </geo-list-item>
          </slot>
        </template>
      </template>
    </template>
    <geo-list-clear-item
      v-else
      :css-modifier="`geo-multi-select${cssSuffix}`"
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
import { Y_AXIS_POSITION, X_AXIS_POSITION } from '../GeoDropdown/GeoDropdown.constants'
import { VARIANTS as GeoPillVariants } from '../GeoPill/GeoPill'

export default {
  name: 'GeoMultiSelect',
  status: 'ready',
  release: '22.1.0',
  mixins: [cssSuffix],
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
     * **Note:** If you want the `GeoMultiSelect` options to be displayed as
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
     * @model
     * Currently selected options. It is displayed as pills in the select.
     */
    value: {
      type: Array,
      required: false
    },

    /**
     * Key to access the id of each item. The value of this key must be unique.
     */
    keyForId: {
      type: String,
      required: true
    },

    /**
     * Key to access the text of the options to display in the list.
     */
    keyForLabel: {
      type: String,
      required: true
    },

    /**
     * Text that will be displayed as placeholder when no options are selected.
     */
    placeholder: {
      type: String,
      required: true
    },

    /**
     * Whether the `GeoMultiSelect` should show a search form or not.
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
     * Whether the `GeoMultiSelect` is going to be grouped by optGroups or not.
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
    },

    /**
     * Icon used for the search box.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    pillCloseIcon: {
      type: Array,
      default () {
        return ['fal', 'times']
      }
    },

    /**
     * Maximum amount of pills to be displayed in the select button.
     */
    visibleSelectedOptionsLimit: {
      type: Number,
      default: 3
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
    forceYAxisPosition: {
      type: String,
      required: false,
      validator: function (value) {
        return value === undefined || value in Y_AXIS_POSITION
      }
    },

    /**
     * Whether interaction with this select is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpened: false,
      searchPattern: null,
      lastVisiblePage: 1,
      showAllSelectedOptions: false
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

    isEmpty () {
      return _.isEmpty(this.value)
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

    selectedOptions () {
      return _.fromPairs(_.map(this.value, (elem) => [elem[this.keyForId], true]))
    },

    geoPillVariant () {
      return GeoPillVariants.opaque
    },

    visibleSelectedOptions () {
      return this.showAllSelectedOptions
        ? this.value
        : _.take(this.value, this.visibleSelectedOptionsLimit)
    },

    hasMoreSelectedOptionsThanLimit () {
      return this.numberOfHiddenSelectedOptions > 0
    },

    numberOfHiddenSelectedOptions () {
      return this.value
        ? this.value.length - this.visibleSelectedOptionsLimit
        : 0
    },

    isGroupChecked () {
      return function (group) {
        return _.every(group.items, (option) => this.selectedOptions[option.item[this.keyForId]])
      }
    },

    isSomeGroupOptionChecked () {
      return function (group) {
        if (this.isGroupChecked(group)) return false
        return _.some(group.items, (option) => this.selectedOptions[option.item[this.keyForId]])
      }
    }
  },
  methods: {
    defaultGetMatchesForItem (item, searchPattern) {
      const matches = _.deburr(item[this.keyForLabel]).match(searchPattern)
      if (matches) {
        return _.map(matches[0].split(''), function (char, i) {
          return i + matches.index
        })
      }
      return []
    },

    closeSelect () {
      this.isOpened = false
    },

    toggleSelect () {
      if (this.disabled) return

      this.isOpened = !this.isOpened
    },

    toggleList () {
      this.showAllSelectedOptions = !this.showAllSelectedOptions
    },

    toggleGroup (option) {
      const emittedValue = this.isGroupChecked(option)
        ? _.reject(this.value, (elem) => _.find(option.items, { item: { [this.keyForId]: elem[this.keyForId] } }))
        : _.unionBy(this.value, _.map(option.items, 'item'), this.keyForId)

      this.changeModel(emittedValue)
    },

    toggleOption (option) {
      const item = option.item || option
      const emittedValue = this.selectedOptions[item[this.keyForId]]
        ? _.reject(this.value, { [this.keyForId]: item[this.keyForId] })
        : [...this.value || [], item]

      this.changeModel(emittedValue)
    },

    loadNextPage (payload) {
      this.lastVisiblePage++
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    },

    changeModel (value) {
      /**
       * Change GeoMultiSelect selection event
       * @event input
       * @type {array}
       */
      this.$emit('input', value)
    }
  }
}
</script>
