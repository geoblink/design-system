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
import getDOMElementOffset from '../../utils/getDOMElementOffset'
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
        if(value === undefined || value in GeoDropdownConstants.Y_AXIS_POSITION) return true

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
      // Offset of the container (button's parent) relative to the document root
      containerOffset: {
        top: 0,
        left: 0
      },
      // Translation to properly position the popup relative to the top left
      // anchor of the container
      popupTranslation: {
        x: 0,
        y: 0
      },
      // When dropdown has a force Y Axis position,
      // the maximum visible height should be this
      popupMaxHeight: null,
      toggleButtonWidth: null
    }
  },
  computed: {
    isOpened () {
      return this.opened
    },

    popupStyle () {
      const styles = {
        transform: `translate(
          ${Math.round(this.containerOffset.left + this.popupTranslation.x)}px,
          ${Math.round(this.containerOffset.top + this.popupTranslation.y)}px
        )`
      }

      if (this.popupMaxHeight) {
        styles.maxHeight = `${this.popupMaxHeight}px`
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
    }
  },
  mounted () {
    this.reattachPopupToDocumentBody()
  },
  updated () {
    this.repositionPopup()
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

      const viewport = {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
      }

      const containerElement = this.$el
      const containerOffset = getDOMElementOffset(containerElement)

      this.containerOffset.top = containerOffset.top
      this.containerOffset.left = containerOffset.left

      const popupElement = this.$refs.popup

      const containerRect = containerElement.getBoundingClientRect()
      const popupRect = popupElement.getBoundingClientRect()

      this.toggleButtonWidth = _.sum(_.map(_.get(this.$slots, 'toggleButton'), function (vNode) {
        return (vNode.elm && vNode.elm.getBoundingClientRect().width) || 0
      }))

      const popupComputedStyle = getComputedStyle(popupElement)

      // Spacing user defined via CSS in --spacing-to-toggle-button CSS variable
      // if not supported (aka, IE11) we'll use 0
      const spacingToToggleButton = parseInt(popupComputedStyle.getPropertyValue('--spacing-to-toggle-button') || 0, 10)

      // Translation required in the x-axis to position the popup so its
      // content is displayed towards right/left, assuming popup is properly
      // positioned in top left corner anchor of the container
      const towardsRightTranslationX = 0
      const towardsLeftTranslationX = containerRect.width - popupRect.width

      // Translation required in the y-axis to position the popup so it's
      // content is displayed towards the bottom/top of the page, assuming popup
      // is properly positioned in top left corner anchor of the container
      const belowTranslationY = containerRect.height + spacingToToggleButton
      const aboveTranslationY = 0 - popupRect.height - spacingToToggleButton

      // We'll choose proper transform based on whether the content will fit
      // the screen or not.
      const fitsTowardsRight = containerRect.left + towardsRightTranslationX + popupRect.width < viewport.width
      const fitsTowardsLeft = containerRect.left + towardsLeftTranslationX >= 0
      const fitsBelow = containerRect.top + belowTranslationY + popupRect.height < viewport.height
      const fitsAbove = containerRect.top + aboveTranslationY >= 0

      const maxHeightAbove = Math.max(containerRect.top - (spacingToToggleButton * 2), 0)
      const maxHeightBelow = Math.max(viewport.height - containerRect.bottom - (spacingToToggleButton * 2), 0)

      // We set the config for each possible position, if fits, preferred position
      // and fallback position
      const configTowardsLeft = {
        fitsTowardsPreferredXPosition: fitsTowardsLeft,
        translationTowardsPreferredXPosition: towardsLeftTranslationX,
        translationTowardsFallbackXPosition: towardsRightTranslationX
      }

      const configTowardsRight = {
        fitsTowardsPreferredXPosition: fitsTowardsRight,
        translationTowardsPreferredXPosition: towardsRightTranslationX,
        translationTowardsFallbackXPosition: towardsLeftTranslationX
      }

      const configTowardsTop = {
        fitsTowardsPreferredYPosition: (!fitsBelow || fitsAbove),
        translationTowardsPreferredYPosition: aboveTranslationY,
        translationTowardsFallbackYPosition: belowTranslationY,
        popupMaxHeightTowardsPreferredYPosition: maxHeightAbove,
        popupMaxHeightTowardsFallbackYPosition: maxHeightBelow
      }

      const configTowardsBottom = {
        fitsTowardsPreferredYPosition: (fitsBelow || !fitsAbove),
        translationTowardsPreferredYPosition: belowTranslationY,
        translationTowardsFallbackYPosition: aboveTranslationY,
        popupMaxHeightTowardsPreferredYPosition: maxHeightBelow,
        popupMaxHeightTowardsFallbackYPosition: maxHeightAbove
      }

      // Assignation of the config for X and Y depending on the preferred position
      const {
        fitsTowardsPreferredXPosition,
        translationTowardsPreferredXPosition,
        translationTowardsFallbackXPosition
      } = this.preferredXAxisPosition === GeoDropdownConstants.X_AXIS_POSITION.right
        ? configTowardsLeft
        : configTowardsRight

      const {
        fitsTowardsPreferredYPosition,
        translationTowardsPreferredYPosition,
        translationTowardsFallbackYPosition,
        popupMaxHeightTowardsPreferredYPosition,
        popupMaxHeightTowardsFallbackYPosition
      } = this.preferredYAxisPosition === GeoDropdownConstants.Y_AXIS_POSITION.top
        ? configTowardsTop
        : configTowardsBottom

      // Check if fits to assign the correct translation
      const translationX = fitsTowardsPreferredXPosition
        ? translationTowardsPreferredXPosition
        : translationTowardsFallbackXPosition

      const automaticTranslationY = fitsTowardsPreferredYPosition
        ? translationTowardsPreferredYPosition
        : translationTowardsFallbackYPosition

      const forcedYAxisPositionToTranslationMapping = {
        [GeoDropdownConstants.Y_AXIS_POSITION.top]: configTowardsTop.translationTowardsPreferredYPosition,
        [GeoDropdownConstants.Y_AXIS_POSITION.bottom]: configTowardsBottom.translationTowardsPreferredYPosition
      }

      const translationY = forcedYAxisPositionToTranslationMapping[this.forceYAxisPosition] || automaticTranslationY

      this.popupTranslation.x = translationX
      this.popupTranslation.y = translationY

      const automaticPopupMaxHeight = fitsTowardsPreferredYPosition ? popupMaxHeightTowardsPreferredYPosition : popupMaxHeightTowardsFallbackYPosition

      const forcedYAxisPositionToMaxHeightMapping = {
        [GeoDropdownConstants.Y_AXIS_POSITION.top]: maxHeightAbove,
        [GeoDropdownConstants.Y_AXIS_POSITION.bottom]: maxHeightBelow
      }

      const popupMaxHeight = forcedYAxisPositionToMaxHeightMapping[this.forceYAxisPosition] || automaticPopupMaxHeight

      this.popupMaxHeight = popupMaxHeight
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
