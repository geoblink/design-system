<template>
  <geo-dropdown
    :opened="opened"
    @click-outside="handleClickOutside($event)"
  >
    <slot
      slot="toggleButton"
      name="toggleButton"
    />
    <div
      slot="popupContent"
      ref="popup"
      :class="`geo-select__options-container${cssSuffix}`"
    >
      <!-- TODO: Document slot -->
      <slot />
    </div>
    <template
      v-if="hasMoreResults"
      slot="popupContent"
    >
      <geo-select-more-results-footer-button
        slot="moreResults"
        @load-more-results="loadNextPage"
      >
        <template
          slot="moreResultsContent"> <slot name="moreResultsTextContent" />
        </template>
      </geo-select-more-results-footer-button>
    </template>
  </geo-dropdown>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'GeoSelect',
  status: 'ready',
  version: '1.0.0',
  props: {
    /**
     * Whether the dropdown is opened or not.
     */
    opened: {
      type: Boolean,
      required: true
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-activity-indicator-make('modifier-name');` to
     * your SCSS styles.
     */
    cssModifier: {
      type: String,
      default: ''
    },
    /**
     * Whether the select has more results to load or not
     */
    hasMoreResults: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    }
  },
  methods: {
    handleClickOutside ($event) {
      this.$emit('click-outside', $event)
    },
    toggleOptions () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    loadNextPage () {
      const popup = this.$refs.popup
      const currentVerticalOffset = popup.scrollTop
      const nextPageVerticalOffset = currentVerticalOffset + popup.scrollHeight
      this.$emit('load-more-results', {
        scrollToLastEntry () {
          popup.scrollTop = nextPageVerticalOffset
        }
      })
    }
  }
}
</script>
