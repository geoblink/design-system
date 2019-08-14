<template>
  <div
    :class="color.category"
    class="c-design-tokens-list-color-token"
  >
    <div
      :style="{
        backgroundColor: color.value
      }"
      class="c-design-tokens-list-color-token__background"
    />
    <div class="c-design-tokens-list-color-token__description">
      <h3 class="c-design-tokens-list-color-token__name">{{ colorName }}</h3>
      <p class="c-design-tokens-list-color-token__code"><strong>RGB:</strong> {{ rgbColor }}</p>
      <p class="c-design-tokens-list-color-token__variable"><strong>SCSS:</strong> ${{ scssVariable }}</p>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>