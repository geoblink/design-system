<template>
  <svg
    :class="{
      [`geo-activity-indicator${cssSuffix}`]: true,
      [`geo-activity-indicator--animated${cssSuffix}`]: isAnimated
    }"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 100 100"
    shape-rendering="geometricPrecision"
  >
    <defs>
      <mask
        :id="idCircleMask"
        x="0"
        y="0"
        width="100"
        height="100"
        maskUnits="userSpaceOnUse"
      >
        <!--
          The outer shape hides everything outside of the circle
          This is necessary because the path used to create the bar does not
          perfectly match the shape of a circle. We render the path larger than
          needed and mask it's edges to create a perfect circle.
        -->
        <circle
          cx="50"
          cy="50"
          r="51"
          stroke-width="0"
          fill="black"
          opacity="1"
        />

        <!-- The middle shape defines the visible area -->
        <circle
          cx="50"
          cy="50"
          r="50"
          stroke-width="0"
          fill="white"
          opacity="1"
        />

        <!--
          The inner shape creates the hole in the center.
          The value `r` defines the radius of the hole.
        -->
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke-width="0"
          fill="black"
          opacity="1"
        />
      </mask>
    </defs>
    <g :mask="`url(#${idCircleMask})`">
      <circle
        :class="`geo-activity-indicator__total-progress${cssSuffix}`"
        cx="50"
        cy="50"
        r="50"
        stroke-width="0"
        opacity="1"
      />
      <path
        :d="completedPercentagePathData"
        :class="`geo-activity-indicator__completed-progress${cssSuffix}`"
        transform="translate(50, 50)"
      />
    </g>
  </svg>
</template>

<script>
/*
 Based on Codepen by Jon Beebe.
 https://codepen.io/somethingkindawierd/pen/nkEfw
 */

import counterFactory from '../utils/counterFactory'
const getNextCounterValue = counterFactory()

const VARIANTS = {
  primary: 'primary',
  success: 'success',
  info: 'info',
  warn: 'warn',
  error: 'error',
  progress: 'progress',
  darkTransparent: 'dark-transparent'
}

export { VARIANTS }

export default {
  name: 'GeoActivityIndicator',
  status: 'ready',
  release: '1.0.0',
  constants: {
    VARIANTS
  },
  props: {
    /**
     * Whether this activity indicator displays an indeterminate progress
     * (`true`) or not.
     *
     * Indeterminate activity indicators are continuously animating an arbitrary
     * percentage as no real data about the completion percetage is available.
     *
     * This option takes precedence over `percentage`.
     *
     * > `animated` takes precedence over this options with respect to completed
     * > percentage animation.
     */
    indeterminate: {
      type: Boolean,
      default: undefined
    },
    /**
     * Completion percentage.
     *
     * > `indeterminate` takes precedence over this option.
     */
    percentage: {
      type: Number,
      default: undefined,
      validator (value) {
        if (value < 0) throw new Error('GeoActivityIndicator percentage can\'t be negative')
        if (value > 1) throw new Error('GeoActivityIndicator percentage can\'t be above 1')
        return true
      }
    },
    /**
     * Whether this activity indicator should be animating the currently
     * completed percentage or not.
     *
     * This option takes precedence over `indeterminate`.
     */
    animated: {
      type: Boolean,
      default: undefined
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-button-make('modifier-name');` to your SCSS
     * styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },

    idCircleMask () {
      return `geo-activity-indicator__circle-mask--${getNextCounterValue()}`
    },

    isIndeterminate () {
      return this.indeterminate || this.percentage === undefined
    },

    isAnimated () {
      return this.animated !== undefined
        ? this.animated
        : this.isIndeterminate
    },

    completedPercentage () {
      return this.isIndeterminate
        ? 1.0 / 3.0
        : clamp(parseFloat(this.percentage), 0, 1)
    },

    completedPercentagePathData () {
      // 360 loops back to 0, so keep it within 0 to < 360
      const angleInDegrees = clamp(this.completedPercentage * 360, 0, 359.99999)
      const paddedRadius = 50 + 1
      const angleInRadians = degreesToRadians(angleInDegrees)
      const x = Math.sin(angleInRadians) * paddedRadius
      const y = Math.cos(angleInRadians) * -paddedRadius
      const mid = (angleInDegrees > 180) ? 1 : 0

      const pathData = `M 0 0 v -${paddedRadius} A ${paddedRadius} ${paddedRadius} 1 ${mid} 1 ${x} ${y} z`

      return pathData
    }
  }
}

function clamp (value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function degreesToRadians (degrees) {
  return degrees * Math.PI / 180
}
</script>
