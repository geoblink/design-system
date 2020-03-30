import _ from 'lodash'

const TYPES = {
  positive: 'positive',
  neutral: 'neutral',
  negative: 'negative',
  standard: 'standard'
}

export { TYPES }
/**
 * @mixin
 */
export default {
  props: {
    /**
     * Object that contains all the KPI data, cotaining following described properties
     *
     * data.isPrimary {Boolean} - Determines if KPI data is primary or not
     *
     * data.value {string|Number} - KPI data value
     *
     * [data.unit] {string} - KPI data unit
     *
     * [data.description] {string} - KPI data description
     *
     */
    data: {
      type: Object,
      required: true,
      validator (data) {
        if (!_.isBoolean(data.isPrimary)) return false
        if (typeof data.value !== 'string' && typeof data.value !== 'number') return false
        return true
      }
    }
  },
  computed: {
    isPrimary () {
      return this.data.isPrimary
    }
  }
}
