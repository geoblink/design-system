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

describe('GeoChartAxisGuidelines', function () {
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
    const tickCount = 5
    const linearAxisConfig = {
      id: 'sample-linear-axis',
      keyForValues: 'linear-value',
      ticks: {
        count: tickCount
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

    describe('Guidelines customization', function () {
      it('Should not render guidelines if axis tick count is 0', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 0
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{ idAxis: axisConfig.id }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines .tick').exists()).toBe(false)
      })

      it('Should render guidelines by default', function () {
        const axisConfig = _.omit(
          _.merge({}, linearAxisConfig, {
            position: { type: GeoChart.constants.AXIS.POSITIONS.left }
          }),
          'ticks'
        )
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{ idAxis: axisConfig.id }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines .tick').exists()).toBe(true)
      })

      it('Should not render any text in the ticks', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 3
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.top }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{ idAxis: axisConfig.id }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        const allTexts = wrapper.findAll('.geo-chart-guidelines .tick text')

        for (let i = 0; i < allTexts.length; i++) {
          expect(allTexts.at(i).text()).toEqual('')
        }
      })

      it('Should apply given CSS classes to guidelines', function () {
        const customClass = 'my-class'
        const getCSSClasses = (originalClasses) => [customClass]
        const cssClassesMock = jest.fn(getCSSClasses)
        const axisConfig = _.merge({}, linearAxisConfig, {
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{
                idAxis: axisConfig.id,
                cssClasses: cssClassesMock
              }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)

        expect(cssClassesMock).toHaveBeenCalled()

        expect(cssClassesMock.mock.calls[0][0].length).toBeGreaterThan(0)

        expect(wrapper.find(`.geo-chart-guidelines.${customClass}`).exists()).toBe(true)
      })

      it('Should apply given CSS classes to guidelines ticks', function () {
        const tickCount = 3
        const getCustomClassName = (i) => `my-class--${i}`
        const customClassNameAppliedToAllGuidelines = 'my-class'
        const getCSSClasses = (originalClasses, d, i) => [
          customClassNameAppliedToAllGuidelines,
          getCustomClassName(i)
        ]
        const cssClassesMock = jest.fn(getCSSClasses)
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            count: tickCount
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{
                idAxis: axisConfig.id,
                guidelines: {
                  cssClasses: cssClassesMock
                }
              }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)

        expect(cssClassesMock).toHaveBeenCalledTimes(tickCount)

        const allGuidelines = wrapper.findAll('.geo-chart-guidelines .tick')
        const guidelinesWithCustomClasses = wrapper.findAll(
          `.geo-chart-guidelines .tick.${customClassNameAppliedToAllGuidelines}`
        )

        expect(guidelinesWithCustomClasses).toHaveLength(allGuidelines.length)

        for (let i = 0; i < guidelinesWithCustomClasses.length; i++) {
          const expectedClassName = getCustomClassName(i)
          expect(guidelinesWithCustomClasses.at(i).classes(expectedClassName)).toBe(true)
        }
      })

      it('Should render guidelines given an axisConfig', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{ axisConfig: axisConfig }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines .tick').exists()).toBe(true)
      })

      it('Should not display domain by default', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{ idAxis: axisConfig.id }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines .domain').attributes('style')).toBe('stroke-width: 0;')
      })

      it('Should display domain when passed outerLines to true', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{
                idAxis: axisConfig.id,
                guidelines: {
                  outerLines: true
                }
              }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines .domain').attributes('style')).toBe('stroke-width: 1;')
      })

      it('Should display more guidelines than axis ticks when forced count', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          position: { type: GeoChart.constants.AXIS.POSITIONS.right }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig],
              guidelinesGroups: [{
                idAxis: axisConfig.id,
                guidelines: {
                  count: 10
                }
              }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        const allAxisTicks = wrapper.findAll('.geo-chart-axis .tick')
        const allGuidelines = wrapper.findAll('.geo-chart-guidelines .tick')
        expect(allGuidelines.length).toBeGreaterThan(allAxisTicks.length)
      })
    })

    describe('Reactive data change', function () {
      const stubLodashDebounce = stubLodashDebounceFactory()

      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })

      it('Should add new guidelines', function () {
        const initialAxis = _.merge({}, linearAxisConfig, {
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const newAxis = _.merge({}, linearAxisConfig, {
          id: 'new-axis',
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })

        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [initialAxis],
              guidelinesGroups: [{ idAxis: initialAxis.id }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-guidelines')).toHaveLength(1)
        expect(wrapper.find(`.geo-chart-guidelines-${initialAxis.id}`).exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-guidelines-${newAxis.id}`).exists()).toBe(false)

        wrapper.setProps({
          config: {
            axisGroups: [initialAxis, newAxis],
            guidelinesGroups: [
              { idAxis: initialAxis.id },
              { idAxis: newAxis.id }
            ]
          }
        })
        flushD3Transitions()

        expect(wrapper.findAll('.geo-chart-axis')).toHaveLength(2)
        expect(wrapper.find(`.geo-chart-guidelines-${initialAxis.id}`).exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-guidelines-${newAxis.id}`).exists()).toBe(true)
      })

      it('Should update existing guidelines', function () {
        const initialAxis = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 5
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const updatedAxis = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 1
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.right }
        })

        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [initialAxis],
              guidelinesGroups: [{ idAxis: initialAxis.id }]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-guidelines .tick')).toHaveLength(initialAxis.ticks.count)

        wrapper.setProps({
          config: {
            axisGroups: [updatedAxis],
            guidelinesGroups: [{ idAxis: updatedAxis.id }]
          }
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-guidelines').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-guidelines .tick')).toHaveLength(updatedAxis.ticks.count)
      })

      it('Should remove guidelines', function () {
        const firstAxis = _.merge({}, linearAxisConfig, {
          id: 'fist-axis',
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const secondAxis = _.merge({}, linearAxisConfig, {
          id: 'second-axis',
          position: { type: GeoChart.constants.AXIS.POSITIONS.right }
        })

        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [firstAxis, secondAxis],
              guidelinesGroups: [
                { idAxis: firstAxis.id },
                { idAxis: secondAxis.id }
              ]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-guidelines-${firstAxis.id}`).exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-guidelines-${secondAxis.id}`).exists()).toBe(true)

        wrapper.setProps({
          config: {
            axisGroups: [secondAxis],
            guidelinesGroups: [
              { idAxis: secondAxis.id }
            ]
          }
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-guidelines-${firstAxis.id}`).exists()).toBe(false)
        expect(wrapper.find(`.geo-chart-guidelines-${secondAxis.id}`).exists()).toBe(true)
      })
    })
  })
})
