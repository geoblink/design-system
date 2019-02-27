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
      expect(GeoChartAnchoredShapes).toHaveProperty('DIMENSIONS')
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
        [axisDimensions.numericalAxisConfig.keyForValues]: _.random(0, 200),
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
    describe('Anchored Shape with vertical dimension', function () {
      it('Should throw error', function () {
        expect(function () {
          const config = _.cloneDeep(anchoredShapesConfig)
          config.anchoredShapesGroups[0].dimension = GeoChart.constants.BARS_DIMENSIONS.vertical

          return GeoChartAnchoredShapes.renderAnchoredText(
            null, null, config.anchoredShapesGroups[0], null,
            { horizontalAxis, verticalAxis }
          )
        }).toThrowError()
      })
    })
    describe('Anchored Shape with no text content', function () {
      // it('Should not be executed', function () {
      //   const config = _.cloneDeep(anchoredShapesConfig)
      //   const wrapper = mount(GeoChart, {
      //     propsData: {
      //       config: anchoredShapesConfig,
      //       width: `${chartConfig.width}`,
      //       height: `${chartConfig.height}`
      //     }
      //   })
      //   const mockRender = jest.spyOn(GeoChartAnchoredShapes, 'renderAnchoredText').mockImplementation(() => {
      //     console.log('MOCKING TEST')
      //   })

      //   flushD3Transitions()
      //   // config.anchoredShapesGroups[0].text = {}
      //   expect(mockRender).toHaveBeenCalled()
      //   wrapper.destroy()
      // })
    })
    describe('Horizontal Anchored shapes', () => {
      it('Should render the LineSegments', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: anchoredShapesConfig,
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
        expect(wrapper.findAll('.geo-chart-anchored-shapes__text-element')).toHaveLength(shapeData.length)
        wrapper.destroy()
      })
    })
  }
})
