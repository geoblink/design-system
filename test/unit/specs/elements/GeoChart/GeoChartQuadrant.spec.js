import _ from 'lodash'

import {
  flushD3Transitions,
  stubGetBBoxFactory,
  stubGetBoundingClientRectFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  stubCreateSVGPointFactory
} from './GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartQuadrant', function () {
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
    const stubLodashDebounce = stubLodashDebounceFactory()

    beforeEach(function () {
      stubLodashDebounce.setup()
    })

    afterEach(function () {
      stubLodashDebounce.teardown()
    })

    const linearAxisConfig = {
      id: 'sample-linear-axis',
      keyForValues: 'linear-value',
      position: {
        type: GeoChart.constants.AXIS.POSITIONS.left
      },
      scale: {
        type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
        valueForOrigin: 10,
        domain: {
          start: 5,
          end: 15
        }
      }
    }

    const numericalAxisConfig = {
      id: 'sample-numerical-axis',
      keyForValues: 'numerical-value',
      position: {
        type: GeoChart.constants.AXIS.POSITIONS.bottom
      },
      scale: {
        type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
        valueForOrigin: 0,
        domain: {
          start: 0,
          end: 10
        }
      }
    }

    const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
      height: 300,
      width: 500
    })

    beforeEach(function () {
      stubGetBoundingClientRect.setup()
    })

    afterEach(function () {
      stubGetBoundingClientRect.teardown()
    })

    const quadrantConfig = {
      chart: {
        margin: {
          top: 30,
          right: 30,
          bottom: 30,
          left: 30
        }
      },
      axisGroups: [
        linearAxisConfig,
        numericalAxisConfig
      ],
      quadrantGroups: [{
        horizontalAxisConfig: numericalAxisConfig,
        verticalAxisConfig: linearAxisConfig,
        horizontalThreshold: 0,
        verticalThreshold: 5,
        quadrantTopLeftName: 'A',
        quadrantTopRightName: 'B',
        quadrantBottomLeftName: 'C',
        quadrantBottomRightName: 'D'
      }]
    }
    describe('Render GeoChartQuadrant', function () {
      it('Should render the quadrant', function () {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: quadrantConfig
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant .geo-chart-quadrant-line').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-quadrant .geo-chart-quadrant-line')).toHaveLength(2)
        expect(wrapper.find('.geo-chart-quadrant .geo-chart-quadrant-label').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-quadrant .geo-chart-quadrant-label')).toHaveLength(4)

        wrapper.destroy()
      })

      it('Should update data', async function () {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: quadrantConfig
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant .geo-chart-quadrant-line--vertical').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant .geo-chart-quadrant-line--vertical').attributes()).toHaveProperty('transform', 'translate(30, 0)')

        const quadrantConfig2 = _.assign({}, quadrantConfig)
        quadrantConfig2.quadrantGroups[0].horizontalThreshold = 10

        wrapper.setProps({
          config: quadrantConfig2
        })

        await wrapper.vm.$nextTick()

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant .geo-chart-quadrant-line--vertical').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-quadrant .geo-chart-quadrant-line--vertical').attributes()).toHaveProperty('transform', 'translate(470, 0)')

        wrapper.destroy()
      })
    })
  })
})
