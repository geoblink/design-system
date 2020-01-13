<template>
  <div
    v-if="isVisible"
    :class="{
      'geo-tooltip__content': true,
      [`geo-tooltip__content--${fittingPosition}`]: fittingPosition,
      [`geo-tooltip__content--${fittingAlignment}`]: fittingAlignment
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

import { enumPropertyFactory } from '../../utils/enumPropertyFactory'
import throttle from '../../utils/throttle'
import getDOMElementOffset from '../../utils/getDOMElementOffset'
import counterFactory from '../../utils/counterFactory'
import { POSITIONS, ALIGNMENTS } from './GeoTooltip.constants'

/** @type {number} */
let existingTooltipsCount = 0
const getNextStaticTooltipId = counterFactory()

/** @type {Element|null} */
let tooltipContainerElement = null

/**
 * `GeoTooltip` is a component used to display a tooltip. Using this component
 * you can render complex HTML tooltips in a safe and reactive way.
 */
export default {
  name: 'GeoTooltip',
  status: 'ready',
  release: '24.4.0',
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
    position: enumPropertyFactory({
      componentName: 'GeoTooltip',
      propertyName: 'position',
      enumDictionary: POSITIONS,
      defaultValue: POSITIONS.top
    }),

    /**
     * Alignment of the tooltip with respect to the target triggering this
     * tooltip's visibility.
     *
     * Supported `alignment` values are exported under `ALIGNMENTS` named export.
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
     */
    alignment: enumPropertyFactory({
      componentName: 'GeoTooltip',
      propertyName: 'alignment',
      enumDictionary: ALIGNMENTS,
      defaultValue: ALIGNMENTS.middle
    }),

    /**
     * Milliseconds to wait before hiding the tooltip after moving cursor out
     * of the target that triggered this tooltip.
     */
    delay: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0
      }
    },

    /**
     * Set a value to this property to disable automatic showing/hiding and
     * manually control whether this tooltip should be visible (`true`) or
     * hidden (`false`).
     */
    visible: {
      type: Boolean,
      default: undefined,
      required: false
    },

    /**
     * Force the triggerTarget of the tooltip.
     *
     * In the app, this is used with the plugin ReactiveRefs, to directly pass the `ref`
     * of the forced target into `forcedTriggerTarget` prop.
     *
     * See [ReactiveRefs](https://github.com/posva/vue-reactive-refs)
     * for more info about the plugin.
     */
    forcedTriggerTarget: {
      type: null,
      required: false
    },

    /**
     * Places the tooltip in an isolated container.
     *
     * You’ll probably want to set this to true if you want to display this tooltip
     * regardless any user interaction.
     */
    static: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      triggerTarget: null,
      isTriggerTargetHovered: false,
      isTooltipContentHovered: false,
      fittingPosition: null,
      fittingAlignment: null,
      originalParentElement: null,
      staticTooltipMutationObserver: null,
      staticTooltipId: null,
      staticTooltipContainer: null
    }
  },
  computed: {
    isVisible () {
      return _.isBoolean(this.visible)
        ? this.visible
        : this.isTriggerTargetHovered || this.isTooltipContentHovered
    },

    debouncedOnTriggerTargetMouseleave () {
      return _.debounce(this.onTriggerTargetMouseleave, this.delay).bind(this)
    },

    debouncedOnTooltipContentMouseleave () {
      return _.debounce(this.onTooltipContentMouseleave, this.delay)
    },

    throttledRepositionTooltip () {
      return throttle(this.repositionTooltip).bind(this)
    },

    onTriggerTargetMouseoverBound () {
      return this.onTriggerTargetMouseover.bind(this)
    }
  },
  watch: {
    debouncedOnTriggerTargetMouseleave (newValue, oldValue) {
      this.triggerTarget.removeEventListener('mouseleave', oldValue)
      this.triggerTarget.addEventListener('mouseleave', newValue)
    },

    forcedTriggerTarget () {
      this.removeMouseEventHandlers()
      this.reattachTooltipContent()
      this.addMouseEventHandlers()
    },

    static (newValue, oldValue) {
      if (newValue === true) {
        this.cleanUpRegularTooltip()
        this.setUpStaticTooltip()
      } else {
        this.cleanUpStaticTooltip()
        this.setUpRegularTooltip()
      }
    }
  },
  mounted () {
    this.originalParentElement = this.$el.parentElement
    if (this.static) {
      this.setUpStaticTooltip()
    } else {
      this.setUpRegularTooltip()
    }

    this.reattachTooltipContent()
    this.addMouseEventHandlers()
    this.repositionTooltip()
  },
  updated () {
    this.repositionTooltip()
    this.checkSeveralTooltips()
  },
  beforeDestroy () {
    this.$el.remove()

    if (this.static) {
      this.cleanUpStaticTooltip()
    } else {
      this.cleanUpRegularTooltip()
    }
  },
  methods: {
    reattachTooltipContent () {
      this.triggerTarget = this.forcedTriggerTarget || this.originalParentElement
      this.$el.remove()
      if (this.static) {
        this.staticTooltipContainer.appendChild(this.$el)
      } else {
        tooltipContainerElement.appendChild(this.$el)
      }
    },

    addMouseEventHandlers () {
      this.triggerTarget.addEventListener('mouseover', this.onTriggerTargetMouseoverBound)
      this.triggerTarget.addEventListener('mouseleave', this.debouncedOnTriggerTargetMouseleave)
    },

    removeMouseEventHandlers () {
      this.triggerTarget.removeEventListener('mouseover', this.onTriggerTargetMouseoverBound)
      this.triggerTarget.removeEventListener('mouseleave', this.debouncedOnTriggerTargetMouseleave)
      this.onTooltipContentMouseleave()
      this.onTriggerTargetMouseleave()
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

      this.$nextTick().then(() => {
        if (this.$el && this.$el.style) {
          this.$el.style.removeProperty('--available-width')
          this.$el.style.removeProperty('--available-height')
        }

        const triggerTargetOffset = getDOMElementOffset(this.triggerTarget)
        const triggerTargetClientBoundingRect = this.triggerTarget.getBoundingClientRect()
        const triggerTargetSize = {
          width: triggerTargetClientBoundingRect.right - triggerTargetClientBoundingRect.left,
          height: triggerTargetClientBoundingRect.bottom - triggerTargetClientBoundingRect.top
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
          this.position,
          this.alignment
        )

        if (!isRequestedAbsoluteOffsetInsideViewport) {
          console.warn(`GeoTooltip [component] :: Tooltip content can't fit in «${this.position}» position with «${this.alignment}» alignment.`)
        }

        return this.translateTooltipContainer({
          requestedAbsoluteOffset,
          triggerTargetSize,
          tooltipContentSize,
          tooltipPosition: this.position,
          tooltipAlignment: this.alignment
        })
      })
    },

    /**
     * @param {Object} params
     * @param {{x: number, y: number}} params.requestedAbsoluteOffset
     * @param {{width: number, height: number}} params.triggerTargetSize
     * @param {{width: number, height: number}} params.tooltipContentSize
     * @param {POSITIONS} params.tooltipPosition
     * @param {ALIGNMENTS} params.tooltipAlignment
     */
    translateTooltipContainer ({
      requestedAbsoluteOffset,
      triggerTargetSize,
      tooltipContentSize,
      tooltipPosition,
      tooltipAlignment
    }) {
      const availableSpaceForTooltipContent = getAvailableSpaceForTooltipContent(
        requestedAbsoluteOffset,
        tooltipPosition,
        tooltipAlignment
      )

      if (this.$el && this.$el.style) {
        this.$el.style.setProperty('--available-width', `${availableSpaceForTooltipContent.horizontal}px`)
        this.$el.style.setProperty('--available-height', `${availableSpaceForTooltipContent.vertical}px`)
      }

      const absoluteOffsetBeforeAligning = getTooltipContainerAbsoluteOffset({
        requestedAbsoluteOffset,
        triggerTargetSize,
        tooltipContentSize,
        tooltipPosition,
        tooltipAlignment
      })

      const fittingAlignment = getTooltipFittingAlignment(
        absoluteOffsetBeforeAligning,
        tooltipContentSize,
        tooltipPosition,
        tooltipAlignment
      )

      const absoluteOffsetForFittingAlignment = getTooltipContainerAbsoluteOffset({
        requestedAbsoluteOffset,
        triggerTargetSize,
        tooltipContentSize,
        tooltipPosition,
        tooltipAlignment: fittingAlignment
      })

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
          x: absoluteOffsetForFittingAlignment.x,
          y: absoluteOffsetForFittingAlignment.y + offsetCorrection.y
        },
        [POSITIONS.trailing]: {
          x: absoluteOffsetForFittingAlignment.x,
          y: absoluteOffsetForFittingAlignment.y + offsetCorrection.y
        },
        [POSITIONS.top]: {
          x: absoluteOffsetForFittingAlignment.x + offsetCorrection.x,
          y: absoluteOffsetForFittingAlignment.y
        },
        [POSITIONS.bottom]: {
          x: absoluteOffsetForFittingAlignment.x + offsetCorrection.x,
          y: absoluteOffsetForFittingAlignment.y
        }
      }
      const correctedOffset = correctedOffsetForPosition[tooltipPosition]

      const transform = `translate(${correctedOffset.x}px, ${correctedOffset.y}px)`
      if (this.static) {
        if (this.staticTooltipContainer) {
          this.staticTooltipContainer.style.transform = transform
        }
      } else {
        if (tooltipContainerElement) {
          tooltipContainerElement.style.transform = transform
        }
      }

      this.fittingPosition = tooltipPosition
      this.fittingAlignment = fittingAlignment
    },

    setUpStaticTooltip () {
      this.staticTooltipId = getNextStaticTooltipId()
      this.addStaticTooltipContainer()

      if (typeof MutationObserver !== 'undefined') {
        const mutationObserver = new MutationObserver(() => this.throttledRepositionTooltip())
        mutationObserver.observe(document.body, {
          attributes: true,
          subtree: true
        })
        this.staticTooltipMutationObserver = mutationObserver
      }
    },

    cleanUpStaticTooltip () {
      if (this.staticTooltipMutationObserver) {
        this.staticTooltipMutationObserver.disconnect()
        this.staticTooltipMutationObserver = null
      }

      this.removeMouseEventHandlers()
      this.removeStaticTooltipContainer()
      this.staticTooltipId = null
    },

    setUpRegularTooltip () {
      existingTooltipsCount++
      addTooltipContainerIfNeeded()
    },

    cleanUpRegularTooltip () {
      this.removeMouseEventHandlers()
      existingTooltipsCount--
      cleanupTooltipContainerIfNeeded()
    },

    addStaticTooltipContainer () {
      this.staticTooltipContainer = document.createElement('div')
      this.staticTooltipContainer.className = `geo-tooltip-static geo-tooltip-static--${this.staticTooltipId}`

      document.body.appendChild(this.staticTooltipContainer)
    },

    removeStaticTooltipContainer () {
      this.staticTooltipContainer.remove()
      this.staticTooltipContainer = null
    },

    checkSeveralTooltips () {
      if (existingTooltipsCount > 1) {
        const visibleTooltips = document.querySelectorAll('.geo-tooltip .geo-tooltip__content')
        if (visibleTooltips.length > 1) {
          visibleTooltips.forEach((element) => {
            if (element && element === this.$el) {
              element.style.display = null
            } else {
              element.style.display = 'none'
            }
          })
        }
      }
    }
  }
}

/**
 * @param {Object} params
 * @param {{x: number, y: number}} params.requestedAbsoluteOffset
 * @param {{width: number, height: number}} params.triggerTargetSize
 * @param {{width: number, height: number}} params.tooltipContentSize
 * @param {POSITIONS} params.tooltipPosition
 * @param {ALIGNMENTS} params.tooltipAlignment
 * @returns {Edges}
 */
function getTooltipContainerAbsoluteOffset ({
  requestedAbsoluteOffset,
  triggerTargetSize,
  tooltipContentSize,
  tooltipPosition,
  tooltipAlignment
}) {
  const tooltipEdges = getTooltipEdges(
    requestedAbsoluteOffset,
    tooltipContentSize,
    tooltipPosition,
    tooltipAlignment
  )

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

  const absoluteOffset = absoluteOffsetForPosition[tooltipPosition]

  return absoluteOffset
}

function addTooltipContainerIfNeeded () {
  if (tooltipContainerElement) return

  tooltipContainerElement = document.createElement('div')
  tooltipContainerElement.className = 'geo-tooltip'
  document.body.appendChild(tooltipContainerElement)
}

function cleanupTooltipContainerIfNeeded () {
  if (existingTooltipsCount > 0 || !tooltipContainerElement) return

  tooltipContainerElement.remove()
  tooltipContainerElement = null
}

/**
 * @param {{x: number, y: number}} absoluteOffset
 * @param {{width: number, height: number}} tooltipContentSize
 * @param {POSITIONS} tooltipPosition
 * @param {ALIGNMENTS} tooltipAlignment
 * @returns {boolean}
 */
export function areEdgesInsideViewport (absoluteOffset, tooltipContentSize, tooltipPosition, tooltipAlignment) {
  const viewportEdges = getViewportEdges()
  const tooltipEdges = getTooltipEdges(absoluteOffset, tooltipContentSize, tooltipPosition, tooltipAlignment)

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
export function getViewportEdges () {
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
 * @param {ALIGNMENT} tooltipAlignment
 * @returns {Edges}
 */
export function getTooltipEdges (absoluteOffset, tooltipContentSize, tooltipPosition, tooltipAlignment) {
  const tooltipEdgesForPosition = {
    [POSITIONS.leading]: {
      [ALIGNMENTS.start]: {
        leading: absoluteOffset.x - tooltipContentSize.width,
        trailing: absoluteOffset.x,
        top: absoluteOffset.y,
        bottom: absoluteOffset.y + tooltipContentSize.height
      },
      [ALIGNMENTS.end]: {
        leading: absoluteOffset.x - tooltipContentSize.width,
        trailing: absoluteOffset.x,
        top: absoluteOffset.y - tooltipContentSize.height,
        bottom: absoluteOffset.y
      },
      [ALIGNMENTS.middle]: {
        leading: absoluteOffset.x - tooltipContentSize.width,
        trailing: absoluteOffset.x,
        top: absoluteOffset.y - tooltipContentSize.height / 2,
        bottom: absoluteOffset.y + tooltipContentSize.height / 2
      }
    },
    [POSITIONS.trailing]: {
      [ALIGNMENTS.start]: {
        leading: absoluteOffset.x,
        trailing: absoluteOffset.x + tooltipContentSize.width,
        top: absoluteOffset.y,
        bottom: absoluteOffset.y + tooltipContentSize.height
      },
      [ALIGNMENTS.end]: {
        leading: absoluteOffset.x,
        trailing: absoluteOffset.x + tooltipContentSize.width,
        top: absoluteOffset.y - tooltipContentSize.height,
        bottom: absoluteOffset.y
      },
      [ALIGNMENTS.middle]: {
        leading: absoluteOffset.x,
        trailing: absoluteOffset.x + tooltipContentSize.width,
        top: absoluteOffset.y - tooltipContentSize.height / 2,
        bottom: absoluteOffset.y + tooltipContentSize.height / 2
      }
    },
    [POSITIONS.top]: {
      [ALIGNMENTS.start]: {
        leading: absoluteOffset.x,
        trailing: absoluteOffset.x + tooltipContentSize.width,
        top: absoluteOffset.y - tooltipContentSize.height,
        bottom: absoluteOffset.y
      },
      [ALIGNMENTS.end]: {
        leading: absoluteOffset.x - tooltipContentSize.width,
        trailing: absoluteOffset.x,
        top: absoluteOffset.y - tooltipContentSize.height,
        bottom: absoluteOffset.y
      },
      [ALIGNMENTS.middle]: {
        leading: absoluteOffset.x - tooltipContentSize.width / 2,
        trailing: absoluteOffset.x + tooltipContentSize.width / 2,
        top: absoluteOffset.y - tooltipContentSize.height,
        bottom: absoluteOffset.y
      }
    },
    [POSITIONS.bottom]: {
      [ALIGNMENTS.start]: {
        leading: absoluteOffset.x,
        trailing: absoluteOffset.x + tooltipContentSize.width,
        top: absoluteOffset.y,
        bottom: absoluteOffset.y + tooltipContentSize.height
      },
      [ALIGNMENTS.end]: {
        leading: absoluteOffset.x - tooltipContentSize.width,
        trailing: absoluteOffset.x,
        top: absoluteOffset.y,
        bottom: absoluteOffset.y + tooltipContentSize.height
      },
      [ALIGNMENTS.middle]: {
        leading: absoluteOffset.x - tooltipContentSize.width / 2,
        trailing: absoluteOffset.x + tooltipContentSize.width / 2,
        top: absoluteOffset.y,
        bottom: absoluteOffset.y + tooltipContentSize.height
      }
    }
  }

  const tooltipEdges = tooltipEdgesForPosition[tooltipPosition][tooltipAlignment]

  return tooltipEdges
}

/**
 * @type {Object} Size
 * @property {number} width
 * @property {number} height
 */

/**
 * @param {{x: number, y: number}} absoluteOffset
 * @param {POSITIONS} tooltipPosition
 * @param {ALIGNMENTS} tooltipAlignment
 * @returns {{horizontal: number, vertical: number}}
 */
export function getAvailableSpaceForTooltipContent (absoluteOffset, tooltipPosition, tooltipAlignment) {
  const viewportEdges = getViewportEdges()
  const tooltipEdges = getTooltipEdges(absoluteOffset, { width: 0, height: 0 }, tooltipPosition, tooltipAlignment)
  const availableSpaceForTooltipContentPosition = {
    [POSITIONS.leading]: {
      [ALIGNMENTS.start]: {
        horizontal: tooltipEdges.trailing - viewportEdges.leading,
        vertical: viewportEdges.bottom - tooltipEdges.top
      },
      [ALIGNMENTS.end]: {
        horizontal: tooltipEdges.trailing - viewportEdges.leading,
        vertical: tooltipEdges.bottom - viewportEdges.top
      },
      [ALIGNMENTS.middle]: {
        horizontal: tooltipEdges.trailing - viewportEdges.leading,
        vertical: viewportEdges.bottom - viewportEdges.top
      }
    },
    [POSITIONS.trailing]: {
      [ALIGNMENTS.start]: {
        horizontal: viewportEdges.trailing - tooltipEdges.leading,
        vertical: viewportEdges.bottom - tooltipEdges.top
      },
      [ALIGNMENTS.end]: {
        horizontal: viewportEdges.trailing - tooltipEdges.leading,
        vertical: tooltipEdges.bottom - viewportEdges.top
      },
      [ALIGNMENTS.middle]: {
        horizontal: viewportEdges.trailing - tooltipEdges.leading,
        vertical: viewportEdges.bottom - viewportEdges.top
      }
    },
    [POSITIONS.top]: {
      [ALIGNMENTS.start]: {
        horizontal: viewportEdges.trailing - tooltipEdges.leading,
        vertical: tooltipEdges.bottom - viewportEdges.top
      },
      [ALIGNMENTS.end]: {
        horizontal: tooltipEdges.trailing - viewportEdges.leading,
        vertical: tooltipEdges.bottom - viewportEdges.top
      },
      [ALIGNMENTS.middle]: {
        horizontal: viewportEdges.trailing - viewportEdges.leading,
        vertical: tooltipEdges.bottom - viewportEdges.top
      }
    },
    [POSITIONS.bottom]: {
      [ALIGNMENTS.start]: {
        horizontal: viewportEdges.trailing - tooltipEdges.leading,
        vertical: viewportEdges.bottom - tooltipEdges.top
      },
      [ALIGNMENTS.end]: {
        horizontal: tooltipEdges.trailing - viewportEdges.leading,
        vertical: viewportEdges.bottom - tooltipEdges.top
      },
      [ALIGNMENTS.middle]: {
        horizontal: viewportEdges.trailing - viewportEdges.leading,
        vertical: viewportEdges.bottom - tooltipEdges.top
      }
    }
  }

  const availableSpaceForTooltipContent = availableSpaceForTooltipContentPosition[tooltipPosition][tooltipAlignment]

  return availableSpaceForTooltipContent
}

/**
 * @param {{x: number, y: number}} absoluteOffset
 * @param {{width: number, height: number}} tooltipContentSize
 * @param {POSITIONS} tooltipPosition
 * @param {ALIGNMENTS} preferredAlignment
 * @returns {ALIGNMENTS}
 */
export function getTooltipFittingAlignment (absoluteOffset, tooltipContentSize, tooltipPosition, preferredAlignment) {
  const viewportEdges = getViewportEdges()
  const alignmentsByPreference = [
    preferredAlignment,
    ALIGNMENTS.start,
    ALIGNMENTS.end,
    ALIGNMENTS.middle
  ]

  const firstFittingAlignment = _.find(alignmentsByPreference, function (alignment) {
    const tooltipEdgesForAlignment = getTooltipEdges(
      absoluteOffset,
      tooltipContentSize,
      tooltipPosition,
      alignment
    )

    return areEdgesInsideBounds(tooltipEdgesForAlignment, viewportEdges)
  })

  if (firstFittingAlignment) return firstFittingAlignment

  // If not alignment fit then we return middle alignment because it's the one
  // taking more available space
  return ALIGNMENTS.middle
}

/**
 * @param {Edges} innerEdges
 * @param {Edges} outerEdges
 * @returns {boolean}
 */
function areEdgesInsideBounds (innerEdges, outerEdges) {
  return (
    _.inRange(innerEdges.leading, outerEdges.leading, outerEdges.trailing) &&
    _.inRange(innerEdges.trailing, outerEdges.leading, outerEdges.trailing) &&
    _.inRange(innerEdges.top, outerEdges.top, outerEdges.bottom) &&
    _.inRange(innerEdges.bottom, outerEdges.top, outerEdges.bottom)
  )
}
</script>
