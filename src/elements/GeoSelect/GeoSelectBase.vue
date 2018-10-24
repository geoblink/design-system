<template>
  <geo-dropdown
    ref="dropdown"
    :opened="opened"
    :css-modifier="cssModifier"
    :force-y-axis-position="Y_AXIS_POSITION.bottom"
    @click-outside="handleClickOutside($event)"
  >
    <!-- @slot Use this slot to customize the button toggling the actual selection popup -->
    <slot
      slot="toggleButton"
      name="toggleButton"
    />
    <!-- @slot Use this slot to customize the header of the selection popup -->
    <slot
      slot="popupContent"
      name="header"
    />
    <div
      slot="popupContent"
      ref="popup"
      :class="`geo-select__options-container${cssSuffix}`"
    >
      <!-- @slot Use this slot to customize the main content of the selection popup -->
      <slot />
    </div>
    <!-- @slot Use this slot to customize the footer of the selection popup -->
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
        <!-- @slot Use this slot to customize the label of the button allowing user to load more data when there are too much elements to be displayed at once -->
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
import { Y_AXIS_POSITION } from '../GeoDropdown/GeoDropdown.constants'

export default {
  name: 'GeoSelectBase',
  status: 'missing-tests',
  release: '4.1.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Whether the selection popup is opened (`true`) or not.
     */
    opened: {
      type: Boolean,
      required: true
    },

    /**
     * Whether the select has more results to load (`true`) or not
     */
    hasMoreResults: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    Y_AXIS_POSITION () {
      return Y_AXIS_POSITION
    }
  },
  methods: {
    handleClickOutside ($event) {
      /**
       * Click outside GeoSelect event
       *
       * @event click-outside
       * @type {MouseEvent}
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
       *
       * @event load-more-results
       * @type {{scrollToLastEntry: Function}}
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
