import { VARIANTS as GeoAlertVariants } from '../GeoActivityIndicator/GeoActivityIndicator'

const TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  danger: 'danger',
  dangerLink: 'dangerLink',
  tooltip: 'tooltip'
}

export { TYPES }

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Whether the button is disabled (and can't be interacted with - `true`) or
     * not.
     *
     * When disabled the button won't emit `click` events but will allow other
     * mouse events like hover.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Whether the button is in loading state or not.
     *
     * When button is in loading state it will show the `loading` slot (by
     * default an indeterminate activity indicator) instead of the label slot.
     */
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    activityIndicatorVariant () {
      switch (this.type) {
        case TYPES.primary:
          return GeoAlertVariants['dark-transparent']
        case TYPES.secondary:
          return GeoAlertVariants.primary
        case TYPES.tertiary:
          return GeoAlertVariants.primary
        case TYPES.danger:
          return GeoAlertVariants.error
        case TYPES.dangerLink:
          return GeoAlertVariants.error
        case TYPES.tooltip:
          return GeoAlertVariants.warn
      }
    }
  },
  methods: {
    onGeoButtonClick: function ($event) {
      if (this.disabled) {
        $event.stopPropagation()
      } else {
        /**
         * User clicked on the button.
         *
         * @event click
         * @type {MouseEvent}
         */
        this.$emit('click', $event)
      }
    }
  }
}
