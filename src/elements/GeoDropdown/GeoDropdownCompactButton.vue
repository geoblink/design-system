<template>
  <div
    :class="`geo-dropdown__compact-button-container${cssSuffix}`"
    @click="emitClick($event)"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      :class="`geo-dropdown__compact-button-container__icon${cssSuffix}`"
      aria-hidden
      fixed-width
    />
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoDropdownCompactButton',
  status: 'missing-tests',
  release: '8.0.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Font Awesome 5 icon to be displayed.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    icon: {
      type: Array,
      default: function () {
        return ['fal', 'ellipsis-v']
      }
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
