<template>
  <div
    v-on-resize="{
      callback: repositionModal,
      target: attachTo
    }"
    v-scroll-anywhere="repositionModal"
    :style="modalStyle"
    class="geo-modal"
  >
    <div
      class="geo-modal__backdrop"
      @click="handleBackdropClick($event)"
    />
    <div class="geo-modal__content">
      <slot>
        <geo-bordered-box>
          <geo-bordered-box-header
            v-if="hasHeader"
            :icon="headerIcon"
            :close-icon="headerCloseIcon"
            @close="handleCloseClick($event)"
          >
            <slot name="header" />
          </geo-bordered-box-header>

          <div
            v-if="hasBody"
            class="geo-modal__content-body"
          >
            <slot name="body" />
          </div>

          <geo-bordered-box-footer v-if="hasFooter">
            <slot name="footer" />
          </geo-bordered-box-footer>
        </geo-bordered-box>
      </slot>
    </div>
  </div>
</template>

<script>
import OnResize from '../../directives/GeoOnResize'
import ScrollAnywhere from '../../directives/GeoScrollAnywhere'
import { getDocument } from '../../utils/ssrProxy'

export default {
  name: 'GeoModal',
  status: 'ready',
  release: '7.3.0',
  directives: {
    OnResize,
    ScrollAnywhere
  },
  props: {
    /**
     * `HTMLElement` to which modal will be attached.
     *
     * Defaults to document's body.
     */
    attachTo: {
      type: null, // There's no built in type for HTMLElement.
      default: function () {
        return getDocument().body
      }
    },

    /**
     * Optional Font Awesome 5 icon to be displayed next to the header's label,
     * on the leading edge.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    headerIcon: {
      type: Array,
      required: false
    },

    /**
     * Font Awesome 5 icon to be displayed as close button.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    headerCloseIcon: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      containerScrollOffset: {
        left: 0,
        top: 0
      },
      // Size of the container (modal's parent)
      containerSize: {
        height: 0,
        width: 0
      }
    }
  },
  computed: {
    modalStyle () {
      if (this.attachTo === getDocument().body) {
        return {
          position: 'fixed'
        }
      }

      const styles = {
        transform: `translate(
          ${this.containerScrollOffset.left}px,
          ${this.containerScrollOffset.top}px
        )`,
        height: `${this.containerSize.height}px`,
        width: `${this.containerSize.width}px`
      }

      return styles
    },

    hasHeader () {
      return !!(this.$slots.header && this.$slots.header.length)
    },

    hasBody () {
      return !!(this.$slots.body && this.$slots.body.length)
    },

    hasFooter () {
      return !!(this.$slots.footer && this.$slots.footer.length)
    }
  },
  watch: {
    attachTo () {
      this.reattachModalToProperParent()
    }
  },
  mounted () {
    this.reattachModalToProperParent()
  },
  updated () {
    this.repositionModal()
  },
  beforeDestroy () {
    this.removeModalFromDOM()
  },
  methods: {
    removeModalFromDOM () {
      const componentElement = this.$el
      if (componentElement.parentNode) {
        componentElement.parentNode.removeChild(componentElement)
      }
    },

    reattachModalToProperParent () {
      const componentElement = this.$el
      this.removeModalFromDOM()
      this.attachTo.appendChild(componentElement)
      this.setAttachToElementPosition()
      this.repositionModal()
    },

    setAttachToElementPosition () {
      if (this.attachTo === getDocument().body) return

      const currentPosition = getComputedStyle(this.attachTo).getPropertyValue('position')
      if (currentPosition === 'static') {
        console.warn('GeoModal [component] :: setting position of attach-to element to «relative» since it\'s required to anchor the modal. Set attach-to element position to «relative» in your CSS styles to avoid this warning.')
        this.attachTo.style.position = 'relative'
      }
    },

    repositionModal () {
      const boundingRect = this.attachTo.getBoundingClientRect()
      this.containerSize.height = boundingRect.height
      this.containerSize.width = boundingRect.width
      this.containerScrollOffset.left = this.attachTo.scrollLeft
      this.containerScrollOffset.top = this.attachTo.scrollTop
    },

    handleBackdropClick ($event) {
      /**
       * User clicked on backdrop
       * @event click-backdrop
       * @type {MouseEvent}
       */
      this.$emit('click-backdrop', $event)
    },

    handleCloseClick ($event) {
      /**
       * User clicked close icon
       * @event close
       * @type {MouseEvent}
       */
      this.$emit('close', $event)
    }
  }
}
</script>
