<template>
  <div
    class="geo-bordered-box-header"
    @click="emitClick($event)"
  >
    <div class="geo-bordered-box-header__icon-and-label">
      <div
        v-if="icon"
        class="geo-bordered-box-header__icon-container"
      >
        <font-awesome-icon
          :icon="icon"
          class="geo-bordered-box-header__icon"
          aria-hidden
          fixed-width
          @click="emitIconClick($event)"
        />
      </div>
      <div class="geo-bordered-box-header__label">
        <!-- @slot Use this slot to customize header's content -->
        <slot />
      </div>
    </div>
    <div
      v-if="isCloseButtonVisible"
      class="geo-bordered-box-header__close-button"
      @click="emitClose($event)"
    >
      <font-awesome-icon
        :icon="closeIcon"
        class="geo-bordered-box-header__close-button-icon"
        aria-hidden
        fixed-width
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'GeoBorderedBoxHeader',
  status: 'ready',
  release: '7.3.0',
  props: {
    /**
     * Optional Font Awesome 5 icon to be displayed next to the header's label,
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
      default: function () {
        return ['fal', 'times']
      }
    }
  },
  computed: {
    isCloseButtonVisible () {
      return this.$listeners && this.$listeners.close && this.hasCloseIcon
    },

    hasCloseIcon () {
      return _.size(this.closeIcon) > 0
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
