<template>
  <div
    :class="`geo-dropdown__regular-button-container${cssSuffix}`"
    @click="emitClick($event)"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      :class="`geo-dropdown__regular-button-container__icon${cssSuffix}`"
      aria-hidden
      fixed-width
    />
    <div
      v-if="hasContent"
      :class="`geo-dropdown__regular-button-container__string${cssSuffix}`"
    >
      <!-- @slot Use this slot to customize button's content -->
      <slot />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoDropdownRegularButton',
  status: 'missing-tests',
  release: '8.0.0',
  mixins: [cssSuffix],
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
    }
  },
  computed: {
    hasContent () {
      return this.$slots && this.$slots.default && this.$slots.default.length
    }
  },
  methods: {
    emitClick ($event) {
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
