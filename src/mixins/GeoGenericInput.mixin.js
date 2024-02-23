export default {
  props: {
    /**
     * Whether this input is in error state or not. Error inputs use a different
     * color scheme.
     */
    error: {
      type: Boolean,
      default: false
    },

    /**
       * Whether this input is in success state or not. Success inputs use a different
       * color scheme.
       */
    success: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    statusClass () {
      if (this.error && this.success) console.warn('GeoInput [component] :: error and success state are true at the same time, GeoInput will be shown as error.')
      if (this.error) return 'error'
      if (this.success) return 'success'
      return null
    }
  }
}
