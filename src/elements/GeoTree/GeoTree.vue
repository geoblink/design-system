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
      <ul
        v-else
        class="geo-tree__list"
      >
        <geo-tree-item
          v-for="category in formattedCategories"
          :key="category[keyForId]"
          :category="category"
          :key-for-id="keyForId"
          :key-for-label="keyForLabel"
          :checked-items="checkedItems"
          :key-for-children="keyForChildren"
          @click="onCategoryClick"
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
import _, { sortBy, assign, omit, includes, isEmpty } from 'lodash'

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
      default: () => []
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
    }
  },
  data () {
    return {
      searchQuery: '',
      isLoading: false,
      checkedItems: {},
      filteredCategories: this.categories
    }
  },
  computed: {
    formattedCategories () {
      return sortBy(this.filteredCategories, [this.keyForLabel])
    }
  },
  watch: {
    initialState: {
      handler (newValue) {
        this.setInitialState(newValue)
      },
      deep: true
    }
  },
  mounted () {
    this.setInitialState(this.initialState)
  },
  methods: {
    handleSearching () {
      this.$emit('search', this.searchQuery)

      const searchByQuery = (category, query) => includes(category[this.keyForLabel], query)

      const getFilteredCategories = (categories, query) => categories.reduce((carry, category) => {
        const isCategoryMatching = searchByQuery(category, query)

        if (isCategoryMatching) {
          const categories = category[this.keyForChildren] ? getFilteredCategories(category[this.keyForChildren], query) : null

          return [
            ...carry,
            assign(
              {},
              category,
              {
                [this.keyForChildren]: categories
              }
            )
          ]
        } else {
          const categories = category[this.keyForChildren] ? getFilteredCategories(category[this.keyForChildren], query) : null

          if (categories && categories.length) {
            return [
              ...carry,
              assign(
                {},
                category,
                {
                  [this.keyForChildren]: categories
                }
              )
            ]
          } else {
            return carry
          }
        }

        // if (isEmpty(category[this.keyForChildren])) return searchByQuery(category, query) ? [...carry, category] : carry
        //
        // return [
        //   ...carry,
        //   assign({}, {
        //     category,
        //     [this.keyForChildren]: getFilteredCategories(category[this.keyForChildren], query)
        //   })
        // ]
      }, [])

      console.log('>>>>>>>>>> getFilteredCategories(this.categories, this.searchQuery) ::: ', getFilteredCategories(this.categories, this.searchQuery))

      this.filteredCategories = this.searchQuery
        ? getFilteredCategories(this.categories, this.searchQuery)
        : this.categories
    },
    onCategoryClick (category) {
      this.$emit('click', category)
    },
    handleCheckItem (categoryId, isChecked) {
      this.checkedItems = isChecked
        ? assign({}, this.checkedItems, { [categoryId]: true })
        : omit(this.checkedItems, categoryId)
    },
    setInitialState (initialState) {
      if (!initialState) return

      assign(this.checkedItems, initialState)
    }
  }
}
</script>
