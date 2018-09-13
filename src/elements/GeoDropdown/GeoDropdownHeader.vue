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
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoDropdownHeader',
  status: 'missing-tests',
  release: '8.0.0',
  mixins: [cssSuffix],
  props: {
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
