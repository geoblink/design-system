<template>
  <div
    :class="{
      [`geo-list-actionable-item${cssSuffix}`]: true,
      [`geo-list-actionable-item--active${cssSuffix}`]: active
    }"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="geo-list-actionable-item__left-icon"
      aria-hidden
      fixed-width
    />
    <div
      class="geo-list-actionable-item__container"
    >
      <div class="geo-list-actionable-item__title-container">
        <div class="geo-list-actionable-item__title">
          <!-- @slot Use this slot to customize the title of the item -->
          <slot name="title" />
        </div>

        <div
          v-if="hasTrailingAccessoryItems"
          class="geo-list-actionable-item__trailing-accessory-items"
        >
          <slot name="trailingAccessoryItem" />
        </div>
      </div>

      <div class="geo-list-actionable-item__body">
        <!-- @slot Use this slot to customize main content -->
        <slot />
      </div>

      <div
        v-if="hasActions"
        class="geo-list-actionable-item__actions"
      >
        <!-- @slot Use this slot to add more items at the bottom of the item -->
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoListActionableItem',
  status: 'ready',
  release: '8.1.0',
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
     * Whether the item is active (`true`) or not.
     */
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasTrailingAccessoryItems () {
      return !!(this.$slots.trailingAccessoryItem && this.$slots.trailingAccessoryItem.length)
    },
    hasActions () {
      return !!(this.$slots.actions && this.$slots.actions.length)
    }
  }
}
</script>
