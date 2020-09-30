<template>
  <div class="geo-tree">
    {{ checkedItems }}
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
          v-for="category in sortedCategories"
          :key="category[keyForId]"
          :category="category"
          :key-for-id="keyForId"
          :key-for-label="keyForLabel"
          :checked-items="checkedItems"
          :key-for-children="keyForChildren"
          @click="onCategoryClick(category[keyForId])"
          @check="handleCheckItem"
        />
      </ul>
    </geo-scrollable-container>
  </div>
</template>

<script>
import { sortBy, assign, omit } from 'lodash'

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
      checkedItems: {}
    }
  },
  computed: {
    sortedCategories () {
      return sortBy(this.categories, [this.keyForLabel])
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
    },
    onCategoryClick (categoryId) {
      this.$emit('click', categoryId)
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
