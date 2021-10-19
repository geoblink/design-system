<template>
  <component
    :is="wrapperTag"
    v-bind="$attrs"
    :class="[{
      'geo-list-item': true,
      'geo-list-item--disabled': disabled
    }]"
    v-on="computedListeners"
  >
    <div class="geo-list-item__label-and-accessory-container">
      <div class="geo-list-item__icon-and-label">
        <div
          v-if="icon"
          class="geo-list-item__icon-and-label__icon-container"
        >
          <font-awesome-icon
            :icon="icon"
            class="geo-list-item__icon-and-label__icon-container__icon"
            aria-hidden
            fixed-width
          />
        </div>
        <div class="geo-list-item__icon-and-label__label">
          <!-- @slot Use this slot to customize rows's main content -->
          <slot />
        </div>
      </div>
      <div
        v-if="isTrailingItemWrapperVisible"
        class="geo-list-item__trailing-accessory-items"
      >
        <!-- @slot Use this slot to add more items to the trailing edge of this row -->
        <slot name="trailingAccessoryItem" />

        <template v-if="disabled && disabledIcon">
          <font-awesome-icon
            :icon="disabledIcon"
            class="geo-list-item__icon-and-label__icon-container__icon"
            aria-hidden
            fixed-width
          />
        </template>
      </div>
    </div>
    <div
      v-if="$slots.description"
      :class="{
        'geo-list-item__description': true,
        'geo-list-item__description--spaced': !!icon
      }"
    >
      <!-- @slot Use this slot to add a description for the item -->
      <slot name="description" />
    </div>
    <geo-tooltip
      v-if="disabledTooltipContent"
      :position="disabledTooltipPosition"
    >
      {{ disabledTooltipContent }}
    </geo-tooltip>
  </component>
</template>

<script>
import extendedListenersMixin from '@/mixins/extendedListenersMixin'
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'
import { POSITIONS } from '../GeoTooltip/GeoTooltip.constants'

/**
 * `GeoListItem` is a component designed to build vertical lists which fit
 * properly in a `GeoBorderedBox`.
 *
 * It can be customized in several ways, adding icons to the leading edge of the
 * row or more complex elements (like form inputs) to the trailing edge.
 */
export default {
  name: 'GeoListItem',
  status: 'ready',
  release: '4.0.0',
  mixins: [extendedListenersMixin],
  props: {
    /**
     * Optional Font Awesome 5 icon to be displayed next to the entry's label,
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
     * Whether this item is disabled or not. When disabled it will be displayed
     * greyed out.
     *
     * **Note:** Listeners won't be affected by this property.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Optional Font Awesome 5 icon to be displayed next to the entry's label,
     * on the right when the item is disabled.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    disabledIcon: {
      type: Array,
      required: false
    },

    /**
     * Text to be displayed inside a tooltip when the item is disabled.
     */
    disabledTooltipContent: {
      type: String,
      required: false
    },

    /**
     * Position for the tooltip with the disabled tooltip content
     */
    disabledTooltipPosition: enumPropertyFactory({
      componentName: 'GeoListItem',
      propertyName: 'disabledTooltipPosition',
      enumDictionary: POSITIONS,
      defaultValue: POSITIONS.trailing
    }),

    /**
     * HTML tag that will be used as a wrapper of the GeoListItem
     */
    wrapperTag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    isTrailingItemWrapperVisible () {
      return this.$slots.trailingAccessoryItem || (this.disabled && this.disabledIcon)
    }
  }
}

</script>
