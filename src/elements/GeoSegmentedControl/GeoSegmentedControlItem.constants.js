const VARIANTS = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger'
}

export { VARIANTS }

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Whether this item should be styled as active (`true`) or not (default).
     */
    active: {
      type: Boolean,
      default: false
    },

    /**
     * Whether this item should be displayed using outline style (`true`) or not.
     *
     * Outline style takes more vertical space while default style is more
     * compact.
     */
    outline: {
      type: Boolean,
      default: false
    },

    /**
     * Whether this item is disabled (`true`) or not be (default).
     *
     * Disabled items won't emit click events.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
