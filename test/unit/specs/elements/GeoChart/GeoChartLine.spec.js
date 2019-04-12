import _ from 'lodash'

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
  const axisDimensions = {
    horizontal: {
      linearAxisConfig: {
        id: 'spec-linear-axis',
        keyForValues: 'y',
        ticks: {
          count: 2
        },
        position: {
          type: GeoChart.constants.POSITIONS.left
        },
        scale: {
          type: GeoChart.constants.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 20
          }
        }
      },

      numericalAxisConfig: {
        id: 'demo-numerical-axis',
        keyForValues: 'x',
        position: {
          type: GeoChart.constants.POSITIONS.bottom
        },
        scale: {
          type: GeoChart.constants.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
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
          type: GeoChart.constants.POSITIONS.bottom
        },
        scale: {
          type: GeoChart.constants.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 20
          }
        }
      },

      numericalAxisConfig: {
        id: 'demo-numerical-axis',
        keyForValues: 'y',
        position: {
          type: GeoChart.constants.POSITIONS.left
        },
        scale: {
          type: GeoChart.constants.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 25
          }
        }
      }
    }
  }
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

  describe('#render', function () {
    for (const dimension in axisDimensions) {
      const linearAxisConfig = axisDimensions[dimension].linearAxisConfig
      const numericalAxisConfig = axisDimensions[dimension].numericalAxisConfig
      const cssClassFn = (original) => [...original, 'test-line-segments']

      switch (dimension) {
        case GeoChart.constants.BARS_DIMENSIONS.horizontal:
          testDimension({
            dimension,
            verticalAxis: linearAxisConfig,
            horizontalAxis: numericalAxisConfig,
            cssClassFn,
            chartDimensionSpan: 500,
            chartNormalDimensionSpan: 300
          })
          break
        case GeoChart.constants.BARS_DIMENSIONS.vertical:
          testDimension({
            dimension,
            verticalAxis: numericalAxisConfig,
            horizontalAxis: linearAxisConfig,
            chartDimensionSpan: 500,
            chartNormalDimensionSpan: 300
          })
          break
        default:
          console.error(`Unknown dimension: ${dimension}`)
      }
    }
  })

  function testDimension ({ dimension, verticalAxis, horizontalAxis, cssClassFn, chartDimensionSpan, chartNormalDimensionSpan }) {
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
      const lineData = _.sortBy(_.times(25, (i) => {
        return {
          [axisDimensions[dimension].numericalAxisConfig.keyForValues]: i,
          [axisDimensions[dimension].linearAxisConfig.keyForValues]: _.random(0, axisDimensions[dimension].linearAxisConfig.scale.domain.end)
        }
      }), axisDimensions[dimension].numericalAxisConfig.keyForValues)

      const linesConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        lineGroups: [{
          lineData: lineData,
          dimension: dimension,
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn
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

        const lineData2 = _.sortBy(_.times(25, (i) => {
          return {
            [axisDimensions[dimension].numericalAxisConfig.keyForValues]: i,
            [axisDimensions[dimension].linearAxisConfig.keyForValues]: _.random(-15, axisDimensions[dimension].linearAxisConfig.scale.domain.end)
          }
        }), axisDimensions[dimension].numericalAxisConfig.keyForValues)

        const linesConfig2 = _.assign({}, linesConfig)
        linesConfig2.lineGroups[0].lineData = lineData2

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
        const secondLineData = _.sortBy(_.times(25, (i) => {
          return {
            [axisDimensions[dimension].numericalAxisConfig.keyForValues]: i,
            [axisDimensions[dimension].linearAxisConfig.keyForValues]: _.random(-15, axisDimensions[dimension].linearAxisConfig.scale.domain.end)
          }
        }), axisDimensions[dimension].numericalAxisConfig.keyForValues)
        linesConfig.lineGroups[1] = {
          lineData: secondLineData,
          dimension: dimension,
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
        it('Should display a line with two circles on multi-line graphs', () => {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: linesConfig
            }
          })
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.style.display).toBe('none')
          wrapper.find('.geo-chart-line-group').trigger('mouseover')
          flushD3Transitions()
          expect(wrapper.find('.hover-overlay__focus').element.style.display).toBe('')
        })
      })
    })
  }
})
