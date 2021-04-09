<template>
  <geo-dropdown-regular-button
    class="geo-dropdown__select-button"
    :icon-position="iconPosition"
    :icon="['fal', 'chevron-down']"
    :active="active"
    :disabled="disabled"
    @click="emitClick($event)"
  >
    <!-- @slot Use this slot to customize button's content -->
    <slot />
  </geo-dropdown-regular-button>
</template>

<script>
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'
import * as GeoDropdownConstants from './GeoDropdown.constants'
import GeoDropdownRegularButton from './GeoDropdownRegularButton.vue'
/**
 * `GeoDropdownSelectButton` is a button designed to display a chevron icon
 * that animates when a `GeoDropdown` parent element is opened. It can be customised
 * with any complex single-line text and it is surrounded by a bordered box linked to a
 * popup.
 *
 * It's suitable in isolated places where this button won't be associated with
 * any single element of a collection but with a specific feature or an entire
 * collection.
 *
 * As it can display single-line text it can be used to toggle popups which
 * manage complex state changes which are not directly evident like multi-select
 * options.
 */
export default {
  name: 'GeoDropdownSelectButton',
  status: 'ready',
  release: '29.10.0',
  components: { GeoDropdownRegularButton },
  props: {
    /**
     * Optional poisition for the icon relative to the content. `right` or `left`
     * Values available in `X_AXIS_POSITION`:
     *
     * - `X_AXIS_POSITION.right`
     * - `X_AXIS_POSITION.left`
     */
    iconPosition: enumPropertyFactory({
      componentName: 'GeoDropdownRegularButton',
      propertyName: 'iconPosition',
      enumDictionary: GeoDropdownConstants.X_AXIS_POSITION,
      defaultValue: GeoDropdownConstants.X_AXIS_POSITION.right
    }),

    /**
     * Whether this button is disabled or not. Disabled buttons use a different
     * color scheme and do not emit `click` events.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Whether this button is active or not. Active buttons are higlighted using
     * a different color scheme.
     */
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitClick ($event) {
      if (this.disabled) return

      /**
       * User clicked this button.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
