<template>
  <div
    :class="`marquee__container${cssSuffix}`"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      v-for="i in [0, 1]"
      :key="i"
      :class="`marquee__text-content${cssSuffix}`"
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

<style lang="scss">
  .marquee__container {
    cursor: pointer;
    display: flex;
    overflow: hidden;
    width: 100%;
  }

  .marquee__text-content {
    animation-name: marquee-animation;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    padding-right: 10px;
    white-space: nowrap;
  }

  @keyframes marquee-animation {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }
</style>
