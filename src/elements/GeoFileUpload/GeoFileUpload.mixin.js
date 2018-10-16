const STATUS = {
  initial: 'initial',
  success: 'success',
  warning: 'warning',
  error: 'error'
}

export { STATUS }

/**
 * @mixin
 */
export default {
  data () {
    return {
      hasErrors: false,
      hasWarnings: false,
      fileName: ''
    }
  },
  computed: {
    $_GeoFileUpload_currentStatus () {
      if (this.hasErrors) return STATUS.error
      if (this.hasWarnings) return STATUS.warning
      if (this.fileName) return STATUS.success
      return STATUS.initial
    }
  }
}
