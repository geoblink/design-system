<template>
  <li>
    <geo-list-item
      class="geo-tree-item"
      :class="{'geo-tree-item--clickable': getIfCategoryHasChildren(category)}"
      :icon="categoryIcon"
      @click="handleClick(category)"
      @mouseover="onMouseOver(category)"
      @mouseout="showActionButton = false"
    >
      <label>
        {{ category[keyForLabel] }}
        <span
          v-if="getIfCategoryHasChildren(category)"
          class="geo-tree-item__total-items"
        >
          ({{ getTotalCategoryChildren(category) }})
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
          :checked="isChecked(category)"
          :indeterminate.prop="isIndeterminate(category)"
          type="checkbox"
          @click.stop
          @input="check(category, $event.target.checked)"
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
        @check="check"
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
    checkedItems: {
      type: Object,
      required: false
    },
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
      return this.getIfCategoryHasChildren(this.category) ? ['fal', 'chevron-right'] : null
    }
  },
  methods: {
    isChecked (category) {
      const allAreChildrenSelected = category => category[this.keyForChildren] && _.every(category[this.keyForChildren], subCategory => this.isChecked(subCategory))

      return this.getIfCategoryHasChildren(category)
        ? allAreChildrenSelected(category)
        : _.has(this.checkedItems, category[this.keyForId])
    },
    isIndeterminate (category) {
      const isSomeChildSelected = category => {
        return _.some(category[this.keyForChildren], subCategory => this.isChecked(subCategory))
      }

      return this.isChecked(category) ? false : isSomeChildSelected(this.category)
    },
    getTotalCategoryChildren (category) {
      const sumOfChildren = category => !_.isEmpty(category[this.keyForChildren])
        ? category[this.keyForChildren].length + _.sumBy(category[this.keyForChildren], category => sumOfChildren(category))
        : 0

      return sumOfChildren(category)
    },
    getIfCategoryHasChildren (category) {
      return this.getTotalCategoryChildren(category) > 0
    },
    /**
     * On list item click (at first level)
     */
    handleClick (category) {
      if (!this.getIfCategoryHasChildren(category)) {
        this.$emit('check', category[this.keyForId], !this.isChecked(category))
        return
      }
      this.$emit('click', category)
    },
    /**
     * To check all items of a category
     */
    checkAll (category, isChecked) {
      _.forEach(category[this.keyForChildren], innerCategory => {
        this.checkAll(innerCategory, isChecked)
      })

      this.$emit('check', category[this.keyForId], isChecked)
    },
    /**
     * To manage the check action
     * This method is listening to children check event
     */
    check (category, isChecked) {
      if (this.getIfCategoryHasChildren(category)) {
        return this.checkAll(category, isChecked)
      }

      this.$emit('check', category[this.keyForId], isChecked)
    },
    /**
     * The action button can't appear on parent categories
     */
    onMouseOver (category) {
      if (!this.getIfCategoryHasChildren(category)) {
        this.showActionButton = true
      }
    }
  }
}
</script>
