/**
 * @mixin
 */

const _ = require('lodash')
export default {
  props: {
    /**
     * Object needed in case you want to support drag elements
     *
     * You have to use the same format as group prop of [vuedraggable](https://www.npmjs.com/package/vuedraggable)
     * for more info about this.
     */
    draggableGroup: {
      type: Object,
      required: false
    }
  },
  computed: {
    // Vuedraggable library allows to visually pull elements even with pull disabled, we don't want that
    dragClassToIgnore () {
      if (!this.group) return ''

      return !this.group.pull
        ? 'geo-tree__drag-disabled'
        : ''
    },

    hasMoreResultsToLoad () {
      return this.pageSize * this.visiblePages < this.filteredCategories.length
    },

    visibleItems () {
      if (this.hasMoreResultsToLoad) return _.slice(this.filteredCategories, 0, this.visiblePages * this.pageSize)
      return this.filteredCategories
    }
  },
  methods: {
    startDrag ($event) {
      this.$emit('start-drag', $event)
    },
    endDrag ($event) {
      this.$emit('end-drag', $event)
    },
    emitChangeDrag ($event) {
      this.$emit('change-drag', $event)
    },
    changeDrag ($event, parentCategory) {
      this.emitChangeDrag({
        event: $event,
        parentCategory
      })
    },
    loadNextPage (payload, pageObject = 'visiblePages') {
      _.set(this, pageObject, _.get(this, pageObject) + 1)
      this.$nextTick(function () {
        payload.scrollToLastEntry()
      })
    }
  }
}
