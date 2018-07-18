<template>
  <div
    :class="{
      [`geo-button${cssSuffix}`]: true,
      [`geo-button--${type}${cssSuffix}`]: true,
      [`geo-button--${type}--disabled${cssSuffix}`]: disabled,
      [`geo-button--disabled${cssSuffix}`]: disabled
    }"
    @click="onGeoButtonClick($event)"
  >
    <!-- @slot Use this slot for button's label -->
    <slot />
  </div>
</template>

<script>
var AVAILABLE_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  destructive: 'destructive'
}

export { AVAILABLE_TYPES }

export default {
  name: 'GeoButton',
  status: 'ready',
  release: '1.0.0',
  props: {
    /**
     * Variation of button, supporting:
     *
     * - `primary`
     * - `secondary`
     * - `tertiary`
     * - `destructive`
     *
     * Those values are exported under `AVAILABLE_TYPES` name.
     */
    type: {
      type: String,
      validator: function (value) {
        return value in AVAILABLE_TYPES
      },
      required: true
    },
    /**
     * Whether the button is disabled (and can't be interacted with) or not.
     *
     * When disabled the button won't allow any mouse event.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
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
    onGeoButtonClick: function ($event) {
      if (this.disabled) {
        $event.stopPropagation()
      } else {
        this.$emit('click', $event)
      }
    }
  }
}
</script>

<docs>
  ```jsx
  <div class="element-demo">
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-button type="primary">Primary</geo-button>
      <geo-button type="secondary">Secondary</geo-button>
      <geo-button type="tertiary">Tertiary</geo-button>
      <geo-button type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button hover type="primary">Primary</geo-button>
      <geo-button hover type="secondary">Secondary</geo-button>
      <geo-button hover type="tertiary">Tertiary</geo-button>
      <geo-button hover type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-button disabled type="primary">Primary</geo-button>
      <geo-button disabled type="secondary">Secondary</geo-button>
      <geo-button disabled type="tertiary">Tertiary</geo-button>
      <geo-button disabled type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Disabled &amp; Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button disabled hover type="primary">Primary</geo-button>
      <geo-button disabled hover type="secondary">Secondary</geo-button>
      <geo-button disabled hover type="tertiary">Tertiary</geo-button>
      <geo-button disabled hover type="destructive">Destructive</geo-button>
    </div>
  </div>
  ```
</docs>
