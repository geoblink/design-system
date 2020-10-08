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
          v-for="category in categoriesToShow"
          :key="category[keyForId]"
          :category="category"
          :key-for-id="keyForId"
          :key-for-label="keyForLabel"
          :checked-items="checkedItems"
          :key-for-subcategory="keyForSubcategory"
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
    keyForSubcategory: {
      type: String,
      required: false,
      default: 'subcategory'
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
      categoriesToShow: []
    }
  },
  computed: {
    hasResults () {
      return !this.searchQuery || (this.searchQuery && this.categoriesToShow.length)
    }
  },
  watch: {
    categories (newCategories) {
      this.sortCategories(newCategories)
    }
  },
  mounted () {
    this.sortCategories(this.categories)
  },
  methods: {
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
            basicCategory.isExpanded = true
          }

          return [...carry, basicCategory]
        }

        return carry
      }, [])

      function clearString (string) {
        return _.toLower(_.deburr(string))
      }
    },
    handleSearching () {
      this.categoriesToShow = this.searchQuery
        ? this.filterCategories(this.categories, this.searchQuery)
        : this.categories
    },
    handleCategoryClick (clickedCategory) {
      const isExpanded = (category) => category[this.keyForId] === clickedCategory[this.keyForId] ? !category.isExpanded : category.isExpanded

      this.categoriesToShow = toggleCategoriesExpanded(this.categoriesToShow, this.keyForSubcategory)
      this.$emit('click', clickedCategory)

      function toggleCategoriesExpanded (categories, keyForSubcategory) {
        return _.map(categories, category => {
          const children = category[keyForSubcategory] ? toggleCategoriesExpanded(category[keyForSubcategory], keyForSubcategory) : null

          return _.assign(
            {},
            category,
            {
              isExpanded: isExpanded(category),
              [keyForSubcategory]: children
            }
          )
        })
      }
    },
    handleCheckItem (category, isChecked) {
      this.$emit('check', category[this.keyForId], isChecked)
    },
    sortCategories (categoriesToSort) {
      const sortSubcategories = categories => _.map(categories, (category) => {
        if (category[this.keyForSubcategory]) {
          return _.assign({}, category, {
            [this.keyForSubcategory]: _.sortBy(sortSubcategories(category[this.keyForSubcategory]), this.keyForLabel)
          })
        } else {
          return category
        }
      })

      this.categoriesToShow = _.sortBy(sortSubcategories(categoriesToSort), this.keyForLabel)
    }
  }
}
</script>
