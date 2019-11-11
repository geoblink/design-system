<template>
  <div
    v-scroll-anywhere="repositionPopup"
    v-click-outside="checkClickCoordinatesAndEmitClickOutside"
    :class="{
      [`geo-dropdown${cssSuffix}`]: true,
      [`geo-dropdown--is-open${cssSuffix}`]: isOpened
    }"
  >
    <!-- @slot Use this slot to customize the button used to toggle the popup -->
    <slot name="toggleButton" />

    <div
      ref="popup"
      :class="{
        [`geo-dropdown__popup${cssSuffix}`]: true,
        [`geo-dropdown__popup--is-open${cssSuffix}`]: isOpened,
      }"
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
import ClickOutside from '../../directives/GeoClickOutside'
import ScrollAnywhere from '../../directives/GeoScrollAnywhere'
import cssSuffix from '../../mixins/cssModifierMixin'
import * as GeoDropdownConstants from './GeoDropdown.constants'
import _ from 'lodash'

export default {
  name: 'GeoDropdown',
  status: 'ready',
  release: '4.0.0',
  constants: GeoDropdownConstants,
  directives: {
    ScrollAnywhere,
    ClickOutside
  },
  mixins: [cssSuffix],
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
    preferredXAxisPosition: {
      type: String,
      default: function () {
        return GeoDropdownConstants.X_AXIS_POSITION.left
      },
      validator: function (value) {
        if (value in GeoDropdownConstants.X_AXIS_POSITION) return true

        const supportedValues = Object.values(GeoDropdownConstants.X_AXIS_POSITION).map(i => `«${i}»`).join(', ')
        console.warn(`GeoDropdown [component] :: Unsupported value («${value}») for «preferredXAxisPosition» property. Use one of ${supportedValues}`)
        return false
      }
    },
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
    preferredYAxisPosition: {
      type: String,
      default: function () {
        return GeoDropdownConstants.Y_AXIS_POSITION.bottom
      },
      validator: function (value) {
        if (value in GeoDropdownConstants.Y_AXIS_POSITION) return true

        const supportedValues = Object.values(GeoDropdownConstants.Y_AXIS_POSITION).map(i => `«${i}»`).join(', ')
        console.warn(`GeoDropdown [component] :: Unsupported value («${value}») for «preferredYAxisPosition» property. Use one of ${supportedValues}`)
        return false
      }
    },

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
    forceYAxisPosition: {
      type: String,
      required: false,
      validator: function (value) {
        if (value === undefined || value in GeoDropdownConstants.Y_AXIS_POSITION) return true

        const supportedValues = Object.values(GeoDropdownConstants.Y_AXIS_POSITION).map(i => `«${i}»`).join(', ')
        console.warn(`GeoDropdown [component] :: Unsupported value («${value}») for «forceYAxisPosition» property. Use one of ${supportedValues}`)
        return false
      }
    },

    /**
     * When this property is `true`, the popup width will be the same as that of
     * the toggle button.
     */
    fixedWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      popupAnchor: {
        xAxis: 'left',
        yAxis: 'top'
      },
      popupTranslation: {
        x: 0,
        y: 0
      },
      toggleButtonWidth: null
    }
  },
  computed: {
    isOpened () {
      return this.opened
    },

    popupStyle () {
      const styles = {
        [this.popupAnchor.xAxis]: '0px',
        [this.popupAnchor.yAxis]: '0px',
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
  mounted () {
    this.reattachPopupToDocumentBody()
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

      this.toggleButtonWidth = _.sum(_.map(_.get(this.$slots, 'toggleButton'), function (vNode) {
        return (vNode.elm && vNode.elm.getBoundingClientRect().width) || 0
      }))

      const popupComputedStyle = getComputedStyle(popupElement)

      // Spacing user defined via CSS in --spacing-to-toggle-button CSS variable
      // if not supported (aka, IE11) we'll use 0
      const spacingToToggleButton = parseInt(popupComputedStyle.getPropertyValue('--spacing-to-toggle-button') || '0', 10)

      const availableWidthTowardsLeft = Math.max(containerRect.right, 0)
      const availableWidthTowardsRight = Math.max(viewport.width - containerRect.left, 0)

      const availableHeightAbove = Math.max(containerRect.top - spacingToToggleButton * 2, 0)
      const availableHeightBelow = Math.max(viewport.height - containerRect.bottom - spacingToToggleButton * 2, 0)

      const xAxisTranslationTowardsLeft = -(viewport.width - containerRect.right)
      const xAxisTranslationTowardsRight = containerRect.left

      // Translation required in the y-axis to position the popup so it's
      // content is displayed towards the bottom/top of the page, assuming popup
      // is properly positioned in top left corner anchor of the container
      const belowTranslationY = containerRect.bottom + spacingToToggleButton
      const aboveTranslationY = -(viewport.height - containerRect.top + spacingToToggleButton)

      // We'll choose proper transform based on whether the content will fit
      // the screen or not.
      const fitsTowardsRight = popupRect.width < availableWidthTowardsRight
      const fitsTowardsLeft = popupRect.width < availableWidthTowardsLeft
      const fitsBelow = popupRect.height < availableHeightBelow
      const fitsAbove = popupRect.height < availableHeightAbove

      // We set the config for each possible position, if fits, preferred position
      // and fallback position
      const configTowardsLeft = {
        fitsTowardsPreferredXPosition: fitsTowardsLeft,
        availableWidthTowardsPreferredXPosition: availableWidthTowardsLeft,
        availableWidthTowardsFallbackXPosition: availableWidthTowardsRight,
        translationTowardsPreferredXPosition: xAxisTranslationTowardsLeft,
        translationTowardsFallbackXPosition: xAxisTranslationTowardsRight,
        xAxisAnchorPositionForPreferredXPosition: 'right',
        xAxisAnchorPositionForFallbackXPosition: 'left'
      }

      const configTowardsRight = {
        fitsTowardsPreferredXPosition: fitsTowardsRight,
        availableWidthTowardsPreferredXPosition: availableWidthTowardsRight,
        availableWidthTowardsFallbackXPosition: availableWidthTowardsLeft,
        translationTowardsPreferredXPosition: xAxisTranslationTowardsRight,
        translationTowardsFallbackXPosition: xAxisTranslationTowardsLeft,
        xAxisAnchorPositionForPreferredXPosition: 'left',
        xAxisAnchorPositionForFallbackXPosition: 'right'
      }

      const configTowardsTop = {
        fitsTowardsPreferredYPosition: fitsAbove,
        availableHeightTowardsPreferredYPosition: availableHeightAbove,
        availableHeightTowardsFallbackYPosition: availableHeightBelow,
        translationTowardsPreferredYPosition: aboveTranslationY,
        translationTowardsFallbackYPosition: belowTranslationY,
        yAxisAnchorPositionForPreferredYPosition: 'bottom',
        yAxisAnchorPositionForFallbackYPosition: 'top'
      }

      const configTowardsBottom = {
        fitsTowardsPreferredYPosition: fitsBelow,
        availableHeightTowardsPreferredYPosition: availableHeightBelow,
        availableHeightTowardsFallbackYPosition: availableHeightAbove,
        translationTowardsPreferredYPosition: belowTranslationY,
        translationTowardsFallbackYPosition: aboveTranslationY,
        yAxisAnchorPositionForPreferredYPosition: 'top',
        yAxisAnchorPositionForFallbackYPosition: 'bottom'
      }

      // Assignation of the config for X and Y depending on the preferred position
      const {
        fitsTowardsPreferredXPosition,
        availableWidthTowardsPreferredXPosition,
        availableWidthTowardsFallbackXPosition,
        translationTowardsPreferredXPosition,
        translationTowardsFallbackXPosition,
        xAxisAnchorPositionForPreferredXPosition,
        xAxisAnchorPositionForFallbackXPosition
      } = this.preferredXAxisPosition === GeoDropdownConstants.X_AXIS_POSITION.right
        ? configTowardsLeft
        : configTowardsRight

      const fitsTowardsAnyYPosition = configTowardsTop.fitsTowardsPreferredYPosition || configTowardsBottom.fitsTowardsPreferredYPosition

      const {
        fitsTowardsPreferredYPosition,
        availableHeightTowardsPreferredYPosition,
        availableHeightTowardsFallbackYPosition,
        translationTowardsPreferredYPosition,
        translationTowardsFallbackYPosition,
        yAxisAnchorPositionForPreferredYPosition,
        yAxisAnchorPositionForFallbackYPosition
      } = this.preferredYAxisPosition === GeoDropdownConstants.Y_AXIS_POSITION.top
        ? configTowardsTop
        : configTowardsBottom

      const xAxisTranslation = fitsTowardsPreferredXPosition
        ? translationTowardsPreferredXPosition
        : translationTowardsFallbackXPosition
      this.popupTranslation.x = xAxisTranslation

      // Check if fits to assign the correct translation
      const xAxisAnchor = fitsTowardsPreferredXPosition
        ? xAxisAnchorPositionForPreferredXPosition
        : xAxisAnchorPositionForFallbackXPosition
      this.popupAnchor.xAxis = xAxisAnchor

      const availableWidthForPopupContent = fitsTowardsPreferredXPosition
        ? availableWidthTowardsPreferredXPosition
        : availableWidthTowardsFallbackXPosition

      if (popupElement.style) {
        popupElement.style.setProperty('--available-width', `${availableWidthForPopupContent}px`)
      }

      // Will use the preferred position if it fits or if it doesn't but if doesn't fit in the fallback position either
      const automaticYPositionConfig = fitsTowardsPreferredYPosition || !fitsTowardsAnyYPosition
        ? {
          availableHeight: availableHeightTowardsPreferredYPosition,
          translation: translationTowardsPreferredYPosition,
          anchor: yAxisAnchorPositionForPreferredYPosition
        }
        : {
          availableHeight: availableHeightTowardsFallbackYPosition,
          translation: translationTowardsFallbackYPosition,
          anchor: yAxisAnchorPositionForFallbackYPosition
        }

      const forcedYAxisPositionToConfigMapping = {
        [GeoDropdownConstants.Y_AXIS_POSITION.top]: {
          availableHeight: availableHeightAbove,
          translation: configTowardsTop.translationTowardsPreferredYPosition,
          anchor: configTowardsTop.yAxisAnchorPositionForPreferredYPosition
        },
        [GeoDropdownConstants.Y_AXIS_POSITION.bottom]: {
          availableHeight: availableHeightBelow,
          translation: configTowardsBottom.translationTowardsPreferredYPosition,
          anchor: configTowardsBottom.yAxisAnchorPositionForPreferredYPosition
        }
      }

      const forcedYAxisConfig = forcedYAxisPositionToConfigMapping[this.forceYAxisPosition]

      const yAxisConfig = forcedYAxisConfig || automaticYPositionConfig

      this.popupAnchor.yAxis = yAxisConfig.anchor
      this.popupTranslation.y = yAxisConfig.translation

      if (popupElement.style) {
        popupElement.style.setProperty('--available-height', `${yAxisConfig.availableHeight}px`)
      }
    },

    checkClickCoordinatesAndEmitClickOutside ($event) {
      // click-outside might be wrongly received here if the user clicked on the
      // popup, as it's not attached in the DOM to the container element but to
      // the document body
      const popupElement = this.$refs.popup

      if (!this.isOpened || popupElement === $event.target || popupElement.contains($event.target)) {
        return
      }

      /**
       * User clicked outside toggle button or popup of this menu.
       *
       * @event click-outside
       * @type {MouseEvent}
       */
      this.$emit('click-outside', $event)
    }
  }
}
</script>
