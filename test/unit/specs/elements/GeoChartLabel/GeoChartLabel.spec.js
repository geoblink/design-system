import _ from 'lodash'

import {
  flushD3Transitions,
  stubGetBBoxFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  stubCreateSVGPointFactory,
  stubGetComputedTextLengthFactory
} from '../GeoChart/GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

const categoricalAxisValues = _.times(3, i => `Bucket ${i}`)
const linearAxisValues = [10, 15, 20]

const axisConfig = {
  linearAxisConfig: {
    id: 'spec-linear-axis',
    keyForValues: 'value',
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
        end: 30
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
      valueForOrigin: _.first(categoricalAxisValues),
      domain: categoricalAxisValues
    }
  }
}
const chartData = _.map(categoricalAxisValues, (category, index) => {
  return {
    [axisConfig.categoricalAxisConfig.keyForValues]: category,
    [axisConfig.linearAxisConfig.keyForValues]: linearAxisValues[index]
  }
})
const labelGroup =
    {
      data: _.map(linearAxisValues, (value, index) => {
        return {
          labels: [
            {
              text: _.toString(value),
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
              },
              margin: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 0
              },
              cornerRadius: 5,
              cssClasses (originalClasses) {
                return [...originalClasses, 'rect-stroke-red-and-text-fill-black']
              }
            }],
          [axisConfig.categoricalAxisConfig.keyForValues]: categoricalAxisValues[index]
        }
      }),
      idVerticalAxis: axisConfig.categoricalAxisConfig.id
    }

describe('GeoChartLabels', function () {
  const stubGetBBox = stubGetBBoxFactory()
  const stubGetScreenCTM = stubGetScreenCTMFactory()
  const stubCreateSVGPoint = stubCreateSVGPointFactory()
  const stubGetComputedTextLength = stubGetComputedTextLengthFactory()

  beforeEach(function () {
    stubGetBBox.setup()
    stubGetComputedTextLength.setup()
    stubCreateSVGPoint.setup()
    stubGetScreenCTM.setup()
  })

  afterEach(function () {
    stubGetBBox.teardown()
    stubGetComputedTextLength.teardown()
    stubCreateSVGPoint.teardown()
    stubGetScreenCTM.teardown()
  })

  afterEach(function () {
    document.body.innerHTML = ''
  })

  describe('#render', function () {
    const linearAxisConfig = axisConfig.linearAxisConfig
    const categoricalAxisConfig = axisConfig.categoricalAxisConfig

    const cssClassFn = (original) => [...original, 'test-bar']

    testHorizontalDimension(categoricalAxisConfig, linearAxisConfig, linearAxisValues, cssClassFn, labelGroup)
    testVerticalDimension(linearAxisConfig, categoricalAxisConfig, linearAxisValues, cssClassFn, labelGroup)
  })

  function testHorizontalDimension (verticalAxis, horizontalAxis, linearAxisValues, cssClassFn, labelGroup) {
    describe('horizontal bar chart with labels', () => {
      const stubLodashDebounce = stubLodashDebounceFactory()
      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })

      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id
      const barConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        barGroups: [{
          width: 12,
          data: chartData,
          mainDimension: 'horizontal',
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn
        }],
        labelGroups: [labelGroup]
      }
      it('Should render the labels with correct values', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: barConfig
          }
        })

        flushD3Transitions()
        _.forEach(linearAxisValues, (value, index) => {
          expect(wrapper.find(`.geo-chart-label-group--${index} text`).text()).toEqual(_.toString(value))
        })
      })

      it('Should render the labels with multiple texts', () => {
        const multipleLabelsGroup = {
          data: _.map(categoricalAxisValues, (category) => {
            return {
              labels: [
                {
                  text: '<<',
                  padding: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                  },
                  margin: {
                    top: 0,
                    right: 10,
                    bottom: 0,
                    left: 0
                  },
                  cornerRadius: 5,
                  cssClasses (originalClasses) {
                    return [...originalClasses, 'rect-stroke-red-and-text-fill-black']
                  }
                },
                {
                  text: category
                }],
              [axisConfig.categoricalAxisConfig.keyForValues]: category
            }
          }),
          idVerticalAxis: axisConfig.categoricalAxisConfig.id
        }
        const barConfigForMultipleLabels = _.assign({}, barConfig, { labelGroups: [multipleLabelsGroup] })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: barConfigForMultipleLabels
          }
        })

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)
        _.forEach(categoricalAxisValues, (category, index) => {
          const singleLabelGroups = wrapper.find(`.geo-chart-label-group--${index}`).findAll('.geo-chart-labels-group__single-label')

          expect(singleLabelGroups.length).toEqual(2)
          expect(singleLabelGroups.at(0).text()).toEqual('<<')
          expect(singleLabelGroups.at(1).text()).toEqual(_.toString(category))
        })
        expect(wrapper.find('.geo-chart-labels-group-container').exists()).toBe(true)

        wrapper.destroy()
      })
    })
    describe('horizontal bar chart with positioned labels', () => {
      const stubLodashDebounce = stubLodashDebounceFactory()
      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })
      const labelGroup = {
        data: _.map(linearAxisValues, (value, index) => {
          return {
            labels: [{
              text: _.toString(value),
              cornerRadius: 5
            }],
            [axisConfig.linearAxisConfig.keyForValues]: value,
            [axisConfig.categoricalAxisConfig.keyForValues]: categoricalAxisValues[index]
          }
        }),
        idHorizontalAxis: axisConfig.linearAxisConfig.id,
        idVerticalAxis: axisConfig.categoricalAxisConfig.id
      }
      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id
      const barConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        barGroups: [{
          width: 12,
          data: chartData,
          mainDimension: 'horizontal',
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn,
          isPositioningLabelsInBars: true

        }],
        labelGroups: [labelGroup]
      }
      it('Should render the labels with correct values', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: barConfig
          }
        })

        flushD3Transitions()
        // since there is no comparison, should be wide bar charts
        expect(wrapper.find('.geo-chart-labels-group__single-label').attributes().class).toContain('geo-chart-value-label--medium')
        _.forEach(linearAxisValues, (value, index) => {
          expect(wrapper.find(`.geo-chart-label-group--${index} text`).text()).toEqual(_.toString(value))
        })
        wrapper.destroy()
      })
      it('Should render the labels with correct positionings', () => {
        let wrapper = mount(GeoChart, {
          propsData: {
            config: barConfig
          }
        })

        flushD3Transitions()

        _.forEach(linearAxisValues, (value, index) => {
          // since there is no comparison, should be wide bar charts
          expect(wrapper.findAll('.geo-chart-labels-group__single-label').at(index).attributes().class).toContain('geo-chart-value-label--medium')
        })
        wrapper.destroy()
        labelGroup.nComparisons = 2
        barConfig.labelGroups = [labelGroup]
        wrapper = mount(GeoChart, {
          propsData: {
            config: barConfig
          }
        })

        flushD3Transitions()
        _.forEach(linearAxisValues, (value, index) => {
          // since there is no comparison, should be small bar charts
          expect(wrapper.findAll('.geo-chart-labels-group__single-label').at(index).attributes().class).toContain('geo-chart-value-label--small')
        })
        wrapper.destroy()
      })
      it('Should render the labels with multiple texts', () => {
        const multipleLabelsGroup = {
          data: _.map(categoricalAxisValues, (category) => {
            return {
              labels: [
                {
                  text: '<<',
                  padding: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                  },
                  margin: {
                    top: 0,
                    right: 10,
                    bottom: 0,
                    left: 0
                  },
                  cornerRadius: 5,
                  cssClasses (originalClasses) {
                    return [...originalClasses, 'rect-stroke-red-and-text-fill-black']
                  }
                },
                {
                  text: category
                }],
              [axisConfig.categoricalAxisConfig.keyForValues]: category
            }
          }),
          idVerticalAxis: axisConfig.categoricalAxisConfig.id
        }
        const barConfigForMultipleLabels = _.assign({}, barConfig, { labelGroups: [multipleLabelsGroup] })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: barConfigForMultipleLabels
          }
        })

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)
        _.forEach(categoricalAxisValues, (category, index) => {
          const singleLabelGroups = wrapper.find(`.geo-chart-label-group--${index}`).findAll('.geo-chart-labels-group__single-label')

          expect(singleLabelGroups.length).toEqual(2)
          expect(singleLabelGroups.at(0).text()).toEqual('<<')
          expect(singleLabelGroups.at(1).text()).toEqual(_.toString(category))
        })
        expect(wrapper.find('.geo-chart-labels-group-container').exists()).toBe(true)

        wrapper.destroy()
      })
    })
  }
  function testVerticalDimension (verticalAxis, horizontalAxis, linearAxisValues, cssClassFn, labelGroup) {
    describe('vertical bar chart with positioned labels', () => {
      const stubLodashDebounce = stubLodashDebounceFactory()
      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })
      const labelGroup = {
        data: _.map(linearAxisValues, (value, index) => {
          return {
            labels: [{
              text: _.toString(value),
              cornerRadius: 5
            }],
            [axisConfig.linearAxisConfig.keyForValues]: value,
            [axisConfig.categoricalAxisConfig.keyForValues]: categoricalAxisValues[index]
          }
        }),
        idHorizontalAxis: axisConfig.categoricalAxisConfig.id,
        idVerticalAxis: axisConfig.linearAxisConfig.id
      }
      const idVerticalAxis = verticalAxis.id
      const idHorizontalAxis = horizontalAxis.id
      const barConfig = {
        axisGroups: [
          verticalAxis,
          horizontalAxis
        ],
        barGroups: [{
          width: 12,
          data: chartData,
          mainDimension: 'vertical',
          idVerticalAxis: idVerticalAxis,
          idHorizontalAxis: idHorizontalAxis,
          cssClasses: cssClassFn,
          isPositioningLabelsInBars: true

        }],
        labelGroups: [labelGroup]
      }
      it('Should render the labels with correct values', () => {
        const wrapper = mount(GeoChart, {
          propsData: {
            config: barConfig
          }
        })

        flushD3Transitions()
        _.forEach(linearAxisValues, (value, index) => {
          expect(wrapper.find(`.geo-chart-label-group--${index} text`).text()).toEqual(_.toString(value))
        })
        wrapper.destroy()
      })

      it('Should render the labels with correct classes', () => {
        let wrapper = mount(GeoChart, {
          propsData: {
            config: barConfig
          }
        })

        flushD3Transitions()

        _.forEach(linearAxisValues, (value, index) => {
          // since there is no comparison, should be wide bar charts
          expect(wrapper.findAll('.geo-chart-labels-group__single-label').at(index).attributes().class).toContain('geo-chart-value-label--medium')
        })
        wrapper.destroy()
        labelGroup.nComparisons = 2
        barConfig.labelGroups = [labelGroup]
        wrapper = mount(GeoChart, {
          propsData: {
            config: barConfig
          }
        })

        flushD3Transitions()
        _.forEach(linearAxisValues, (value, index) => {
          // since there is no comparison, should be small bar charts
          expect(wrapper.findAll('.geo-chart-labels-group__single-label').at(index).attributes().class).toContain('geo-chart-value-label--small')
        })
      })

      it('Should render the labels with multiple texts', () => {
        const multipleLabelsGroup = {
          data: _.map(categoricalAxisValues, (category) => {
            return {
              labels: [
                {
                  text: '<<',
                  padding: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                  },
                  margin: {
                    top: 0,
                    right: 10,
                    bottom: 0,
                    left: 0
                  },
                  cornerRadius: 5,
                  cssClasses (originalClasses) {
                    return [...originalClasses, 'rect-stroke-red-and-text-fill-black']
                  }
                },
                {
                  text: category
                }],
              [axisConfig.categoricalAxisConfig.keyForValues]: category
            }
          }),
          idVerticalAxis: axisConfig.categoricalAxisConfig.id
        }
        const barConfigForMultipleLabels = _.assign({}, barConfig, { labelGroups: [multipleLabelsGroup] })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: barConfigForMultipleLabels
          }
        })

        flushD3Transitions()
        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart .geo-chart-bars-group').exists()).toBe(true)
        _.forEach(categoricalAxisValues, (category, index) => {
          const singleLabelGroups = wrapper.find(`.geo-chart-label-group--${index}`).findAll('.geo-chart-labels-group__single-label')

          expect(singleLabelGroups.length).toEqual(2)
          expect(singleLabelGroups.at(0).text()).toEqual('<<')
          expect(singleLabelGroups.at(1).text()).toEqual(_.toString(category))
        })
        expect(wrapper.find('.geo-chart-labels-group-container').exists()).toBe(true)

        wrapper.destroy()
      })
    })
  }
})
