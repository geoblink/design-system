import { VARIANTS as GeoAlertVariants } from '../GeoActivityIndicator/GeoActivityIndicator'
import cssSuffix from '../../mixins/cssModifierMixin'

const TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  danger: 'danger',
  link: 'link',
  dangerLink: 'dangerLink'
}

export { TYPES }

/**
 * @mixin
 */
export default {
  mixins: [cssSuffix],
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
          return GeoAlertVariants.primary
        case TYPES.secondary:
          return undefined
        case TYPES.tertiary:
          return undefined
        case TYPES.danger:
          return GeoAlertVariants.error
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
