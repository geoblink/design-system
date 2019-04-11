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
    this.addTooltipHTMLContentNode()
    this.reloadRequiredWidth()
    this.reloadTooltipContent()
  },
  updated () {
    this.addTooltipHTMLContentNode()
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
      if (!this.isContentTrimmed) return
      if (!this.$refs.content) return

      this.tooltipHTML = this.$refs.content.innerHTML
      const existingElement = document.getElementById(this.idTooltipContentNode)
      existingElement.innerHTML = this.tooltipHTML
    },

    addTooltipHTMLContentNode () {
      const element = document.getElementById(this.idTooltipContentNode)
      if (element) return

      const newElement = document.createElement('div')
      newElement.setAttribute('id', this.idTooltipContentNode)
      document.body.appendChild(newElement)
    },

    removeTooltipHTMLContentNode () {
      const element = document.getElementById(this.idTooltipContentNode)
      if (element) element.parentNode.removeChild(element)
    }
  },
  render (createElement) {
    const directives = [{
      name: 'on-resize',
      value: this.reloadRequiredWidth
    }]

    if (this.isContentTrimmed) {
      directives.push({
        name: 'tooltip',
        value: {
          visible: this.isTooltipVisible,
          html: this.idTooltipContentNode
        },
        modifiers: {
          top: true,
          notrigger: true
        }
      })
    }

    return createElement('span', {
      directives,
      class: `geo-trimmed-content${this.cssSuffix}`,
      on: {
        mouseenter: () => { this.isHovered = true },
        mouseleave: () => { this.isHovered = false }
      }
    }, [
      createElement('span', {
        class: 'geo-trimmed-content__content',
        ref: 'content'
      }, this.$slots.default)
    ])
  }
}
</script>
