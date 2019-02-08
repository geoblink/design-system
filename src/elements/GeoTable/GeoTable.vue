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
      <slot
        :css-modifier="cssModifier"
        name="footer"
      >
        <slot name="footerLeadingAccessoryItem" />
        <geo-table-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          :source-data-length="sourceData.length"
          @go-to-page="goToPage($event)"
        />
        <slot name="footerTrailingAccessoryItem" />
      </slot>
    </div>
  </div>
</template>

<script>
import OnResize from '../../directives/GeoOnResize'
import cssSuffix from '../../mixins/cssModifierMixin'
import throttle from '../../utils/throttle'
import _ from 'lodash'

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
      return this.currentPage * this.pageSize
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

      const requiredObjects = [
        this.$refs.tableHeader,
        this.$refs.tableBody,
        this.$refs.tableContainer
      ]
      const hasAllRequiredObjects = _.reduce(requiredObjects, (accum, object) => accum && !!object, true)
      if (!hasAllRequiredObjects) return

      this.forcedLayoutTableThrottled()
    },

    async forcedLayoutTable () {
      const requiredObjects = [
        this.$refs.tableHeader,
        this.$refs.tableBody,
        this.$refs.tableContainer
      ]
      const hasAllRequiredObjects = _.reduce(requiredObjects, (accum, object) => accum && !!object, true)
      if (!hasAllRequiredObjects) return

      this.isAdjustingTable = true
      await this.inferPageSize()
      this.layoutColumns()
      this.isAdjustingTable = false
    },

    layoutColumns () {
      this.computeColumnsWidth()
      this.applyComputedColumnsWidth()
      this.layoutHeadersAndShadowsThrottled({
        yOffset: this.$refs.tableContainer.scrollTop,
        xOffset: this.$refs.tableContainer.scrollLeft
      })
    },

    computeColumnsWidth () {
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
      const componentsByTagName = _.groupBy(this.$children, '$vnode.componentOptions.tag')
      const headerRows = _.map(componentsByTagName['geo-table-header-row'], getHeaderCellDefaultSlotDOMElements)
      const bodyRows = _.map(componentsByTagName['geo-table-body-row'], getDefaultSlotDOMElements)

      /*
       Here we store...

       - maxWidth:     The maximum width of the column (optional)
       - minWidth:     The minimum width of the column (optional)
       - width:        The width of the column (optional)
       - contentWidth: The width of the longest content in the column
                       (automatically computed)

       This object has a key for each column and an object with those 4
       properties as value.

       After filling the object we get the final width, which will be:

       - width, if set
       - contentWidth, considering it must be greater than minWidth (if set)
         and lower than maxWidth (if set)
      */
      const columnsSettings = {}

      // First we gather information from the header rows, in those rows we
      // can set a max or min width
      for (const singleHeaderRow of headerRows) {
        for (let columnIndex = 0; columnIndex < singleHeaderRow.length; columnIndex++) {
          const headerRowCell = singleHeaderRow[columnIndex]
          const currentColumnSettings = columnsSettings[columnIndex] || {}

          // We want to keep the lowest maximum as it's compatible with all the
          // maximum widths set
          currentColumnSettings.maxWidth = _.min([
            currentColumnSettings.maxWidth,
            headerRowCell.columnMaxWidth
          ])

          // We want to keep the highest minimum as it's compatible with all the
          // minimum widths set
          currentColumnSettings.minWidth = _.max([
            currentColumnSettings.minWidth,
            headerRowCell.columnMinWidth
          ])

          if (!_.isNil(headerRowCell.columnWidth)) {
            /*
             We should check if we are forcing a different width here, if we
             set a width for a column in a header row and a different one in a
             different header row then we should warn the user about it as it
             might lead to unexpected results
             */
            if (!_.isNil(currentColumnSettings.width) && currentColumnSettings.width !== headerRowCell.columnWidth) {
              console.warn(`GeoTable [component] :: different widths have been set for the same column: ${currentColumnSettings.width} and ${headerRowCell.columnWidth}. The last one will used.`)
            }

            currentColumnSettings.width = headerRowCell.columnWidth
          }

          // We want to keep the greatest contentWidth as all the content fits
          // in it as long as the header name is not truncatable
          const contentWidth = getDOMElementWidth(headerRowCell.domElement)

          if (!headerRowCell.ignoreContentWidth) {
            currentColumnSettings.contentWidth = _.max([
              currentColumnSettings.contentWidth,
              contentWidth
            ])
          }

          columnsSettings[columnIndex] = currentColumnSettings
        }
      }

      // Body rows are easier as they don't support setting column width... yet?
      // So we only have to get the content width and keep the greatest
      for (const singleBodyRow of bodyRows) {
        for (let columnIndex = 0; columnIndex < singleBodyRow.length; columnIndex++) {
          const bodyRowCell = singleBodyRow[columnIndex]
          const currentColumnSettings = columnsSettings[columnIndex]
          const contentWidth = getDOMElementWidth(bodyRowCell.domElement)
          currentColumnSettings.contentWidth = _.max([
            currentColumnSettings.contentWidth,
            contentWidth
          ])
        }
      }

      // Once we have the settings and content width we have to compute a first
      // width proposal respecting minimum and maximum and using forced width
      // (if set)
      this.columnsWidths = _.map(columnsSettings, function (currentColumnSettings) {
        if (currentColumnSettings.width) return currentColumnSettings.width
        const min = _.defaultTo(currentColumnSettings.minWidth, Number.NEGATIVE_INFINITY)
        const max = _.defaultTo(currentColumnSettings.maxWidth, Number.POSITIVE_INFINITY)
        const width = _.clamp(currentColumnSettings.contentWidth, min, max)
        return width
      })

      // We know the width of the cells but we need the width of the table's
      // container so we know if we need horizontal scroll or if there's extra
      // width that should be divided into the columns
      const tableContainerWidth = getDOMElementWidth(this.$el)
      const tableContentWidth = _.sum(this.columnsWidths)

      // If we have more space than required we have to divide the remaining
      // space between the columns using automatic width, so we don't mess with
      // any column that has a fixed width (or maximum or minimum)
      let tableRemainingWidth = tableContainerWidth - tableContentWidth
      if (tableRemainingWidth >= 0) {
        // We have to increase width of cells without an explicit width but with
        // or without minimum/maximum width
        //
        // We'll proceed as by splitting the remaining width equally between all
        // columns which have not been saturated yet, where saturated means that
        // the column has reached its maximum width
        //
        // A column with an explicit width is saturated by definition
        let unsaturatedColumns = _.sortBy(_.filter(_.map(columnsSettings, function (currentColumnSettings, index) {
          const remainingWidthUntilReachingMaximum = _.isNil(currentColumnSettings.maxWidth)
            ? Number.MAX_VALUE
            : currentColumnSettings.maxWidth - currentColumnSettings.contentWidth

          const isUsingAutomaticColumnWidth =
            _.isNil(currentColumnSettings.width) &&
            remainingWidthUntilReachingMaximum > 0

          return isUsingAutomaticColumnWidth
            ? {
              index: index,
              contentWidth: currentColumnSettings.contentWidth,
              remainingWidthUntilReachingMaximum: remainingWidthUntilReachingMaximum
            }
            : null
        })), 'remainingWidthUntilReachingMaximum')

        while (unsaturatedColumns.length && tableRemainingWidth > 0) {
          const maximumSingleColumnWidthIncrease = _.first(unsaturatedColumns).remainingWidthUntilReachingMaximum
          const singleColumnWidthIncrease = _.max([
            Math.floor(
              _.min([
                tableRemainingWidth / unsaturatedColumns.length,
                maximumSingleColumnWidthIncrease
              ])
            ),
            // Maybe there's not enough free space to give all columns at least
            // 1px more of space. If this happens it's better to add 1px column
            // by column until we run out of pixels.
            1
          ])

          for (const unsaturatedColumnSettings of unsaturatedColumns) {
            const columnIndex = unsaturatedColumnSettings.index
            unsaturatedColumnSettings.remainingWidthUntilReachingMaximum -= singleColumnWidthIncrease
            this.columnsWidths[columnIndex] += singleColumnWidthIncrease
            tableRemainingWidth -= singleColumnWidthIncrease

            if (tableRemainingWidth === 0) break
          }

          unsaturatedColumns = _.filter(unsaturatedColumns, (unsaturatedColumnSettings) =>
            unsaturatedColumnSettings.remainingWidthUntilReachingMaximum > 0
          )
        }

        if (tableRemainingWidth > 0) {
          console.warn('GeoTable [component] :: could not redistribute extra space between table columns without breaking limits on their maximum - or explicit - width')
        }
      }
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

      // Probably we should find a more reliable approach to do this. We can use
      // this.$slots.header to get the VNodes added to header slot but we can't
      // do that in the body because it's a scope slot (it receives parameters
      // from the parent), so to use that approach (this.$scopeSlots) we have to
      // duplicate here the logic of the v-for and parameter passing that we use
      // in the template...
      //
      // As we always use geo-table-header-row and geo-table-body-row components
      // we'll make that a requirement to use the table
      const componentsByTagName = _.groupBy(self.$children, '$vnode.componentOptions.tag')
      const headerRows = _.map(componentsByTagName['geo-table-header-row'], getHeaderCellDefaultSlotDOMElements)
      const bodyRows = _.map(componentsByTagName['geo-table-body-row'], getDefaultSlotDOMElements)

      // Finally we apply the widths to the headers...
      _.forEach(headerRows, applyWidthToRow)
      // ... and the body...
      _.forEach(bodyRows, applyWidthToRow)

      self.$refs.tableHeader.style.width = `${_.max([tableContentWidth, tableContainerWidth])}px`
      self.$refs.tableBody.style.width = `${_.max([tableContentWidth, tableContainerWidth])}px`
      // We need this padding so sticky header doesn't cover any row
      const headerHeight = self.$refs.tableHeader
        .getBoundingClientRect()
        .height
      self.$refs.tableBody.style['padding-top'] = `${headerHeight}px`

      function applyWidthToRow (row) {
        _.forEach(row, applyWidthToCell)
      }

      function applyWidthToCell (cell, columnIndex) {
        const width = self.columnsWidths[columnIndex]
        cell.domElement.style.width = `${width}px`
      }
    },

    async inferPageSize () {
      const self = this

      if (!self.automaticPageSize) return
      if (!self.$refs.tableHeader) return
      if (!self.$refs.tableContainer) return
      if (_.isFinite(self.forcedPageSize)) return
      if (self.isInferringPageSize) return

      self.isInferringPageSize = true
      self.inferredPageSize = 1
      await self.$nextTick()

      while (self.inferredPageSize < self.sourceData.length) {
        self.inferredPageSize += 1
        await self.$nextTick()

        const containerHeight = self.$refs.tableContainer
          .getBoundingClientRect()
          .height
        const contentHeight = self.$refs.tableContainer.scrollHeight

        const isVerticalScrollRequired = containerHeight < contentHeight

        if (isVerticalScrollRequired) {
          self.inferredPageSize -= 1
          await self.$nextTick()
          break
        }
      }

      self.applyComputedColumnsWidth()
      await self.$nextTick()
      self.isInferringPageSize = false
    }
  }
}

function getDefaultSlotDOMElements (vueComponent) {
  // If vue-loader doesn't have `preserveWhitespace: false` we might see empty
  // nodes in slows. See: https://github.com/vuejs/vue/issues/5329
  const defaultSlotActualContent = _.filter(vueComponent.$slots.default, 'tag')
  return _.map(defaultSlotActualContent, function (parentComponent) {
    return {
      // We only care about properties passed to the components and the
      // DOM elements
      ignoreContentWidth: false,
      columnMinWidth: parentComponent.columnMinWidth,
      columnMaxWidth: parentComponent.columnMaxWidth,
      columnWidth: parentComponent.columnWidth,
      domElement: parentComponent.elm
    }
  })
}

function getHeaderCellDefaultSlotDOMElements (vueComponent) {
  // If vue-loader doesn't have `preserveWhitespace: false` we might see empty
  // nodes in slows. See: https://github.com/vuejs/vue/issues/5329
  const defaultSlotActualContent = _.filter(vueComponent.$slots.default, 'tag')
  return _.map(defaultSlotActualContent, function (parentComponent) {
    // We only care about properties passed to the components and the
    // DOM elements
    return getBaseComponentAttributes(parentComponent.componentInstance)

    function getBaseComponentAttributes (componentInstance) {
      const propNames = [
        'ignoreContentWidth',
        'columnWidth',
        'columnMinWidth',
        'columnMaxWidth'
      ]

      if (_.find(propNames, attributeName => attributeName in componentInstance)) {
        return {
          ignoreContentWidth: componentInstance.ignoreContentWidth,
          columnMinWidth: componentInstance.columnMinWidth,
          columnMaxWidth: componentInstance.columnMaxWidth,
          columnWidth: componentInstance.columnWidth,
          domElement: parentComponent.elm
        }
      } else {
        return _.reduce(componentInstance.$children, function (accum, childInstance) {
          return accum.continueLooking
            ? getBaseComponentAttributes(childInstance)
            : accum
        }, {
          domElement: parentComponent.elm,
          continueLooking: true
        })
      }
    }
  })
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
</script>
