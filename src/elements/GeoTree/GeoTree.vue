<template>
  <div class="geo-tree">
    <geo-bordered-box-header-search-form
      v-if="searchable"
      v-model="searchQuery"
      :placeholder="searchPlaceholder"
    />
    <geo-scrollable-container
      :show-more-results-button="hasMoreResultsToLoad"
      @load-more-results="loadNextPage($event)"
    >
      <div
        v-if="isLoading"
        class="geo-tree__loading"
        v-text="loadingLabel"
      />
      <div
        v-if="!hasResults"
        class="geo-tree__no-results-found"
        v-text="noResultsFoundLabel"
      />
      <ul
        v-else
        class="geo-tree__list"
      >
        <draggable
          :list="filteredCategories"
          :group="draggableGroup"
          :sort="false"
          :disabled="!draggableGroup"
          :filter="`.${dragClassToIgnore}`"
          drag-class="geo-tree__dragger"
          ghost-class="geo-tree__ghost"
          @start="startDrag($event)"
          @end="endDrag($event)"
          @change="changeDrag($event, null)"
        >
          <geo-tree-item
            v-for="category in visibleItems"
            :key="category[keyForId]"
            :class="dragClassToIgnore"
            :category="category"
            :key-for-id="keyForId"
            :key-for-label="keyForLabel"
            :checked-items="checkedItems"
            :expanded-categories="expandedCategories"
            :key-for-subcategory="keyForSubcategory"
            :description-icon="descriptionIcon"
            :collapsed-icon="collapsedIcon"
            :expanded-icon="expandedIcon"
            :draggable-group="draggableGroup"
            :input-type="inputType"
            :is-folder-select-hidden="!!maxCheckedItems"
            :is-item-select-disabled="hasMaxItemsSelected"
            :has-load-more-button="hasLoadMoreButton"
            :page-size="pageSize"
            @check-item="handleCheckItem"
            @check-folder="handleCheckFolder"
            @toggleExpand="handleToggleExpand"
            @start-drag="startDrag($event)"
            @end-drag="endDrag($event)"
            @change-drag="emitChangeDrag($event)"
          >
            <template
              slot="trailingAccessoryAction"
              slot-scope="{ item }"
            >
              <slot
                name="actionButton"
                :item="item"
              />
            </template>
            <template slot="moreItemsTextContent">
              <slot name="moreItemsTextContent" />
            </template>
          </geo-tree-item>
        </draggable>
      </ul>
      <template slot="moreResultsTextContent">
        <slot name="moreCategoriesTextContent" />
      </template>
    </geo-scrollable-container>
  </div>
</template>

<script>
import _ from 'lodash'
import fuzzAldrin from 'fuzzaldrin-plus'
import Draggable from 'vuedraggable'

import { enumPropertyFactory } from '../../utils/enumPropertyFactory'
import GeoTreeMixin from './GeoTreeMixin'
import { INPUT_MODES } from './GeoTree.constants'

export default {
  name: 'GeoTree',
  status: 'ready',
  release: '29.9.0',
  constants: {
    INPUT_MODES
  },
  components: {
    Draggable
  },
  mixins: [GeoTreeMixin],
  props: {
    /**
    * Text to display as placeholder of the search input
    */
    searchPlaceholder: {
      type: String,
      required: false
    },
    /**
    * Text to display when it's loading data
    */
    loadingLabel: {
      type: String,
      required: false
    },
    /**
    * Text to display when no results found on searching
    */
    noResultsFoundLabel: {
      type: String,
      required: false
    },
    /**
     * Categories to be displayed in the tree component
     * Structure:
     * [
     *     {
     *         id: String,
     *         label: String,
     *         icon?: Array,
     *         disabledTooltipText?: String,
     *         subcategories?: [
     *           {
     *             id: String,
     *             label: String,
     *             icon?: Array,
     *             disabledTooltipText?: String,
     *             subcategories?: Array
     *           }
     *         ]
     *     }
     * ]
     */
    categories: {
      type: Array,
      required: true
    },
    /**
    * Key to access to the identifier of the item
    */
    keyForId: {
      type: String,
      required: false,
      default: 'id'
    },
    /**
    * Key to access to the label of the item
    */
    keyForLabel: {
      type: String,
      required: false,
      default: 'label'
    },
    /**
    * Key to access to the children items of the category
    */
    keyForSubcategory: {
      type: String,
      required: false,
      default: 'subcategories'
    },
    /**
    * Used to determine if you can search or not
    */
    searchable: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
    * Icon used to alert about some extra info displayed in a popover
    */
    descriptionIcon: {
      type: Array,
      required: false
    },
    /**
     * Used to show a loading message
     */
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
    * Checked items, with truthy/falsy category ids
    */
    checkedItems: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
    * Max number of checked items
    */
    maxCheckedItems: {
      type: Number,
      required: false
    },
    /**
     * Initial categories to be expanded, with truthy/falsy category ids, it's being watched to react to outside changes
     */
    dynamicExpandedCategories: {
      type: Object,
      required: false
    },
    /**
     * Optional Font Awesome 5 icon to use as collapsed icon
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    collapsedIcon: {
      type: Array,
      required: false,
      default: function () {
        return ['fal', 'chevron-right']
      }
    },
    /**
     * Optional Font Awesome 5 icon to use as expanded icon
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    expandedIcon: {
      type: Array,
      required: false
    },
    /**
    * Optional array of properties to use for sorting categories
    */
    sortingProps: {
      type: Array,
      required: false
    },
    /**
     * Optional direction to sort categories
     */
    sortingDirection: {
      type: String,
      required: false,
      default: 'asc'
    },
    /**
     * Mode of the input (take into account the logic still remains on how to handle checked-items prop)
     *
     * Supported `inputType` values are exported under `INPUT_MODES` named export.
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
     */
    inputType: enumPropertyFactory({
      componentName: 'GeoTree',
      propertyName: 'inputType',
      enumDictionary: INPUT_MODES,
      defaultValue: INPUT_MODES.MULTIPLE
    }),
    /*
    * Optional boolean to show load more button
    * */
    hasLoadMoreButton: {
      type: Boolean,
      required: false,
      default: false
    },
    /*
    * Max number of items to be shown in one page if load more button is active
    * */
    pageSize: {
      type: Number,
      required: false,
      default: 20
    }
  },
  data () {
    return {
      searchQuery: '',
      expandedCategories: {},
      visiblePages: 1
    }
  },
  computed: {
    hasResults () {
      return !this.searchQuery || (this.searchQuery && !!_.size(this.filteredCategories))
    },

    sortedCategories () {
      return this.sortCategories(this.categories)
    },

    filteredCategories () {
      return this.searchQuery
        ? this.filterCategories(this.sortedCategories, this.searchQuery)
        : this.sortedCategories
    },

    hasMaxItemsSelected () {
      if (!this.maxCheckedItems) return false

      return this.nSelectedItems >= this.maxCheckedItems
    },

    nSelectedItems () {
      return _.size(_.filter(this.checkedItems))
    },

    hasMoreResultsToLoad () {
      if (!this.hasLoadMoreButton) return false

      return this.pageSize * this.visiblePages < _.size(this.filteredCategories)
    },

    visibleItems () {
      return this.hasLoadMoreButton
        ? _.slice(this.filteredCategories, 0, this.visiblePages * this.pageSize)
        : this.filteredCategories
    }
  },
  watch: {
    dynamicExpandedCategories (newExpandedCategories) {
      this.expandedCategories = newExpandedCategories || {}
    }
  },
  mounted () {
    if (this.dynamicExpandedCategories) {
      this.expandedCategories = _.assign({}, this.expandedCategories, this.dynamicExpandedCategories)
    }
  },
  methods: {
    handleCheckItem (category, isChecked, isDelegated) {
      this.$emit('check-item', category[this.keyForId], isChecked, category, isDelegated)
    },

    handleCheckFolder (category, isChecked, isDelegated) {
      this.$emit('check-folder', category[this.keyForId], isChecked, category, isDelegated)
    },

    filterCategories (categories, query, isAnyAncestorMatching) {
      return _.reduce(categories, (carry, category) => {
        const isCategoryMatching = fuzzAldrin.score(category[this.keyForLabel], query) > 0
        const matchingSubcategories = this.filterCategories(category[this.keyForSubcategory], query, isCategoryMatching || isAnyAncestorMatching)

        if (isCategoryMatching || isAnyAncestorMatching || _.size(matchingSubcategories)) {
          const basicCategory = _.assign({}, category, {
            matches: fuzzAldrin.match(clearString(category[this.keyForLabel]), clearString(query))
          })

          if (_.size(category[this.keyForSubcategory])) {
            basicCategory[this.keyForSubcategory] = matchingSubcategories
            this.$set(this.expandedCategories, basicCategory[this.keyForId], true)
          }

          return [...carry, basicCategory]
        }

        return carry
      }, [])

      function clearString (string) {
        return _.toLower(_.deburr(string))
      }
    },

    sortCategories (categories) {
      const sortingProps = this.sortingProps || [this.keyForLabel]
      return _.orderBy(
        _.map(categories, category =>
          category[this.keyForSubcategory]
            ? _.assign({}, category, {
              [this.keyForSubcategory]: this.sortCategories(category[this.keyForSubcategory])
            })
            : category
        ), sortingProps, this.sortingDirection)
    },

    handleToggleExpand (clickedCategory) {
      const isExpanded = !!this.expandedCategories[clickedCategory[this.keyForId]]

      this.$set(this.expandedCategories, clickedCategory[this.keyForId], !isExpanded)
    },

    loadNextPage (payload) {
      this.visiblePages = this.visiblePages + 1
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    }
  }
}
</script>
