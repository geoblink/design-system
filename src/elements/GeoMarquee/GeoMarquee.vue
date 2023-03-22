<template>
  <div
    class="geo-marquee"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      v-for="i in slotsNeeded"
      ref="marquee-content"
      :key="i"
      :style="animationParams"
      class="geo-marquee__text-content"
    >
      <!--
        @slot Use this slot to store the marquee content.
        Include `slot-scope='{}'` to prevent Vue from wrongly thinking this
        content should not be repeated.
      -->
      <slot />
    </div>
  </div>
</template>

<script>
/**
 * `GeoMarquee` is a component used to display long strings in a carousel style
 * which is animated only when user is hovering the text.
 *
 * You can choose the duration of the animation and its speed will be adjusted
 * depending on the length of the text.
 */
export default {
  name: 'GeoMarquee',
  status: 'ready',
  release: '4.0.0',
  props: {
    /**
     * Duration of the animation in **seconds**.
     * The greater the number, the slower the animation.
     */
    duration: {
      type: Number,
      default: 7
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
      const contentWidth = this.contentWidth || 0
      const containerWidth = this.containerWidth || 0
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
    this.$nextTick().then(() => {
      if (!this.$refs['marquee-content'][0] || !this.$el) return
      this.contentWidth = this.$refs['marquee-content'][0].getBoundingClientRect().width
      this.containerWidth = this.$el.getBoundingClientRect().width
    })
  },
  updated () {
    if (!this.$refs['marquee-content'][0] || !this.$el) return
    this.contentWidth = this.$refs['marquee-content'][0].getBoundingClientRect().width
    this.containerWidth = this.$el.getBoundingClientRect().width
  }
}
</script>
