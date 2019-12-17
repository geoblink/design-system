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
/**
 * `GeoDropdownCompactButton` is a button designed to display a single icon
 * which is surrounded by a bordered box on hover or when the linked popup is
 * displayed.
 *
 * It's suitable to display additional actions in lists or contexts where
 * displaying a long button would overcrow the interface. This kind of button is
 * not designed to reflect state changes other than linked popup being displayed.
 *
 * See [GeoDropdownRegularButton](./GeoDropdown?id=geodropdownregularbutton) for
 * a button designed to display more info.
 */
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
