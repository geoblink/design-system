import { createLocalVue, mount } from '@vue/test-utils'

import {
  getColumnSizeRequirements,
  getAutomaticColumnsWidth,
  getInitialTableWidthDistribution,
  getTableWidthDistributionFillingParent,
  getSortedUnsaturatedColumnsConfig,
  getUnsaturatedColumnsConfig,
  getColumnsWidthDistribution,
  getVueComponentColumnSizingSettings
} from '@/elements/GeoTable/GeoTable.utils'

import GeoTableHeaderRowCell from '@/elements/GeoTable/GeoTableHeaderRowCell'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-header-row-cell', GeoTableHeaderRowCell)

describe('GeoTable utils', function () {
  describe('#getColumnSizeRequirements', function () {
    it('Should return an empty object when no rows are given', function () {
      const result = getColumnSizeRequirements([])
      expect(result).toEqual([])
    })

    it('Should return defaults when no column given', function () {
      const result = getColumnSizeRequirements([[{}]], () => null)
      expect(result[0]).toHaveProperty('growingDisabled', false)
      expect(result[0]).toHaveProperty('maxWidth', null)
      expect(result[0]).toHaveProperty('minWidth', null)
      expect(result[0]).toHaveProperty('width', null)
      expect(result[0]).toHaveProperty('rawContentWidth', 0)
      expect(result[0]).toHaveProperty('contentWidth', 0)
    })

    it('Should return growingDisabled=true if some row has disabled it', function () {
      const singleRow = getColumnSizeRequirements([[{ growingDisabled: true }]], () => null)
      expect(singleRow[0]).toHaveProperty('growingDisabled', true)

      const multipleRows = getColumnSizeRequirements([[{ growingDisabled: true }], [{}]], () => null)
      expect(multipleRows[0]).toHaveProperty('growingDisabled', true)

      const multipleRowsMiddle = getColumnSizeRequirements([[{}], [{ growingDisabled: true }], [{}]], () => null)
      expect(multipleRowsMiddle[0]).toHaveProperty('growingDisabled', true)

      const multipleRowsNone = getColumnSizeRequirements([[{}], [{}], [{}]], () => null)
      expect(multipleRowsNone[0]).toHaveProperty('growingDisabled', false)
    })

    it('Should return latest growingDisabled value', function () {
      const multipleRowsOneTrueAndOneFalse = getColumnSizeRequirements([[{ growingDisabled: true }], [{ growingDisabled: false }]], () => null)
      expect(multipleRowsOneTrueAndOneFalse[0]).toHaveProperty('growingDisabled', false)
    })

    it('Should return minWidth', function () {
      const singleRow = getColumnSizeRequirements([[{ columnMinWidth: 10 }]], () => null)
      expect(singleRow[0]).toHaveProperty('minWidth', 10)

      const multipleRows = getColumnSizeRequirements([[{ columnMinWidth: 10 }], [{}]], () => null)
      expect(multipleRows[0]).toHaveProperty('minWidth', 10)

      const multipleRowsMiddle = getColumnSizeRequirements([[{}], [{ columnMinWidth: 10 }], [{}]], () => null)
      expect(multipleRowsMiddle[0]).toHaveProperty('minWidth', 10)

      const multipleRowsNone = getColumnSizeRequirements([[{}], [{}], [{}]], () => null)
      expect(multipleRowsNone[0]).toHaveProperty('minWidth', null)
    })

    it('Should return maximum minWidth', function () {
      const singleRow = getColumnSizeRequirements([[{ columnMinWidth: 10 }], [{ columnMinWidth: 20 }]], () => null)
      expect(singleRow[0]).toHaveProperty('minWidth', 20)

      const multipleRows = getColumnSizeRequirements([[{ columnMinWidth: 20 }], [{ columnMinWidth: 10 }]], () => null)
      expect(multipleRows[0]).toHaveProperty('minWidth', 20)
    })

    it('Should return maxWidth', function () {
      const singleRow = getColumnSizeRequirements([[{ columnMaxWidth: 10 }]], () => null)
      expect(singleRow[0]).toHaveProperty('maxWidth', 10)

      const multipleRows = getColumnSizeRequirements([[{ columnMaxWidth: 10 }], [{}]], () => null)
      expect(multipleRows[0]).toHaveProperty('maxWidth', 10)

      const multipleRowsMiddle = getColumnSizeRequirements([[{}], [{ columnMaxWidth: 10 }], [{}]], () => null)
      expect(multipleRowsMiddle[0]).toHaveProperty('maxWidth', 10)

      const multipleRowsNone = getColumnSizeRequirements([[{}], [{}], [{}]], () => null)
      expect(multipleRowsNone[0]).toHaveProperty('maxWidth', null)
    })

    it('Should return minimum maxWidth', function () {
      const singleRow = getColumnSizeRequirements([[{ columnMaxWidth: 10 }], [{ columnMaxWidth: 20 }]], () => null)
      expect(singleRow[0]).toHaveProperty('maxWidth', 10)

      const multipleRows = getColumnSizeRequirements([[{ columnMaxWidth: 20 }], [{ columnMaxWidth: 10 }]], () => null)
      expect(multipleRows[0]).toHaveProperty('maxWidth', 10)
    })

    it('Should return width when forced', function () {
      const singleRow = getColumnSizeRequirements([[{ columnWidth: 10 }]], () => null)
      expect(singleRow[0]).toHaveProperty('width', 10)

      const multipleRows = getColumnSizeRequirements([[{ columnWidth: 10 }], [{}]], () => null)
      expect(multipleRows[0]).toHaveProperty('width', 10)

      const multipleRowsMiddle = getColumnSizeRequirements([[{}], [{ columnWidth: 10 }], [{}]], () => null)
      expect(multipleRowsMiddle[0]).toHaveProperty('width', 10)

      const multipleRowsNone = getColumnSizeRequirements([[{}], [{}], [{}]], () => null)
      expect(multipleRowsNone[0]).toHaveProperty('width', null)
    })

    it('Should complain about impossible to satisfy restrictions when giving different forced widths for the same column', function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

      const multipleRows = getColumnSizeRequirements([[{ columnWidth: 10 }], [{ columnWidth: 20 }]], () => null)
      expect(multipleRows[0]).toHaveProperty('width', 20)

      expect(consoleWarnSpy).toHaveBeenCalled()

      consoleWarnSpy.mockRestore()
    })

    it('Should not complain about impossible restrictions when they can be satisfied', function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

      const multipleRows = getColumnSizeRequirements([[{ columnWidth: 10 }, { }], [{ }, { columnWidth: 20 }]], () => null)
      expect(multipleRows[0]).toHaveProperty('width', 10)
      expect(multipleRows[1]).toHaveProperty('width', 20)

      expect(consoleWarnSpy).not.toHaveBeenCalled()

      consoleWarnSpy.mockRestore()
    })

    it('Should return not complain about multiple forced widths if they are equal', function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

      const multipleRows = getColumnSizeRequirements([[{ columnWidth: 10 }], [{ columnWidth: 10 }]], () => null)
      expect(multipleRows[0]).toHaveProperty('width', 10)

      expect(consoleWarnSpy).not.toHaveBeenCalled()

      consoleWarnSpy.mockRestore()
    })

    it('Should return maximum rawContentWidth', function () {
      const firstRowCell = { element: { contentWidth: 10 } }
      const secondRowCell = { element: { contentWidth: 30 } }
      const thirdRowCell = { element: { contentWidth: 20 } }

      const multipleRows = getColumnSizeRequirements([[firstRowCell], [secondRowCell], [thirdRowCell]], getCellContentWidth)

      expect(multipleRows[0]).toHaveProperty('rawContentWidth', 30)

      function getCellContentWidth (element) {
        return element.contentWidth
      }
    })

    it('Should return maximum rawContentWidth including ignored cells', function () {
      const firstRowCell = { element: { contentWidth: 10 } }
      const secondRowCell = { element: { contentWidth: 30 }, ignoreContentWidth: true }
      const thirdRowCell = { element: { contentWidth: 20 } }

      const multipleRows = getColumnSizeRequirements([[firstRowCell], [secondRowCell], [thirdRowCell]], getCellContentWidth)

      expect(multipleRows[0]).toHaveProperty('rawContentWidth', 30)

      function getCellContentWidth (element) {
        return element.contentWidth
      }
    })

    it('Should return maximum contentWidth', function () {
      const firstRowCell = { element: { contentWidth: 10 } }
      const secondRowCell = { element: { contentWidth: 30 } }
      const thirdRowCell = { element: { contentWidth: 20 } }

      const multipleRows = getColumnSizeRequirements([[firstRowCell], [secondRowCell], [thirdRowCell]], getCellContentWidth)

      expect(multipleRows[0]).toHaveProperty('contentWidth', 30)

      function getCellContentWidth (element) {
        return element.contentWidth
      }
    })

    it('Should return maximum contentWidth ignoring cells with `ignoreContentWidth` flag', function () {
      const firstRowCell = { element: { contentWidth: 10 } }
      const secondRowCell = { element: { contentWidth: 30 }, ignoreContentWidth: true }
      const thirdRowCell = { element: { contentWidth: 20 } }

      const multipleRows = getColumnSizeRequirements([[firstRowCell], [secondRowCell], [thirdRowCell]], getCellContentWidth)

      expect(multipleRows[0]).toHaveProperty('contentWidth', 20)

      function getCellContentWidth (element) {
        return element.contentWidth
      }
    })
  })

  describe('#getInitialTableWidthDistribution', function () {
    it('Should return empty array when empty array is given', function () {
      const widthDistribution = getInitialTableWidthDistribution([])
      expect(widthDistribution).toEqual([])
    })

    it('Should return content width', function () {
      const widthDistribution = getInitialTableWidthDistribution([{
        contentWidth: 100
      }, {
        contentWidth: 200
      }])

      expect(widthDistribution).toEqual([100, 200])
    })

    it('Should respect forced width', function () {
      const widthDistribution = getInitialTableWidthDistribution([{
        contentWidth: 100,
        width: 300
      }, {
        contentWidth: 200
      }])

      expect(widthDistribution).toEqual([300, 200])
    })

    it('Should consider minimum width', function () {
      const widthDistribution = getInitialTableWidthDistribution([{
        minWidth: 150,
        contentWidth: 100
      }, {
        minWidth: 150,
        contentWidth: 200
      }])

      expect(widthDistribution).toEqual([150, 200])
    })

    it('Should consider maximum width', function () {
      const widthDistribution = getInitialTableWidthDistribution([{
        maxWidth: 150,
        contentWidth: 100
      }, {
        maxWidth: 150,
        contentWidth: 200
      }])

      expect(widthDistribution).toEqual([100, 150])
    })

    it('Should consider minimum and maximum width', function () {
      const widthDistribution = getInitialTableWidthDistribution([{
        minWidth: 125,
        maxWidth: 150,
        contentWidth: 100
      }, {
        minWidth: 125,
        maxWidth: 150,
        contentWidth: 200
      }])

      expect(widthDistribution).toEqual([125, 150])
    })
  })

  describe('#getAutomaticColumnsWidth', function () {
    it('Should do nothing if there are no columns', function () {
      const distribution = getAutomaticColumnsWidth({ rowsSizingConfig: [[]] }, () => null)
      expect(distribution).toEqual([])
    })

    it('Should respect minimum width', function () {
      const config = {
        rowsSizingConfig: [[{
          columnMinWidth: 50,
          element: { }
        }, {
          element: { }
        }]],
        tableContainerElement: {
          elementWidth: 70
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([60, 10])
    })

    it('Should require table to grow to satisfy minimum width', function () {
      const config = {
        rowsSizingConfig: [[{
          columnMinWidth: 50,
          element: {}
        }]],
        tableContainerElement: {
          elementWidth: 20
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([50])
    })

    it('Should respect maximum width', function () {
      const config = {
        rowsSizingConfig: [[{
          columnMaxWidth: 50,
          element: {}
        }, {
          element: {}
        }]],
        tableContainerElement: {
          elementWidth: 200
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([50, 150])
    })

    it('Should respect forced width', function () {
      const config = {
        rowsSizingConfig: [[{
          columnWidth: 50,
          element: {}
        }, {
          element: {}
        }]],
        tableContainerElement: {
          elementWidth: 200
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([50, 150])
    })

    it('Should require table to grow to satisfy forced width', function () {
      const config = {
        rowsSizingConfig: [[{
          columnWidth: 50,
          element: {}
        }]],
        tableContainerElement: {
          elementWidth: 20
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([50])
    })

    it('Should grow hidden-raw-content columns first', function () {
      const config = {
        rowsSizingConfig: [[{
          ignoreContentWidth: true,
          element: {
            elementWidth: 100
          }
        }, {
          element: {
            elementWidth: 50
          }
        }]],
        tableContainerElement: {
          elementWidth: 150
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([100, 50])
    })

    it('Should not grow `growingDisabled` columns', function () {
      const config = {
        rowsSizingConfig: [[{
          growingDisabled: true,
          element: {
            elementWidth: 50
          }
        }, {
          element: {
            elementWidth: 50
          }
        }]],
        tableContainerElement: {
          elementWidth: 150
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([50, 100])
    })

    it('Should not require extra width for raw content in `ignoreContentWidth` columns', function () {
      const config = {
        rowsSizingConfig: [[{
          ignoreContentWidth: true,
          element: {
            elementWidth: 50
          }
        }, {
          element: {
            elementWidth: 50
          }
        }]],
        tableContainerElement: {
          elementWidth: 50
        }
      }
      const distribution = getAutomaticColumnsWidth(config, (element) => element.elementWidth)
      expect(distribution).toEqual([0, 50])
    })
  })

  describe('#getTableWidthDistributionFillingParent', function () {
    it('Should do nothing if there\'s no space to distribute', function () {
      const columnsSettings = [{
        growingDisabled: false,
        rawContentWidth: 200,
        contentWidth: 100
      }]

      const columnsWidths = getTableWidthDistributionFillingParent(columnsSettings, [0], {
        containerWidth: 100,
        contentWidth: 200
      })

      expect(columnsWidths).toEqual([0])
    })

    it('Should grow columns with trimmed content before the rest', function () {
      const columnsSettings = [{
        growingDisabled: false,
        rawContentWidth: 200,
        contentWidth: 100
      }, {
        growingDisabled: false,
        rawContentWidth: 100,
        contentWidth: 100
      }]

      const columnsWidths = getTableWidthDistributionFillingParent(columnsSettings, [100, 100], {
        containerWidth: 300,
        contentWidth: 200
      })

      expect(columnsWidths).toEqual([200, 100])
    })

    it('Should grow columns without trimmed content evenly', function () {
      const columnsSettings = [{
        growingDisabled: false,
        rawContentWidth: 100,
        contentWidth: 100
      }, {
        growingDisabled: false,
        rawContentWidth: 100,
        contentWidth: 100
      }]

      const columnsWidths = getTableWidthDistributionFillingParent(columnsSettings, [0, 0], {
        containerWidth: 300,
        contentWidth: 200
      })

      expect(columnsWidths).toEqual([50, 50])
    })

    it('Should grow columns evenly after growing trimmed content ones', function () {
      const columnsSettings = [{
        growingDisabled: false,
        rawContentWidth: 200,
        contentWidth: 100
      }, {
        growingDisabled: false,
        rawContentWidth: 100,
        contentWidth: 100
      }]

      const columnsWidths = getTableWidthDistributionFillingParent(columnsSettings, [100, 100], {
        containerWidth: 400,
        contentWidth: 200
      })

      expect(columnsWidths).toEqual([250, 150])
    })

    it('Should not grow columns with `growingDisabled` set to `true`', function () {
      const columnsSettings = [{
        growingDisabled: true,
        rawContentWidth: 100,
        contentWidth: 100
      }, {
        growingDisabled: false,
        rawContentWidth: 100,
        contentWidth: 100
      }]

      const columnsWidths = getTableWidthDistributionFillingParent(columnsSettings, [0, 0], {
        containerWidth: 300,
        contentWidth: 200
      })

      expect(columnsWidths).toEqual([0, 100])
    })

    it('Should complain if there is not column to grow', function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

      const columnsSettings = [{
        growingDisabled: true,
        rawContentWidth: 100,
        contentWidth: 100
      }, {
        growingDisabled: true,
        rawContentWidth: 100,
        contentWidth: 100
      }]

      const columnsWidths = getTableWidthDistributionFillingParent(columnsSettings, [0, 0], {
        containerWidth: 300,
        contentWidth: 200
      })

      expect(columnsWidths).toEqual([0, 0])
      expect(consoleWarnSpy).toHaveBeenCalled()

      consoleWarnSpy.mockRestore()
    })
  })

  describe('#getSortedUnsaturatedColumnsConfig', function () {
    it('Should return columns sorted by remaining width', function () {
      const columnsSettings = [{
        maxWidth: 200,
        rawContentWidth: 50,
        contentWidth: 50
      }, {
        maxWidth: 100,
        rawContentWidth: 50,
        contentWidth: 50
      }]

      const config = getSortedUnsaturatedColumnsConfig(columnsSettings, [50, 50])

      expect(config).toHaveLength(2)
      expect(config[0]).toHaveProperty('index', 1)
      expect(config[1]).toHaveProperty('index', 0)
    })

    it('Should not return columns which already reached maximum width', function () {
      const columnsSettings = [{
        maxWidth: 50,
        rawContentWidth: 50,
        contentWidth: 50
      }, {
        maxWidth: 100,
        rawContentWidth: 50,
        contentWidth: 50
      }]

      const config = getSortedUnsaturatedColumnsConfig(columnsSettings, [50, 50])

      expect(config).toHaveLength(1)
      expect(config[0]).toHaveProperty('index', 1)
    })
  })

  describe('#getUnsaturatedColumnsConfig', function () {
    it('Should return null if growing is disabled', function () {
      const config = getUnsaturatedColumnsConfig({
        growingDisabled: true
      }, 0, [0])
      expect(config).toBeNull()
    })

    it('Should return null if width is forced', function () {
      const config = getUnsaturatedColumnsConfig({
        width: 200
      }, 0, [0])
      expect(config).toBeNull()
    })

    it('Should return null if maximum width if already reached', function () {
      const config = getUnsaturatedColumnsConfig({
        maxWidth: 50,
        contentWidth: 50
      }, 0, [50])
      expect(config).toBeNull()
    })

    it('Should return `isRawContentEntirelyVisible` as `false` if `rawContentWidth` is greater than `contentWidth`', function () {
      const config = getUnsaturatedColumnsConfig({
        rawContentWidth: 100,
        contentWidth: 50
      }, 0, [0])
      expect(config).toHaveProperty('isRawContentEntirelyVisible', false)
    })

    it('Should return `isRawContentEntirelyVisible` as `true` if `rawContentWidth` is lower or equal to `contentWidth`', function () {
      const configWhenLower = getUnsaturatedColumnsConfig({
        rawContentWidth: 20,
        contentWidth: 50
      }, 0, [30])
      expect(configWhenLower).toHaveProperty('isRawContentEntirelyVisible', true)

      const configWhenEqual = getUnsaturatedColumnsConfig({
        rawContentWidth: 70,
        contentWidth: 50
      }, 0, [70])
      expect(configWhenEqual).toHaveProperty('isRawContentEntirelyVisible', true)
    })

    it('Should return `Number.MAX_VALUE` as `remainingWidthUntilReachingMaximum` when there\'s no limit', function () {
      const config = getUnsaturatedColumnsConfig({
        rawContentWidth: 50,
        contentWidth: 50
      }, 0, [60])
      expect(config).toHaveProperty('remainingWidthUntilReachingMaximum', Number.MAX_VALUE)
    })

    it('Should respect max width in `remainingWidthUntilReachingMaximum`', function () {
      const config = getUnsaturatedColumnsConfig({
        maxWidth: 200,
        rawContentWidth: 50,
        contentWidth: 50
      }, 0, [75])
      expect(config).toHaveProperty('remainingWidthUntilReachingMaximum', 125)
    })

    it('Should consider width required to show raw content in `remainingWidthUntilReachingMaximum` if it\'s not entirely visible yet', function () {
      const config = getUnsaturatedColumnsConfig({
        maxWidth: 200,
        rawContentWidth: 70,
        contentWidth: 50
      }, 0, [60])
      expect(config).toHaveProperty('remainingWidthUntilReachingMaximum', 10)
    })
  })

  describe('#getColumnsWidthDistribution', function () {
    it('Should distribute nothing if there\'s no width to distribute', function () {
      const columnSettings = [{
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 50,
        index: 0
      }]

      const newDistribution = getColumnsWidthDistribution(columnSettings, 0)

      expect(newDistribution).toHaveProperty('remainingColumns', columnSettings)
      expect(newDistribution).toHaveProperty('remainingWidth', 0)
      expect(newDistribution).toHaveProperty('columnsWidths', [])
    })

    it('Should distribute width among columns', function () {
      const columnSettings = [{
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 50,
        index: 0
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 75,
        index: 2 // Column 1 is intentionally left one - let's assume it has reached its max-width
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 25,
        index: 3
      }]

      const newDistribution = getColumnsWidthDistribution(columnSettings, 300)

      expect(newDistribution).toHaveProperty('remainingColumns', [])
      expect(newDistribution).toHaveProperty('remainingWidth', 0)
      expect(newDistribution).toHaveProperty('columnsWidths', [100, undefined, 100, 100])
    })

    it('Should distribute width among columns when there\'s not enough', function () {
      const columnSettings = [{
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 50,
        index: 0
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 75,
        index: 2 // Column 1 is intentionally left one - let's assume it has reached its max-width
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 25,
        index: 3
      }]

      const newDistribution = getColumnsWidthDistribution(columnSettings, 225)

      expect(newDistribution).toHaveProperty('remainingColumns', [{
        remainingWidthUntilReachingMaximum: 25,
        headerContentWidth: 50,
        index: 0
      }, {
        remainingWidthUntilReachingMaximum: 25,
        headerContentWidth: 75,
        index: 2
      }, {
        remainingWidthUntilReachingMaximum: 25,
        headerContentWidth: 25,
        index: 3
      }])
      expect(newDistribution).toHaveProperty('remainingWidth', 0)
      expect(newDistribution).toHaveProperty('columnsWidths', [75, undefined, 75, 75])
    })

    it('Should distribute width among columns when there\'s not enough to give 1px to each column', function () {
      const columnSettings = [{
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 50,
        index: 0
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 75,
        index: 2 // Column 1 is intentionally left one - let's assume it has reached its max-width
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 25,
        index: 3
      }]

      const newDistribution = getColumnsWidthDistribution(columnSettings, 2)

      expect(newDistribution).toHaveProperty('remainingColumns', [{
        remainingWidthUntilReachingMaximum: 99,
        headerContentWidth: 50,
        index: 0
      }, {
        remainingWidthUntilReachingMaximum: 99,
        headerContentWidth: 75,
        index: 2
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 25,
        index: 3
      }])
      expect(newDistribution).toHaveProperty('remainingWidth', 0)
      expect(newDistribution).toHaveProperty('columnsWidths', [1, undefined, 1])
    })

    it('Should distribute width until reaching maximum width of first column', function () {
      const columnSettings = [{
        remainingWidthUntilReachingMaximum: 30,
        headerContentWidth: 50,
        index: 3
      }, {
        remainingWidthUntilReachingMaximum: 70,
        headerContentWidth: 75,
        index: 2 // Column 1 is intentionally left one - let's assume it has reached its max-width
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 25,
        index: 0
      }]

      const newDistribution = getColumnsWidthDistribution(columnSettings, 300)

      expect(newDistribution).toHaveProperty('remainingColumns', [{
        remainingWidthUntilReachingMaximum: 40,
        headerContentWidth: 75,
        index: 2
      }, {
        remainingWidthUntilReachingMaximum: 70,
        headerContentWidth: 25,
        index: 0
      }])
      expect(newDistribution).toHaveProperty('remainingWidth', 210)
      expect(newDistribution).toHaveProperty('columnsWidths', [30, undefined, 30, 30])
    })

    it('Should distribute width in integer amounts', function () {
      const columnSettings = [{
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 50,
        index: 0
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 75,
        index: 2 // Column 1 is intentionally left one - let's assume it has reached its max-width
      }, {
        remainingWidthUntilReachingMaximum: 100,
        headerContentWidth: 25,
        index: 3
      }]

      const newDistribution = getColumnsWidthDistribution(columnSettings, 200)

      expect(newDistribution).toHaveProperty('remainingColumns', [{
        remainingWidthUntilReachingMaximum: 34,
        headerContentWidth: 50,
        index: 0
      }, {
        remainingWidthUntilReachingMaximum: 34,
        headerContentWidth: 75,
        index: 2
      }, {
        remainingWidthUntilReachingMaximum: 34,
        headerContentWidth: 25,
        index: 3
      }])
      expect(newDistribution).toHaveProperty('remainingWidth', 2)
      expect(newDistribution).toHaveProperty('columnsWidths', [66, undefined, 66, 66])
    })
  })

  describe('#getVueComponentColumnSizingSettings', function () {
    it('Should return default if no props are set', function () {
      const wrapper = mount(GeoTableHeaderRowCell)

      const instance = wrapper.find('.geo-table-header-row-cell--main')
      expect(instance.exists()).toBe(true)

      const columnSizingSettings = getVueComponentColumnSizingSettings(
        instance.vm.$vnode.componentInstance,
        instance.vm.$el
      )
      expect(columnSizingSettings).toHaveProperty('ignoreContentWidth', false)
      expect(columnSizingSettings).toHaveProperty('growingDisabled', false)
      expect(columnSizingSettings).toHaveProperty('columnMinWidth', undefined)
      expect(columnSizingSettings).toHaveProperty('columnMaxWidth', undefined)
      expect(columnSizingSettings).toHaveProperty('columnWidth', undefined)
      expect(columnSizingSettings).toHaveProperty('element', instance.element)
    })

    describe('`ignoreContentWidth`', function () {
      it('Should return `ignoreContentWidth` if set to `false`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            ignoreContentWidth: false
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el
        )
        expect(columnSizingSettings).toHaveProperty('ignoreContentWidth', false)
      })

      it('Should return `ignoreContentWidth` if set to `true`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            ignoreContentWidth: true
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el
        )
        expect(columnSizingSettings).toHaveProperty('ignoreContentWidth', true)
      })

      it('Should return overriden `ignoreContentWidth` if set to `false`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            ignoreContentWidth: true
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el,
          { overridenIgnoreContentWidth: false }
        )
        expect(columnSizingSettings).toHaveProperty('ignoreContentWidth', false)
      })

      it('Should return overriden `ignoreContentWidth` if set to `true`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            ignoreContentWidth: false
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el,
          { overridenIgnoreContentWidth: true }
        )
        expect(columnSizingSettings).toHaveProperty('ignoreContentWidth', true)
      })
    })

    describe('`growingDisabled`', function () {
      it('Should return `growingDisabled` if set to `false`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            growingDisabled: false
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el
        )
        expect(columnSizingSettings).toHaveProperty('growingDisabled', false)
      })

      it('Should return `growingDisabled` if set to `true`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            growingDisabled: true
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el
        )
        expect(columnSizingSettings).toHaveProperty('growingDisabled', true)
      })

      it('Should return overriden `growingDisabled` if set to `false`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            growingDisabled: true
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el,
          { overridenGrowingDisabled: false }
        )
        expect(columnSizingSettings).toHaveProperty('growingDisabled', false)
      })

      it('Should return overriden `growingDisabled` if set to `true`', function () {
        const wrapper = mount(GeoTableHeaderRowCell, {
          propsData: {
            growingDisabled: false
          }
        })

        const instance = wrapper.find('.geo-table-header-row-cell--main')
        expect(instance.exists()).toBe(true)

        const columnSizingSettings = getVueComponentColumnSizingSettings(
          instance.vm.$vnode.componentInstance,
          instance.vm.$el,
          { overridenGrowingDisabled: true }
        )
        expect(columnSizingSettings).toHaveProperty('growingDisabled', true)
      })
    })

    it('Should return `columnMinWidth` if set', function () {
      const wrapper = mount(GeoTableHeaderRowCell, {
        propsData: {
          columnMinWidth: 10
        }
      })

      const instance = wrapper.find('.geo-table-header-row-cell--main')
      expect(instance.exists()).toBe(true)

      const columnSizingSettings = getVueComponentColumnSizingSettings(
        instance.vm.$vnode.componentInstance,
        instance.vm.$el
      )
      expect(columnSizingSettings).toHaveProperty('columnMinWidth', 10)
    })

    it('Should return `columnMaxWidth` if set', function () {
      const wrapper = mount(GeoTableHeaderRowCell, {
        propsData: {
          columnMaxWidth: 10
        }
      })

      const instance = wrapper.find('.geo-table-header-row-cell--main')
      expect(instance.exists()).toBe(true)

      const columnSizingSettings = getVueComponentColumnSizingSettings(
        instance.vm.$vnode.componentInstance,
        instance.vm.$el
      )
      expect(columnSizingSettings).toHaveProperty('columnMaxWidth', 10)
    })

    it('Should return `columnWidth` if set', function () {
      const wrapper = mount(GeoTableHeaderRowCell, {
        propsData: {
          columnWidth: 10
        }
      })

      const instance = wrapper.find('.geo-table-header-row-cell--main')
      expect(instance.exists()).toBe(true)

      const columnSizingSettings = getVueComponentColumnSizingSettings(
        instance.vm.$vnode.componentInstance,
        instance.vm.$el
      )
      expect(columnSizingSettings).toHaveProperty('columnWidth', 10)
    })
  })
})
