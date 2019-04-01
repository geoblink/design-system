/**
 * @mixin
 */
export default {
  props: {
    /**
     * Maximum width that this cell's column might take.
     */
    columnMaxWidth: {
      type: Number,
      required: false
    },

    /**
     * Minimum width that this cell's column must take.
     */
    columnMinWidth: {
      type: Number,
      required: false
    },

    /**
     * Width that this cell's column must take. Overrides both, minimum and
     * maximum width.
     */
    columnWidth: {
      type: Number,
      required: false
    },

    /**
     * Whether this header row cell should be ignored when computing this cell's
     * column's required width.
     */
    ignoreContentWidth: {
      type: Boolean,
      default: false
    },

    /**
     * If set to `true` this column won't grow after it's content fits,
     * otherwise (default) remaining space will be distributed and this column
     * might grow.
     */
    growingDisabled: {
      type: Boolean,
      default: false
    }
  }
}
