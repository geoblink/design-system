<template>
  <div class="geo-tree">
    <geo-bordered-box-header-search-form
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
      <ul v-else>
        <geo-tree-item
          v-for="category in categories"
          :key="category[keyForId]"
          :category="category"
          :key-for-id="keyForId"
          :key-for-label="keyForLabel"
          :key-for-children="keyForChildren"
          @click="toggleCategoryList(category[keyForId])"
        />
      </ul>
    </geo-scrollable-container>
  </div>
</template>

<script>
import GeoTreeItem from './GeoTreeItem'

export default {
  name: 'GeoTree',
  status: 'ready',
  release: '29.9.0',
  components: { GeoTreeItem },
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
    }
  },
  data () {
    return {
      searchQuery: '',
      isLoading: false
    }
  },
  computed: {

  },
  methods: {
    handleSearching () {
      // TODO: Emitir el searching?
    },
    toggleCategoryList () {
      // TODO: emitir el click
    }
  }
}
</script>
