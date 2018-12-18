<template>
  <div :class="`geo-notification-bar${cssSuffix}`">
    <div class="geo-notification-bar__message-body">
      <font-awesome-icon
        :icon="icon"
        class="geo-notification-bar__icon"
        fixed-width
        aria-hidden
      />
      <span class="geo-notification-bar__message-text">
        <!-- @slot Use this slot to customize content displayed inside the notification -->
        <slot />
      </span>
      <!-- @slot Use this slot to show additional actions after the message, such as buttons -->
      <slot name="actions" />
    </div>
    <font-awesome-icon
      v-if="isCloseButtonVisible"
      :icon="closeIcon"
      fixed-width
      class="geo-notification-bar__close-icon"
      @click="emitClose($event)"
    />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoNotificationBar',
  status: 'missing-tests',
  release: '9.1.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Optional Font Awesome 5 icon to be displayed next to the notification message,
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
    isCloseButtonVisible () {
      return this.$listeners && this.$listeners.close
    }
  },
  methods: {
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
