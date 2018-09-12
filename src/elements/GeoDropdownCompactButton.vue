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
export default {
  name: 'GeoDropdownCompactButton',
  status: 'ready',
  release: '8.1.0',
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
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-button-make('modifier-name');` to your SCSS
     * styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
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
