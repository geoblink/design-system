<template>
  <div
    :style="{
      lineHeight: spacingValue,
      height: spacingValue
    }"
    class="c-design-tokens-list-spacing__token"
  >
    <p :class="{
      'c-design-tokens-list-spacing__description': true,
      'c-design-tokens-list-spacing__description--offset': isSpacingValueTooSmallToContainLabel
    }">
      <span class="c-design-tokens-list-spacing__name">{{ spacingName }}</span>
      <span>({{ spacingValue }})</span>
    </p>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'SpacingToken',
  props: {
    spacing: {
      type: Object,
      required: true
    }
  },

  computed: {
    spacingName () {
      return `$${this.spacing.name.replace(/_/g, "-")}`
    },

    spacingValue () {
      return this.spacing.value
    },

    isSpacingValueTooSmallToContainLabel () {
      return _.includes(['5px', '10px'], this.spacingValue)
    }
  }
}
</script>