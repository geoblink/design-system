<template>
  <div class="geo-notification-bar">
    <div class="geo-notification-bar__message-body">
      <font-awesome-icon
        v-if="icon"
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
/**
 * `GeoNotificationBar` is a component designed to show a notification message
 * to the user. It can be customized with different icons, action buttons or
 * close event.
 */
export default {
  name: 'GeoNotificationBar',
  status: 'ready',
  release: '9.1.0',
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
      default: function () {
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
