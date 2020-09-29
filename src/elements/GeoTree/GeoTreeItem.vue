<template>
  <geo-list-item
    class="geo-tree-item"
    :icon="categoryIcon"
  >
    <label>
      {{ category[keyForLabel] }}
    </label>
    <span
      v-if="hasChildren"
      class="geo-tree-item__total-items"
    >
      ({{ totalItems }})
    </span>
  </geo-list-item>
</template>

<script>
import { sumBy } from 'lodash'

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
    }
  },
  computed: {
    totalItems () {
      const sumOfChildren = (category) => {
        return category[this.keyForChildren]
          ? category[this.keyForChildren].length + sumBy(category[this.keyForChildren], category => sumOfChildren(category))
          : 0
      }

      return sumOfChildren(this.category)
    },
    hasChildren () {
      return !!this.totalItems
    },
    categoryIcon () {
      return this.hasChildren ? ['fal', 'chevron-right'] : null
    }
  }
}
</script>
