<template>
  <geo-dropdown
    ref="dropdown"
    :opened="opened"
    :css-modifier="cssModifier"
    :force-y-axis-position="Y_AXIS_POSITION.bottom"
    :fixed-width="true"
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
    <geo-scrollable-container
      slot="popupContent"
      :show-more-results-button="hasMoreResults"
      :css-modifier="cssModifier"
      @load-more-results="loadNextPage">
      <div
        slot="scrollableList"
        ref="scrollableContent"
        :class="`geo-select__options-container${cssSuffix}`"
      >
        <!-- @slot Use this slot to customize the main content of the selection popup -->
        <slot />
      </div>
      <!-- @slot Use this slot to customize the label of the button allowing user to load more data when there are too much elements to be displayed at once -->
      <slot
        slot="moreResultsTextContent"
        name="moreResultsTextContent"
      />
    </geo-scrollable-container>
    <!-- @slot Use this slot to customize the footer of the selection popup -->
    <slot
      slot="popupContent"
      name="footer"
    />
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
      const scrollableContent = this.$refs.scrollableContent
      const currentVerticalOffset = scrollableContent.parentElement.scrollTop
      const nextPageVerticalOffset = currentVerticalOffset + scrollableContent.scrollHeight
      /**
       * Load more results in GeoSelect options
       *
       * @event load-more-results
       * @type {{scrollToLastEntry: Function}}
       */
      this.$emit('load-more-results', {
        scrollToLastEntry () {
          scrollableContent.parentElement.scrollTop = nextPageVerticalOffset
        }
      })
    }
  }
}
</script>
