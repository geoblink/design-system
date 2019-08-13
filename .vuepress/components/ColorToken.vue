<template>
  <div
    :class="color.category"
    class="color-token"
  >
    <div
      :style="{
        backgroundColor: color.value
      }"
      class="color-token__background"
    />
    <div class="color-token__description">
      <h3 class="color-token__name">{{ colorName }}</h3>
      <p class="color-token__code"><strong>RGB:</strong> {{ rgbColor }}</p>
      <p class="color-token__variable"><strong>SCSS:</strong> ${{ scssVariable }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorToken',
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