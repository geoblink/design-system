<template>
  <span
    v-on-resize="reloadRequiredWidth"
    v-tooltip.top.notrigger="{
      visible: isTooltipVisible,
      html: idTooltipContentNode
    }"
    :class="`geo-trimmed-content${cssSuffix}`"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span
      ref="content"
      class="geo-trimmed-content__content"
    >
      <!-- @slot Use this slot to render content to be trimmed -->
      <slot />
    </span>
  </span>
</template>

<script>
import OnResize from '../../directives/GeoOnResize'
import Tooltip from '../../directives/Tooltip'
import cssSuffix from '../../mixins/cssModifierMixin'
import counterFactory from '../../utils/counterFactory'
const getNextInstanceId = counterFactory()

export default {
  name: 'GeoTrimmedContent',
  status: 'ready',
  release: '10.1.0',
  directives: { OnResize, Tooltip },
  mixins: [ cssSuffix ],
  data () {
    return {
      htmlElement: null,
      isHovered: false,
      containerWidth: null,
      contentWidth: null,
      tooltipHTML: null
    }
  },
  computed: {
    isTooltipVisible () {
      return this.isContentTrimmed && this.isHovered
    },

    isContentTrimmed () {
      const contentWidth = this.contentWidth || 0
      const containerWidth = this.containerWidth || 0
      return contentWidth > containerWidth
    },

    idTooltipContentNode () {
      return `geo-trimmed-content--${getNextInstanceId()}`
    }
  },
  beforeMount () {
    this.addTooltipHTMLContentNode()
  },
  mounted () {
    this.reloadRequiredWidth()
    this.reloadTooltipContent()
  },
  updated () {
    this.reloadRequiredWidth()
    this.reloadTooltipContent()
  },
  beforeDestroy () {
    this.removeTooltipHTMLContentNode()
  },
  methods: {
    reloadRequiredWidth () {
      if (!this.$el || !this.$refs.content) return

      const originalOverflow = this.$refs.content.style.overflow
      const originalTextOverflow = this.$refs.content.style.textOverflow

      this.$refs.content.style.overflow = 'visible'
      this.$refs.content.style.textOverflow = 'initial'

      this.contentWidth = this.$refs.content.getBoundingClientRect().width
      this.containerWidth = this.$el.getBoundingClientRect().width

      this.$refs.content.style.overflow = originalOverflow
      this.$refs.content.style.textOverflow = originalTextOverflow
    },

    reloadTooltipContent () {
      if (!this.$refs.content) return

      this.tooltipHTML = this.$refs.content.innerHTML
      const existingElement = document.getElementById(this.idTooltipContentNode)
      existingElement.innerHTML = this.tooltipHTML
    },

    addTooltipHTMLContentNode () {
      const newElement = document.createElement('div')
      newElement.setAttribute('id', this.idTooltipContentNode)
      document.body.appendChild(newElement)
    },

    removeTooltipHTMLContentNode () {
      const element = document.getElementById(this.idTooltipContentNode)
      element.parentNode.removeChild(element)
    }
  }
}
</script>
