<template>
  <div
    :class="`geo-marquee${cssSuffix}`"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      v-for="i in slotsNeeded"
      ref="marquee-content"
      :key="i"
      :class="`geo-marquee__text-content${cssSuffix}`"
      :style="animationParams">
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
      type: Number,
      default: 3
    },
    cssModifier: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isHovering: false,
      containerWidth: null,
      contentWidth: null
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },
    animationStatus () {
      return this.isHovering ? 'running' : 'paused'
    },
    slotsNeeded () {
      if (!this.contentWidth || !this.containerWidth) return [0]
      return this.contentWidth > this.containerWidth ? [0, 1] : [0]
    },
    animationParams () {
      if (this.slotsNeeded.length > 1) {
        return {
          animationPlayState: this.animationStatus,
          animationDuration: `${this.speed}s`,
          animationName: 'marquee-animation',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear'
        }
      }
    }
  },
  mounted () {
    this.contentWidth = this.$refs['marquee-content'][0].getBoundingClientRect().width
    this.containerWidth = this.$el.getBoundingClientRect().width
  },
  updated () {
    this.contentWidth = this.$refs['marquee-content'][0].getBoundingClientRect().width
    this.containerWidth = this.$el.getBoundingClientRect().width
  }
}
</script>
