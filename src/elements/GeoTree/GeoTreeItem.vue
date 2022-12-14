<template>
  <li
    class="geo-tree-item"
  >
    <geo-list-item
      :class="{
        'geo-tree-item--rotated-icon': isExpanded && !hasFolderIcon,
        'geo-tree-item--single': !hasChildren,
        'geo-tree-item--folder-icon': hasFolderIcon
      }"
      :icon="categoryIcon"
      @click="handleClick"
    >
      <label>
        <geo-highlighted-string
          :highlighted-chars="category.matches"
          :reference-string="category[keyForLabel]"
        />
        <span
          v-if="hasChildren"
          class="geo-tree-item__total-items"
        >
          ({{ totalCategoryChildren }})
        </span>
        <span
          v-if="category.description"
          class="geo-tree-item__description"
        >
          <font-awesome-icon
            :icon="descriptionIcon"
            fixed-width
          />
          <geo-tooltip>
            {{ category.description }}
          </geo-tooltip>
        </span>
      </label>
      <template slot="trailingAccessoryItem">
        <span>
          <slot
            name="trailingAccessoryAction"
            :item="category"
          />
        </span>
        <input
          :id="category[keyForId]"
          :checked="isChecked"
          :indeterminate.prop="isIndeterminate"
          type="checkbox"
          @click.stop
          @input="handleCheck(category, $event.target.checked)"
        >
      </template>
    </geo-list-item>
    <ul
      v-if="isExpanded"
      class="geo-tree-item__list"
    >
      <geo-tree-item
        v-for="subcategory in category[keyForSubcategory]"
        :key="subcategory[keyForId]"
        :data-test="`subcategory-${subcategory[keyForId]}`"
        :category="subcategory"
        :key-for-id="keyForId"
        :key-for-label="keyForLabel"
        :key-for-subcategory="keyForSubcategory"
        :expanded-categories="expandedCategories"
        :checked-items="checkedItems"
        :has-folder-icon="hasFolderIcon"
        @check="handleCheckChild"
        @click="handleClick"
        @toggleExpand="toggleExpand"
      >
        <template
          slot="trailingAccessoryAction"
          slot-scope="{ item }"
        >
          <slot
            name="trailingAccessoryAction"
            :item="item"
          />
        </template>
      </geo-tree-item>
    </ul>
  </li>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'GeoTreeItem',
  status: 'ready',
  release: '29.9.0',
  props: {
    category: {
      type: Object,
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
     * List of all the items checked, it's an object with truthy keys
     */
    checkedItems: {
      type: Object,
      required: true
    },
    /**
     * Icon used to alert about some extra info displayed in a popover
     */
    descriptionIcon: {
      type: Array,
      default: () => []
    },
    /*
    * List of categories that should appear expanded
    * */
    expandedCategories: {
      type: Object,
      required: true
    },
    /**
     * Use folder icon instead of chevron
     */
    hasFolderIcon: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      isShowActionButton: false
    }
  },
  computed: {
    categoryIcon () {
      return this.hasChildren
        ? this.hasFolderIcon
          ? this.isExpanded
            ? ['fal', 'folder-open']
            : ['fal', 'folder']
          : ['fal', 'chevron-right']
        : null
    },
    isIndeterminate () {
      const isSomeChildSelected = category => {
        return _.some(category[this.keyForSubcategory], subCategory => {
          if (subCategory[this.keyForSubcategory]) return isSomeChildSelected(subCategory)

          return !!this.checkedItems[subCategory[this.keyForId]]
        })
      }

      return !this.isChecked && isSomeChildSelected(this.category)
    },
    isChecked () {
      const allAreChildrenSelected = category => {
        return _.every(category[this.keyForSubcategory], subCategory => {
          if (subCategory[this.keyForSubcategory]) return allAreChildrenSelected(subCategory)

          return !!this.checkedItems[subCategory[this.keyForId]]
        })
      }
      return this.hasChildren
        ? allAreChildrenSelected(this.category)
        : !!this.checkedItems[this.category[this.keyForId]]
    },
    totalCategoryChildren () {
      const sumOfChildren = category => _.size(category[this.keyForSubcategory]) + _.sumBy(category[this.keyForSubcategory], sumOfChildren)

      return sumOfChildren(this.category)
    },
    isExpanded () {
      return !!this.expandedCategories[this.category[this.keyForId]]
    },
    hasChildren () {
      return this.totalCategoryChildren > 0
    }
  },
  methods: {
    /**
     * On list item click
     */
    handleClick () {
      if (!this.hasChildren) {
        this.handleCheck(this.category, !this.isChecked)
      } else {
        this.toggleExpand(this.category)
      }
    },
    handleCheckChild (category, isChecked) {
      this.$emit('check', category, isChecked)
    },
    /**
     * To check all items of a category
     */
    handleCheck (category, isChecked) {
      if (_.size(category[this.keyForSubcategory])) {
        _.forEach(category[this.keyForSubcategory], (innerCategory) => {
          this.handleCheck(innerCategory, isChecked)
        })
      } else {
        this.$emit('check', category, isChecked)
      }
    },
    toggleExpand (category) {
      this.$emit('toggleExpand', category)
    }
  }
}
</script>
