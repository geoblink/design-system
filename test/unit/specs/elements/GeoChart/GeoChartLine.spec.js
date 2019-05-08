/*  globals afterEach beforeEach describe expect it */
import _ from 'lodash'
import * as d3 from 'd3'

import * as sinon from 'sinon'

import {
  flushD3Transitions,
  stubGetBBoxFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  stubCreateSVGPointFactory,
  stubGetBoundingClientRectFactory
} from './GeoChart.spec-utils' // This has to be imported before D3

import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartLine', () => {
  const axisNumericalDimensions = {
    horizontal: {
      linearAxisConfig: {
        id: 'spec-linear-axis',
        keyForValues: 'y',
        ticks: {
          count: 2
        },
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.left
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 300
          }
        }
      },

      numericalAxisConfig: {
        id: 'demo-numerical-axis',
        keyForValues: 'x',
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.bottom
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 300
          }
        }
      }
    },
    vertical: {
      linearAxisConfig: {
        id: 'spec-linear-axis',
        keyForValues: 'x',
        ticks: {
          count: 2
        },
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.bottom
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 300
          }
        }
      },

      numericalAxisConfig: {
        id: 'demo-numerical-axis',
        keyForValues: 'y',
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.left
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 300
          }
        }
      }
    }
  }
  const axisCategoricalDimensions = {
    horizontal: {
      linearAxisConfig: {
        id: 'spec-linear-axis',
        keyForValues: 'y',
        ticks: {
          count: 2
        },
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.left
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 300
          }
        }
      },

      categoricalAxisConfig: {
        id: 'spec-categorical-axis',
        keyForValues: 'category',
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.bottom
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: 'Category 0',
          domain: _.times(5, (i) => `Category ${i}`)
        }
      }
    },
    vertical: {
      linearAxisConfig: {
        id: 'spec-linear-axis',
        keyForValues: 'x',
        ticks: {
          count: 2
        },
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.bottom
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 300
          }
        }
      },

      categoricalAxisConfig: {
        id: 'spec-categorical-axis',
        keyForValues: 'category',
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.left
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: 'Category 0',
          domain: _.times(5, (i) => `Category ${i}`)
        }
      }
    }
  }
  const stubGetBBox = stubGetBBoxFactory()
  const stubGetScreenCTM = stubGetScreenCTMFactory()
  const stubCreateSVGPoint = stubCreateSVGPointFactory()
  const sandbox = sinon.createSandbox()

  beforeEach(function () {
    stubGetBBox.setup()
    stubCreateSVGPoint.setup()
    stubGetScreenCTM.setup()
  })

  afterEach(function () {
    stubGetBBox.teardown()
    stubCreateSVGPoint.teardown()
    stubGetScreenCTM.teardown()
    sandbox.restore()
  })

  afterEach(function () {
    document.body.innerHTML = ''
  })

  describe('#render', function () {
    describe('Line Chart with Numerical Axis', function () {
      for (const dimension in axisNumericalDimensions) {
        const linearAxisConfig = axisNumericalDimensions[dimension].linearAxisConfig
        const numericalAxisConfig = axisNumericalDimensions[dimension].numericalAxisConfig
        const cssClassFn = (original) => [...original, 'test-line-segments']
        const getLineData = () => {
          return _.sortBy(_.times(25, (i) => {
            return {
              [axisNumericalDimensions[dimension].numericalAxisConfig.keyForValues]: i,
              [axisNumericalDimensions[dimension].linearAxisConfig.keyForValues]: axisNumericalDimensions[dimension].linearAxisConfig.scale.domain.end / (i + 1)
            }
          }), axisNumericalDimensions[dimension].numericalAxisConfig.keyForValues)
        }
        switch (dimension) {
          case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
            testDimension({
              dimension,
              verticalAxis: linearAxisConfig,
              horizontalAxis: numericalAxisConfig,
              cssClassFn,
              chartDimensionSpan: 300,
              chartNormalDimensionSpan: 300,
              getLineData
            })
            break
          case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
            testDimension({
              dimension,
              verticalAxis: numericalAxisConfig,
              horizontalAxis: linearAxisConfig,
              chartDimensionSpan: 300,
              chartNormalDimensionSpan: 300,
              getLineData
            })
            break
          default:
            console.error(`Unknown dimension: ${dimension}`)
        }
      }
    })
    describe('Line Chart with Categorical Axis', function () {
      for (const dimension in axisCategoricalDimensions) {
        const linearAxisConfig = axisCategoricalDimensions[dimension].linearAxisConfig
        const categoricalAxisConfig = axisCategoricalDimensions[dimension].categoricalAxisConfig
        const cssClassFn = (original) => [...original, 'test-line-segments']
        const getLineData = () => {
          return _.map(categoricalAxisConfig.scale.domain, (category, i) => {
            return {
              [categoricalAxisConfig.keyForValues]: category,
              [axisCategoricalDimensions[dimension].linearAxisConfig.keyForValues]: axisCategoricalDimensions[dimension].linearAxisConfig.scale.domain.end / (i + 1)
            }
          })
        }
        switch (dimension) {
          case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
            testDimension({
              dimension,
              verticalAxis: linearAxisConfig,
              horizontalAxis: categoricalAxisConfig,
              cssClassFn,
              chartDimensionSpan: 300,
              chartNormalDimensionSpan: 300,
              getLineData,
              hasCategoricalAxis: true
            })
            break
          case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
            testDimension({
              dimension,
              verticalAxis: categoricalAxisConfig,
              horizontalAxis: linearAxisConfig,
              chartDimensionSpan: 300,
              chartNormalDimensionSpan: 300,
              getLineData,
              hasCategoricalAxis: true
            })
            break
          default:
            console.error(`Unknown dimension: ${dimension}`)
        }
      }
    })
  })

  function testDimension ({
    dimension,
    verticalAxis,
    horizontalAxis,
    cssClassFn,
    chartDimensionSpan,
    chartNormalDimensionSpan,
    getLineData,
    hasCategoricalAxis
  }) {
    describe(`${dimension} line`, () => {
      const stubLodashDebounce = stubLodashDebounceFactory()

      const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
        height: chartNormalDimensionSpan,
        width: chartDimensionSpan
      })

      beforeEach(function () {
        stubGetBoundingClientRect.setup()
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubGetBoundingClientRect.teardown()
        stubLodashDebounce.teardown()
      })

      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id
      const lineData = getLineData()
      const linesConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        lineGroups: [{
          data: lineData,
          mainDimension: dimension,
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn,
          groupKey: 'first-group'
        }]
      }

      it('Should render one line', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: linesConfig
          }
        })

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-element')).toHaveLength(linesConfig.lineGroups.length)
        wrapper.destroy()
      })

      it('Line with no data', () => {
        linesConfig.lineGroups[0].data = []
        const wrapper = mount(GeoChart, {
          propsData: {
            config: linesConfig
          }
        })

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-element')).toHaveLength(linesConfig.lineGroups.length)
        expect(wrapper.find('.geo-chart-line-element').attributes('d')).toBe(undefined)
        wrapper.destroy()
      })

      it('Should update data', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: linesConfig
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-element')).toHaveLength(linesConfig.lineGroups.length)
        const pathD = wrapper.find('.geo-chart-line-element').attributes('d')

        const lineData2 = getLineData()

        const linesConfig2 = _.assign({}, linesConfig)
        linesConfig2.lineGroups[0].data = lineData2

        wrapper.setProps({
          config: linesConfig2
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-element')).toHaveLength(linesConfig.lineGroups.length)
        const pathD2 = wrapper.find('.geo-chart-line-element').attributes('d')
        expect(pathD).not.toEqual(pathD2)
        wrapper.destroy()
      })

      it('Should render several lines', () => {
        const secondLineData = getLineData()
        linesConfig.lineGroups[1] = {
          data: secondLineData,
          mainDimension: dimension,
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis
        }
        const wrapper = mount(GeoChart, {
          propsData: {
            config: linesConfig
          }
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-element')).toHaveLength(linesConfig.lineGroups.length)
        wrapper.destroy()
      })

      describe('FocusGroup', () => {
        it('Should display the focus group', () => {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: linesConfig
            }
          })
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.classList.contains('focus-group--hidden')).toBe(true)
          wrapper.find('.geo-chart-line-group').trigger('mouseover')
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.classList.contains('focus-group--hidden')).toBe(false)
          wrapper.find('.geo-chart-line-group').trigger('mouseout')
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.classList.contains('focus-group--hidden')).toBe(true)
          wrapper.destroy()
        })

        it('Should display the focus group with line and one circle per line group', () => {
          sandbox.stub(d3, 'mouse').callsFake(function () {
            return [10, 50]
          })
          const wrapper = mount(GeoChart, {
            propsData: {
              config: linesConfig
            }
          })
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.classList.contains('focus-group--hidden')).toBe(true)
          wrapper.find('.geo-chart-line-group').trigger('mouseover')
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.classList.contains('focus-group--hidden')).toBe(false)
          wrapper.find('.geo-chart-line-group').trigger('mousemove')
          flushD3Transitions()
          expect(wrapper.findAll('.geo-chart-line-element__hover-circle')).toHaveLength(linesConfig.lineGroups.length)
          wrapper.destroy()
        })

        it('Should display the focus group with a circle only if the hovered point has data', () => {
          const originChartCoords = 0
          const middleChartCoords = 150
          const endChartCoords = 300
          const lineData1 = hasCategoricalAxis
            ? [{ category: 'Category 0', y: originChartCoords }, { category: 'Category 2', y: middleChartCoords }, { category: 'Category 4', y: endChartCoords }]
            : [{ x: originChartCoords, y: originChartCoords }, { x: middleChartCoords, y: middleChartCoords }, { x: endChartCoords, y: endChartCoords }]
          const lineData2 = hasCategoricalAxis
            ? [{ category: 'Category 0', y: originChartCoords }, { category: 'Category 4', y: endChartCoords }]
            : [{ x: originChartCoords, y: originChartCoords }, { x: endChartCoords, y: endChartCoords }]
          let i = 0
          sandbox.stub(d3, 'mouse').callsFake(function () {
            if (i === 0) {
              i++
              return [originChartCoords, originChartCoords]
            } else if (i === 1) {
              i++
              return [middleChartCoords, middleChartCoords]
            } else if (i === 2) {
              return [endChartCoords, endChartCoords]
            }
          })
          linesConfig.lineGroups[0].data = lineData1
          linesConfig.lineGroups[1] = {
            data: lineData2,
            mainDimension: dimension,
            idVerticalAxis: idVerticalAxis,
            idHorizontalAxis: idHorizontalAxis
          }

          const wrapper = mount(GeoChart, {
            propsData: {
              config: linesConfig,
              height: chartDimensionSpan,
              width: chartDimensionSpan
            }
          })
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.classList.contains('focus-group--hidden')).toBe(true)
          wrapper.find('.geo-chart-line-group').trigger('mouseover')
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.classList.contains('focus-group--hidden')).toBe(false)
          wrapper.find('.geo-chart-line-group').trigger('mousemove')
          flushD3Transitions()
          expect(wrapper.findAll('.geo-chart-line-element__hover-circle')).toHaveLength(2)
          wrapper.find('.geo-chart-line-group').trigger('mousemove')
          flushD3Transitions()
          expect(wrapper.findAll('.geo-chart-line-element__hover-circle')).toHaveLength(1)
          wrapper.find('.geo-chart-line-group').trigger('mousemove')
          flushD3Transitions()
          expect(wrapper.findAll('.geo-chart-line-element__hover-circle')).toHaveLength(2)
          wrapper.destroy()
        })
      })
    })
  }
})
