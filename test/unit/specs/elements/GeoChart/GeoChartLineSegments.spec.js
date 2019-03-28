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

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartLineSegments', function () {
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

  describe('#render', function () {
    for (const dimension in axisDimensions) {
      const linearAxisConfig = axisDimensions[dimension].linearAxisConfig
      const numericalAxisConfig = axisDimensions[dimension].numericalAxisConfig
      const cssClassFn = (original) => [...original, 'test-line-segments']

      switch (dimension) {
        case GeoChart.constants.BARS_DIMENSIONS.horizontal:
          testDimension(dimension, linearAxisConfig, numericalAxisConfig, cssClassFn)
          break
        case GeoChart.constants.BARS_DIMENSIONS.vertical:
          testDimension(dimension, numericalAxisConfig, linearAxisConfig, null)
          break
        default:
          console.error(`Unknown dimension: ${dimension}`)
      }
    }
  })

  function testDimension (dimension, verticalAxis, horizontalAxis, cssClassFn) {
    describe(`${dimension} line segments`, () => {
      const stubLodashDebounce = stubLodashDebounceFactory()
      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })

      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id
      const circleData = _.sortBy(_.times(2, (i) => {
        return {
          [axisDimensions[dimension].numericalAxisConfig.keyForValues]: 50 * i,
          id: i
        }
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
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn,
          trackByKey: 'id'
        }]
      }
      it('Should render line segments even though no track data property is provided', function () {
        const config = _.cloneDeep(lineSegmentsConfig)
        config.lineSegmentsGroups[0].trackByKey = null
        const wrapper = mount(GeoChart, {
          propsData: {
            config: config
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
      it('Should render the LineSegments', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: lineSegmentsConfig
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
        const wrapper = mount(GeoChart, {
          propsData: {
            config: lineSegmentsConfig
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments-group').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-line-segments__segment-stop').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-line-segments__segment-stop')).toHaveLength(circleData.length)
        expect(wrapper.findAll('.geo-chart-line-segments__segment')).toHaveLength(circleData.length + 1)

        const circleData2 = _.sortBy(_.times(4, (i) => {
          return {
            [axisDimensions[dimension].numericalAxisConfig.keyForValues]: 32 * i,
            id: i
          }
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
        wrapper.destroy()
      })
    })
  }
})
