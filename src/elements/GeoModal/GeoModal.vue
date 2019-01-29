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
      <slot>
        <geo-bordered-box :css-modifier="`geo-modal${cssSuffix}`">
          <geo-bordered-box-header
            v-if="hasHeader"
            :css-modifier="`geo-modal${cssSuffix}`"
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

          <geo-bordered-box-footer
            v-if="hasFooter"
            :css-modifier="`geo-modal${cssSuffix}`"
          >
            <slot name="footer" />
          </geo-bordered-box-footer>
        </geo-bordered-box>
      </slot>
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
      default () {
        return []
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
