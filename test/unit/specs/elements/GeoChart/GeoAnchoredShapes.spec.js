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

import * as GeoChartAnchoredShapes from '@/elements/GeoChart/GeoChartAnchoredShapes/GeoChartAnchoredShapes'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartAnchoredShapes', function () {
  const chartConfig = {
    height: 300,
    width: 500
  }

  const axisDimensions = {
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
    it('should export ANCHOR_POSITIONS', function () {
      expect(GeoChartAnchoredShapes).toHaveProperty('ANCHOR_POSITIONS')
    })
    it('Should export getTriangleShape', function () {
      expect(GeoChartAnchoredShapes).toHaveProperty('getTriangleShapePath')
    })
  })

  describe('#render', function () {
    const linearAxisConfig = axisDimensions.linearAxisConfig
    const numericalAxisConfig = axisDimensions.numericalAxisConfig
    const cssClassFn = (original) => [...original, 'test-anchored-shapes']
    return testDimension(linearAxisConfig, numericalAxisConfig, cssClassFn)
  })

  function testDimension (verticalAxis, horizontalAxis, cssClassFn) {
    const idVerticalAxis = verticalAxis.id
    const idHorizontalAxis = horizontalAxis.id
    const shapeData = _.sortBy([
      {
        [axisDimensions.numericalAxisConfig.keyForValues]: axisDimensions.numericalAxisConfig.scale.domain.start,
        isUp: true
      },
      {
        [axisDimensions.numericalAxisConfig.keyForValues]: axisDimensions.numericalAxisConfig.scale.domain.end,
        isUp: true
      },
      {
        [axisDimensions.numericalAxisConfig.keyForValues]: 56,
        isUp: false
      }
    ], axisDimensions.numericalAxisConfig.keyForValues)

    const anchoredShapesConfig = {
      axisGroups: [
        verticalAxis,
        horizontalAxis
      ],
      anchoredShapesGroups: [{
        normalValue: 0.5,
        normalOffset: 6,
        shapeData: shapeData,
        dimension: GeoChart.constants.BARS_DIMENSIONS.horizontal,
        idVerticalAxis: idVerticalAxis,
        idHorizontalAxis: idHorizontalAxis,
        cssClasses: cssClassFn,
        getAnchorPosition (d, i) {
          return d.isUp ? GeoChart.constants.ANCHOR_POSITIONS.leading : GeoChart.constants.ANCHOR_POSITIONS.trailing
        },
        getShapeSize () {
          return {
            width: 12,
            height: 10
          }
        },
        text: {
          content (d, i) {
            return [
              {
                text: `Label`,
                cssClass: 'label'
              },
              {
                text: ' - ',
                cssClass: 'separator'
              },
              {
                text: `Value ${d.numerical}`,
                cssClass: 'value'
              }
            ]
          }
        },
        getShapePath (d, i, { size, shapeOffsetFromAxis, singleGroupOptions }) {
          return GeoChartAnchoredShapes.getTriangleShapePath(d, i, { size, shapeOffsetFromAxis, singleGroupOptions })
        }
      }]
    }
    describe('Anchored Shape with no text content', function () {
      it('Should not have text elements', function () {
        const config = _.cloneDeep(anchoredShapesConfig)
        config.anchoredShapesGroups[0].text = {}
        const wrapper = mount(GeoChart, {
          propsData: {
            config: config,
            width: `${chartConfig.width}`,
            height: `${chartConfig.height}`
          }
        })

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-anchored-shapes-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__shape-element')).toHaveLength(shapeData.length)
        expect(wrapper.find('.geo-chart-anchored-shapes__text-element').exists()).toBe(false)
        wrapper.destroy()
      })
    })
    describe('Horizontal Anchored shapes', () => {
      const stubLodashDebounce = stubLodashDebounceFactory()
      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })
      it('Should render the LineSegments', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: anchoredShapesConfig,
            width: `${chartConfig.width}`,
            height: `${chartConfig.height}`
          }
        })

        const leadingElements = _.filter(shapeData, 'isUp').length
        const trailingElements = shapeData.length - leadingElements

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-anchored-shapes-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__shape-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--leading')).toHaveLength(leadingElements)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--trailing')).toHaveLength(trailingElements)
        wrapper.destroy()
      })

      it('Should update data', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: anchoredShapesConfig,
            width: `${chartConfig.width}`,
            height: `${chartConfig.height}`
          }
        })

        flushD3Transitions()

        const leadingElements = _.filter(shapeData, 'isUp').length
        const trailingElements = shapeData.length - leadingElements

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-anchored-shapes-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__shape-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__text-element')).toHaveLength(shapeData.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--leading')).toHaveLength(leadingElements)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--trailing')).toHaveLength(trailingElements)

        const shapeData2 = _.sortBy(_.times(5, (i) => {
          return {
            [axisDimensions.numericalAxisConfig.keyForValues]: 40 * i,
            isUp: i % 2 === 0
          }
        }), axisDimensions.numericalAxisConfig.keyForValues)
        const anchoredShapesConfig2 = _.assign({}, anchoredShapesConfig)
        anchoredShapesConfig2.anchoredShapesGroups[0].shapeData = shapeData2

        wrapper.setProps({
          config: anchoredShapesConfig2
        })

        flushD3Transitions()

        const leadingElements2 = _.filter(shapeData2, 'isUp').length
        const trailingElements2 = shapeData2.length - leadingElements2

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-anchored-shapes-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData2.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData2.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__shape-element')).toHaveLength(shapeData2.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__text-element')).toHaveLength(shapeData2.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--leading')).toHaveLength(leadingElements2)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--trailing')).toHaveLength(trailingElements2)

        const shapeData3 = _.sortBy(_.times(2, (i) => {
          return {
            [axisDimensions.numericalAxisConfig.keyForValues]: 25 * i,
            isUp: !i % 2 === 0
          }
        }), axisDimensions.numericalAxisConfig.keyForValues)
        const anchoredShapesConfig3 = _.assign({}, anchoredShapesConfig)
        anchoredShapesConfig3.anchoredShapesGroups[0].shapeData = shapeData3

        wrapper.setProps({
          config: anchoredShapesConfig3
        })

        flushD3Transitions()

        const leadingElements3 = _.filter(shapeData3, 'isUp').length
        const trailingElements3 = shapeData3.length - leadingElements3

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-anchored-shapes-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData3.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element')).toHaveLength(shapeData3.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__shape-element')).toHaveLength(shapeData3.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes__text-element')).toHaveLength(shapeData3.length)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--leading')).toHaveLength(leadingElements3)
        expect(wrapper.findAll('.geo-chart-anchored-shapes-group__shape-text-element--trailing')).toHaveLength(trailingElements3)

        wrapper.destroy()
      })
    })
  }
})
