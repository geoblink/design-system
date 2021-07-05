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
      v-if="isTrailingIconVisible"
      class="geo-bordered-box-header__trailing-button"
      @click="emitTrailingIconClick($event)"
    >
      <font-awesome-icon
        :icon="trailingIcon"
        class="geo-bordered-box-header__trailing-button-icon"
        aria-hidden
        fixed-width
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

/**
 * `GeoBorderedBoxHeader` is component designed to fit nicely as header of a
 * [GeoBorderedBox](./GeoBorderedBox).
 *
 * It supports displaying a special _trailing_ icon button and allows setting an
 * optional clickable icon in the leading edge of the header.
 *
 * ::: tip
 * Set a listener on `click-trailing-icon` event to show the _trailing_ icon button.
 * :::
 */
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
     * Font Awesome 5 icon to be displayed at the right side of the header.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    trailingIcon: {
      type: Array,
      default: function () {
        return ['fal', 'times']
      }
    }
  },
  computed: {
    isTrailingIconVisible () {
      return this.$listeners && this.$listeners['click-trailing-icon'] && this.hasTrailingIcon
    },

    hasTrailingIcon () {
      return _.size(this.trailingIcon) > 0
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

    emitTrailingIconClick ($event) {
      /**
       * User clicked trailing icon button.
       *
       * @event click-trailing-icon
       * @type {MouseEvent}
       */
      this.$emit('click-trailing-icon', $event)
    }
  }
}
</script>
