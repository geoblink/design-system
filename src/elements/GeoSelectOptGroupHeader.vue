<template>
  <div
    :class="{
      [`geo-select-opt-group-header__container${cssSuffix}`]: true,
      [`geo-select-opt-group-header__container--opt-group${cssSuffix}`]: true
  }">
    <div
      :class="{
        [`geo-select-opt-group-header__content${cssSuffix}`]: true,
        [`geo-select-opt-group-header__content--opt-group${cssSuffix}`]: true
    }">
      <!-- @slot Use this slot to customize header content -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoSelectOptGroupHeader',
  status: 'ready',
  release: '1.0.0',
  props: {
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-select-opt-group-header-make('modifier-name');` to
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
  }
}
</script>
