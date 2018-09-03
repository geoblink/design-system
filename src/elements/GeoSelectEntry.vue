<template>
  <div
    :class="{
      [`geo-select-entry__container${cssSuffix}`]: true,
      [`geo-select-entry__container--opt-group${cssSuffix}`]: isOptGroupEntry
    }"
    @click="changeCurrentSelection">
    <slot name="leftAccessoryItem" />
    <div
      :class="{
        [`geo-select-entry__content${cssSuffix}`]: true,
        [`geo-select-entry__content--opt-group${cssSuffix}`]: isOptGroupEntry
    }">
      <slot name="content" />
    </div>
    <slot name="rightAccessoryItem" />
  </div>
</template>

<script>
export default {
  name: 'GeoSelectEntry',
  status: 'ready',
  version: '1.0.1',
  props: {
    /**
     * Optional param to check opt groups
     */
    option: {
      type: Object,
      required: false,
      validator: function (value) {
        return 'name' in value
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
    },
    isOptGroupEntry () {
      return this.option ? this.option.isOptGroup : false
    }
  },
  methods: {
    changeCurrentSelection () {
      this.$emit('change-current-selection')
    }
  }
}
</script>
