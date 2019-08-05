export default {
  props: {
    /**
     * Is current granularity selector active
     */
    isActive: {
      type: Boolean,
      required: true
    },

    /**
     * Font Awesome 5 icon to be displayed next to each granularity selector
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    pickerGranularityIcon: {
      type: Array,
      required: false,
      default () {
        return ['fal', 'arrow-right']
      }
    }
  },
  methods: {
    handleClick ($event) {
      /**
       * User picks a granularity
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', {
        event: $event,
        pickerDateUnit: this.pickerDateUnit,
        granularityId: this.granularityId
      })
    }
  }
}
