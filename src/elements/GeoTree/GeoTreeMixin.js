/**
 * @mixin
 */
export default {
  props: {
    /**
     * Group object in case you want to support drag elements
     *
     * See [vuedraggable](https://www.npmjs.com/package/vuedraggable)
     * for more info about this.
     */
    group: {
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
    changeDrag ($event, targetList) {
      this.emitChangeDrag({
        event: $event,
        targetList
      })
    }
  }
}
