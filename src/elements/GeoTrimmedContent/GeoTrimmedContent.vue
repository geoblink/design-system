<template>
  <span
    v-on-resize="reloadRequiredWidth"
    class="geo-trimmed-content"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <geo-tooltip
      :visible="isTooltipVisible"
    >
      <div ref="tooltipContent" />
    </geo-tooltip>
    <span
      ref="content"
      class="geo-trimmed-content__content"
    >
      <!-- @slot Use this slot to customize content displayed -->
      <slot />
    </span>
  </span>
</template>

<script>
import { enumDefaultPropertyFactory } from '../../utils/enumPropertyFactory'
import OnResize from '../../directives/GeoOnResize'
import { POSITIONS, ALIGNMENTS } from '../GeoTooltip/GeoTooltip.constants'
/**
 * `GeoTrimmedContent` is a component used to trim long strings which don't fit
 * in a single line, and displaying a tooltip to read the whole content.
 */
export default {
  name: 'GeoTrimmedContent',
  status: 'ready',
  release: '10.1.0',
  directives: { OnResize },
  props: {
    tooltipPosition: enumDefaultPropertyFactory({
      componentName: 'GeoTrimmedContent',
      propertyName: 'tooltipPosition',
      enumDictionary: POSITIONS,
      defaultValue: POSITIONS.top
    }),

    tooltipAlignment: enumDefaultPropertyFactory({
      componentName: 'GeoTrimmedContent',
      propertyName: 'tooltipAlignment',
      enumDictionary: ALIGNMENTS,
      defaultValue: ALIGNMENTS.middle
    })
  },
  data () {
    return {
      isHovered: false,
      containerWidth: null,
      contentWidth: null
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
    }
  },
  watch: {
    isTooltipVisible () {
      this.reloadTooltipContent()
    }
  },
  mounted () {
    this.reloadRequiredWidth()
    this.reloadTooltipContent()
  },
  updated () {
    this.reloadRequiredWidth()
    this.reloadTooltipContent()
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
      if (!this.$refs.tooltipContent) return

      this.$refs.tooltipContent.innerHTML = this.$refs.content.innerHTML
    }
  }
}
</script>
