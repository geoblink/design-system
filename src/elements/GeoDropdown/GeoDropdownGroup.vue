<template>
  <div :class="`geo-dropdown__group${cssSuffix}`">
    <div
      v-if="hasTitle"
      :class="`geo-dropdown__group__header${cssSuffix}`"
      @click="emitClick($event)"
    >
      <div :class="`geo-dropdown__group__header__icon-and-label${cssSuffix}`">
        <div
          v-if="icon"
          :class="`geo-dropdown__group__header__icon-and-label__icon-container${cssSuffix}`"
        >
          <font-awesome-icon
            :icon="icon"
            :class="`geo-dropdown__group__header__icon-and-label__icon-container__icon${cssSuffix}`"
            aria-hidden
            fixed-width
          />
        </div>
        <div :class="`geo-dropdown__group__header__icon-and-label__label${cssSuffix}`">
          <!-- @slot Use this slot to customize group's title -->
          <slot name="title" />
        </div>
      </div>
      <div
        v-if="hasTrailingAccessoryItems"
        :class="`geo-dropdown__group__header__trailing-accessory-items${cssSuffix}`"
      >
        <!-- @slot Use this slot to add more items to the trailing edge of this group's header -->
        <slot name="trailingAccessoryItem" />
      </div>
    </div>
    <div :class="`geo-dropdown__group__content${cssSuffix}`">
      <!-- @slot Use this slot to customize the items of this group -->
      <slot name="item" />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoDropdownGroup',
  status: 'missing-tests',
  release: '8.0.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Optional Font Awesome 5 icon to be displayed next to the title's label,
     * on the left.
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
