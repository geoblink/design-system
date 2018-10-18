<template>
  <div
    :class="`geo-list-item${cssSuffix}`"
    @click="emitClick($event)"
  >
    <div :class="`geo-list-item__icon-and-label${cssSuffix}`">
      <div
        v-if="icon"
        :class="`geo-list-item__icon-and-label__icon-container${cssSuffix}`"
      >
        <font-awesome-icon
          :icon="icon"
          :class="`geo-list-item__icon-and-label__icon-container__icon${cssSuffix}`"
          aria-hidden
          fixed-width
        />
      </div>
      <div :class="`geo-list-item__icon-and-label__label${cssSuffix}`">
        <!-- @slot Use this slot to customize rows's main content -->
        <slot />
        <!-- @slot **Deprecated. Use `default` slot instead** Use this slot to customize items's label -->
        <slot name="label" />
      </div>
    </div>
    <div
      v-if="hasTrailingAccessoryItems"
      :class="`geo-list-item__trailing-accessory-items${cssSuffix}`"
    >
      <!-- @slot Use this slot to add more items to the trailing edge of this row -->
      <slot name="trailingAccessoryItem" />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoListItem',
  status: 'missing-tests',
  release: '4.0.0',
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
    }
  },
  computed: {
    hasTrailingAccessoryItems () {
      return !!(this.$slots.trailingAccessoryItem && this.$slots.trailingAccessoryItem.length)
    }
  },
  mounted () {
    if (this.$slots && this.$slots.label) {
      console.warn('GeoListItem [component] :: «label» named slot is deprecated. Use default slot instead.')
    }
  },
  methods: {
    emitClick ($event) {
      /**
       * User clicked this item.
       *
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
