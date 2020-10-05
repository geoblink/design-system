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
        v-if="noResultsFound"
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
      required: false
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
     * Key to access to the identifier of the item
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
     * Initial selected items
    */
    initialState: {
      type: Object,
      required: false
    },
    descriptionIcon: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      searchQuery: '',
      isLoading: false,
      checkedItems: {},
      filteredCategories: []
    }
  },
  computed: {
    sortedCategories () {
      return _.sortBy(this.filteredCategories, [this.keyForLabel])
    },
    noResultsFound () {
      return this.searchQuery && !this.filteredCategories.length
    }
  },
  mounted () {
    this.setInitialState(this.initialState)

    if (this.categories) {
      const setCategoriesNoExpanded = (category) => {
        _.map(category[this.keyForChildren], innerCategory => {
          setCategoriesNoExpanded(innerCategory)
        })

        return _.assign({}, category, { isExpanded: false })
      }

      this.filteredCategories = _.map(this.categories, setCategoriesNoExpanded)
    }
  },
  methods: {
    handleSearching () {
      this.$emit('search', this.searchQuery)

      const searchByQuery = (category, query) => _.includes(category[this.keyForLabel], query)

      const getFilteredCategories = (categories, query) => categories.reduce((carry, category) => {
        const isCategoryMatching = searchByQuery(category, query)
        const categories = category[this.keyForChildren] ? getFilteredCategories(category[this.keyForChildren], query) : null

        if (categories && categories.length) {
          return [
            ...carry,
            _.assign(
              {},
              category,
              {
                [this.keyForChildren]: categories,
                isExpanded: true
              }
            )
          ]
        }
        return isCategoryMatching
          ? [
            ...carry,
            category
          ]
          : carry
      }, [])

      this.filteredCategories = this.searchQuery
        ? getFilteredCategories(this.categories, this.searchQuery)
        : this.categories
    },
    handleCategoryClick (clickedCategory) {
      const isExpanded = (category) => category[this.keyForId] === clickedCategory[this.keyForId] ? !category.isExpanded : category.isExpanded
      const toggleCategoriesExpanded = (categories) => _.map(categories, category => {
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
      this.filteredCategories = toggleCategoriesExpanded(this.filteredCategories)

      this.$emit('click', clickedCategory)
    },
    handleCheckItem (categoryId, isChecked) {
      this.checkedItems = isChecked
        ? _.assign({}, this.checkedItems, { [categoryId]: true })
        : _.omit(this.checkedItems, categoryId)
    },
    setInitialState (initialState) {
      if (!initialState) return

      _.assign(this.checkedItems, initialState)
    }
  }
}
</script>