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
export default {
  name: 'GeoDropdownGroup',
  status: 'missing-tests',
  release: '8.0.0',
  props: {
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-button-make('modifier-name');` to your SCSS
     * styles.
     */
    cssModifier: {
      type: String,
      default: ''
    },
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
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },

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
