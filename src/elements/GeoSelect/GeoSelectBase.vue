<template>
  <geo-dropdown
    :opened="opened"
    @click-outside="handleClickOutside($event)"
  >
    <!-- @slot Use this slot to compose the structure of the `GeoSelect` placeholder container -->
    <slot
      slot="toggleButton"
      name="toggleButton"
    />
    <slot
      slot="popupContent"
      name="header"
    />
    <div
      slot="popupContent"
      ref="popup"
      :class="`geo-select__options-container${cssSuffix}`"
    >
      <!-- @slot Use this slot to display options available in the `GeoSelect` -->
      <slot />
    </div>
    <slot
      slot="popupContent"
      name="footer"
    />
    <template
      v-if="hasMoreResults"
      slot="popupContent"
    >
      <geo-select-more-results-footer-button
        slot="moreResults"
        @load-more-results="loadNextPage"
      >
        <!-- @slot Use this slot to customize the label of the button allowing the user to load more data when there are too much elements to be displayed at once -->
        <slot
          slot="moreResultsContent"
          name="moreResultsTextContent"
        />
      </geo-select-more-results-footer-button>
    </template>
  </geo-dropdown>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectBase',
  status: 'missing-tests',
  release: '8.1.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Whether the dropdown is opened or not.
     */
    opened: {
      type: Boolean,
      required: true
    },
    /**
     * Whether the select has more results to load or not
     */
    hasMoreResults: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickOutside ($event) {
      /**
       * Click outside GeoSelect event
       * @event click-outside
       * @type {object}
       */
      this.$emit('click-outside', $event)
    },
    toggleOptions () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    loadNextPage () {
      const popup = this.$refs.popup
      const currentVerticalOffset = popup.scrollTop
      const nextPageVerticalOffset = currentVerticalOffset + popup.scrollHeight
      /**
       * Load more results in GeoSelect options
       * @event load-more-results
       * @type {object}
       */
      this.$emit('load-more-results', {
        scrollToLastEntry () {
          popup.scrollTop = nextPageVerticalOffset
        }
      })
    }
  }
}
</script>
