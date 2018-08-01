<template>
  <div :class="`geo-more-options-menu__options-group${cssSuffix}`">
    <div
      :class="`geo-more-options-menu__options-group__entry${cssSuffix}`"
      @click="emitClick($event)"
    >
      <div :class="`geo-more-options-menu__options-group__entry__icon-and-label${cssSuffix}`">
        <div
          v-if="icon"
          :class="`geo-more-options-menu__options-group__entry__icon-and-label__icon-container${cssSuffix}`"
        >
          <font-awesome-icon
            :icon="icon"
            :class="`geo-more-options-menu__options-group__entry__icon-and-label__icon-container__icon${cssSuffix}`"
            aria-hidden
            fixed-width
          />
        </div>
        <div :class="`geo-more-options-menu__options-group__entry__icon-and-label__label${cssSuffix}`">
          <!-- @slot Use this slot to customize options group title -->
          <slot name="title" />
        </div>
      </div>
      <div
        v-if="hasRightAccessoryItems"
        :class="`geo-more-options-menu__options-group__entry__right-accessory-items${cssSuffix}`"
      >
        <!-- @slot Use this slot to add more items at the right end of the group title -->
        <slot name="rightAccessoryItem" />
      </div>
    </div>
    <div :class="`geo-more-options-menu__options-group__entries${cssSuffix}`">
      <!-- @slot Use this slot to customize the items of the options group -->
      <slot name="item" />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'GeoMoreOptionsMenuOptionsGroup',
  status: 'ready',
  version: '1.0.0',
  components: {
    FontAwesomeIcon
  },
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

    hasRightAccessoryItems () {
      return this.$slots.rightAccessoryItem && this.$slots.rightAccessoryItem.length
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
