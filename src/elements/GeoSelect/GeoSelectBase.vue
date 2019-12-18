<template>
  <geo-dropdown
    ref="dropdown"
    :opened="opened"
    :force-y-axis-position="forceYAxisPosition"
    :fixed-width="fixedWidth"
    :popup-class="['geo-select-base__popup', popupClass]"
    class="geo-select-base"
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
        @load-more-results="loadNextPage"
      >
        <div
          ref="scrollableContent"
          class="geo-select-base__options-container"
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
import { Y_AXIS_POSITION, X_AXIS_POSITION } from '../GeoDropdown/GeoDropdown.constants'

/**
 * `GeoSelectBase` is an advance component to build select-like flows. It offers
 * the minimum boilerplate to create a popup-driven single-element pickers.
 *
 * ::: tip
 * Use this component if you want to build a custom experience. If you just need
 * a drop-in replacement for HTML `<select>` tag you might probably want to use
 * [GeoSelect](./GeoSelect) component.
 * :::
 */
export default {
  name: 'GeoSelectBase',
  status: 'ready',
  release: '4.1.0',
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
     * Whether dropdown with options' width should be fixed to the width of the
     * toggle button or not.
     */
    fixedWidth: {
      type: Boolean,
      default: true
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
    },

    /**
     * Class or classes that will be added to the popup element
     */
    popupClass: {
      type: [String, Array, Object],
      required: false
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
