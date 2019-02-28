import _ from 'lodash'

import {
  flushD3Transitions,
  stubGetBBoxFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  stubCreateSVGPointFactory
} from './GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

import * as GeoChartLineSegments from '@/elements/GeoChart/GeoChartLineSegments/GeoChartLineSegments'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartColorBar', function () {
  const chartConfig = {
    height: 300,
    width: 500
  }

  const axisDimensions = {
    horizontal: {
      linearAxisConfig: {
        id: 'spec-linear-axis',
        keyForValues: 'value',
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
            end: 1
          }
        }
      },

      numericalAxisConfig: {
        id: 'demo-numerical-axis',
        keyForValues: 'numerical',
        position: {
          type: GeoChart.constants.POSITIONS.bottom
        },
        scale: {
          type: GeoChart.constants.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 200
          }
        }
      }
    },
    vertical: {
      linearAxisConfig: {
        id: 'spec-linear-axis',
        keyForValues: 'value',
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
            end: 1
          }
        }
      },

      numericalAxisConfig: {
        id: 'demo-numerical-axis',
        keyForValues: 'numerical',
        position: {
          type: GeoChart.constants.POSITIONS.left
        },
        scale: {
          type: GeoChart.constants.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 200
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

  describe('Constants', function () {
    it('should export DIMENSIONS', function () {
      expect(GeoChartLineSegments).toHaveProperty('DIMENSIONS')
    })
  })

  describe('#render', function () {
    for (const dimension in axisDimensions) {
      const linearAxisConfig = axisDimensions[dimension].linearAxisConfig
      const numericalAxisConfig = axisDimensions[dimension].numericalAxisConfig
      const cssClassFn = (original) => [...original, 'test-color-bar']

      switch (dimension) {
        case GeoChart.constants.BARS_DIMENSIONS.horizontal:
          return testDimension(dimension, linearAxisConfig, numericalAxisConfig, cssClassFn)
        case GeoChart.constants.BARS_DIMENSIONS.vertical:
          return testDimension(dimension, numericalAxisConfig, linearAxisConfig, null)
        default:
          console.error(`Unknown dimension: ${dimension}`)
      }
    }
  })

  function testDimension (dimension, verticalAxis, horizontalAxis, cssClassFn) {
    describe(`${dimension} line segments`, () => {
      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id
      const circleData = _.sortBy(_.times(_.random(1, 3), () => {
        return { [axisDimensions[dimension].numericalAxisConfig.keyForValues]: _.random(0, 200) }
      }), axisDimensions[dimension].numericalAxisConfig.keyForValues)

      const lineSegmentsConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        lineSegmentsGroups: [{
          normalValue: 0.5,
          circleData: circleData,
          dimension: dimension,
          lineWidth: 2,
          circleRadius: 3,
          circleMargin: 2,
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis
        }]
      }
      it('Should render the LineSegments', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: lineSegmentsConfig,
            width: `${chartConfig.width}`,
            height: `${chartConfig.height}`
          }
        })

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments-group').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments__segment-stop').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-segments__segment-stop')).toHaveLength(circleData.length)
        expect(wrapper.findAll('.geo-chart-line-segments__segment')).toHaveLength(circleData.length + 1)
        wrapper.destroy()
      })
      it('Should update data', () => {
        const stubLodashDebounce = stubLodashDebounceFactory()
        beforeEach(function () {
          stubLodashDebounce.setup()
        })

        afterEach(function () {
          stubLodashDebounce.teardown()
        })

        const wrapper = mount(GeoChart, {
          propsData: {
            config: lineSegmentsConfig,
            width: `${chartConfig.width}`,
            height: `${chartConfig.height}`
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments-group').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments__segment-stop').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-segments__segment-stop')).toHaveLength(circleData.length)
        expect(wrapper.findAll('.geo-chart-line-segments__segment')).toHaveLength(circleData.length + 1)

        const circleData2 = _.sortBy(_.times(_.random(1, 3), () => {
          return { [axisDimensions[dimension].numericalAxisConfig.keyForValues]: _.random(0, 200) }
        }), axisDimensions[dimension].numericalAxisConfig.keyForValues)

        const lineSegmentsConfig2 = _.assign({}, lineSegmentsConfig)
        lineSegmentsConfig2.lineSegmentsGroups[0].circleData = circleData2

        wrapper.setProps({
          config: lineSegmentsConfig2
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments-group').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments__segment-stop').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-segments__segment-stop')).toHaveLength(circleData2.length)
        expect(wrapper.findAll('.geo-chart-line-segments__segment')).toHaveLength(circleData2.length + 1)
      })
    })
  }
})
