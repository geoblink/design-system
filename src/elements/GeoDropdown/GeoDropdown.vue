<template>
  <div
    v-scroll-anywhere="checkScrollEventAndRepositionIfNeeded"
    v-click-outside="checkClickCoordinatesAndEmitClickOutside"
    :class="{
      ['geo-dropdown']: true,
      ['geo-dropdown--is-open']: isOpened
    }"
  >
    <!-- @slot Use this slot to customize the button used to toggle the popup -->
    <slot name="toggleButton" />

    <div
      :ref="POPUP_REF_NAME"
      :class="[popupClass, {
        ['geo-dropdown__popup']: true,
        ['geo-dropdown__popup--is-open']: isOpened
      }]"
      :style="popupStyle"
    >
      <!-- @slot Use this slot to customize popup's content -->
      <slot
        v-if="isOpened"
        name="popupContent"
      />
    </div>
  </div>
</template>

<script>
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'
import ClickOutside from '../../directives/GeoClickOutside'
import ScrollAnywhere from '../../directives/GeoScrollAnywhere'
import * as GeoDropdownConstants from './GeoDropdown.constants'
import _ from 'lodash'

/**
 * `GeoDropdown` is a combination of a button and a popup which can be toggled in
 * and out using the button. It's suitable for dropdown menus and actions which
 * require additional or complex user input like handling data filters.
 *
 * The popup is smartly repositioned when it does not fit below the toggle button
 * and is pinned to right side of the button when its content overflows viewport
 * if pinned to left side.
 */
export default {
  name: 'GeoDropdown',
  status: 'ready',
  release: '4.0.0',
  constants: GeoDropdownConstants,
  directives: {
    ScrollAnywhere,
    ClickOutside
  },
  props: {
    /**
     * Whether the popup attached to this menu should be visible (`true`) or not.
     */
    opened: {
      type: Boolean,
      required: true
    },
    /**
     * Position of the popup relative to the container. `right` or `left`
     * Values available in `X_AXIS_POSITION`:
     *
     * - `X_AXIS_POSITION.right`
     * - `X_AXIS_POSITION.left`
     */
    preferredXAxisPosition: enumPropertyFactory({
      componentName: 'GeoDropdown',
      propertyName: 'preferredXAxisPosition',
      enumDictionary: GeoDropdownConstants.X_AXIS_POSITION,
      defaultValue: GeoDropdownConstants.X_AXIS_POSITION.left
    }),

    /**
     * Preferred position of the popup relative to the container. `top` or
     * `bottom`.
     *
     * This is the position that will be used when the popup fits both above
     * and below. Values available in `Y_AXIS_POSITION`:
     *
     * - `Y_AXIS_POSITION.top`
     * - `Y_AXIS_POSITION.bottom`
     */
    preferredYAxisPosition: enumPropertyFactory({
      componentName: 'GeoDropdown',
      propertyName: 'preferredYAxisPosition',
      enumDictionary: GeoDropdownConstants.Y_AXIS_POSITION,
      defaultValue: GeoDropdownConstants.Y_AXIS_POSITION.bottom
    }),

    /**
     * Forced position of the popup relative to the container. `top`, `bottom`
     * or none.
     *
     * If provided, this is the position that the popup will use regardless
     * whether it fits or not. Values available in `Y_AXIS_POSITION`:
     *
     * - `Y_AXIS_POSITION.top`
     * - `Y_AXIS_POSITION.bottom`
     */
    forceYAxisPosition: enumPropertyFactory({
      componentName: 'GeoDropdown',
      propertyName: 'forceYAxisPosition',
      enumDictionary: GeoDropdownConstants.Y_AXIS_POSITION,
      required: false,
      checkUndefined: true
    }),

    /**
     * When this property is `true`, the popup width will be the same as that of
     * the toggle button.
     */
    fixedWidth: {
      type: Boolean,
      default: false
    },

    /**
     * Class or classes that will be added to the popup element
     */
    popupClass: {
      type: [String, Array, Object],
      required: false
    },

    /**
     * Whether the popup's position should be recalculated when the component updates
     */
    repositionOnUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      horizontalAxisConfig: {
        left: {
          translation: 0,
          availableWidth: null
        },

        right: {
          translation: 0,
          availableWidth: null
        }
      },

      horizontalAxisPosition: 'left',

      verticalAxisConfig: {
        top: {
          translation: 0,
          availableHeight: null
        },

        bottom: {
          translation: 0,
          availableHeight: null
        }
      },

      verticalAxisPosition: 'bottom',

      toggleButtonWidth: null
    }
  },
  computed: {
    isOpened () {
      return this.opened
    },

    popupAnchor () {
      const anchorForHorizontalAxisPosition = {
        [GeoDropdownConstants.X_AXIS_POSITION.left]: 'left',
        [GeoDropdownConstants.X_AXIS_POSITION.right]: 'right'
      }
      const anchorForVerticalAxisPosition = {
        [GeoDropdownConstants.Y_AXIS_POSITION.top]: 'bottom',
        [GeoDropdownConstants.Y_AXIS_POSITION.bottom]: 'top'
      }

      return {
        xAxis: anchorForHorizontalAxisPosition[this.horizontalAxisPosition],
        yAxis: anchorForVerticalAxisPosition[this.verticalAxisPosition]
      }
    },

    popupTranslation () {
      const horizontalAxisConfig = this.horizontalAxisConfig[this.horizontalAxisPosition]
      const verticalAxisConfig = this.verticalAxisConfig[this.verticalAxisPosition]

      return {
        x: horizontalAxisConfig.translation,
        y: verticalAxisConfig.translation
      }
    },

    popupMaxSize () {
      const horizontalAxisConfig = this.horizontalAxisConfig[this.horizontalAxisPosition]
      const verticalAxisConfig = this.verticalAxisConfig[this.verticalAxisPosition]

      return {
        width: horizontalAxisConfig.availableWidth,
        height: verticalAxisConfig.availableHeight
      }
    },

    popupStyle () {
      const styles = {
        [this.popupAnchor.xAxis]: '0px',
        [this.popupAnchor.yAxis]: '0px',
        'max-height': `${this.popupMaxSize.height}px`,
        'max-width': `${this.popupMaxSize.width}px`,
        transform: `translate(
          ${Math.round(this.popupTranslation.x)}px,
          ${Math.round(this.popupTranslation.y)}px
        )`
      }

      if (this.fixedWidth) {
        styles.width = `${this.toggleButtonWidth}px`
      }

      return styles
    }
  },
  watch: {
    isOpened () {
      this.repositionPopup()
      this.$nextTick(this.repositionPopup.bind(this))
    },

    fixedWidth () {
      this.repositionPopup()
      this.$nextTick(this.repositionPopup.bind(this))
    }
  },
  created () {
    this.POPUP_REF_NAME = 'popup'
  },
  mounted () {
    this.reattachPopupToDocumentBody()
  },
  updated () {
    if (!this.repositionOnUpdate) return
    this.repositionPopup()
    this.$nextTick(this.repositionPopup.bind(this))
  },
  beforeDestroy () {
    this.removePopupFromDOM()
  },
  methods: {
    removePopupFromDOM () {
      const popupElement = this.$refs.popup
      if (popupElement.parentNode) {
        popupElement.parentNode.removeChild(popupElement)
      }
    },

    reattachPopupToDocumentBody () {
      const popupElement = this.$refs.popup
      this.removePopupFromDOM()
      document.body.appendChild(popupElement)
      this.repositionPopup()
    },

    repositionPopup () {
      if (!this.isOpened) return
      // Positioning algorithm requires a real DOM
      if (this.$isServer) return
      if (!this.$el || !this.$refs.popup) return

      const viewport = {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
      }

      const containerElement = this.$el
      const popupElement = this.$refs.popup

      if (popupElement.style) {
        popupElement.style.removeProperty('--available-width')
        popupElement.style.removeProperty('--available-height')
      }

      const containerRect = containerElement.getBoundingClientRect()
      const popupRect = popupElement.getBoundingClientRect()

      // We need to update horizontal axis positioning settings for both
      // scenarios: when dropdown is left-aligned and when it's right-aligned

      const xAxisTranslationTowardsLeft = -(viewport.width - containerRect.right)
      const xAxisTranslationTowardsRight = containerRect.left

      this.horizontalAxisConfig.left.translation = xAxisTranslationTowardsRight
      this.horizontalAxisConfig.right.translation = xAxisTranslationTowardsLeft

      const availableWidthTowardsLeft = Math.max(containerRect.right, 0)
      const availableWidthTowardsRight = Math.max(viewport.width - containerRect.left, 0)

      this.horizontalAxisConfig.left.availableWidth = availableWidthTowardsRight
      this.horizontalAxisConfig.right.availableWidth = availableWidthTowardsLeft

      // We need to update vertical axis positioning settings for both
      // scenarios: when dropdown is above and when it's below

      const popupComputedStyle = getComputedStyle(popupElement)

      // Spacing user defined via CSS in --spacing-to-toggle-button CSS variable
      // if not supported (aka, IE11) we'll use 0
      const spacingToToggleButton = parseInt(popupComputedStyle.getPropertyValue('--spacing-to-toggle-button') || '0', 10)

      const availableHeightAbove = Math.max(containerRect.top - spacingToToggleButton * 2, 0)
      const availableHeightBelow = Math.max(viewport.height - containerRect.bottom - spacingToToggleButton * 2, 0)

      this.verticalAxisConfig.top.availableHeight = availableHeightAbove
      this.verticalAxisConfig.bottom.availableHeight = availableHeightBelow

      // Translation required in the y-axis to position the popup so it's
      // content is displayed towards the bottom/top of the page, assuming popup
      // is properly positioned in top left corner anchor of the container
      const belowTranslationY = containerRect.bottom + spacingToToggleButton
      const aboveTranslationY = -(viewport.height - containerRect.top + spacingToToggleButton)

      this.verticalAxisConfig.top.translation = aboveTranslationY
      this.verticalAxisConfig.bottom.translation = belowTranslationY

      // We'll choose proper position based on whether the content will fit
      // the screen or not.
      const fitsTowardsRight = popupRect.width < availableWidthTowardsRight
      const fitsTowardsLeft = popupRect.width < availableWidthTowardsLeft
      const fitsBelow = popupRect.height < availableHeightBelow
      const fitsAbove = popupRect.height < availableHeightAbove

      // We set the config for each possible position, if fits, preferred position
      // and fallback position
      const configTowardsLeft = {
        fitsTowardsPreferredXPosition: fitsTowardsLeft,
        preferredXPosition: GeoDropdownConstants.X_AXIS_POSITION.right,
        fallbackXPosition: GeoDropdownConstants.X_AXIS_POSITION.left
      }

      const configTowardsRight = {
        fitsTowardsPreferredXPosition: fitsTowardsRight,
        preferredXPosition: GeoDropdownConstants.X_AXIS_POSITION.left,
        fallbackXPosition: GeoDropdownConstants.X_AXIS_POSITION.right
      }

      const configTowardsTop = {
        fitsTowardsPreferredYPosition: fitsAbove,
        preferredYPosition: GeoDropdownConstants.Y_AXIS_POSITION.top,
        fallbackYPosition: GeoDropdownConstants.Y_AXIS_POSITION.bottom
      }

      const configTowardsBottom = {
        fitsTowardsPreferredYPosition: fitsBelow,
        preferredYPosition: GeoDropdownConstants.Y_AXIS_POSITION.bottom,
        fallbackYPosition: GeoDropdownConstants.Y_AXIS_POSITION.top
      }

      // Assign config for X and Y depending on the preferred position
      const {
        fitsTowardsPreferredXPosition,
        preferredXPosition,
        fallbackXPosition
      } = this.preferredXAxisPosition === GeoDropdownConstants.X_AXIS_POSITION.right
        ? configTowardsLeft
        : configTowardsRight

      const finalXAxisPosition = fitsTowardsPreferredXPosition
        ? preferredXPosition
        : fallbackXPosition
      this.horizontalAxisPosition = finalXAxisPosition

      if (popupElement.style) {
        popupElement.style.setProperty('--available-width', `${this.popupMaxSize.width}px`)
      }

      const fitsTowardsAnyYPosition = configTowardsTop.fitsTowardsPreferredYPosition || configTowardsBottom.fitsTowardsPreferredYPosition

      if (this.forceYAxisPosition) {
        this.verticalAxisPosition = this.forceYAxisPosition
      } else if (fitsTowardsAnyYPosition) {
        const {
          fitsTowardsPreferredYPosition,
          preferredYPosition,
          fallbackYPosition
        } = this.preferredYAxisPosition === GeoDropdownConstants.Y_AXIS_POSITION.top
          ? configTowardsTop
          : configTowardsBottom

        const automaticYPosition = fitsTowardsPreferredYPosition
          ? preferredYPosition
          : fallbackYPosition

        this.verticalAxisPosition = automaticYPosition
      }

      if (popupElement.style) {
        popupElement.style.setProperty('--available-height', `${this.popupMaxSize.height}px`)
      }

      // We finally update the toggle button width, only used when width is fixed to it

      this.toggleButtonWidth = _.sum(_.map(_.get(this.$slots, 'toggleButton'), function (vNode) {
        return (vNode.elm && vNode.elm.getBoundingClientRect().width) || 0
      }))
    },

    checkScrollEventAndRepositionIfNeeded ($event) {
      if (!this.$refs.popup || this.$refs.popup.contains($event.target)) return

      this.repositionPopup()
    },

    checkClickCoordinatesAndEmitClickOutside ($event) {
      // click-outside might be wrongly received here if the user clicked on the
      // popup, as it's not attached in the DOM to the container element but to
      // the document body
      const popupElement = this.$refs.popup

      if (!this.isOpened || popupElement === $event.target || popupElement.contains($event.target)) {
        return
      }

      const popupContentRefs = _.get(this.$slots.popupContent, '[0].context.$refs')

      const POPUP_REF_NAME = this.POPUP_REF_NAME

      if (hasClickOnChildrenPopup(popupContentRefs)) return

      /**
       * User clicked outside toggle button or popup of this menu.
       *
       * @event click-outside
       * @type {MouseEvent}
       */
      this.$emit('click-outside', $event)

      function hasClickOnChildrenPopup (refs) {
        return _.reduce(refs, (acc, ref, refName) => {
          if (acc) return acc

          if (refName === POPUP_REF_NAME) {
            if (ref === $event.target || ref.contains($event.target)) return true
          }
          return hasClickOnChildrenPopup(_.get(ref, '$refs'))
        }, false)
      }
    }
  }
}
</script>
