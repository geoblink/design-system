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

import * as GeoChartColorBars from '@/elements/GeoChart/GeoChartColorBar/GeoChartColorBar'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

const mockDomain = _.times(8, i => `Bucket ${i}`)
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
    categoricalAxisConfig: {
      id: 'spec-categorical-axis',
      keyForValues: 'category',
      position: {
        type: GeoChart.constants.POSITIONS.bottom
      },
      scale: {
        type: GeoChart.constants.SCALE_TYPES.categorical,
        valueForOrigin: _.first(mockDomain),
        domain: mockDomain
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
    categoricalAxisConfig: {
      id: 'spec-categorical-axis',
      keyForValues: 'category',
      position: {
        type: GeoChart.constants.POSITIONS.left
      },
      scale: {
        type: GeoChart.constants.SCALE_TYPES.categorical,
        valueForOrigin: _.first(mockDomain),
        domain: mockDomain
      }
    }
  }
}

describe('GeoChartColorBar', function () {
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
      expect(GeoChartColorBars).toHaveProperty('DIMENSIONS')
    })
  })

  describe('#render', function () {
    for (const dimension in axisDimensions) {
      const linearAxisConfig = axisDimensions[dimension].linearAxisConfig
      const categoricalAxisConfig = axisDimensions[dimension].categoricalAxisConfig
      const highlightedSegments = _.filter(_.map(mockDomain, (category) => {
        return _.random(0, 1)
          ? { [axisDimensions[dimension].categoricalAxisConfig.keyForValues]: category }
          : null
      }))
      const cssClassFn = (original) => [...original, 'test-color-bar']

      switch (dimension) {
        case GeoChart.constants.BARS_DIMENSIONS.horizontal:
          testDimension(dimension, linearAxisConfig, categoricalAxisConfig, highlightedSegments, cssClassFn)
          break
        case GeoChart.constants.BARS_DIMENSIONS.vertical:
          testDimension(dimension, categoricalAxisConfig, linearAxisConfig, highlightedSegments, null)
          break
        default:
          console.error(`Unknown dimension: ${dimension}`)
      }
    }
  })

  function testDimension (dimension, verticalAxis, horizontalAxis, highlightedSegments, cssClassFn) {
    describe(`${dimension} color bar`, () => {
      const stubLodashDebounce = stubLodashDebounceFactory()
      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })

      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id
      const colorBarConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        colorBarGroups: [{
          normalValue: 0.5,
          width: 12,
          highlightedWidth: 16,
          data: highlightedSegments,
          dimension: GeoChart.constants.BARS_DIMENSIONS[dimension],
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn
        }]
      }
      it('Should render the ColorBar', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: colorBarConfig,
            width: `${chartConfig.width}`,
            height: `${chartConfig.height}`
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-color-bar-group').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-color-bar__segment-container').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart .geo-chart-color-bar__segment')).toHaveLength(mockDomain.length)
        expect(wrapper.findAll('.geo-chart .geo-chart-color-bar__highlighted-segment')).toHaveLength(highlightedSegments.length)

        wrapper.destroy()
      })
      it('Should update data', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: colorBarConfig,
            width: `${chartConfig.width}`,
            height: `${chartConfig.height}`
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-color-bar-group').exists()).toBe(true)

        const highlightedSegments2 = _.filter(_.map(mockDomain, (category) => {
          return _.random(0, 1)
            ? { [axisDimensions[dimension].categoricalAxisConfig.keyForValues]: category }
            : null
        }))
        const colorBarConfig2 = _.assign({}, colorBarConfig)
        colorBarConfig2.colorBarGroups[0].data = highlightedSegments2

        wrapper.setProps({
          config: colorBarConfig2
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-color-bar-group').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-color-bar__segment-container').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart .geo-chart-color-bar__segment')).toHaveLength(mockDomain.length)
        expect(wrapper.findAll('.geo-chart .geo-chart-color-bar__highlighted-segment')).toHaveLength(highlightedSegments2.length)
        wrapper.destroy()
      })
    })
  }
})
