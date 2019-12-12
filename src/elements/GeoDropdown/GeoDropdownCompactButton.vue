<template>
  <div
    class="geo-dropdown__compact-button-container"
    @click="emitClick($event)"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="geo-dropdown__compact-button-container__icon"
      aria-hidden
      fixed-width
    />
  </div>
</template>

<script>
export default {
  name: 'GeoDropdownCompactButton',
  status: 'ready',
  release: '4.0.0',
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
