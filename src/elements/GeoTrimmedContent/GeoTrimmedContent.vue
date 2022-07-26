<template>
  <span
    v-on-resize="reloadRequiredWidth"
    class="geo-trimmed-content"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <geo-tooltip
      :visible="isTooltipVisible"
      :position="tooltipPosition"
      :alignment="tooltipAlignment"
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
import { enumPropertyFactory } from '../../utils/enumPropertyFactory'
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
    tooltipPosition: enumPropertyFactory({
      componentName: 'GeoTrimmedContent',
      propertyName: 'tooltipPosition',
      enumDictionary: POSITIONS,
      defaultValue: POSITIONS.top
    }),

    tooltipAlignment: enumPropertyFactory({
      componentName: 'GeoTrimmedContent',
      propertyName: 'tooltipAlignment',
      enumDictionary: ALIGNMENTS,
      defaultValue: ALIGNMENTS.middle
    })
  },
  data () {
    return {
      isHovered: false,
      contentWidthTrimmed: null,
      contentWidthNotTrimmed: null
    }
  },
  computed: {
    isTooltipVisible () {
      return this.isContentTrimmed && this.isHovered
    },

    isContentTrimmed () {
      const contentWidthNotTrimmed = this.contentWidthNotTrimmed || 0
      const contentWidthTrimmed = this.contentWidthTrimmed || 0
      return contentWidthNotTrimmed > contentWidthTrimmed
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

      this.contentWidthNotTrimmed = this.$refs.content.getBoundingClientRect().width

      this.$refs.content.style.overflow = originalOverflow
      this.$refs.content.style.textOverflow = originalTextOverflow

      this.contentWidthTrimmed = this.$refs.content.getBoundingClientRect().width
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
