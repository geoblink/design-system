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

const mockDomain = _.times(5, i => `Category ${i}`)

const axisDimensions = {
  horizontal: {
    numericalAxisConfig: {
      id: 'spec-numerical-axis',
      keyForValues: 'value',
      position: {
        type: GeoChart.constants.AXIS.POSITIONS.bottom
      },
      scale: {
        type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
        valueForOrigin: 0,
        domain: {
          start: 0,
          end: 200
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
        valueForOrigin: _.first(mockDomain),
        domain: mockDomain
      }
    }
  },
  vertical: {
    numericalAxisConfig: {
      id: 'spec-numerical-axis',
      keyForValues: 'value',
      position: {
        type: GeoChart.constants.AXIS.POSITIONS.left
      },
      scale: {
        type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
        valueForOrigin: 0,
        domain: {
          start: 200,
          end: 0
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
        valueForOrigin: _.first(mockDomain),
        domain: mockDomain
      }
    }
  }
}

describe('GeoChartStackedBars', function () {
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
      const numericalAxisConfig = axisDimensions[dimension].numericalAxisConfig
      const categoricalAxisConfig = axisDimensions[dimension].categoricalAxisConfig

      const cssClassFn = (original) => [...original, 'test-stacked-bars']

      testDimension(dimension, categoricalAxisConfig, numericalAxisConfig, cssClassFn)
    }
  })

  function testDimension (dimension, categoricalAxisConfig, numericalAxisConfig, cssClassFn) {
    describe(`${dimension} stacked bars`, () => {
      const stubLodashDebounce = stubLodashDebounceFactory()
      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })

      let verticalAxis, horizontalAxis
      switch (dimension) {
        case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal:
          verticalAxis = categoricalAxisConfig
          horizontalAxis = numericalAxisConfig
          break
        case GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical:
          verticalAxis = numericalAxisConfig
          horizontalAxis = categoricalAxisConfig
          break
        default:
          console.error(`Unknown mainDimension: ${dimension}`)
      }

      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id

      const domainLength = Math.abs(numericalAxisConfig.scale.domain.end - numericalAxisConfig.scale.domain.start)

      const barsData = _.map(mockDomain, (category) => {
        const segments = getRandomCombinationOfSegments(domainLength, _.random(1, 4))
        return {
          [categoricalAxisConfig.keyForValues]: category,
          [numericalAxisConfig.keyForValues]: _.times(segments.length, (idx) => {
            return {
              [numericalAxisConfig.keyForValues]: segments[idx],
              id: idx
            }
          })
        }
      })

      const stackedBarsConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        stackedBarGroups: [{
          width: 12,
          data: barsData,
          mainDimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D[dimension],
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn
        }]
      }
      it('Should render the StackedBars', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: stackedBarsConfig
          }
        })

        flushD3Transitions()

        let segmentLength = 0
        barsData.forEach(element => {
          segmentLength += element.value.length
        })

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-stacked-bars-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart .geo-chart-stacked-bars-group__single-group')).toHaveLength(mockDomain.length)
        expect(wrapper.find('.geo-chart .geo-chart-stacked-bars__segment').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart .geo-chart-stacked-bars__segment')).toHaveLength(segmentLength)

        wrapper.destroy()
      })
      it('Should update data', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: stackedBarsConfig
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-stacked-bars-group').exists()).toBe(true)

        const barsData2 = _.map(mockDomain, (category) => {
          const segments = getRandomCombinationOfSegments(domainLength, _.random(1, 4))
          return {
            [categoricalAxisConfig.keyForValues]: category,
            [numericalAxisConfig.keyForValues]: _.times(segments.length, (idx) => {
              return {
                [numericalAxisConfig.keyForValues]: segments[idx],
                id: idx
              }
            })
          }
        })
        const stackedBarsConfig2 = _.assign({}, stackedBarsConfig)
        stackedBarsConfig2.stackedBarGroups[0].data = barsData2

        wrapper.setProps({
          config: stackedBarsConfig2
        })
        flushD3Transitions()

        let segmentLength = 0
        barsData2.forEach(element => {
          segmentLength += element.value.length
        })

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-stacked-bars-group').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart .geo-chart-stacked-bars-group__single-group')).toHaveLength(mockDomain.length)
        expect(wrapper.find('.geo-chart .geo-chart-stacked-bars__segment').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart .geo-chart-stacked-bars__segment')).toHaveLength(segmentLength)
        wrapper.destroy()
      })
    })
  }
})

function getRandomCombinationOfSegments (total, nbOfSegments) {
  let currentTotal = 0
  const allSeg = new Array(nbOfSegments)
  _.times(nbOfSegments - 1, (i) => {
    const seg = _.random(0, total - currentTotal)
    allSeg[i] = seg
    currentTotal += seg
  })
  allSeg[nbOfSegments - 1] = total - currentTotal
  return allSeg
}
