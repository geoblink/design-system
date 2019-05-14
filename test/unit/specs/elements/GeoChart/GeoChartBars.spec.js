import _ from 'lodash'

import {
  flushD3Transitions,
  stubGetBoundingClientRectFactory,
  stubGetBBoxFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  getTransformTranslateMatches,
  stubCreateSVGPointFactory
} from './GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

import * as barsUtils from '@/elements/GeoChart/GeoChartUtils/barsUtils'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartBars', function () {
  const stubGetBBox = stubGetBBoxFactory()
  const stubGetScreenCTM = stubGetScreenCTMFactory()
  const stubCreateSVGPoint = stubCreateSVGPointFactory()

  beforeEach(function () {
    stubGetBBox.setup()
    stubCreateSVGPoint.setup()
    stubGetScreenCTM.setup()
  })

  afterEach(function () {
    stubGetBBox.teardown()
    stubCreateSVGPoint.teardown()
    stubGetScreenCTM.teardown()
  })

  afterEach(function () {
    document.body.innerHTML = ''
  })

  describe('Constants', function () {
    it('should export DIMENSIONS', function () {
      expect(GeoChart.constants).toHaveProperty('DIMENSIONS')
      expect(GeoChart.constants.DIMENSIONS).toHaveProperty('DIMENSIONS_2D')
    })

    it('should export DEFAULT_WIDTH', function () {
      expect(barsUtils).toHaveProperty('DEFAULT_WIDTH')
    })
  })

  describe('#render', function () {
    const baseLinearAxisConfig = {
      id: 'sample-linear-axis',
      keyForValues: 'linear-value',
      scale: {
        type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
        valueForOrigin: 500,
        domain: {
          start: -1000,
          end: 2000
        }
      }
    }

    const baseLogarithmicAxisConfig = {
      id: 'sample-logarithmic-axis',
      keyForValues: 'logarithmic-value',
      scale: {
        type: GeoChart.constants.SCALES.SCALE_TYPES.logarithmic,
        valueForOrigin: 2,
        domain: {
          start: 1,
          end: 1024
        }
      }
    }

    const linearValues = [500, 1000, -500]
    const logarithmicValues = [2, 8, 256]
    const categories = ['First', 'Second', 'Third']
    const baseCategoricalAxisConfig = {
      id: 'sample-categorical-axis',
      keyForValues: 'categorical-value',
      scale: {
        type: GeoChart.constants.SCALES.SCALE_TYPES.categorical,
        valueForOrigin: _.first(categories),
        domain: categories
      }
    }

    const keyForValuesInMainDimensionAxis = 'dimension-axis-value'

    describe('Vertical dimension', function () {
      testSpecificDimension({
        dimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical,
        dimensionAttribute: 'height',
        normalDimensionAttribute: 'width',
        chartDimensionSpan: 500,
        chartNormalDimensionSpan: 300
      })
    })

    describe('Horizontal dimension', function () {
      testSpecificDimension({
        dimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal,
        dimensionAttribute: 'width',
        normalDimensionAttribute: 'height',
        chartDimensionSpan: 500,
        chartNormalDimensionSpan: 300
      })
    })

    function testSpecificDimension ({
      dimension,
      dimensionAttribute,
      normalDimensionAttribute,
      chartDimensionSpan,
      chartNormalDimensionSpan
    }) {
      const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
        height: chartNormalDimensionSpan,
        width: chartDimensionSpan
      })

      beforeEach(function () {
        stubGetBoundingClientRect.setup()
      })

      afterEach(function () {
        stubGetBoundingClientRect.teardown()
      })

      const categoriesSpanInCanvasUnits = _.times(categories.length, () => chartDimensionSpan / categories.length)
      const getCategoricalNormalAxisExpectedOffsetForNaturalValue = function (naturalValue, additionalOffset = 0) {
        const positionInCategoriesList = categories.indexOf(naturalValue)

        switch (dimension) {
          case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
            return {
              x: (positionInCategoriesList + additionalOffset) * _.first(categoriesSpanInCanvasUnits)
            }
          case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
            return {
              y: (positionInCategoriesList + additionalOffset) * _.first(categoriesSpanInCanvasUnits)
            }
        }
      }

      testLinearAxisForMainDimension()
      testLogarithmicAxisForMainDimension()
      testCategoricalAxisForMainDimension()

      function testLinearAxisForMainDimension () {
        const linearValuesInCanvasUnits = [0, 50, 100]
        const linearValuesOffsetInCanvasUnits = [
          chartNormalDimensionSpan / 2,
          chartNormalDimensionSpan / 2,
          chartNormalDimensionSpan / 2 - 100 // -100 because this is expanding from top to bottom
        ]

        testSpecificDimensionAxis({
          specName: 'Linear scale for main dimension',
          dimension,
          dimensionAttribute,
          normalDimensionAttribute,
          dimensionAxisBaseConfig: baseLinearAxisConfig,
          dimensionAxisValuesInCanvasUnits: linearValuesInCanvasUnits,
          dimensionAxisOffsetsInCanvasUnits: linearValuesOffsetInCanvasUnits,
          baseBarGroupData: _.map(categories, function (category, index) {
            return {
              [keyForValuesInMainDimensionAxis]: linearValues[index]
            }
          }),
          getCategoricalNormalAxisExpectedOffsetForNaturalValue,
          chartHeight: chartNormalDimensionSpan,
          chartWidth: chartDimensionSpan
        })
      }

      function testLogarithmicAxisForMainDimension () {
        const logarithmicAxisSmallestExponent = Math.log2(
          Math.min(
            baseLogarithmicAxisConfig.scale.domain.start,
            baseLogarithmicAxisConfig.scale.domain.end
          )
        )
        const logarithmicAxisBiggestExponent = Math.log2(
          Math.max(
            baseLogarithmicAxisConfig.scale.domain.start,
            baseLogarithmicAxisConfig.scale.domain.end
          )
        )
        const logarithmicAxisOriginExponent = Math.log2(baseLogarithmicAxisConfig.scale.valueForOrigin)
        const logarithmicAxisExponentSpan = logarithmicAxisBiggestExponent - logarithmicAxisSmallestExponent
        const logarithmicValuesInCanvasUnits = _.map(
          logarithmicValues,
          v => (Math.log2(v) - logarithmicAxisOriginExponent) * chartNormalDimensionSpan / logarithmicAxisExponentSpan
        )
        const logarithmicValuesOffsetInCanvasUnits = [chartNormalDimensionSpan / logarithmicAxisExponentSpan, chartNormalDimensionSpan / logarithmicAxisExponentSpan, chartNormalDimensionSpan / logarithmicAxisExponentSpan]

        testSpecificDimensionAxis({
          specName: 'Logarithmic scale for main dimension',
          dimension,
          dimensionAttribute,
          normalDimensionAttribute,
          dimensionAxisBaseConfig: baseLogarithmicAxisConfig,
          dimensionAxisValuesInCanvasUnits: logarithmicValuesInCanvasUnits,
          dimensionAxisOffsetsInCanvasUnits: logarithmicValuesOffsetInCanvasUnits,
          baseBarGroupData: _.map(categories, function (category, index) {
            return {
              [keyForValuesInMainDimensionAxis]: logarithmicValues[index]
            }
          }),
          getCategoricalNormalAxisExpectedOffsetForNaturalValue,
          chartHeight: chartNormalDimensionSpan,
          chartWidth: chartDimensionSpan
        })
      }

      function testCategoricalAxisForMainDimension () {
        // TODO: Add tests for categorical axis used as dimension axis
        // const categoriesValuesInCanvasUnits = [
        //   chartHeight / categories.length,
        //   chartHeight / categories.length,
        //   chartHeight / categories.length - categoriesSpanInCanvasUnits[2]
        // ]
        // const categoriesValuesOffsetInCanvasUnits = [
        //   chartHeight / categories.length,
        //   chartHeight / categories.length,
        //   chartHeight / categories.length - categoriesSpanInCanvasUnits[2]
        // ]
        // testSpecificDimensionAxis({
        //   specName: 'Categorical scale for main dimension',
        //   dimensionAxisBaseConfig: baseCategoricalAxisConfig,
        //   dimensionAxisValuesInCanvasUnits: categoriesValuesInCanvasUnits,
        //   dimensionAxisOffsetsInCanvasUnits: categoriesValuesOffsetInCanvasUnits,
        //   baseBarGroupData: _.map(categories, function (category) {
        //     return {
        //       [keyForValuesInMainDimensionAxis]: category
        //     }
        //   }),
        //   getCategoricalNormalAxisExpectedOffsetForNaturalValue
        // })
      }
    }

    function testSpecificDimensionAxis ({
      specName,
      dimension,
      dimensionAttribute,
      normalDimensionAttribute,
      dimensionAxisBaseConfig,
      dimensionAxisValuesInCanvasUnits,
      dimensionAxisOffsetsInCanvasUnits,
      baseBarGroupData,
      getCategoricalNormalAxisExpectedOffsetForNaturalValue,
      chartHeight,
      chartWidth
    }) {
      describe(specName, function () {
        const dimensionAxisConfig = _.merge({}, dimensionAxisBaseConfig, {
          id: 'dimension-axis',
          keyForValues: keyForValuesInMainDimensionAxis,
          position: {
            type: GeoChart.constants.AXIS.POSITIONS.left
          }
        })

        const categoricalNormalAxisConfig = _.merge({}, baseCategoricalAxisConfig, {
          position: {
            type: GeoChart.constants.AXIS.POSITIONS.bottom
          }
        })

        const linearNormalAxisConfig = {
          id: 'normal-linear-axis',
          keyForValues: 'normal-linear-axis-value',
          position: {
            type: GeoChart.constants.AXIS.POSITIONS.bottom
          },
          scale: {
            type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
            valueForOrigin: 300,
            domain: {
              start: -600,
              end: 1200
            }
          }
        }
        const linearNormalAxisDomainSpan = linearNormalAxisConfig.scale.domain.end - linearNormalAxisConfig.scale.domain.start

        const barGroupData = _.map(baseBarGroupData, function (d, index) {
          return _.assign({}, d, {
            [categoricalNormalAxisConfig.keyForValues]: categories[index],
            [linearNormalAxisConfig.keyForValues]: index * linearNormalAxisDomainSpan / categories.length + linearNormalAxisConfig.scale.domain.start
          })
        })

        const getLinearNormalAxisExpectedOffsetForNaturalValue = function (naturalValue, additionalOffset = 0) {
          switch (dimension) {
            case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
              return {
                x: (naturalValue + additionalOffset - linearNormalAxisConfig.scale.domain.start) * chartWidth / linearNormalAxisDomainSpan
              }
            case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
              return {
                y: (naturalValue + additionalOffset - linearNormalAxisConfig.scale.domain.start) * chartWidth / linearNormalAxisDomainSpan
              }
          }
        }

        testSpecificNormal({
          specName: 'Categorical scale for normal dimension',
          dimension,
          dimensionAttribute,
          normalDimensionAttribute,
          dimensionAxisConfig,
          dimensionAxisValuesInCanvasUnits,
          dimensionAxisOffsetsInCanvasUnits,
          normalAxisConfig: categoricalNormalAxisConfig,
          firstBarGroupData: barGroupData,
          getExpectedOffsetForNaturalValue: getCategoricalNormalAxisExpectedOffsetForNaturalValue,
          chartHeight,
          chartWidth
        })

        testSpecificNormal({
          specName: 'Linear scale for normal dimension',
          dimension,
          dimensionAttribute,
          normalDimensionAttribute,
          dimensionAxisConfig,
          dimensionAxisValuesInCanvasUnits,
          dimensionAxisOffsetsInCanvasUnits,
          normalAxisConfig: linearNormalAxisConfig,
          firstBarGroupData: barGroupData,
          getExpectedOffsetForNaturalValue: getLinearNormalAxisExpectedOffsetForNaturalValue,
          expectedForcedWidthByDefault: barsUtils.DEFAULT_WIDTH,
          chartHeight,
          chartWidth
        })
      })
    }

    function testSpecificNormal ({
      specName,
      dimension,
      dimensionAttribute,
      normalDimensionAttribute,
      dimensionAxisConfig,
      dimensionAxisValuesInCanvasUnits,
      dimensionAxisOffsetsInCanvasUnits,
      normalAxisConfig,
      firstBarGroupData,
      getExpectedOffsetForNaturalValue,
      expectedForcedWidthByDefault,
      chartHeight,
      chartWidth
    }) {
      const idHorizontalAxis = dimension === GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal
        ? dimensionAxisConfig.id
        : normalAxisConfig.id

      const idVerticalAxis = dimension === GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal
        ? normalAxisConfig.id
        : dimensionAxisConfig.id

      describe(specName, function () {
        it('should render bars', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)
          expect(wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')).toHaveLength(categories.length)
        })

        it('should render bars with missing data', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: _.dropRight(firstBarGroupData),
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)
          expect(wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')).toHaveLength(categories.length - 1)
        })

        it('should set proper width in dimension to bars', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

          const allBars = wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')

          expect(allBars).toHaveLength(categories.length)

          for (let i = 0; i < allBars.length; i++) {
            const dimensionAttributeValue = parseFloat(allBars.at(i).attributes(dimensionAttribute))

            expect(dimensionAttributeValue).toBeCloseTo(dimensionAxisValuesInCanvasUnits[i], 2)

            const transformMatches = getTransformTranslateMatches(allBars.at(i))

            expect(transformMatches).toHaveLength(3)

            switch (dimension) {
              case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
                expect(parseFloat(transformMatches[1])).toBeCloseTo(dimensionAxisOffsetsInCanvasUnits[i], 2)
                break
              case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
                expect(parseFloat(transformMatches[2])).toBeCloseTo(dimensionAxisOffsetsInCanvasUnits[i], 2)
                break
            }
          }
        })

        it('should set proper width in normal dimension to bars without explicit width', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

          const allBars = wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')

          expect(allBars).toHaveLength(categories.length)

          for (let i = 0; i < allBars.length; i++) {
            const actualValue = parseFloat(allBars.at(i).attributes(normalDimensionAttribute))

            if (expectedForcedWidthByDefault) {
              expect(actualValue).toBeCloseTo(expectedForcedWidthByDefault, 2)
            } else {
              const expectedOffsetStart = getExpectedOffsetForNaturalValue(_.get(firstBarGroupData[i], normalAxisConfig.keyForValues), -0.5)
              const expectedOffsetEnd = getExpectedOffsetForNaturalValue(_.get(firstBarGroupData[i], normalAxisConfig.keyForValues), 0.5)

              switch (dimension) {
                case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
                  expect(actualValue).toBeCloseTo(expectedOffsetEnd.x - expectedOffsetStart.x, 2)
                  break
                case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
                  expect(actualValue).toBeCloseTo(expectedOffsetEnd.y - expectedOffsetStart.y, 2)
                  break
              }
            }
          }
        })

        it('should set proper width in normal dimension to bars with explicit width in canvas units', function () {
          const forcedWidthInNormalDimension = 70
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis,
                  width: forcedWidthInNormalDimension
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

          const allBars = wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')

          expect(allBars).toHaveLength(categories.length)

          for (let i = 0; i < allBars.length; i++) {
            const actualValue = parseFloat(allBars.at(i).attributes(normalDimensionAttribute))
            expect(actualValue).toBeCloseTo(forcedWidthInNormalDimension, 2)
          }
        })

        it('should set proper width in normal dimension to bars with explicit width in natural units', function () {
          const forcedNaturalWidthInNormalDimension = 0.5

          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis,
                  naturalWidth: forcedNaturalWidthInNormalDimension
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

          const allBars = wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')

          expect(allBars).toHaveLength(categories.length)

          for (let i = 0; i < allBars.length; i++) {
            const actualValue = parseFloat(allBars.at(i).attributes(normalDimensionAttribute))

            const expectedOffsetStart = getExpectedOffsetForNaturalValue(_.get(firstBarGroupData[i], normalAxisConfig.keyForValues), -forcedNaturalWidthInNormalDimension)
            const expectedOffsetEnd = getExpectedOffsetForNaturalValue(_.get(firstBarGroupData[i], normalAxisConfig.keyForValues))

            switch (dimension) {
              case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
                expect(actualValue).toBeCloseTo(expectedOffsetEnd.x - expectedOffsetStart.x, 2)
                break
              case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
                expect(actualValue).toBeCloseTo(expectedOffsetEnd.y - expectedOffsetStart.y, 2)
                break
            }
          }
        })

        it('should offset bars with canvas units', function () {
          const forcedOffset = 20
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis,
                  normalOffset: forcedOffset
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

          const allBars = wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')

          expect(allBars).toHaveLength(categories.length)

          for (let i = 0; i < allBars.length; i++) {
            const transformMatches = getTransformTranslateMatches(allBars.at(i))

            expect(transformMatches).toHaveLength(3)

            const expectedOffset = getExpectedOffsetForNaturalValue(_.get(firstBarGroupData[i], normalAxisConfig.keyForValues))

            if (expectedOffset.x) {
              expect(parseFloat(transformMatches[1])).toBeCloseTo(forcedOffset + expectedOffset.x, 2)
            }

            if (expectedOffset.y) {
              expect(parseFloat(transformMatches[2])).toBeCloseTo(forcedOffset + expectedOffset.y, 2)
            }
          }
        })

        it('should offset bars with natural units', function () {
          const forcedOffsetInNaturalUnits = 0.3
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis,
                  naturalNormalOffset: forcedOffsetInNaturalUnits
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

          const allBars = wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')

          expect(allBars).toHaveLength(categories.length)

          for (let i = 0; i < allBars.length; i++) {
            const transformMatches = getTransformTranslateMatches(allBars.at(i))

            expect(transformMatches).toHaveLength(3)
            const expectedOffset = getExpectedOffsetForNaturalValue(_.get(firstBarGroupData[i], normalAxisConfig.keyForValues), forcedOffsetInNaturalUnits)

            if (_.isFinite(expectedOffset.x)) {
              expect(parseFloat(transformMatches[1])).toBeCloseTo(expectedOffset.x, 2)
            }

            if (_.isFinite(expectedOffset.y)) {
              expect(parseFloat(transformMatches[2])).toBeCloseTo(expectedOffset.y, 2)
            }
          }
        })

        it('should set proper CSS classes', function () {
          const customClasses = ['class-A', 'class-B', 'class-C']
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis,
                  cssClasses: function (originalClasses, d, i) {
                    return [customClasses[i]]
                  }
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

          for (let i = 0; i < customClasses.length; i++) {
            for (let j = 0; j < customClasses.length; j++) {
              const singleBar = wrapper.findAll(`.geo-chart .geo-chart-bars-group .geo-chart-bar`).at(i)

              if (i === j) {
                expect(singleBar.classes()).toContain(customClasses[j])
              } else {
                expect(singleBar.classes()).not.toContain(customClasses[j])
              }
            }
          }

          const allBars = wrapper.findAll('.geo-chart .geo-chart-bars-group .geo-chart-bar')

          expect(allBars).toHaveLength(categories.length)
        })

        it('should render multiple series', function () {
          const secondData = _.dropRight(firstBarGroupData)
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }, {
                  data: secondData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)

          expect(wrapper.findAll('.geo-chart .geo-chart-bars-group')).toHaveLength(2)

          expect(wrapper.findAll('.geo-chart .geo-chart-bars-group').at(0).findAll('.geo-chart-bar')).toHaveLength(firstBarGroupData.length)
          expect(wrapper.findAll('.geo-chart .geo-chart-bars-group').at(1).findAll('.geo-chart-bar')).toHaveLength(secondData.length)
        })

        describe('Reactive data change', function () {
          const stubLodashDebounce = stubLodashDebounceFactory()

          beforeEach(function () {
            stubLodashDebounce.setup()
          })

          afterEach(function () {
            stubLodashDebounce.teardown()
          })

          it('should add new series', function () {
            const secondData = _.dropRight(firstBarGroupData)
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [dimensionAxisConfig, normalAxisConfig],
                  barGroups: [{
                    data: firstBarGroupData,
                    mainDimension: dimension,
                    idHorizontalAxis,
                    idVerticalAxis
                  }]
                },
                height: `${chartHeight}px`,
                width: `${chartWidth}px`
              }
            })

            flushD3Transitions()

            expect(wrapper.find('.geo-chart').exists()).toBe(true)
            expect(wrapper.findAll('.geo-chart-bars-group')).toHaveLength(1)

            wrapper.setProps({
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }, {
                  data: secondData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              }
            })
            flushD3Transitions()

            expect(wrapper.find('.geo-chart').exists()).toBe(true)
            expect(wrapper.findAll('.geo-chart-bars-group')).toHaveLength(2)
          })

          it('should update series', async function () {
            const secondData = _.dropRight(firstBarGroupData)
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [dimensionAxisConfig, normalAxisConfig],
                  barGroups: [{
                    data: firstBarGroupData,
                    mainDimension: dimension,
                    idHorizontalAxis,
                    idVerticalAxis
                  }]
                },
                height: `${chartHeight}px`,
                width: `${chartWidth}px`
              }
            })

            flushD3Transitions()

            expect(wrapper.find('.geo-chart').exists()).toBe(true)
            expect(wrapper.findAll('.geo-chart-bars-group .geo-chart-bar')).toHaveLength(firstBarGroupData.length)

            wrapper.setProps({
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: secondData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              }
            })
            flushD3Transitions()

            expect(wrapper.findAll('.geo-chart-bars-group .geo-chart-bar')).toHaveLength(secondData.length)
          })

          it('should remove series', function () {
            const secondData = _.dropRight(firstBarGroupData)
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [dimensionAxisConfig, normalAxisConfig],
                  barGroups: [{
                    data: firstBarGroupData,
                    mainDimension: dimension,
                    idHorizontalAxis,
                    idVerticalAxis
                  }, {
                    data: secondData,
                    mainDimension: dimension,
                    idHorizontalAxis,
                    idVerticalAxis
                  }]
                },
                height: `${chartHeight}px`,
                width: `${chartWidth}px`
              }
            })

            flushD3Transitions()

            expect(wrapper.find('.geo-chart').exists()).toBe(true)
            expect(wrapper.findAll('.geo-chart-bars-group')).toHaveLength(2)

            wrapper.setProps({
              config: {
                axisGroups: [dimensionAxisConfig, normalAxisConfig],
                barGroups: [{
                  data: firstBarGroupData,
                  mainDimension: dimension,
                  idHorizontalAxis,
                  idVerticalAxis
                }]
              }
            })
            flushD3Transitions()

            expect(wrapper.find('.geo-chart').exists()).toBe(true)
            expect(wrapper.findAll('.geo-chart-bars-group')).toHaveLength(1)
          })
        })

        describe('Tooltips', function () {
          it('should show proper tooltip on hover', function () {
            const tooltipText = (d, i) => `${i} :: ${d[dimensionAxisConfig.keyForValues]}`
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [dimensionAxisConfig, normalAxisConfig],
                  barGroups: [{
                    data: firstBarGroupData,
                    mainDimension: dimension,
                    idHorizontalAxis,
                    idVerticalAxis,
                    tooltip: {
                      content: tooltipText
                    }
                  }]
                },
                height: `${chartHeight}px`,
                width: `${chartWidth}px`
              }
            })

            flushD3Transitions()

            expect(wrapper.find('.geo-chart').exists()).toBe(true)

            expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

            expect(document.getElementsByClassName('geo-chart-tooltip')).toHaveLength(1)

            const tooltipDiv = document.getElementsByClassName('geo-chart-tooltip')[0]
            expect(window.getComputedStyle(tooltipDiv).opacity).toBe('0')

            for (let i = 0; i < firstBarGroupData.length; i++) {
              const singleBar = wrapper.findAll(`.geo-chart .geo-chart-bars-group .geo-chart-bar`).at(i)
              singleBar.trigger('mouseover')
              singleBar.trigger('mousemove')
              expect(window.getComputedStyle(tooltipDiv).opacity).toBe('1')
              expect(tooltipDiv.textContent).toBe(tooltipText(firstBarGroupData[i], i))
            }

            wrapper.destroy()
          })

          it('should remove tooltip from DOM after chart is removed from DOM', function () {
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [dimensionAxisConfig, normalAxisConfig],
                  barGroups: [{
                    data: firstBarGroupData,
                    mainDimension: dimension,
                    idHorizontalAxis,
                    idVerticalAxis,
                    tooltip: {
                      content (d, i) {
                        return `${i} :: ${d[dimensionAxisConfig.keyForValues]}`
                      }
                    }
                  }]
                },
                height: `${chartHeight}px`,
                width: `${chartWidth}px`
              }
            })

            flushD3Transitions()

            expect(wrapper.find('.geo-chart').exists()).toBe(true)

            expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)

            expect(document.getElementsByClassName('geo-chart-tooltip')).toHaveLength(1)

            const tooltipDiv = document.getElementsByClassName('geo-chart-tooltip')[0]
            expect(window.getComputedStyle(tooltipDiv).opacity).toBe('0')

            wrapper.destroy()

            expect(document.getElementsByClassName('geo-chart-tooltip')).toHaveLength(0)
          })
        })
      })
    }
  })
})
