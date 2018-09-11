<template>
  <div
    :class="`geo-select-opt-group-entry__container${cssSuffix}`"
    @click="changeCurrentSelection">
    <!-- @slot Use this slot to add elements to the opt group entry label's left side (icons, radio buttons, etc) -->
    <slot name="leftAccessoryItem" />
    <div
      :class="`geo-select-opt-group-entry__content${cssSuffix}`">
      <!-- @slot This slot will display the option label -->
      <slot />
    </div>
    <!-- @slot Use this slot to add elements to the opt group entry label's right side (icons, radio buttons, etc) -->
    <slot name="rightAccessoryItem" />
  </div>
</template>

<script>
export default {
  name: 'GeoSelectOptGroupEntry',
  status: 'ready',
  version: '1.0.0',
  props: {
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-select-opt-group-entry-make('modifier-name');` to
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
    changeCurrentSelection () {
      this.$emit('change-current-selection')
    }
  }
}
</script>
