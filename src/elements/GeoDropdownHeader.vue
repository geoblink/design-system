<template>
  <div
    :class="`geo-dropdown__header${cssSuffix}`"
    @click="emitClick($event)"
  >
    <div :class="`geo-dropdown__header__icon-and-label${cssSuffix}`">
      <div
        v-if="icon"
        :class="`geo-dropdown__header__icon-and-label__icon-container${cssSuffix}`"
      >
        <font-awesome-icon
          :icon="icon"
          :class="`geo-dropdown__header__icon-and-label__icon-container__icon${cssSuffix}`"
          aria-hidden
          fixed-width
          @click="emitIconClick($event)"
        />
      </div>
      <div :class="`geo-dropdown__header__icon-and-label__label${cssSuffix}`">
        <!-- @slot Use this slot to customize header's content -->
        <slot />
      </div>
    </div>
    <div
      v-if="shouldShowCloseButton"
      :class="`geo-dropdown__header__close-button${cssSuffix}`"
    >
      <font-awesome-icon
        :icon="closeIcon"
        :class="`geo-dropdown__header__close-button__icon${cssSuffix}`"
        aria-hidden
        fixed-width
        @click="emitClose($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoDropdownHeader',
  status: 'ready',
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
     * Optional Font Awesome 5 icon to be displayed next to the entry's label,
     * on the leading edge.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      required: false
    },
    /**
     * Font Awesome 5 icon to be displayed as close button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    closeIcon: {
      type: Array,
      default () {
        return ['fal', 'times']
      }
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },

    shouldShowCloseButton () {
      return this.$listeners && this.$listeners.close
    }
  },
  methods: {
    emitClick ($event) {
      /**
       * User clicked this header.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    },

    emitIconClick ($event) {
      /**
       * User clicked the icon.
       *
       * @event click-icon
       * @type {MouseEvent}
       */
      this.$emit('click-icon', $event)
    },

    emitClose ($event) {
      /**
       * User clicked close button.
       *
       * @event close
       * @type {MouseEvent}
       */
      this.$emit('close', $event)
    }
  }
}
</script>
