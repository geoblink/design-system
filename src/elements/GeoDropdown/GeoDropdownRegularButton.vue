<template>
  <div
    :class="{
      ['geo-dropdown__regular-button-container']: true,
      ['geo-dropdown__regular-button-container--active']: active,
      ['geo-dropdown__regular-button-container--disabled']: disabled
    }"
    @click="emitClick($event)"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="geo-dropdown__regular-button-container__icon"
      :class="`geo-dropdown__regular-button-container__icon--${iconPosition}`"
      aria-hidden
      fixed-width
    />
    <div
      v-if="hasContent"
      class="geo-dropdown__regular-button-container__content"
    >
      <!-- @slot Use this slot to customize button's content -->
      <slot />
    </div>
  </div>
</template>

<script>
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'
import * as GeoDropdownConstants from './GeoDropdown.constants'
/**
 * `GeoDropdownRegularButton` is a button designed to display an optional icon
 * and any complex single-line text surrounded by a bordered box linked to a
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
  name: 'GeoDropdownRegularButton',
  status: 'ready',
  release: '4.0.0',
  props: {
    /**
     * Optional Font Awesome 5 icon to be displayed next to the button's label,
     * on the left.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      required: false
    },

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
      defaultValue: GeoDropdownConstants.X_AXIS_POSITION.left
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
  data () {
    return {
      hasContent: false
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.hasContent = this.$slots && this.$slots.default && this.$slots.default.length
    })
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
