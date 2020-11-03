import { assign } from 'lodash'

export default {
  computed: {
    computedListeners () {
      return assign({}, this.$listeners, { click: this.handleClick })
    }
  },
  methods: {
    handleClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  }
}
