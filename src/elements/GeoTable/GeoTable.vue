<template>
  <div
    v-on-resize="layoutTableIfPossible"
    :class="`geo-table${cssSuffix}`"
  >
    <div
      ref="tableContainer"
      class="geo-table__container"
      @scroll.passive="onScroll($event)"
    >
      <div
        v-if="isHeaderDisplayed"
        ref="tableHeader"
        :class="{
          'geo-table__header': true,
          'geo-table__header--empty-table': isEmpty
        }"
      >
        <!-- @slot Use this slot to customize table's headers -->
        <slot
          :css-modifier="cssModifier"
          name="header"
        />
      </div>
      <div
        v-if="isEmpty"
        class="geo-table__body-empty"
      >
        <!-- @slot Use this slot to customize what's displayed when table has no data -->
        <slot
          :css-modifier="cssModifier"
          name="empty"
        />
      </div>
      <div
        v-else
        class="geo-table__body"
      >
        <div
          ref="tableBody"
          class="geo-table__body-content"
        >
          <!-- @slot Use this slot to customize how each data item is rendered -->
          <slot
            v-for="(item, index) in currentPageData"
            :item="item"
            :index="index"
            :css-modifier="cssModifier"
            name="body"
          />
        </div>

        <div
          ref="tableShadowVerticalTop"
          class="geo-table__shadow--vertical-top"
        />
        <div
          ref="tableShadowVerticalBottom"
          class="geo-table__shadow--vertical-bottom"
        />
        <div
          ref="tableShadowHorizontalLeft"
          class="geo-table__shadow--horizontal-left"
        />
        <div
          ref="tableShadowHorizontalRight"
          class="geo-table__shadow--horizontal-right"
        />
      </div>
    </div>

    <div
      v-if="isFooterDisplayed"
      ref="tableFooter"
      class="geo-table__footer"
    >
      <!-- @slot Use this slot to customize table's footer and pagination -->
      <slot
        :css-modifier="cssModifier"
        name="footer"
      >
        <!-- @slot Use this slot to add leading accessories to table's footer without having to add pagination explicitly -->
        <slot name="footerLeadingAccessoryItem" />
        <geo-table-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          :source-data-length="sourceData.length"
          @go-to-page="goToPage($event)"
        />
        <!-- @slot Use this slot to add trailing accessories to table's footer without having to add pagination explicitly -->
        <slot name="footerTrailingAccessoryItem" />
      </slot>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import OnResize from '../../directives/GeoOnResize'
import cssSuffix from '../../mixins/cssModifierMixin'
import throttle from '../../utils/throttle'

import {
  getAutomaticColumnsWidth,
  getVueComponentColumnSizingSettings
} from './GeoTable.utils'

const DEFAULT_PAGESIZE = 10

export default {
  name: 'GeoTable',
  status: 'ready',
  release: '10.1.0',
  constants: { DEFAULT_PAGESIZE },
  directives: { OnResize },
  mixins: [cssSuffix],
  props: {
    /**
     * Source data feeding this table.
     *
     * **Note:** Not all the data will be displayed at once.
     */
    sourceData: {
      type: Array,
      required: true
    },

    /**
     * Amount of data entries that will be displayed at once at most.
     *
     * Use this it to tweak the balance between data density and performance
     * optimum for your dataset.
     *
     * If empty, `GeoTable` will either pick an amount that fits table's
     * available height (if `automaticPageSize` is set to `true`) or display up
     * to 10 rows (if `automaticPageSize` is unset or set to `false`).
     */
    forcedPageSize: {
      type: Number,
      required: false
    },

    /**
     * Whether page size should be computed automatically to fill table ensuring
     * there's no vertical scroll required to see all content.
     *
     * Note that `forcedPageSize` overrides this property.
     */
    automaticPageSize: {
      type: Boolean,
      required: false
    },

    /**
     * Page being currently displayed.
     *
     * First page is page `0`.
     */
    currentPage: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      internallyForcedCurrentPageStart: -1, // Used to force table to display first page during page size inference
      inferredPageSize: null
      // This is intentionally non-reactive to avoid triggering update hook
      // isAdjustingTable: false
      // This is intentionally non-reactive to avoid triggering infinite loops
      // when inferring page size stops
      // isInferringPageSize: false
      // This is intentionally non-reactive to avoid triggering infinite loops
      // when computing column's width
      // columnsWidths: {}
    }
  },
  computed: {
    isEmpty () {
      return !(this.sourceData && this.sourceData.length > 0)
    },

    currentPageStart () {
      return this.internallyForcedCurrentPageStart >= 0
        ? this.internallyForcedCurrentPageStart
        : this.currentPage * this.pageSize
    },

    currentPageData () {
      return this.sourceData.slice(this.currentPageStart, this.currentPageStart + this.pageSize)
    },

    isHeaderDisplayed () {
      return !!this.$slots.header
    },

    isFooterDisplayed () {
      return !!this.$slots.footer || _.size(this.sourceData) > this.pageSize
    },

    horizontalScrollCSSClass () {
      return 'geo-table__container--requiring-horizontal-scroll'
    },

    pageSize () {
      return _.isFinite(this.forcedPageSize)
        ? this.forcedPageSize
        : _.isFinite(this.inferredPageSize)
          ? this.inferredPageSize
          : DEFAULT_PAGESIZE
    },

    layoutHeadersAndShadowsThrottled () {
      return throttle(this.layoutHeadersAndShadows)
    },

    forcedLayoutTableThrottled () {
      return throttle(this.forcedLayoutTable)
    }
  },
  mounted () {
    this.layoutTableIfPossible()
  },
  updated () {
    if (this.isAdjustingTable) return

    this.layoutTableIfPossible()
  },
  methods: {
    goToPage (page) {
      /**
       * User wanted to change current page.
       *
       * @event go-to-page
       * @type {Number}
       */
      this.$emit('go-to-page', page)
    },

    onScroll (event) {
      this.layoutHeadersAndShadowsThrottled({
        yOffset: event.target.scrollTop,
        xOffset: event.target.scrollLeft
      })
    },

    layoutHeadersAndShadows (scroll) {
      if (this.isEmpty) return

      const requiredObjects = [
        this.$refs.tableHeader,
        this.$refs.tableContainer,
        this.$refs.tableShadowVerticalTop,
        this.$refs.tableShadowVerticalBottom,
        this.$refs.tableShadowHorizontalLeft,
        this.$refs.tableShadowHorizontalRight
      ]
      const hasAllRequiredObjects = _.reduce(requiredObjects, (accum, object) => accum && !!object, true)
      if (!hasAllRequiredObjects) return

      const { xOffset, yOffset } = scroll

      const containerHeight = this.$refs.tableContainer
        .getBoundingClientRect()
        .height
      const contentHeight = this.$refs.tableContainer.scrollHeight

      const containerWidth = this.$refs.tableContainer
        .getBoundingClientRect()
        .width
      const contentWidth = this.$refs.tableContainer.scrollWidth

      const hasHorizontalScroll =
        this.$refs.tableContainer &&
        this.$refs.tableContainer.classList.contains(this.horizontalScrollCSSClass)

      const isScrolledToYStart = yOffset === 0
      const isScrolledToXStart = !hasHorizontalScroll || xOffset === 0
      const isScrolledToYEnd = yOffset + containerHeight === contentHeight
      const isScrolledToXEnd = !hasHorizontalScroll || xOffset + containerWidth === contentWidth

      const headerHeight = this.$refs.tableHeader
        .getBoundingClientRect()
        .height

      this.$refs.tableHeader.style.transform = `translate(0px, ${yOffset}px)`

      this.$refs.tableShadowVerticalTop.style.visibility = isScrolledToYStart ? 'hidden' : 'visible'
      this.$refs.tableShadowVerticalBottom.style.visibility = isScrolledToYEnd ? 'hidden' : 'visible'
      this.$refs.tableShadowHorizontalLeft.style.visibility = isScrolledToXStart ? 'hidden' : 'visible'
      this.$refs.tableShadowHorizontalRight.style.visibility = isScrolledToXEnd ? 'hidden' : 'visible'

      this.$refs.tableShadowVerticalTop.style.transform = `translate(${xOffset}px, ${yOffset + headerHeight}px)`
      this.$refs.tableShadowVerticalBottom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      this.$refs.tableShadowHorizontalLeft.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      this.$refs.tableShadowHorizontalRight.style.transform = `translate(${xOffset}px, ${yOffset}px)`
    },

    layoutTableIfPossible () {
      if (this.isEmpty) return
      this.forcedLayoutTableThrottled()
    },

    forcedLayoutTable () {
      const requiredObjects = [
        this.$refs.tableHeader,
        this.$refs.tableBody,
        this.$refs.tableContainer
      ]
      const hasAllRequiredObjects = _.reduce(requiredObjects, (accum, object) => accum && !!object, true)
      if (!hasAllRequiredObjects) return this.$nextTick()

      this.isAdjustingTable = true

      return this.inferPageSize().then(() => {
        this.layoutColumns()
        this.isAdjustingTable = false
      })
    },

    layoutColumns () {
      const requiredObjects = [
        this.$refs.tableHeader,
        this.$refs.tableBody,
        this.$refs.tableContainer
      ]
      const hasAllRequiredObjects = _.reduce(requiredObjects, (accum, object) => accum && !!object, true)
      if (!hasAllRequiredObjects) return

      this.computeColumnsWidth()
      this.applyComputedColumnsWidth()
      this.layoutHeadersAndShadowsThrottled({
        yOffset: this.$refs.tableContainer.scrollTop,
        xOffset: this.$refs.tableContainer.scrollLeft
      })
    },

    computeColumnsWidth () {
      const tableSizingConfig = getTableSizingConfig(this)
      this.columnsWidths = getAutomaticColumnsWidth(tableSizingConfig, getDOMElementWidth)
    },

    applyComputedColumnsWidth () {
      const self = this

      if (!self.columnsWidths) return

      const requiredObjects = [
        self.$refs.tableHeader,
        self.$refs.tableBody,
        self.$refs.tableContainer
      ]
      const hasAllRequiredObjects = _.reduce(requiredObjects, (accum, object) => accum && !!object, true)
      if (!hasAllRequiredObjects) return

      const tableContainerWidth = getDOMElementWidth(self.$el)
      const tableContentWidth = _.sum(self.columnsWidths)
      const tableRemainingWidth = tableContainerWidth - tableContentWidth

      if (tableRemainingWidth >= 0) {
        // If there's no scroll then we get rid of the scrolled offset entirely.
        self.$refs.tableContainer.classList.remove(self.horizontalScrollCSSClass)
        self.$refs.tableContainer.scrollLeft = 0
      } else {
        // If we need horizontal scroll we add an additional class just so we
        // can do customizations later on with CSS or whatever...
        // Table requires horizontal scroll
        self.$refs.tableContainer.classList.add(self.horizontalScrollCSSClass)
        // If new width is smaller than current scroll offset we should reset it
        self.$refs.tableContainer.scrollLeft = _.min([
          self.$refs.tableContainer.scrollLeft,
          tableContentWidth - tableContainerWidth
        ])
      }

      const tableSizingConfig = getTableSizingConfig(this)

      // Finally we apply the widths to the rows...
      _.forEach(tableSizingConfig.rowsSizingConfig, (row) => applyWidthToRow(row, this.columnsWidths))

      self.$refs.tableHeader.style.width = `${_.max([tableContentWidth, tableContainerWidth])}px`
      self.$refs.tableBody.style.width = `${_.max([tableContentWidth, tableContainerWidth])}px`
      // We need this padding so sticky header doesn't cover any row
      const headerHeight = self.$refs.tableHeader
        .getBoundingClientRect()
        .height
      self.$refs.tableBody.style['padding-top'] = `${headerHeight}px`
    },

    inferPageSize () {
      if (!this.automaticPageSize) return this.$nextTick()
      if (!this.$refs.tableHeader) return this.$nextTick()
      if (!this.$refs.tableContainer) return this.$nextTick()
      if (_.isFinite(this.forcedPageSize)) return this.$nextTick()
      if (this.isInferringPageSize) return this.$nextTick()

      this.isInferringPageSize = true
      this.internallyForcedCurrentPageStart = 0
      this.inferredPageSize = 1

      return this.$nextTick()
        .then(() => {
          return attemptToIncreaseInferredPageSize(this)
        })
        .then(() => {
          this.applyComputedColumnsWidth()
          return this.$nextTick()
        })
        .then(() => {
          this.internallyForcedCurrentPageStart = -1
          this.isInferringPageSize = false

          /**
           * Inferred page size changed.
           *
           * @event infer-page-size
           * @type {number}
           */
          this.$emit('infer-page-size', this.inferredPageSize)
        })
    }
  }
}

function attemptToIncreaseInferredPageSize (vm) {
  if (vm.inferredPageSize >= vm.sourceData.length) return

  vm.inferredPageSize += 1

  return vm.$nextTick()
    .then(function () {
      const containerHeight = vm.$refs.tableContainer
        .getBoundingClientRect()
        .height
      const contentHeight = vm.$refs.tableContainer.scrollHeight

      const isVerticalScrollRequired = containerHeight < contentHeight

      if (isVerticalScrollRequired) {
        vm.inferredPageSize -= 1
        return vm.$nextTick()
      }

      return attemptToIncreaseInferredPageSize(vm)
    })
}

/**
 * @param {Vue} vueTableComponent
 * @return {TableSizingConfig<HTMLElement, HTMLElement>}
 */
function getTableSizingConfig (vueTableComponent) {
  /*
  Probably we should find a more reliable approach to do this. We can use
  this.$slots.header to get the VNodes added to header slot but we can't
  do that in the body because it's a scope slot (it receives parameters
  from the parent), so to use that approach (this.$scopeSlots) we have to
  duplicate here the logic of the v-for and parameter passing that we use
  in the template...

  As we always use geo-table-header-row and geo-table-body-row components
  we'll make that a requirement to use the table
  */
  const componentsByTagName = _.groupBy(vueTableComponent.$children, '$vnode.componentOptions.tag')
  const headerRows = _.map(
    componentsByTagName['geo-table-header-row'],
    (vueCellComponent) => getCellSizingConfigForCell(vueCellComponent)
  )
  const bodyRows = _.map(
    componentsByTagName['geo-table-body-row'],
    (vueCellComponent) => getCellSizingConfigForCell(vueCellComponent, {
      overridenIgnoreContentWidth: false
    })
  )

  const tableCells = [...headerRows, ...bodyRows]

  const tableSizingConfig = {
    rowsSizingConfig: tableCells,
    tableContainerElement: vueTableComponent.$el
  }

  return tableSizingConfig
}

/**
 * @param {Vue} vueComponent
 * @param {object} overrideSettings
 * @param {boolean} overrideSettings.overridenIgnoreContentWidth
 * @param {boolean} overrideSettings.overridenGrowingDisabled
 * @return {CellSizingConfig}
 */
function getCellSizingConfigForCell (vueComponent, overrideSettings) {
  // If vue-loader doesn't have `preserveWhitespace: false` we might see empty
  // nodes in slots. See: https://github.com/vuejs/vue/issues/5329
  const defaultSlotActualContent = _.filter(vueComponent.$slots.default, 'tag')

  return _.map(
    defaultSlotActualContent,
    (vNode) => getVueComponentColumnSizingSettings(vNode.componentInstance, vNode.elm, overrideSettings)
  )
}

function getDOMElementWidth (node) {
  // First of all we get rid of previous width so it doesn't interferes
  // with new one
  node.style.width = null
  const widthString = window
    .getComputedStyle(node)
    .getPropertyValue('width')
    .replace('px', '')
  // We want a number, so we remove the unit and parse number
  const width = parseFloat(widthString)
  return Math.ceil(width)
}

/**
 * @param {Array<CellSizingConfig<HTMLElement>>} row
 * @param {number[]} columnsWidths
 */
function applyWidthToRow (row, columnsWidths) {
  _.forEach(row, (row, index) => applyWidthToCell(row, index, columnsWidths))
}

/**
 * @param {CellSizingConfig<HTMLElement>} cell
 * @param {number} columnIndex
 * @param {number[]} columnsWidths
 */
function applyWidthToCell (cell, columnIndex, columnsWidths) {
  const width = columnsWidths[columnIndex]
  cell.element.style.width = `${width}px`
}
</script>
