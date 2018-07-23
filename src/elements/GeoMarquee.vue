<template>
  <div
    :class="`geo-marquee${cssSuffix}`"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      v-for="i in [0, 1]"
      :key="i"
      :class="`geo-marquee__text-content${cssSuffix}`"
      :style="{
        animationPlayState: animationStatus,
        animationDuration: `${speed}s` }">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoMarquee',
  status: 'ready',
  version: '1.0.0',
  props: {
    speed: {
      type: String,
      default: '3'
    },
    cssModifier: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isHovering: false
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },
    animationStatus () {
      return this.isHovering ? 'running' : 'paused'
    }
  }
}
</script>
