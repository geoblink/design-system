<template>
  <div :class="`geo-activity-indicator${cssSuffix}`">
    <svg
      :class="{
        [`geo-activity-indicator--${variant}${cssSuffix}`]: true,
        [`geo-activity-indicator--${variant}--animated${cssSuffix}`]: isAnimated,
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
            :r="innerRadius"
            stroke-width="0"
            fill="black"
            opacity="1"
          />
        </mask>
      </defs>
      <g :mask="`url(#${idCircleMask})`">
        <circle
          :class="{
            [`geo-activity-indicator__total${cssSuffix}`]: true,
            [`geo-activity-indicator__total--${variant}${cssSuffix}`]: true
          }"
          cx="50"
          cy="50"
          r="50"
          stroke-width="0"
          opacity="1"
        />
        <path
          :d="completedPercentagePathData"
          :class="{
            [`geo-activity-indicator__completed-path${cssSuffix}`]: true,
            [`geo-activity-indicator__completed-path--${variant}${cssSuffix}`]: true
          }"
          transform="translate(50, 50)"
        />
      </g>
    </svg>
    <div :class="`geo-activity-indicator__inset${cssSuffix}`">
      <!-- @slot Use this slot to customize content displayed inside the indicator -->
      <slot />
    </div>
  </div>
</template>

<script>
/*
 Based on Codepen by Jon Beebe.
 https://codepen.io/somethingkindawierd/pen/nkEfw
 */

import counterFactory from '../../utils/counterFactory'
import cssSuffix from '../../mixins/cssModifierMixin'

const getNextCounterValue = counterFactory()

const VARIANTS = {
  default: 'default',
  primary: 'primary',
  success: 'success',
  info: 'info',
  warn: 'warn',
  error: 'error',
  progress: 'progress',
  tooltip: 'tooltip',
  'dark-transparent': 'dark-transparent'
}

export { VARIANTS }

/**
 * `GeoActivityIndicator` acts as a loading spinner to give visual feedback to
 * users on an ongoing request or background task. You can customize the color,
 * size and completion percentage of the spinner.
 */
export default {
  name: 'GeoActivityIndicator',
  status: 'ready',
  release: '2.0.0',
  constants: {
    VARIANTS
  },
  mixins: [cssSuffix],
  props: {
    /**
     * Whether this activity indicator displays an indeterminate progress
     * (`true`) or not.
     *
     * Indeterminate activity indicators are continuously animating an arbitrary
     * percentage as no real data about the completion percetage is available.
     *
     * > **Note:** This option **takes precedence** over `percentage`.
     *
     * > **Note:** `animated` **takes precedence** over this options with respect to
     * > completed percentage animation.
     */
    indeterminate: {
      type: Boolean,
      default: undefined
    },

    /**
     * Completion percentage.
     *
     * > **Note:** `indeterminate` takes precedence over this option.
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
     * completed percentage (`true`) or not.
     *
     * > **Note:** This option **takes precedence** over `indeterminate`.
     */
    animated: {
      type: Boolean,
      default: undefined
    },

    /**
     * Variant of this activity indicator, used to change the color scheme of
     * the indicator to adapt to any kind of background.
     *
     * Supported `variant` values are exported under `VARIANTS` named export.
     *
     * Supported values:
     *
     * - `default`
     * - `primary`
     * - `success`
     * - `info`
     * - `warn`
     * - `error`
     * - `progress`
     * - `dark-transparent`
     */
    variant: {
      type: String,
      default: VARIANTS.default,
      validator (value) {
        return value in VARIANTS
      }
    },

    /**
     * Radius of the inner shape that creates the hole in the center.
     *
     * Modifying this value will define a thinner or thicker indicator,
     * being 0 the minimun using the whole circle and 50 the maximum with
     * 1px indicator.
     */
    innerRadius: {
      type: Number,
      default: 40,
      validator (value) {
        if (value < 0) throw new Error('GeoActivityIndicator innerRadius can\'t be negative')
        if (value > 50) throw new Error('GeoActivityIndicator innerRadius can\'t be greater than the outer radius (50)')
        return true
      }
    }
  },
  computed: {
    variantSuffix () {
      return this.variant ? `--${this.variant}` : ''
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
