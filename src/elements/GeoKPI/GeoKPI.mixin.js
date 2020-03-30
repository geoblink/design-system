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
     * Determines if KPI is primary or not
     */
    isPrimary: {
      type: Boolean,
      required: true
    },
    /**
     * KPI value
    */
    value: {
      type: String,
      required: true
    },
    /**
     * KPI unit
    */
    unit: {
      type: String,
      required: false
    },
    /**
     * KPI description
    */
    description: {
      type: String,
      required: false
    }
  }
}
