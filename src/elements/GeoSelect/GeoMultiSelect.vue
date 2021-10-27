<template>
  <geo-select-base
    ref="selectBase"
    :opened="isOpened"
    :has-more-results="hasMoreResultsToLoad"
    :fixed-width="fixedWidth"
    :popup-class="['geo-multi-select__popup', popupClass]"
    class="geo-multi-select"
    @click-outside="closeSelect"
    @load-more-results="loadNextPage"
  >
    <!-- @slot _Optional_. Use this slot to customize toggle button. -->
    <slot
      slot="toggleButton"
      name="toggleButton"
      :dropdown-icon="dropdownIcon"
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
        :is-empty="isEmpty"
        :disabled="disabled"
        :variant="variant"
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

    <template slot="header">
      <!-- @slot _Optional_. Use this slot to add a custom header. -->
      <slot
        name="header"
        :toggleSelect="toggleSelect"
      />
      <!-- @slot _Optional_. Use this slot to customize search form. -->
      <slot
        v-if="searchable"
        name="searchHeader"
        :search-pattern="searchPattern"
      >
        <geo-bordered-box-header-search-form
          v-model="searchPattern"
          :search-icon="searchIcon"
          :placeholder="searchInputPlaceholder"
        />
      </slot>
    </template>

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
          >
            <geo-list-group>
              <!-- @slot _optional_. Use this slot to customize titles of opt-groups -->
              <slot
                v-if="option.isOptGroupHeader"
                slot="title"
                name="groupTitle"
              >
                <label class="geo-multi-select__label geo-multi-select__label-group">
                  <geo-marquee>
                    <geo-highlighted-string
                      slot-scope="{}"
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

              <!-- @slot _optional_. Use this slot to customize items of opt-groups -->
              <slot
                v-for="(item, itemIndex) in option.items"
                slot="item"
                name="groupItem"
                :suggested-key="`${item[keyForLabel]}--${itemIndex}`"
                :option-index="itemIndex"
                :option="item"
                :selected-options="selectedOptions"
                :toggle-option="toggleOption"
              >
                <geo-list-item
                  :key="`${item[keyForLabel]}--${itemIndex}`"
                >
                  <label class="geo-multi-select__label">
                    <geo-marquee>
                      <geo-highlighted-string
                        slot-scope="{}"
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
            :option="option"
            :option-index="optionIndex"
            :suggested-key="`${option[keyForLabel]}--${optionIndex}`"
            :selected-options="selectedOptions"
            :toggle-option="toggleOption"
          >
            <geo-list-item :key="`${option[keyForLabel]}--${optionIndex}`">
              <label class="geo-multi-select__label">
                <geo-marquee>
                  <geo-highlighted-string
                    slot-scope="{}"
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
    <geo-list-clear-item v-else>
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
    <!-- @slot Use this slot to customize the footer of the selection popup -->
    <slot
      slot="footer"
      name="footer"
      :toggleSelect="toggleSelect"
    />
  </geo-select-base>
</template>

<script>
import _ from 'lodash'
import { VARIANTS as GeoPillVariants } from '../GeoPill/GeoPill'
import geoSelectMixin from './GeoSelect.mixin'

/**
 * `GeoMultiSelect` is a component aimed to allow multiple options selection in
 * a `<select>` like UI including chunked load and search capabilities.
 */
export default {
  name: 'GeoMultiSelect',
  status: 'ready',
  release: '22.1.0',
  mixins: [geoSelectMixin],
  props: {
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
     * Icon used for the search box.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    pillCloseIcon: {
      type: Array,
      default: function () {
        return ['fal', 'times']
      }
    },

    /**
     * Maximum amount of pills to be displayed in the select button.
     */
    visibleSelectedOptionsLimit: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
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
