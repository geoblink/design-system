import { VARIANTS as GeoActivityIndicatorVariants } from '../GeoActivityIndicator/GeoActivityIndicator'
import cssSuffix from '../../mixins/cssModifierMixin'

const TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger'
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
      default: false
    }
  },
  computed: {
    activityIndicatorVariant () {
      const variantByType = {
        [TYPES.primary]: GeoActivityIndicatorVariants.primary,
        [TYPES.secondary]: GeoActivityIndicatorVariants.default
      }

      return variantByType[this.type]
    }
  },
  methods: {
    onGeoCompactButtonClick: function ($event) {
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
