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

        describe('Categorical scale for normal dimension', function () {
          const categoricalAxisConfig = _.merge({}, baseCategoricalAxisConfig, {
            position: {
              type: GeoChartAxis.POSITIONS.bottom
            }
          })

          const firstData = _.map(categories, function (category, index) {
            return {
              [categoricalAxisConfig.keyForValues]: category,
              [linearAxisConfig.keyForValues]: linearValues[index]
            }
          })

          it('should render bars', function () {
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: _.dropRight(firstData),
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
              expect(dimensionAttributeValue).toBeCloseTo(linearValuesInCanvasUnits[i], 0)

              const transformAttributeValue = allBars.at(i).attributes('transform')
              const transformMatches = /translate\((\d+(?:\.\d+)?), (\d+(?:\.\d+)?)\)/.exec(transformAttributeValue)

              expect(transformMatches).toHaveLength(3)
              expect(parseFloat(transformMatches[2])).toBeCloseTo(linearValuesOffsetInCanvasUnits[i], 0)
            }
          })

          it('should set proper width in normal dimension to bars without explicit width', function () {
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
              const expectedValue = categoriesValuesInCanvasUnits[i]
              expect(actualValue).toBeCloseTo(expectedValue, 0)
            }
          })

          it('should set proper width in normal dimension to bars with explicit width in canvas units', function () {
            const forcedWidthInNormalDimension = 70
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
              expect(actualValue).toBeCloseTo(forcedWidthInNormalDimension, 0)
            }
          })

          it('should set proper width in normal dimension to bars with explicit width in natural units', function () {
            const forcedNaturalWidthInNormalDimension = 0.5
            const expectedWidthInNormalDimension = forcedNaturalWidthInNormalDimension * _.first(categoriesValuesInCanvasUnits)
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
              expect(actualValue).toBeCloseTo(expectedWidthInNormalDimension, 0)
            }
          })

          it('should offset bars with canvas units', function () {
            const forcedOffset = 20
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
              expect(parseFloat(transformMatches[1])).toBeCloseTo(forcedOffset + i * categoriesValuesInCanvasUnits[i], 0)
            }
          })

          it('should offset bars with natural units', function () {
            const forcedOffsetInNaturalUnits = 0.3
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
              expect(parseFloat(transformMatches[1])).toBeCloseTo((i + forcedOffsetInNaturalUnits) * categoriesValuesInCanvasUnits[i], 0)
            }
          })

          it('should set proper CSS classes', function () {
            const customClasses = ['class-A', 'class-B', 'class-C']
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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
            const secondData = _.dropRight(firstData)
            const wrapper = mount(GeoChart, {
              propsData: {
                config: {
                  axisGroups: [linearAxisConfig, categoricalAxisConfig],
                  barGroups: [{
                    data: firstData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
                    idVerticalAxis: linearAxisConfig.id
                  }, {
                    data: secondData,
                    dimension: GeoChartBars.DIMENSIONS.vertical,
                    idHorizontalAxis: categoricalAxisConfig.id,
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

            expect(wrapper.findAll('.geo-chart .geo-chart-bars-group').at(0).findAll('.geo-chart-bar')).toHaveLength(firstData.length)
            expect(wrapper.findAll('.geo-chart .geo-chart-bars-group').at(1).findAll('.geo-chart-bar')).toHaveLength(secondData.length)
          })
        })
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
