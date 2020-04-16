const TYPES = {
  positive: 'positive',
  neutral: 'neutral',
  negative: 'negative',
  standard: ''
}

export { TYPES }
/**
 * @mixin
 */
export default {
  props: {
    /**
     * Determines if the value is primary or not
     */
    isPrimary: {
      type: Boolean,
      required: true
    },
    /**
     * Value
    */
    value: {
      type: String,
      required: true
    },
    /**
     * Unit
    */
    unit: {
      type: String,
      required: false
    },
    /**
     * Description
    */
    description: {
      type: String,
      required: false
    }
  }
}
