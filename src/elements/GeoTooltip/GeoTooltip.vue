<template>
  <div
    v-if="isVisible"
    :class="{
      [`geo-tooltip__content${cssSuffix}`]: true,
      [`geo-tooltip__content--${fittingPosition}${cssSuffix}`]: fittingPosition,
      [`geo-tooltip__content--${fittingAlignment}${cssSuffix}`]: fittingAlignment
    }"
    @mouseover="onTooltipContentMouseover()"
    @mouseleave="debouncedOnTooltipContentMouseleave()"
  >
    <!-- @slot Use this slot to customize tooltip's content -->
    <slot />

    <div class="geo-tooltip__arrow" />
  </div>
</template>

<script>
import _ from 'lodash'

import throttle from '../../utils/throttle'
import getDOMElementOffset from '../../utils/getDOMElementOffset'

import cssSuffix from '../../mixins/cssModifierMixin'

/** @type {number} */
let existingTooltipsCount = 0

/** @type {Element|null} */
let tooltipContainerElement = null

const POSITIONS = {
  bottom: 'bottom',
  leading: 'leading',
  top: 'top',
  trailing: 'trailing'
}

const ALIGNMENTS = {
  start: 'start',
  end: 'end',
  middle: 'middle'
}

export default {
  name: 'GeoTooltip',
  status: 'missing-tests',
  release: '24.3.0',
  mixins: [cssSuffix],
  constants: {
    POSITIONS,
    ALIGNMENTS
  },
  props: {
    /**
     * Position of the tooltip with respect to the target triggering this
     * tooltip's visibility.
     *
     * Supported `position` values are exported under `POSITIONS` named export.
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
     */
    position: {
      type: String,
      default: POSITIONS.top,
      validator (value) {
        if (value in POSITIONS) return true

        const supportedValues = Object.values(POSITIONS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoTooltip [component] :: Unsupported value («${value}») for «position» property. Use one of ${supportedValues}`)
        return false
      }
    },

    /**
     * Alignment of the tooltip with respect to the target triggering this
     * tooltip's visibility.
     *
     * Supported `alignment` values are exported under `ALIGNMENTS` named export.
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
     */
    alignment: {
      type: String,
      default: ALIGNMENTS.middle,
      validator (value) {
        if (value in ALIGNMENTS) return true

        const supportedValues = Object.values(ALIGNMENTS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoTooltip [component] :: Unsupported value («${value}») for alignment property. Use one of ${supportedValues}`)
        return false
      }
    },

    /**
     * Milliseconds to wait before hiding the tooltip after moving cursor out
     * of the target that triggered this tooltip.
     */
    delay: {
      type: Number,
      default: 100
    },

    /**
     * Set to `true` to disable automatic triggers for this tooltip and toggle
     * its visibility with `visible` property.
     */
    manual: {
      type: Boolean,
      default: false
    },

    /**
     * When `manual` property is set to `true`, use this property to toggle
     * this tooltip's visibility.
     */
    visible: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      triggerTarget: null,
      isTriggerTargetHovered: false,
      isTooltipContentHovered: false,
      fittingPosition: null,
      fittingAlignment: null
    }
  },
  computed: {
    isVisible () {
      return this.manual
        ? this.visible
        : this.isTriggerTargetHovered || this.isTooltipContentHovered
    },

    debouncedOnTriggerTargetMouseleave () {
      return _.debounce(this.onTriggerTargetMouseleave, this.delay)
    },

    debouncedOnTooltipContentMouseleave () {
      return _.debounce(this.onTooltipContentMouseleave, this.delay)
    },

    throttledRepositionTooltip () {
      return throttle(this.repositionTooltip).bind(this)
    }
  },
  watch: {
    debouncedOnTriggerTargetMouseleave (newValue, oldValue) {
      this.triggerTarget.removeEventListener('mouseleave', oldValue)
    }
  },
  mounted () {
    existingTooltipsCount++
    addTooltipContainerIfNeeded()

    this.reattachTooltipContent()
    this.addMouseEventHandlers()
  },
  updated () {
    this.repositionTooltip()
  },
  beforeDestroy () {
    this.removeMouseEventHandlers()

    existingTooltipsCount--
    cleanupTooltipContainerIfNeeded()
  },
  methods: {
    reattachTooltipContent () {
      if (this.triggerTarget === null) {
        this.triggerTarget = this.$el.parentElement
      }

      this.$el.remove()
      tooltipContainerElement.appendChild(this.$el)
    },

    addMouseEventHandlers () {
      this.triggerTarget.addEventListener('mouseover', this.onTriggerTargetMouseover.bind(this))
      this.triggerTarget.addEventListener('mouseleave', this.debouncedOnTriggerTargetMouseleave.bind(this))
    },

    removeMouseEventHandlers () {
      this.triggerTarget.removeEventListener('mouseover', this.onTriggerTargetMouseover.bind(this))
      this.triggerTarget.removeEventListener('mouseleave', this.debouncedOnTriggerTargetMouseleave.bind(this))
    },

    onTriggerTargetMouseover () {
      this.isTriggerTargetHovered = true
      this.repositionTooltip()
      window.addEventListener('scroll', this.throttledRepositionTooltip)
    },

    onTriggerTargetMouseleave () {
      this.isTriggerTargetHovered = false
      window.removeEventListener('scroll', this.throttledRepositionTooltip)
    },

    onTooltipContentMouseover () {
      this.isTooltipContentHovered = true
    },

    onTooltipContentMouseleave () {
      this.isTooltipContentHovered = false
    },

    repositionTooltip () {
      if (!this.isVisible) return

      if (this.$el.style) {
        this.$el.style.maxWidth = null
        this.$el.style.maxHeight = null
      }

      const triggerTargetOffset = getDOMElementOffset(this.triggerTarget)
      const triggerTargetSize = {
        width: this.triggerTarget.offsetWidth,
        height: this.triggerTarget.offsetHeight
      }
      const tooltipContentSize = {
        width: this.$el.offsetWidth || 0,
        height: this.$el.offsetHeight || 0
      }

      const tooltipContentComputedStyle = this.$el.nodeType === Node.COMMENT_NODE
        ? null
        : getComputedStyle(this.$el)

      // Spacing user defined via CSS in --spacing-to-trigger-target CSS variable
      // if not supported (aka, IE11) we'll use 0
      const spacingToTriggerTarget = tooltipContentComputedStyle
        ? parseInt(tooltipContentComputedStyle.getPropertyValue('--spacing-to-trigger-target') || 0, 10)
        : 0

      const offsetForPosition = {
        [POSITIONS.top]: {
          x: triggerTargetOffset.left + triggerTargetSize.width / 2,
          y: triggerTargetOffset.top - spacingToTriggerTarget
        },
        [POSITIONS.bottom]: {
          x: triggerTargetOffset.left + triggerTargetSize.width / 2,
          y: triggerTargetOffset.top + triggerTargetSize.height + spacingToTriggerTarget
        },
        [POSITIONS.leading]: {
          x: triggerTargetOffset.left - spacingToTriggerTarget,
          y: triggerTargetOffset.top + triggerTargetSize.height / 2
        },
        [POSITIONS.trailing]: {
          x: triggerTargetOffset.left + triggerTargetSize.width + spacingToTriggerTarget,
          y: triggerTargetOffset.top + triggerTargetSize.height / 2
        }
      }

      const requestedAbsoluteOffset = offsetForPosition[this.position]

      const isRequestedAbsoluteOffsetInsideViewport = areEdgesInsideViewport(
        requestedAbsoluteOffset,
        tooltipContentSize,
        this.position
      )

      if (isRequestedAbsoluteOffsetInsideViewport) {
        return this.translateTooltipContainer({
          requestedAbsoluteOffset,
          triggerTargetSize,
          tooltipContentSize,
          tooltipPosition: this.position
        })
      }

      const oppositePositionForPosition = {
        [POSITIONS.top]: POSITIONS.bottom,
        [POSITIONS.bottom]: POSITIONS.top,
        [POSITIONS.leading]: POSITIONS.trailing,
        [POSITIONS.trailing]: POSITIONS.leading
      }

      const oppositePosition = oppositePositionForPosition[this.position]
      const oppositeAbsoluteOffset = offsetForPosition[oppositePosition]

      const isOppositeAbsoluteOffsetInsideViewport = areEdgesInsideViewport(
        oppositeAbsoluteOffset,
        tooltipContentSize,
        oppositePosition
      )

      if (isOppositeAbsoluteOffsetInsideViewport) {
        return this.translateTooltipContainer({
          requestedAbsoluteOffset: oppositeAbsoluteOffset,
          triggerTargetSize,
          tooltipContentSize,
          tooltipPosition: oppositePosition
        })
      }

      console.warn(`GeoTooltip [component] :: Tooltip content can fit neither in «${this.position}» position nor in «${oppositePosition}» position. Falling back to «${this.position}» position.`)

      return this.translateTooltipContainer({
        requestedAbsoluteOffset,
        triggerTargetSize,
        tooltipContentSize,
        tooltipPosition: this.position
      })
    },

    /**
     * @param {Object} params
     * @param {{x: number, y: number}} params.requestedAbsoluteOffset
     * @param {{width: number, height: number}} params.triggerTargetSize
     * @param {{width: number, height: number}} params.tooltipContentSize
     * @param {POSITIONS} params.tooltipPosition
     */
    translateTooltipContainer ({
      requestedAbsoluteOffset,
      triggerTargetSize,
      tooltipContentSize,
      tooltipPosition
    }) {
      const tooltipEdges = getTooltipEdges(
        requestedAbsoluteOffset,
        tooltipContentSize,
        tooltipPosition
      )
      const availableSpaceForTooltipContent = getAvailableSpaceForTooltipContent(
        requestedAbsoluteOffset,
        tooltipContentSize,
        tooltipPosition
      )

      if (this.$el.style) {
        this.$el.style.maxWidth = `${availableSpaceForTooltipContent.horizontal}px`
        this.$el.style.maxHeight = `${availableSpaceForTooltipContent.vertical}px`
      }

      const absoluteOffsetForPosition = {
        [POSITIONS.leading]: {
          x: tooltipEdges.trailing,
          y: tooltipEdges.top
        },
        [POSITIONS.trailing]: {
          x: tooltipEdges.leading,
          y: tooltipEdges.top
        },
        [POSITIONS.top]: {
          x: tooltipEdges.leading,
          y: tooltipEdges.bottom
        },
        [POSITIONS.bottom]: {
          x: tooltipEdges.leading,
          y: tooltipEdges.top
        }
      }

      const absoluteOffsetBeforeAligning = absoluteOffsetForPosition[tooltipPosition]

      const fittingAlignment = getTooltipFittingAlignment(
        absoluteOffsetBeforeAligning,
        tooltipContentSize,
        tooltipPosition,
        this.alignment
      )

      const offsetCorrectionForAlignment = {
        [ALIGNMENTS.start]: {
          x: -triggerTargetSize.width / 2,
          y: -triggerTargetSize.height / 2
        },
        [ALIGNMENTS.end]: {
          x: triggerTargetSize.width / 2,
          y: triggerTargetSize.height / 2
        },
        [ALIGNMENTS.middle]: {
          x: 0,
          y: 0
        }
      }

      const offsetCorrection = offsetCorrectionForAlignment[fittingAlignment]

      const correctedOffsetForPosition = {
        [POSITIONS.leading]: {
          x: absoluteOffsetBeforeAligning.x,
          y: absoluteOffsetBeforeAligning.y + offsetCorrection.y
        },
        [POSITIONS.trailing]: {
          x: absoluteOffsetBeforeAligning.x,
          y: absoluteOffsetBeforeAligning.y + offsetCorrection.y
        },
        [POSITIONS.top]: {
          x: absoluteOffsetBeforeAligning.x + offsetCorrection.x,
          y: absoluteOffsetBeforeAligning.y
        },
        [POSITIONS.bottom]: {
          x: absoluteOffsetBeforeAligning.x + offsetCorrection.x,
          y: absoluteOffsetBeforeAligning.y
        }
      }
      const correctedOffset = correctedOffsetForPosition[tooltipPosition]

      const transform = `translate(${correctedOffset.x}px, ${correctedOffset.y}px)`
      tooltipContainerElement.style.transform = transform

      this.fittingPosition = tooltipPosition
      this.fittingAlignment = fittingAlignment
    }
  }
}

function addTooltipContainerIfNeeded () {
  if (!tooltipContainerElement) {
    tooltipContainerElement = document.createElement('div')
    tooltipContainerElement.className = 'geo-tooltip'
  } else {
    tooltipContainerElement.remove()
  }

  document.body.appendChild(tooltipContainerElement)
}

function cleanupTooltipContainerIfNeeded () {
  if (existingTooltipsCount > 0 || !tooltipContainerElement) return

  tooltipContainerElement.remove()
}

/**
 * @param {{x: number, y: number}} absoluteOffset
 * @param {{width: number, height: number}} tooltipContentSize
 * @param {POSITIONS} tooltipPosition
 * @returns {boolean}
 */
function areEdgesInsideViewport (absoluteOffset, tooltipContentSize, tooltipPosition) {
  const viewportEdges = getViewportEdges()
  const tooltipEdges = getTooltipEdges(absoluteOffset, tooltipContentSize, tooltipPosition)

  const isEdgeFitting = {
    leading: tooltipEdges.leading >= viewportEdges.leading,
    trailing: tooltipEdges.trailing <= viewportEdges.trailing,
    top: tooltipEdges.top >= viewportEdges.top,
    bottom: tooltipEdges.bottom <= viewportEdges.bottom
  }

  return (
    isEdgeFitting.leading &&
    isEdgeFitting.trailing &&
    isEdgeFitting.top &&
    isEdgeFitting.bottom
  )
}

/**
 * @typedef {Object} Edges
 * @property {number} leading
 * @property {number} trailing
 * @property {number} top
 * @property {number} bottom
 */

/**
 * @returns {Edges}
 */
function getViewportEdges () {
  const viewportEdges = {
    leading: document.documentElement.scrollLeft,
    trailing: document.documentElement.clientWidth + document.documentElement.scrollLeft,
    top: document.documentElement.scrollTop,
    bottom: document.documentElement.clientHeight + document.documentElement.scrollTop
  }

  return viewportEdges
}

/**
 * @param {{x: number, y: number}} absoluteOffset
 * @param {{width: number, height: number}} tooltipContentSize
 * @param {POSITIONS} tooltipPosition
 * @returns {Edges}
 */
function getTooltipEdges (absoluteOffset, tooltipContentSize, tooltipPosition) {
  const tooltipEdgesForPosition = {
    [POSITIONS.leading]: {
      leading: absoluteOffset.x - tooltipContentSize.width,
      trailing: absoluteOffset.x,
      top: absoluteOffset.y,
      bottom: absoluteOffset.y
    },
    [POSITIONS.trailing]: {
      leading: absoluteOffset.x,
      trailing: absoluteOffset.x + tooltipContentSize.width,
      top: absoluteOffset.y,
      bottom: absoluteOffset.y
    },
    [POSITIONS.top]: {
      leading: absoluteOffset.x,
      trailing: absoluteOffset.x,
      top: absoluteOffset.y - tooltipContentSize.height,
      bottom: absoluteOffset.y
    },
    [POSITIONS.bottom]: {
      leading: absoluteOffset.x,
      trailing: absoluteOffset.x,
      top: absoluteOffset.y,
      bottom: absoluteOffset.y + tooltipContentSize.height
    }
  }

  const tooltipEdges = tooltipEdgesForPosition[tooltipPosition]

  return tooltipEdges
}

/**
 * @type {Object} Size
 * @property {number} width
 * @property {number} height
 */

/**
 * @param {{x: number, y: number}} absoluteOffset
 * @param {{width: number, height: number}} tooltipContentSize
 * @param {POSITIONS} tooltipPosition
 * @returns {{horizontal: number, vertical: number}}
 */
function getAvailableSpaceForTooltipContent (absoluteOffset, tooltipContentSize, tooltipPosition) {
  const viewportEdges = getViewportEdges()
  const tooltipEdges = getTooltipEdges(absoluteOffset, tooltipContentSize, tooltipPosition)
  const availableSpaceForTooltipContentPosition = {
    [POSITIONS.leading]: {
      horizontal: tooltipEdges.trailing - viewportEdges.leading,
      vertical: viewportEdges.bottom - viewportEdges.top
    },
    [POSITIONS.trailing]: {
      horizontal: viewportEdges.trailing - tooltipEdges.leading,
      vertical: viewportEdges.bottom - viewportEdges.top
    },
    [POSITIONS.top]: {
      horizontal: viewportEdges.trailing - viewportEdges.leading,
      vertical: tooltipEdges.bottom - viewportEdges.top
    },
    [POSITIONS.bottom]: {
      horizontal: viewportEdges.trailing - viewportEdges.leading,
      vertical: viewportEdges.bottom - tooltipEdges.top
    }
  }

  const availableSpaceForTooltipContent = availableSpaceForTooltipContentPosition[tooltipPosition]

  return availableSpaceForTooltipContent
}

/**
 * @param {{x: number, y: number}} absoluteOffset
 * @param {{width: number, height: number}} tooltipContentSize
 * @param {POSITIONS} tooltipPosition
 * @param {ALIGNMENTS} preferredAlignment
 * @returns {ALIGNMENTS}
 */
function getTooltipFittingAlignment (absoluteOffset, tooltipContentSize, tooltipPosition, preferredAlignment) {
  const viewportEdges = getViewportEdges()
  const tooltipEdges = getTooltipEdges(absoluteOffset, tooltipContentSize, tooltipPosition)

  const availableSpaceUntilAnchorForPosition = {
    [POSITIONS.leading]: tooltipEdges.bottom - viewportEdges.top,
    [POSITIONS.trailing]: tooltipEdges.bottom - viewportEdges.top,
    [POSITIONS.top]: tooltipEdges.trailing - viewportEdges.leading,
    [POSITIONS.bottom]: tooltipEdges.trailing - viewportEdges.leading
  }

  const availableSpaceAfterAnchorForPosition = {
    [POSITIONS.leading]: viewportEdges.bottom - tooltipEdges.top,
    [POSITIONS.trailing]: viewportEdges.bottom - tooltipEdges.top,
    [POSITIONS.top]: viewportEdges.trailing - tooltipEdges.leading,
    [POSITIONS.bottom]: viewportEdges.trailing - tooltipEdges.leading
  }

  const requiredSpaceForPosition = {
    [POSITIONS.leading]: tooltipContentSize.height,
    [POSITIONS.trailing]: tooltipContentSize.height,
    [POSITIONS.top]: tooltipContentSize.width,
    [POSITIONS.bottom]: tooltipContentSize.width
  }

  const requiredSpace = requiredSpaceForPosition[tooltipPosition]

  const isAlignmentFitting = {
    [ALIGNMENTS.start]: availableSpaceAfterAnchorForPosition[tooltipPosition] >= requiredSpace,
    [ALIGNMENTS.end]: availableSpaceUntilAnchorForPosition[tooltipPosition] >= requiredSpace,
    [ALIGNMENTS.middle]: true // Middle alignment always fit because it's the widest possible
  }

  if (isAlignmentFitting[preferredAlignment]) return preferredAlignment
  if (isAlignmentFitting[ALIGNMENTS.start]) return ALIGNMENTS.start
  if (isAlignmentFitting[ALIGNMENTS.end]) return ALIGNMENTS.end

  return ALIGNMENTS.middle
}
</script>
