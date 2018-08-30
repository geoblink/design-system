<template>
  <div :class="`geo-select-search-entry__container${cssSuffix}`">
    <font-awesome-icon
      :icon="searchIcon"
      :class="`geo-select-search-entry__search-icon${cssSuffix}`"
    />
    <input
      :class="`geo-select-search-entry__search-input${cssSuffix}`"
      :placeholder="placeholder"
      type="text"
    >
  </div>
</template>

<script>
export default {
  name: 'GeoSelectSearchEntry',
  props: {
    /**
     * Icon used for the searchbox
     */
    searchIcon: {
      type: Array,
      default () {
        return ['fal', 'search']
      }
    },
    /**
     * Default text to be displayed when no option is selected
     */
    placeholder: {
      type: String,
      required: false
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-activity-indicator-make('modifier-name');` to
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
}
</script>

