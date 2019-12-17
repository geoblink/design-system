const STATUS = {
  initial: 'initial',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading'
}

export { STATUS }

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Whether this input is in loading state (`true`) or not.
     */
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasErrors: false,
      hasWarnings: false,
      fileName: ''
    }
  },
  computed: {
    $_GeoFileUpload_currentStatus () {
      if (this.loading) return STATUS.loading
      if (this.hasErrors) return STATUS.error
      if (this.hasWarnings) return STATUS.warning
      if (this.fileName) return STATUS.success
      return STATUS.initial
    }
  }
}
