<template>
  <div
    :class="color.category"
    class="c-design-tokens-list-color-token"
    @click="copyVariableName()"
  >
    <div
      :style="{
        backgroundColor: color.value
      }"
      class="c-design-tokens-list-color-token__background"
    />

    <div class="c-design-tokens-list-color-token__description">
      <h3 class="c-design-tokens-list-color-token__name">
        {{ colorName }}
        <span v-if="deprecated" class="c-design-tokens-list-color-token__deprecated-badge">Deprecated</span>
      </h3>
      <p class="c-design-tokens-list-color-token__code"><strong>RGB:</strong> {{ rgbColor }}</p>
      <p class="c-design-tokens-list-color-token__variable"><strong>SCSS:</strong> ${{ scssVariable }}</p>
    </div>
  </div>
</template>

<script>
const copy = require('copy-to-clipboard')

export default {
  name: 'DesignTokensListColorToken',
  props: {
    color: {
      type: Object,
      required: true
    }
  },
  computed: {
    colorName () {
      return this.color.name.replace(/_/g, ' ').replace(/color/g, '')
    },

    rgbColor () {
      return this.color.value
    },

    scssVariable () {
      return this.color.name.replace(/_/g, '-')
    },

    deprecated () {
      return this.color.deprecated
    }
  },
  methods: {
    copyVariableName () {
      copy(`\$${this.scssVariable}`)
    }
  }
}
</script>