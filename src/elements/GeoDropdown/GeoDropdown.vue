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
      <slot name="popupContent" />
    </div>
  </div>
</template>

<script>
import ClickOutside from '../../directives/GeoClickOutside'
import ScrollAnywhere from '../../directives/GeoScrollAnywhere'
import getDOMElementOffset from '../../utils/getDOMElementOffset'
import cssSuffix from '../../mixins/cssModifierMixin'
import { AXIS_POSITION, POSSIBLE_X_AXIS_POSITIONS, POSSIBLE_Y_AXIS_POSITIONS } from './GeoDropdown.constants'

export default {
  name: 'GeoDropdown',
  status: 'missing-tests',
  release: '4.0.0',
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
     */
    preferredXAxisPosition: {
      type: String,
      default: 'left',
      validator: function (value) {
        return value in POSSIBLE_X_AXIS_POSITIONS
      }
    },
    /**
     * Position of the popup relative to the container. `right` or `left`
     */
    preferredYAxisPosition: {
      type: String,
      default: 'bottom',
      validator: function (value) {
        return value in POSSIBLE_Y_AXIS_POSITIONS
      }
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
      }
    }
  },
  computed: {
    isOpened () {
      return this.opened
    },

    popupStyle () {
      return {
        transform: `translate(
          ${this.containerOffset.left + this.popupTranslation.x}px,
          ${this.containerOffset.top + this.popupTranslation.y}px
        )`
      }
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

      // We set the config for each possible position, if fits, preferred position
      // and fallback position
      const configTowardsLeft = {
        fitsTowardsPreferredXPosition: fitsTowardsLeft,
        translationTowardsPreferredXPosition: towardsRightTranslationX,
        translationTowardsFallbackXPosition: towardsLeftTranslationX
      }

      const configTowardsRight = {
        fitsTowardsPreferredXPosition: fitsTowardsRight,
        translationTowardsPreferredXPosition: towardsLeftTranslationX,
        translationTowardsFallbackXPosition: towardsRightTranslationX
      }

      const configTowardsTop = {
        fitsTowardsPreferredYPosition: (!fitsBelow || fitsAbove),
        translationTowardsPreferredYPosition: aboveTranslationY,
        translationTowardsFallbackYPosition: belowTranslationY
      }

      const configTowardsBottom = {
        fitsTowardsPreferredYPosition: (fitsBelow || !fitsAbove),
        translationTowardsPreferredYPosition: belowTranslationY,
        translationTowardsFallbackYPosition: aboveTranslationY
      }

      // Assignation of the config for X and Y depending on the preferred position
      const {
        fitsTowardsPreferredXPosition,
        translationTowardsPreferredXPosition,
        translationTowardsFallbackXPosition
      } = this.preferredXAxisPosition === AXIS_POSITION.LEFT
        ? configTowardsLeft
        : configTowardsRight

      const {
        fitsTowardsPreferredYPosition,
        translationTowardsPreferredYPosition,
        translationTowardsFallbackYPosition
      } = this.preferredYAxisPosition === AXIS_POSITION.TOP
        ? configTowardsTop
        : configTowardsBottom

      // Check if fits to assign the correct translation
      const translationX = fitsTowardsPreferredXPosition
        ? translationTowardsPreferredXPosition
        : translationTowardsFallbackXPosition

      const translationY = fitsTowardsPreferredYPosition
        ? translationTowardsPreferredYPosition
        : translationTowardsFallbackYPosition

      this.popupTranslation.x = translationX
      this.popupTranslation.y = translationY
    },

    checkClickCoordinatesAndEmitClickOutside ($event) {
      // click-outside might be wrongly received here if the user clicked on the
      // popup, as it's not attached in the DOM to the container element but to
      // the document body
      const popupElement = this.$refs.popup

      if (popupElement === $event.target || popupElement.contains($event.target)) {
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
