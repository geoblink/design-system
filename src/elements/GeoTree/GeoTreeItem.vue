<template>
  <li>
    <geo-list-item
      class="geo-tree-item"
      :class="{
        'geo-tree-item--clickable': hasChildren,
        'geo-tree-item--expanded': category.isExpanded,
      }"
      :icon="categoryIcon"
      @click="handleClick(category)"
      @mouseover="showActionButton = true"
      @mouseout="showActionButton = false"
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

      <template
        v-if="showActionButton"
        slot="trailingAccessoryItem"
      >
        <slot name="trailingAccessoryAction" />
      </template>
      <template slot="trailingAccessoryItem">
        <input
          :id="category[keyForId]"
          :checked="isChecked"
          :indeterminate.prop="isIndeterminate"
          type="checkbox"
          @click.stop
          @input="handleCheckAll(category, $event.target.checked)"
        >
      </template>
    </geo-list-item>
    <ul
      v-if="category.isExpanded"
      class="geo-tree__list"
    >
      <geo-tree-item
        v-for="categoryChildren in category[keyForChildren]"
        :key="categoryChildren[keyForId]"
        :category="categoryChildren"
        :key-for-id="keyForId"
        :key-for-label="keyForLabel"
        :key-for-children="keyForChildren"
        :checked-items="checkedItems"
        @check="handleCheckAll"
        @click="handleClick"
      />
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
      required: false,
      default: () => ({})
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
     * List of all the items checked, it's an object with truthy keys
     */
    checkedItems: {
      type: Object,
      required: false
    },
    /**
     * Icon used to alert about some extra info displayed in a popover
     */
    descriptionIcon: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showActionButton: false
    }
  },
  computed: {
    categoryIcon () {
      return this.hasChildren ? ['fal', 'chevron-right'] : null
    },
    isIndeterminate () {
      const isSomeChildSelected = category => {
        return _.some(category[this.keyForChildren], subCategory => !!this.checkedItems[subCategory[this.keyForId]])
      }

      return this.isChecked ? false : isSomeChildSelected(this.category)
    },
    isChecked () {
      const allAreChildrenSelected = category => category[this.keyForChildren] && _.every(category[this.keyForChildren], subCategory => !!this.checkedItems[subCategory[this.keyForId]])

      return this.hasChildren
        ? allAreChildrenSelected(this.category)
        : !!this.checkedItems[this.category[this.keyForId]]
    },
    totalCategoryChildren () {
      const sumOfChildren = category => _.size(category[this.keyForChildren]) + _.sumBy(category[this.keyForChildren], sumOfChildren)

      return sumOfChildren(this.category)
    },
    hasChildren () {
      return this.totalCategoryChildren > 0
    }
  },
  methods: {
    /**
     * On list item click
     */
    handleClick (category) {
      if (!this.hasChildren) {
        this.handleCheckAll(category, !this.isChecked)
      }
      this.$emit('click', category)
    },
    /**
     * To check all items of a category
     */
    handleCheckAll (category, isChecked) {
      if (this.hasChildren) {
        _.forEach(category[this.keyForChildren], innerCategory => {
          return this.handleCheckAll(innerCategory, isChecked)
        })
      }

      this.$emit('check', category, isChecked)
    }
  }
}
</script>
