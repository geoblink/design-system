<template>
  <li>
    <geo-list-item
      class="geo-tree-item"
      :class="{'geo-tree-item--clickable': hasChildren}"
      :icon="categoryIcon"
      @click="handleClick"
    >
      <label>
        {{ category[keyForLabel] }}
        <span
          v-if="hasChildren"
          class="geo-tree-item__total-items"
        >
          ({{ totalItems }})
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
          :checked="isChecked(category[keyForId])"
          :indeterminate.prop="isIndeterminate"
          type="checkbox"
          @click.stop
          @input="check(category[keyForId], $event.target.checked)"
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
        @check="isChecked => check(categoryChildren[keyForId], isChecked)"
      />
    </ul>
  </li>
</template>

<script>
import { has, sumBy, forEach } from 'lodash'

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
    totalItems () {
      const sumOfChildren = category => category[this.keyForChildren]
        ? category[this.keyForChildren].length + sumBy(category[this.keyForChildren], category => sumOfChildren(category))
        : 0

      return sumOfChildren(this.category)
    },
    hasChildren () {
      return !!this.totalItems
    },
    categoryIcon () {
      return this.hasChildren ? ['fal', 'chevron-right'] : null
    },
    isIndeterminate () {
      // TODO: make this
      return false
    }
  },
  methods: {
    isChecked (categoryId) {
      return has(this.checkedItems, categoryId)
    },
    handleClick () {
      if (!this.hasChildren) {
        this.check(this.category[this.keyForId], !this.isChecked(this.category[this.keyForId]))
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
    check (categoryId, isChecked) {
      if (this.hasChildren) {
        return this.checkAll(this.category, isChecked)
      }

      this.$emit('check', categoryId, isChecked)
    }
  }
}
</script>
