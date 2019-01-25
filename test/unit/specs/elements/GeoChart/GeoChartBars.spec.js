import * as _ from 'lodash'

import { flushD3Transitions, stubGetBoundingClientRectFactory } from './GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

import * as GeoChartBars from '@/elements/GeoChart/GeoChartBars'
import * as GeoChartAxis from '@/elements/GeoChart/GeoChartAxis'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

const chartHeight = 300
const chartWidth = 500

describe('GeoChartBars', function () {
  describe('Constants', function () {
    it('should export DIMENSIONS', function () {
      expect(GeoChartBars).toHaveProperty('DIMENSIONS')
    })

    it('should export DEFAULT_WIDTH', function () {
      expect(GeoChartBars).toHaveProperty('DEFAULT_WIDTH')
    })
  })

  describe('#render', function () {
    const baseLinearAxisConfig = {
      id: 'sample-linear-axis',
      keyForValues: 'linear-value',
      scale: {
        type: GeoChart.constants.SCALE_TYPES.linear,
        valueForOrigin: 500,
        domain: {
          start: -1000,
          end: 2000
        }
      }
    }

    const linearValues = [500, 1000, -500]
    const categories = ['First', 'Second', 'Third']
    const baseCategoricalAxisConfig = {
      id: 'sample-categorical-axis',
      keyForValues: 'categorical-value',
      position: {
        type: GeoChartAxis.POSITIONS.bottom
      },
      scale: {
        type: GeoChart.constants.SCALE_TYPES.categorical,
        valueForOrigin: _.first(categories),
        domain: categories
      }
    }

    const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
      height: chartHeight,
      width: chartWidth
    })

    beforeEach(function () {
      stubGetBoundingClientRect.setup()
    })

    afterEach(function () {
      stubGetBoundingClientRect.teardown()
    })

    describe('Vertical dimension', function () {
      const dimensionAttribute = 'height'
      const normalDimensionAttribute = 'width'

      const linearValuesInCanvasUnits = [0, 50, 100]
      const linearValuesOffsetInCanvasUnits = [chartHeight / 2, chartHeight / 2, chartHeight / 2 - linearValuesInCanvasUnits[2]]
      const categoriesValuesInCanvasUnits = _.times(categories.length, () => chartWidth / categories.length)

      describe('Linear scale for main dimension', function () {
        const linearAxisConfig = _.merge({}, baseLinearAxisConfig, {
          position: {
            type: GeoChartAxis.POSITIONS.left
          }
        })

        const categoricalNormalAxisConfig = _.merge({}, baseCategoricalAxisConfig, {
          position: {
            type: GeoChartAxis.POSITIONS.bottom
          }
        })
        const getCategoricalNormalAxisExpectedOffsetForNaturalValue = function (naturalValue, additionalOffset = 0) {
          const positionInCategoriesList = categories.indexOf(naturalValue)
          return {
            x: (positionInCategoriesList + additionalOffset) * _.first(categoriesValuesInCanvasUnits)
          }
        }

        const linearNormalAxisConfig = {
          id: 'normal-linear-axis',
          keyForValues: 'normal-linear-axis-value',
          position: {
            type: GeoChartAxis.POSITIONS.bottom
          },
          scale: {
            type: GeoChart.constants.SCALE_TYPES.linear,
            valueForOrigin: 300,
            domain: {
              start: -600,
              end: 1200
            }
          }
        }
        const linearNormalAxisDomainSpan = linearNormalAxisConfig.scale.domain.end - linearNormalAxisConfig.scale.domain.start

        const barGroupData = _.map(categories, function (category, index) {
          return {
            [categoricalNormalAxisConfig.keyForValues]: category,
            [linearAxisConfig.keyForValues]: linearValues[index],
            [linearNormalAxisConfig.keyForValues]: index * linearNormalAxisDomainSpan / categories.length + linearNormalAxisConfig.scale.domain.start
          }
        })

        const getLinearNormalAxisExpectedOffsetForNaturalValue = function (naturalValue, additionalOffset = 0) {
          return {
            x: (naturalValue + additionalOffset - linearNormalAxisConfig.scale.domain.start) * chartWidth / linearNormalAxisDomainSpan
          }
        }

        testSpecificNormal('Categorical scale for normal dimension', GeoChartBars.DIMENSIONS.vertical, categoricalNormalAxisConfig, barGroupData, getCategoricalNormalAxisExpectedOffsetForNaturalValue)

        testSpecificNormal('Linear scale for normal dimension', GeoChartBars.DIMENSIONS.vertical, linearNormalAxisConfig, barGroupData, getLinearNormalAxisExpectedOffsetForNaturalValue, GeoChartBars.DEFAULT_WIDTH)

        function testSpecificNormal (specName, dimension, normalAxisConfig, firstBarGroupData, getExpectedOffsetForNaturalValue, expectedForcedWidthByDefault) {
          describe(specName, function () {
            it('should render bars', function () {
              const wrapper = mount(GeoChart, {
                propsData: {
                  config: {
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id
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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: _.dropRight(firstBarGroupData),
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id
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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id
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
                expect(dimensionAttributeValue).toBeCloseTo(linearValuesInCanvasUnits[i], 2)

                const transformAttributeValue = allBars.at(i).attributes('transform')
                const transformMatches = /translate\((\d+(?:\.\d+)?), (\d+(?:\.\d+)?)\)/.exec(transformAttributeValue)

                expect(transformMatches).toHaveLength(3)
                expect(parseFloat(transformMatches[2])).toBeCloseTo(linearValuesOffsetInCanvasUnits[i], 2)
              }
            })

            it('should set proper width in normal dimension to bars without explicit width', function () {
              const wrapper = mount(GeoChart, {
                propsData: {
                  config: {
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id
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
                  const expectedOffsetStart = getExpectedOffsetForNaturalValue(_.get(barGroupData[i], normalAxisConfig.keyForValues), -0.5)
                  const expectedOffsetEnd = getExpectedOffsetForNaturalValue(_.get(barGroupData[i], normalAxisConfig.keyForValues), 0.5)

                  switch (dimension) {
                    case GeoChartBars.DIMENSIONS.vertical:
                      expect(actualValue).toBeCloseTo(expectedOffsetEnd.x - expectedOffsetStart.x, 2)
                      break
                    case GeoChartBars.DIMENSIONS.horizontal:
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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id,
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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id,
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

                const expectedOffsetStart = getExpectedOffsetForNaturalValue(_.get(barGroupData[i], normalAxisConfig.keyForValues), -forcedNaturalWidthInNormalDimension)
                const expectedOffsetEnd = getExpectedOffsetForNaturalValue(_.get(barGroupData[i], normalAxisConfig.keyForValues))

                switch (dimension) {
                  case GeoChartBars.DIMENSIONS.vertical:
                    expect(actualValue).toBeCloseTo(expectedOffsetEnd.x - expectedOffsetStart.x, 2)
                    break
                  case GeoChartBars.DIMENSIONS.horizontal:
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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id,
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
                const transformAttributeValue = allBars.at(i).attributes('transform')
                const transformMatches = /translate\((\d+(?:\.\d+)?), (\d+(?:\.\d+)?)\)/.exec(transformAttributeValue)

                expect(transformMatches).toHaveLength(3)

                const expectedOffset = getExpectedOffsetForNaturalValue(_.get(barGroupData[i], normalAxisConfig.keyForValues))

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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id,
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
                const transformAttributeValue = allBars.at(i).attributes('transform')
                const transformMatches = /translate\((\d+(?:\.\d+)?), (\d+(?:\.\d+)?)\)/.exec(transformAttributeValue)

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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id,
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
                    axisGroups: [linearAxisConfig, normalAxisConfig],
                    barGroups: [{
                      data: firstBarGroupData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id
                    }, {
                      data: secondData,
                      dimension,
                      idHorizontalAxis: normalAxisConfig.id,
                      idVerticalAxis: linearAxisConfig.id
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
          })
        }
      })
    })

    // TODO: Add test with linear scale for dimension
    // TODO: Add test with logarithmic scale for dimension

    // TODO: Add test with logarithmic scale for width
    // TODO: Add test with categorical scale for width

    // TODO: Add simple test about dynamically adding a bar
    // TODO: Add simple test about dynamically updating a bar
    // TODO: Add simple test about dynamically removing a bar
  })
})
