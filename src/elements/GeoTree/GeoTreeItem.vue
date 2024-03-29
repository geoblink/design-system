<template>
  <li
    class="geo-tree-item"
  >
    <geo-list-item
      :class="{
        'geo-tree-item--rotated-icon': hasToRotateIcon,
        'geo-tree-item--single': isSingleItem
      }"
      :icon="categoryIcon"
      @click="handleClick"
    >
      <label class="geo-tree-item__label">
        <geo-highlighted-string
          :highlighted-chars="category.matches"
          :reference-string="category[keyForLabel]"
        />
        <span
          v-if="!isSingleItem"
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
          v-if="!isItemInputHidden"
          :id="category[keyForId]"
          :checked="isChecked"
          :indeterminate.prop="isIndeterminate"
          :disabled="isInputDisabled"
          :type="inputType"
          @click="handleInputClick"
          @input="handleCheck(category, $event.target.checked)"
        >
      </template>
    </geo-list-item>
    <ul
      v-if="isExpanded"
      class="geo-tree-item__list"
    >
      <draggable
        :list="category[keyForSubcategory]"
        :group="draggableGroup"
        :sort="false"
        :disabled="!draggableGroup"
        :filter="`.${dragClassToIgnore}`"
        drag-class="geo-tree__dragger"
        ghost-class="geo-tree__ghost"
        @start="startDrag($event)"
        @end="endDrag($event)"
        @change="changeDrag($event, category)"
      >
        <geo-tree-item
          v-for="subcategory in visibleItems"
          :key="subcategory[keyForId]"
          :class="dragClassToIgnore"
          :data-test="`subcategory-${subcategory[keyForId]}`"
          :category="subcategory"
          :key-for-id="keyForId"
          :key-for-label="keyForLabel"
          :key-for-subcategory="keyForSubcategory"
          :expanded-categories="expandedCategories"
          :checked-items="checkedItems"
          :collapsed-icon="collapsedIcon"
          :expanded-icon="expandedIcon"
          :description-icon="descriptionIcon"
          :draggable-group="draggableGroup"
          :is-single-select-mode="isSingleSelectMode"
          :is-folder-select-hidden="isFolderSelectHidden"
          :is-item-select-disabled="isItemSelectDisabled"
          :has-load-more-button="hasLoadMoreButton"
          :page-size="pageSize"
          @check-item="handleCheckChildItem"
          @check-folder="handleCheckChildFolder"
          @click="handleClick"
          @toggleExpand="toggleExpand"
          @start-drag="startDrag($event)"
          @end-drag="endDrag($event)"
          @change-drag="emitChangeDrag($event)"
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
          <template slot="moreItemsTextContent">
            <slot name="moreItemsTextContent" />
          </template>
        </geo-tree-item>
        <geo-list-footer-button
          v-if="hasMoreResultsToLoad"
          @click="loadNextPage"
        >
          <slot name="moreItemsTextContent" />
        </geo-list-footer-button>
      </draggable>
    </ul>
  </li>
</template>

<script>
import _ from 'lodash'
import Draggable from 'vuedraggable'

import GeoTreeMixin from './GeoTreeMixin'

export default {
  name: 'GeoTreeItem',
  status: 'ready',
  release: '29.9.0',
  components: {
    Draggable
  },
  mixins: [GeoTreeMixin],
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
      default: 'subcategories'
    },
    /**
     * List of all the items checked, it's an object with truthy keys
     */
    checkedItems: {
      type: Object,
      required: true
    },
    /**
     * Boolean indicating if select folders is hidden
     */
    isFolderSelectHidden: {
      type: Boolean,
      default: false
    },
    /**
     * Boolean indicating if select items is disabled
     */
    isItemSelectDisabled: {
      type: Boolean,
      default: false
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
     * Optional Font Awesome 5 icon to use as collapsed icon
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    collapsedIcon: {
      type: Array,
      required: true,
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
    /*
    * True for using UX for only one element of the tree is selectable, false by default. When this is true the input will be radio instead of checkbox (take into account the logic remains on how to handle checked-items prop)
    * */
    isSingleSelectMode: {
      type: Boolean,
      default: false
    },
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
      isShowActionButton: false,
      visiblePages: 1
    }
  },
  computed: {
    categoryIcon () {
      if (this.isSingleItem) return null

      return this.isExpanded
        ? this.expandedIcon || this.collapsedIcon
        : this.collapsedIcon
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
        if (this.isEmptyCategory(category)) return false

        const selectableChildren = this.getSelectableChildrenForCategory(category)
        return _.every(selectableChildren, subCategory => {
          if (_.size(subCategory[this.keyForSubcategory])) return allAreChildrenSelected(subCategory)

          return !!this.checkedItems[subCategory[this.keyForId]]
        })
      }
      return !this.isSingleItem
        ? allAreChildrenSelected(this.category)
        : !!this.checkedItems[this.category[this.keyForId]]
    },

    totalCategoryChildren () {
      const sumOfChildren = category => _.size(category[this.keyForSubcategory]) + _.sumBy(category[this.keyForSubcategory], sumOfChildren)

      return sumOfChildren(this.category)
    },

    totalSelectableCategoryChildren () {
      const sumOfSelectableChildren = category => {
        const selectableChildren = this.getSelectableChildrenForCategory(category)
        return _.size(selectableChildren) + _.sumBy(category[this.keyForSubcategory], sumOfSelectableChildren)
      }

      return sumOfSelectableChildren(this.category)
    },

    isExpanded () {
      return !!this.expandedCategories[this.category[this.keyForId]]
    },

    isSingleItem () {
      return _.isNil(this.category[this.keyForSubcategory])
    },

    hasToRotateIcon () {
      return this.isExpanded && !this.expandedIcon
    },

    isInputDisabled () {
      return this.isSingleItem
        ? this.isItemSelectDisabled && !this.isChecked
        : this.totalSelectableCategoryChildren === 0
    },

    inputType () {
      return this.isSingleSelectMode ? 'radio' : 'checkbox'
    },

    isItemInputHidden () {
      if (this.isSingleItem) return false

      return this.isSingleSelectMode || this.isFolderSelectHidden
    },

    hasMoreResultsToLoad () {
      if (!this.hasLoadMoreButton) return false

      return this.pageSize * this.visiblePages < _.size(this.category[this.keyForSubcategory])
    },

    visibleItems () {
      return this.hasLoadMoreButton
        ? _.slice(this.category[this.keyForSubcategory], 0, this.visiblePages * this.pageSize)
        : this.category[this.keyForSubcategory]
    }
  },
  methods: {
    /**
     * On list item click
     */
    handleClick () {
      if (this.isSingleItem) {
        if (this.isInputDisabled) return
        this.handleCheck(this.category, !this.isChecked)
      } else {
        if (this.isEmptyCategory(this.category)) return
        this.toggleExpand(this.category)
      }
    },

    handleCheckChildItem (category, isChecked, isDelegated) {
      this.$emit('check-item', category, isChecked, isDelegated)
    },

    handleCheckChildFolder (category, isChecked, isDelegated) {
      this.$emit('check-folder', category, isChecked, isDelegated)
    },

    /**
     * To check all items of a category
     */
    handleCheck (category, isChecked, isDelegated = false) {
      if (category[this.keyForSubcategory]) {
        if (_.size(category[this.keyForSubcategory])) { // We don't want to emit event for empty folders
          this.$emit('check-folder', category, isChecked, isDelegated)
        }
        _.forEach(category[this.keyForSubcategory], (innerCategory) => {
          this.handleCheck(innerCategory, isChecked, true)
        })
      } else {
        this.$emit('check-item', category, isChecked, isDelegated)
      }
    },

    toggleExpand (category) {
      this.$emit('toggleExpand', category)
    },

    getSelectableChildrenForCategory (category) {
      const keyForSubcategory = this.keyForSubcategory
      return getSelectableChildrenRecursively(category)

      function getSelectableChildrenRecursively (currentCategory) {
        return _.reject(currentCategory[keyForSubcategory], subCategory => {
          return subCategory[keyForSubcategory] &&
            (!_.size(subCategory[keyForSubcategory]) || !_.size(getSelectableChildrenRecursively(subCategory)))
        })
      }
    },

    handleInputClick ($event) {
      if (!this.isSingleSelectMode) {
        $event.stopPropagation()
      }
    },

    isEmptyCategory (category) {
      return !_.isNil(category[this.keyForSubcategory]) && !_.size(category[this.keyForSubcategory])
    },

    loadNextPage () {
      this.visiblePages = this.visiblePages + 1
    }
  }
}
</script>
