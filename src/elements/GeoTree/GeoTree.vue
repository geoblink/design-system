<template>
  <div class="geo-tree">
    <geo-bordered-box-header-search-form
      v-if="searchable"
      v-model="searchQuery"
      :placeholder="searchPlaceholder"
      @input="handleSearching"
    />
    <geo-scrollable-container>
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
        <geo-tree-item
          v-for="category in sortedCategories"
          :key="category[keyForId]"
          :category="category"
          :key-for-id="keyForId"
          :key-for-label="keyForLabel"
          :checked-items="checkedItems"
          :key-for-children="keyForChildren"
          :description-icon="descriptionIcon"
          @click="handleCategoryClick"
          @check="handleCheckItem"
        >
          <template v-slot:trailingAccessoryAction>
            <slot name="actionButton" />
          </template>
        </geo-tree-item>
      </ul>
    </geo-scrollable-container>
  </div>
</template>

<script>
import _ from 'lodash'
import fuzzAldrin from 'fuzzaldrin-plus'

export default {
  name: 'GeoTree',
  status: 'ready',
  release: '29.9.0',
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
      require: false
    },
    /**
    * Text to display when no results found on searching
    */
    noResultsFoundLabel: {
      type: String,
      require: false
    },
    /**
     * Categories to be displayed in the tree component
     * Structure:
     * [
     *     id,
     *     label,
     *     children: [
     *      id,
     *      label,
     *      children
     *     ]
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
    keyForChildren: {
      type: String,
      required: false,
      default: 'children'
    },
    /**
    * Used determine if you can search or not
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
    /*
    * Checked items, with truthy/falsy category ids
    */
    checkedItems: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      searchQuery: '',
      filteredCategories: []
    }
  },
  computed: {
    sortedCategories () {
      return _.sortBy(this.filteredCategories, [this.keyForLabel])
    },
    hasResults () {
      return !this.searchQuery || (this.searchQuery && this.filteredCategories.length)
    }
  },
  mounted () {
    this.filteredCategories = this.categories
  },
  methods: {
    handleSearching () {
      const getFilteredCategories = (categories, query) => categories.reduce((carry, category) => {
        const isCategoryMatching = fuzzAldrin.score(category[this.keyForLabel], query) > 0
        const basicCategory = _.assign(
          {},
          category,
          { matches: fuzzAldrin.match(clearString(category[this.keyForLabel]), clearString(query)) })
        const matchedSubcategories = category[this.keyForChildren]
          ? getFilteredCategories(category[this.keyForChildren], query)
          : category[this.keyForChildren]

        // If some subcategory match with the searched text it should display complete category tree
        if (_.size(matchedSubcategories) || isCategoryMatching) {
          return [
            ...carry,
            _.assign(
              basicCategory,
              {
                [this.keyForChildren]: matchedSubcategories,
                isExpanded: !!_.size(matchedSubcategories)
              }
            )
          ]
        }

        return carry
      }, [])

      this.filteredCategories = this.searchQuery
        ? getFilteredCategories(this.categories, this.searchQuery)
        : this.categories

      function clearString (string) {
        return _.toLower(_.deburr(string))
      }
    },
    handleCategoryClick (clickedCategory) {
      const isExpanded = (category) => category[this.keyForId] === clickedCategory[this.keyForId] ? !category.isExpanded : category.isExpanded

      this.filteredCategories = toggleCategoriesExpanded(this.filteredCategories)
      this.$emit('click', clickedCategory)

      function toggleCategoriesExpanded (categories) {
        return _.map(categories, category => {
          const children = category[this.keyForChildren] ? toggleCategoriesExpanded(category[this.keyForChildren]) : null

          return _.assign(
            {},
            category,
            {
              isExpanded: isExpanded(category),
              [this.keyForChildren]: children
            }
          )
        })
      }
    },
    handleCheckItem (category, isChecked) {
      this.$emit('check', category[this.keyForId], isChecked)
    }
  }
}
</script>
