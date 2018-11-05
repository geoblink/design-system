<template>
  <div
    v-scroll-anywhere="repositionModal"
    :class="`geo-modal${cssSuffix}`"
    :style="modalStyle"
  >
    <div
      class="geo-modal__backdrop"
      @click="handleBackdropClick($event)"
    />
    <div class="geo-modal__content">
      <slot />
    </div>
  </div>
</template>

<script>
import ScrollAnywhere from '../../directives/GeoScrollAnywhere'
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoModal',
  status: 'missing-tests',
  release: '7.3.0',
  directives: {
    ScrollAnywhere
  },
  mixins: [cssSuffix],
  props: {
    /**
     * `HTMLElement` to which modal will be attached.
     *
     * Defaults to document's body.
     */
    attachTo: {
      type: null, // There's no built in type for HTMLElement.
      default () {
        return document.body
      }
    }
  },
  data () {
    return {
      // Offset of the container (modal's parent) relative to `attachTo` element
      containerOffset: {
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
      if (this.attachTo === document.body) return null

      const styles = {
        transform: `translate(
          ${this.containerOffset.left}px,
          ${this.containerOffset.top}px
        )`,
        height: `${this.containerSize.height}px`,
        width: `${this.containerSize.width}px`
      }

      return styles
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
      this.repositionModal()
    },

    repositionModal () {
      if (this.attachTo === document.body) return

      const boundingRect = this.attachTo.getBoundingClientRect()
      this.containerOffset.left = boundingRect.left
      this.containerOffset.top = boundingRect.top
      this.containerSize.height = boundingRect.height
      this.containerSize.width = boundingRect.width
    },

    handleBackdropClick ($event) {
      /**
       * User clicked on backdrop
       * @event backdrop-click
       * @type {MouseEvent}
       */
      this.$emit('backdrop-click', $event)
    }
  }
}
</script>
