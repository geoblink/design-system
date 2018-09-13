<template>
  <div
    :class="{
      [`geo-select-toggle-button${cssSuffix}`]: true,
      [`geo-select-toggle-button--empty${cssSuffix}`]: isEmpty
    }"
    @click="handleClick($event)"
  >
    <!-- @slot Use this slot to customize what is displayed in the button.
         Note that that this will be styled differently when isEmpty prop is true. -->
    <slot />
    <font-awesome-icon
      :icon="dropdownIcon"
      :class="{
        [`geo-select-toggle-button__toggle-icon${cssSuffix}`]: true
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'GeoSelectToggleButton',
  status: 'ready',
  release: '8.1.0',
  props: {
    /**
     * Font Awesome 5 icon to be displayed as close button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    dropdownIcon: {
      type: Array,
      default () {
        return ['fal', 'chevron-down']
      }
    },
    /**
     * Whether there's a selected option or just the `GeoSelect` default placeholder.
     * It is used to toggle `geo-select__placeholder-box--empty` class.
     */
    isEmpty: {
      type: Boolean,
      required: true
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-select-toggle-button-make('modifier-name');` to
     * your SCSS styles.
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
    handleClick ($event) {
      /**
       * Click on select event
       * @event click
       * @type {object}
       */
      this.$emit('click', $event)
    }
  }
}
</script>
