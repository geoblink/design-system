/**
 * @mixin
 */
export default {
  props: {
    /**
     * Amount of items displayed on each page at most
     */
    pageSize: {
      type: Number,
      required: true
    },

    /**
     * Page currently being displayed
     */
    currentPage: {
      type: Number,
      required: true
    },

    /**
     * Amount of items in original data set
     */
    sourceDataLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.sourceDataLength / this.pageSize)
    },

    lastPage () {
      return this.totalPages - 1
    },

    hasPreviousPage () {
      return this.currentPage > 0
    },

    hasNextPage () {
      return this.currentPage < this.lastPage
    },

    hasMultiplePages () {
      return this.totalPages > 1
    },

    rangeStart () {
      return this.currentPage * this.pageSize
    },

    rangeEnd () {
      return Math.min((this.currentPage + 1) * this.pageSize, this.sourceDataLength)
    }
  },
  methods: {
    goToFirstPage () {
      this.goToPage(0)
    },

    goToLastPage () {
      this.goToPage(this.lastPage)
    },

    goToPreviousPage () {
      this.goToPage(this.currentPage - 1)
    },

    goToNextPage () {
      this.goToPage(this.currentPage + 1)
    },

    goToPage (page) {
      /**
       * User wants to change current page to given one.
       *
       * @event go-to-page
       * @type {Number}
       */
      this.$emit('go-to-page', page)
    }
  }
}
