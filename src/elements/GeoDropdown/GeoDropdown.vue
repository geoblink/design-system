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

      // eslint-disable-next-line
      console.log('repositionPopup called!', this._uid)

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

        // Will use the preferred position if it fits or if it doesn't but if doesn't fit in the fallback position either
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
