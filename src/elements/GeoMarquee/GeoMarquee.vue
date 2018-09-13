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
      <!-- @slot Use this slot to store the marquee content -->
      <slot/>
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoMarquee',
  status: 'ready',
  release: '8.0.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Duration of the animation (seconds).
     * The bigger the number, the slower the marquee transition
     */
    marqueeDuration: {
      type: Number,
      default: 3
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
    animationPlayState () {
      return this.isHovering ? 'running' : 'paused'
    },
    slotsNeeded () {
      var contentWidth = this.contentWidth || 0
      var containerWidth = this.containerWidth || 0
      return contentWidth > containerWidth ? [0, 1] : [0]
    },
    animationParams () {
      // We only want the animation if the content is wider than the container
      if (this.slotsNeeded.length === 1) return {}
      return {
        animationPlayState: this.animationPlayState,
        animationDuration: `${this.marqueeDuration}s`,
        animationName: 'marquee-animation',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
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
