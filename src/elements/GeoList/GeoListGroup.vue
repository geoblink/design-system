<template>
  <div class="geo-list-group">
    <div
      v-if="hasTitle"
      class="geo-list-group-header"
      @click="emitClick($event)"
    >
      <div class="geo-list-group-header__icon-and-label">
        <div
          v-if="icon"
          class="geo-list-group-header__icon-container"
        >
          <font-awesome-icon
            :icon="icon"
            class="geo-list-group-header__icon"
            aria-hidden
            fixed-width
          />
        </div>
        <div class="geo-list-group-header__label">
          <!-- @slot Use this slot to customize group's title -->
          <slot name="title" />
        </div>
      </div>
      <div
        v-if="hasTrailingAccessoryItems"
        class="geo-list-group-header__trailing-accessory-items"
      >
        <!-- @slot Use this slot to add more items to the trailing edge of this group's header -->
        <slot name="trailingAccessoryItem" />
      </div>
    </div>
    <div class="geo-list-group__content">
      <!-- @slot Use this slot to customize the items of this group -->
      <slot name="item" />
    </div>
  </div>
</template>

<script>
/**
 * `GeoListGroup` is a component designed to show a collection of items inside
 * a visually isolated group. It supports a customizable group `title` and
 * allows showing any kind of content inside the group, althought using
 * [GeoListItem](./GeoListItem) is advised.
 */
export default {
  name: 'GeoListGroup',
  status: 'ready',
  release: '4.0.0',
  props: {
    /**
     * Optional Font Awesome 5 icon to be displayed next to group title's label,
     * on the leading edge.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      required: false
    }
  },
  computed: {
    hasTitle () {
      return !!(this.$slots.title && this.$slots.title.length)
    },

    hasTrailingAccessoryItems () {
      return !!(this.$slots.trailingAccessoryItem && this.$slots.trailingAccessoryItem.length)
    }
  },
  methods: {
    emitClick ($event) {
      /**
       * User clicked this options group header.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
