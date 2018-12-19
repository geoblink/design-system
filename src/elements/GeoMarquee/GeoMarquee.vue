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
      <!--
        @slot Use this slot to store the marquee content.
        Include `slot-scope="{}"` to prevent Vue from wrongly thinking this
        content should not be repeated.
      -->
      <slot/>
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoMarquee',
  status: 'ready',
  release: '4.0.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Duration of the animation in **seconds**.
     * The greater the number, the slower the animation.
     */
    duration: {
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
        animationDuration: `${this.duration}s`,
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
    if (!this.$refs['marquee-content'][0] || !this.$el) return
    this.contentWidth = this.$refs['marquee-content'][0].getBoundingClientRect().width
    this.containerWidth = this.$el.getBoundingClientRect().width
  }
}
</script>
