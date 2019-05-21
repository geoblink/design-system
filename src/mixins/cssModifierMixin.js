export function getCSSSuffix (cssModifier) {
  return cssModifier ? `--${cssModifier}` : ''
}

/**
 * @mixin
 */
export default {
  props: {
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-COMPONENT_NAME('modifier-name');` to your SCSS
     * styles.
     *
     * There's a detailed introduction to CSS Modifiers on the
     * [Customizing Components](./#/Customizing%20Components).
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * Use this property to append the cssModifier to the css classes
     */
    cssSuffix () {
      return getCSSSuffix(this.cssModifier)
    }
  }
}
