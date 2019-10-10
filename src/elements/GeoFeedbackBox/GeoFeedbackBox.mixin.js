import cssSuffix from '../../mixins/cssModifierMixin'

const VARIANTS = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
  progress: 'progress'
}

export { VARIANTS }

/**
 * @mixin
 */
export default {
  mixins: [cssSuffix],
  props: {
    /**
     * Whether this alert is floating or not. Floating alerts get special CSS
     * classes with default floating behaviour to reduce boilerplate.
     */
    floating: {
      type: Boolean,
      default: false
    },

    /**
     * Icon used for alert dismissal button.
     */
    closeIcon: {
      type: Array,
      default: function () {
        return ['fal', 'times']
      }
    }
  },
  computed: {
    hasLeadingAccessoryItem () {
      return !!(this.$slots.leadingAccessoryItem || []).length
    },

    hasActions () {
      return !!(this.$slots.actions || []).length
    },

    shouldShowCloseButton () {
      return !!this.$listeners.close
    }
  },
  methods: {
    close (event) {
      /**
       * User clicked on the *Close* button.
       *
       * @event close
       * @type {MouseEvent}
       */
      this.$emit('close', event)
    }
  }
}
