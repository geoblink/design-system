<template>
  <li>
    <geo-list-item
      class="geo-tree-item"
      :class="{'geo-tree-item--clickable': hasChildren(category)}"
      :icon="categoryIcon"
      @click="handleClick"
    >
      <label>
        {{ category[keyForLabel] }}
        <span
          v-if="hasChildren(category)"
          class="geo-tree-item__total-items"
        >
          ({{ totalCategoryChildren(category) }})
        </span>
        <span
          v-if="category.description"
          class="geo-tree-item__description"
        >
          <font-awesome-icon
            :icon="['fal', 'info-circle']"
            fixed-width
          />
          <geo-tooltip>
            {{ category.description }}
          </geo-tooltip>
        </span>
      </label>

      <template slot="trailingAccessoryItem">
        <input
          :id="category[keyForId]"
          :checked="isChecked"
          :indeterminate.prop="isIndeterminate"
          type="checkbox"
          @click.stop
          @input="check(category, $event.target.checked)"
        >
      </template>
    </geo-list-item>
    <ul
      v-if="isExpanded"
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
        @check="isChecked => check(categoryChildren, isChecked)"
      />
    </ul>
  </li>
</template>

<script>
import { has, sumBy, forEach, isEmpty } from 'lodash'

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
    }
  },
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    categoryIcon () {
      return this.hasChildren(this.category) ? ['fal', 'chevron-right'] : null
    },
    isIndeterminate () {
      // TODO: make this
      return false
    },
    isChecked () {
      return has(this.checkedItems, this.category[this.keyForId])
    }
  },
  methods: {
    totalCategoryChildren (category) {
      const sumOfChildren = category => !isEmpty(category[this.keyForChildren])
        ? category[this.keyForChildren].length + sumBy(category[this.keyForChildren], category => sumOfChildren(category))
        : 0

      return sumOfChildren(category)
    },
    hasChildren (category) {
      return this.totalCategoryChildren(category) > 0
    },
    handleClick () {
      if (!this.hasChildren(this.category)) {
        this.check(this.category[this.keyForId], !this.isChecked)
        return
      }

      this.isExpanded = !this.isExpanded
      this.$emit('click')
    },
    checkAll (category, isChecked) {
      forEach(category[this.keyForChildren], (innerCategory) => {
        this.checkAll(innerCategory, isChecked)
      })
      this.$emit('check', category[this.keyForId], isChecked)
    },
    check (category, isChecked) {
      if (this.hasChildren(category)) {
        return this.checkAll(category, isChecked)
      }

      this.$emit('check', category[this.keyForId], isChecked)
    }
  }
}
</script>
