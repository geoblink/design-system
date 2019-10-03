<template functional>
  <div
    :ref="data.ref"
    v-bind="data.attrs"
    :class="{
      [data.class]: true,
      [data.staticClass]: true,
      [`geo-list-item${$options.helpers.getCSSSuffix(props.cssModifier)}`]: true,
      [`geo-list-item--disabled${$options.helpers.getCSSSuffix(props.cssModifier)}`]: props.disabled
    }"
    v-on="listeners"
  >
    <div :class="`geo-list-item__label-and-accessory-container${$options.helpers.getCSSSuffix(props.cssModifier)}`">
      <div :class="`geo-list-item__icon-and-label${$options.helpers.getCSSSuffix(props.cssModifier)}`">
        <div
          v-if="props.icon"
          :class="`geo-list-item__icon-and-label__icon-container${$options.helpers.getCSSSuffix(props.cssModifier)}`"
        >
          <font-awesome-icon
            :icon="props.icon"
            :class="`geo-list-item__icon-and-label__icon-container__icon${$options.helpers.getCSSSuffix(props.cssModifier)}`"
            aria-hidden
            fixed-width
          />
        </div>
        <div :class="`geo-list-item__icon-and-label__label${$options.helpers.getCSSSuffix(props.cssModifier)}`">
          <!-- @slot Use this slot to customize rows's main content -->
          <slot />
        </div>
      </div>
      <div
        v-if="$slots.trailingAccessoryItem"
        :class="`geo-list-item__trailing-accessory-items${$options.helpers.getCSSSuffix(props.cssModifier)}`"
      >
        <!-- @slot Use this slot to add more items to the trailing edge of this row -->
        <slot name="trailingAccessoryItem" />
      </div>
    </div>
    <div
      v-if="$slots.description"
      :class="`geo-list-item__description${$options.helpers.getCSSSuffix(props.cssModifier)}`"
    >
      <!-- @slot Use this slot to add a description for the item -->
      <slot name="description" />
    </div>
  </div>
</template>

<script>
import cssSuffix, { getCSSSuffix } from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoListItem',
  status: 'ready',
  release: '4.0.0',
  helpers: {
    getCSSSuffix
  },
  mixins: [cssSuffix],
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
    }
  }
}

</script>
