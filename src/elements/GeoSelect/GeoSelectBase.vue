<template>
  <geo-dropdown
    ref="dropdown"
    :opened="opened"
    :css-modifier="cssModifier"
    :force-y-axis-position="forceYAxisPosition"
    :fixed-width="true"
    @click-outside="handleClickOutside($event)"
  >
    <!-- @slot Use this slot to customize the button toggling the actual selection popup -->
    <slot
      slot="toggleButton"
      name="toggleButton"
    />
    <geo-bordered-box slot="popupContent">
      <!-- @slot Use this slot to customize the header of the selection popup -->
      <slot name="header" />
      <geo-scrollable-container
        :show-more-results-button="hasMoreResults"
        :css-modifier="cssModifier"
        @load-more-results="loadNextPage"
      >
        <div
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
      <slot name="footer" />
    </geo-bordered-box>
  </geo-dropdown>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'
import { Y_AXIS_POSITION, X_AXIS_POSITION } from '../GeoDropdown/GeoDropdown.constants'

export default {
  name: 'GeoSelectBase',
  status: 'missing-tests',
  release: '4.1.0',
  mixins: [cssSuffix],
  constants: {
    X_AXIS_POSITION,
    Y_AXIS_POSITION
  },
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
    },

    /**
     * Forced position of the popup relative to the container. `top`, `bottom`
     * or none.
     *
     * If provided, this is the position that the popup will use regardless
     * whether it fits or not. Values available in `Y_AXIS_POSITION`:
     *
     * - `Y_AXIS_POSITION.top`
     * - `Y_AXIS_POSITION.bottom`
     */
    forceYAxisPosition: {
      type: String,
      required: false,
      validator: function (value) {
        return value === undefined || value in Y_AXIS_POSITION
      }
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
