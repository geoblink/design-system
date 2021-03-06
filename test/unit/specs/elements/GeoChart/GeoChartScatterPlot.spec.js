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

const mockDomain1 = _.random(1, 50)

const axisDimensions = {
  linearAxisConfig: {
    id: 'spec-linear-axis',
    keyForValues: 'y',
    position: {
      type: GeoChart.constants.AXIS.POSITIONS.left
    },
    scale: {
      type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
      valueForOrigin: 0,
      domain: {
        start: 1000,
        end: 0
      }
    }
  },
  numericalAxisConfig: {
    id: 'spec-numerical-axis',
    keyForValues: 'x',
    position: {
      type: GeoChart.constants.AXIS.POSITIONS.bottom
    },
    scale: {
      type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
      valueForOrigin: 0,
      domain: {
        start: 0,
        end: 25000
      }
    }
  }
}

const mockHandleClick = jest.fn()

describe('GeoChartScatterPlot', function () {
  const stubGetBBox = stubGetBBoxFactory()
  const stubGetScreenCTM = stubGetScreenCTMFactory()
  const stubCreateSVGPoint = stubCreateSVGPointFactory()
  const stubLodashDebounce = stubLodashDebounceFactory()

  beforeEach(function () {
    stubGetBBox.setup()
    stubCreateSVGPoint.setup()
    stubGetScreenCTM.setup()
    stubLodashDebounce.setup()
  })

  afterEach(function () {
    stubGetBBox.teardown()
    stubCreateSVGPoint.teardown()
    stubGetScreenCTM.teardown()
    stubLodashDebounce.teardown()
  })

  afterEach(function () {
    document.body.innerHTML = ''
  })

  describe('#render', function () {
    const linearAxisConfig = axisDimensions.linearAxisConfig
    const numericalAxisConfig = axisDimensions.numericalAxisConfig

    const cssClassFn = (original) => [...original, 'test-scatter-plot']

    const scatterPlotData = _.times(mockDomain1, (i) => {
      return {
        x: _.random(0, 25000),
        y: _.random(0, 1000)
      }
    })

    const scatterPlotConfig = {
      axisGroups: [
        linearAxisConfig,
        numericalAxisConfig
      ],
      scatterPlotGroups: [
        {
          idVerticalAxis: linearAxisConfig.id,
          idHorizontalAxis: numericalAxisConfig.id,
          mainDimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal,
          data: scatterPlotData,
          onDotClick: mockHandleClick,
          getRadius: function () { return 4 },
          getFillColor: function (d, i) { return i < (mockDomain1 / 2) ? 'orange' : 'green' },
          tooltip: {
            content: (d, i) => {
              return `x: ${d.x} y: ${d.y}`
            },
            offset: () => null
          },
          cssClasses: cssClassFn
        }
      ]
    }
    it('Should render the ScatterPlot', () => {
      const wrapper = mount(GeoChart, {
        propsData: {
          config: scatterPlotConfig
        }
      })

      flushD3Transitions()

      expect(wrapper.find('.geo-chart').exists()).toBe(true)
      expect(wrapper.find('.geo-chart .geo-chart-scatter-plot-group').exists()).toBe(true)
      expect(wrapper.findAll('.geo-chart .geo-chart-scatter-plot-group')).toHaveLength(1)

      expect(wrapper.find('.geo-chart .geo-chart-scatter-plot-group--0 .geo-chart-scatter-plot__dot').exists()).toBe(true)
      expect(wrapper.findAll('.geo-chart .geo-chart-scatter-plot-group--0 .geo-chart-scatter-plot__dot')).toHaveLength(mockDomain1)

      wrapper.destroy()
    })

    it('Should update data', () => {
      const wrapper = mount(GeoChart, {
        propsData: {
          config: scatterPlotConfig
        }
      })

      flushD3Transitions()

      expect(wrapper.find('.geo-chart').exists()).toBe(true)
      expect(wrapper.find('.geo-chart .geo-chart-scatter-plot-group').exists()).toBe(true)

      const mockDomain2 = _.random(1, 50)
      const newScatterPlotData = _.times(mockDomain2, (i) => {
        return {
          x: _.random(0, 25000),
          y: _.random(0, 1000)
        }
      })

      const scatterPlotConfig2 = _.assign({}, scatterPlotConfig)
      scatterPlotConfig2.scatterPlotGroups[0].data = newScatterPlotData

      wrapper.setProps({
        config: scatterPlotConfig2
      })
      flushD3Transitions()

      expect(wrapper.find('.geo-chart').exists()).toBe(true)
      expect(wrapper.find('.geo-chart .geo-chart-scatter-plot-group').exists()).toBe(true)
      expect(wrapper.findAll('.geo-chart .geo-chart-scatter-plot-group')).toHaveLength(1)

      expect(wrapper.find('.geo-chart .geo-chart-scatter-plot-group--0 .geo-chart-scatter-plot__dot').exists()).toBe(true)
      expect(wrapper.findAll('.geo-chart .geo-chart-scatter-plot-group--0 .geo-chart-scatter-plot__dot')).toHaveLength(mockDomain2)

      wrapper.destroy()
    })

    it('Should return dot coordinates (array) on click', () => {
      const wrapper = mount(GeoChart, {
        propsData: {
          config: scatterPlotConfig
        }
      })

      flushD3Transitions()

      wrapper.find('.geo-chart .geo-chart-scatter-plot-group--0 .geo-chart-scatter-plot__dot').trigger('click')
      expect(mockHandleClick.mock.calls.length).toBe(1)
      expect(Array.isArray(mockHandleClick.mock.calls[0][2])).toBe(true)
      wrapper.destroy()
    })
  })
})
