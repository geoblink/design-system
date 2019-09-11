import _ from 'lodash'

import {
  flushD3Transitions,
  stubGetBoundingClientRectFactory,
  stubGetBBoxFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  stubCreateSVGPointFactory
} from './GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

import * as GeoChartAxis from '@/elements/GeoChart/GeoChartAxis/GeoChartAxis'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartAxis', function () {
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
    it('Should export POSITIONS', function () {
      expect(GeoChart.constants).toHaveProperty('AXIS')
      expect(GeoChart.constants.AXIS).toHaveProperty('POSITIONS')
    })

    it('Should export SIMPLE_POSITIONS', function () {
      expect(GeoChart.constants).toHaveProperty('AXIS')
      expect(GeoChart.constants.AXIS).toHaveProperty('SIMPLE_POSITIONS')
    })

    it('Should not export «anchoredToAxis» as SIMPLE_POSITIONS', function () {
      expect(GeoChart.constants.AXIS.SIMPLE_POSITIONS).not.toMatchObject({
        anchoredToAxis: 'anchoredToAxis'
      })
    })
  })

  describe('#getAxisDimension', function () {
    it('Should return horizontal dimension for vertically aligned axes', function () {
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.top
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.bottom
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.verticallyCenteredInTheMiddle
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal)
    })

    it('Should return vertical dimension for horizontally aligned axes', function () {
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.left
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.right
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.horizontallyCenteredInTheMiddle
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical)
    })

    it('Should return normal dimension for anchored axes', function () {
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChart.constants.AXIS.POSITIONS.top
        }
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChart.constants.AXIS.POSITIONS.bottom
        }
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChart.constants.AXIS.POSITIONS.verticallyCenteredInTheMiddle
        }
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical)

      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChart.constants.AXIS.POSITIONS.left
        }
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChart.constants.AXIS.POSITIONS.right
        }
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChart.constants.AXIS.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChart.constants.AXIS.POSITIONS.horizontallyCenteredInTheMiddle
        }
      })).toBe(GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal)
    })
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

    const chartHeight = 300
    const chartWidth = 500

    const topMargin = 30
    const leftMargin = 60
    const bottomMargin = 20
    const rightMargin = 40
    const baseChartOptions = {
      margin: {
        top: topMargin,
        right: rightMargin,
        bottom: bottomMargin,
        left: leftMargin
      }
    }

    const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
      height: chartHeight,
      width: chartWidth
    })

    beforeEach(function () {
      stubGetBoundingClientRect.setup()
    })

    afterEach(function () {
      stubGetBoundingClientRect.teardown()
    })

    describe('Ticks customization', function () {
      it('Should not render ticks if tick count is 0', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 0
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis .tick').exists()).toBe(false)
      })

      it('Should render ticks by default', function () {
        const axisConfig = _.omit(
          _.merge({}, linearAxisConfig, {
            position: { type: GeoChart.constants.AXIS.POSITIONS.left }
          }),
          'ticks'
        )
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis .tick').exists()).toBe(true)
      })

      it('Should apply given format to tick\'s labels', function () {
        const getStringForTick = (d, i) => `Tick ${i}`
        const formatMock = jest.fn(getStringForTick)
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            format: formatMock,
            count: 3
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)

        expect(formatMock).toHaveBeenCalledTimes(3)
        expect(formatMock.mock.calls[0]).toHaveLength(3)
        expect(formatMock.mock.calls[0][0]).toEqual(linearAxisConfig.scale.domain.start)
        expect(formatMock.mock.calls[0][1]).toEqual(0)

        expect(formatMock.mock.calls[1]).toHaveLength(3)
        expect(formatMock.mock.calls[1][0]).toEqual((linearAxisConfig.scale.domain.end + linearAxisConfig.scale.domain.start) / 2)
        expect(formatMock.mock.calls[1][1]).toEqual(1)

        expect(formatMock.mock.calls[2]).toHaveLength(3)
        expect(formatMock.mock.calls[2][0]).toEqual(linearAxisConfig.scale.domain.end)
        expect(formatMock.mock.calls[2][1]).toEqual(2)

        const allTexts = wrapper.findAll('.geo-chart-axis .tick text')

        for (let i = 0; i < allTexts.length; i++) {
          expect(allTexts.at(i).text()).toEqual(getStringForTick(null, i))
        }
      })

      it('Should apply given CSS classes to axis', function () {
        const customClass = 'my-class'
        const getCSSClasses = (originalClasses) => [customClass]
        const cssClassesMock = jest.fn(getCSSClasses)
        const axisConfig = _.merge({}, linearAxisConfig, {
          cssClasses: cssClassesMock,
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)

        expect(cssClassesMock).toHaveBeenCalled()

        expect(cssClassesMock.mock.calls[0][0].length).toBeGreaterThan(0)

        expect(wrapper.find(`.geo-chart-axis.${customClass}`).exists()).toBe(true)
      })

      it('Should apply given CSS classes to ticks', function () {
        const tickCount = 3
        const getCustomClassName = (i) => `my-class--${i}`
        const customClassNameAppliedToAllTicks = 'my-class'
        const getCSSClasses = (originalClasses, d, i) => [
          customClassNameAppliedToAllTicks,
          getCustomClassName(i)
        ]
        const cssClassesMock = jest.fn(getCSSClasses)
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            cssClasses: cssClassesMock,
            count: tickCount
          },
          position: { type: GeoChart.constants.AXIS.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)

        expect(cssClassesMock).toHaveBeenCalledTimes(tickCount)

        expect(cssClassesMock.mock.calls[0]).toHaveLength(4)
        expect(cssClassesMock.mock.calls[0][0].length).toBeGreaterThan(0)
        expect(cssClassesMock.mock.calls[0][1]).toBe(axisConfig.scale.domain.start)
        expect(cssClassesMock.mock.calls[0][2]).toBe(0)

        expect(cssClassesMock.mock.calls[1]).toHaveLength(4)
        expect(cssClassesMock.mock.calls[1][0].length).toBeGreaterThan(0)
        expect(cssClassesMock.mock.calls[1][1]).toBe((axisConfig.scale.domain.end + axisConfig.scale.domain.start) / 2)
        expect(cssClassesMock.mock.calls[1][2]).toBe(1)

        expect(cssClassesMock.mock.calls[2]).toHaveLength(4)
        expect(cssClassesMock.mock.calls[2][0].length).toBeGreaterThan(0)
        expect(cssClassesMock.mock.calls[2][1]).toBe(axisConfig.scale.domain.end)
        expect(cssClassesMock.mock.calls[2][2]).toBe(2)

        const allTicks = wrapper.findAll('.geo-chart-axis .tick')
        const ticksWithCustomClasses = wrapper.findAll(
          `.geo-chart-axis .tick.${customClassNameAppliedToAllTicks}`
        )

        expect(ticksWithCustomClasses).toHaveLength(allTicks.length)

        for (let i = 0; i < ticksWithCustomClasses.length; i++) {
          const expectedClassName = getCustomClassName(i)
          expect(
            ticksWithCustomClasses.at(i).attributes('class')
          ).toMatch(new RegExp(`(?:.*\\s+)?${expectedClassName}(?:\\s+.*)?`))
        }
      })

      it('Should apply labels if provided in the axis config', function () {
        const axisConfig = _.omit(
          _.merge({}, linearAxisConfig, {
            position: { type: GeoChart.constants.AXIS.POSITIONS.left },
            label: { content: 'Test label' }
          }),
          'ticks'
        )
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis-label').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis-label--left').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis-label--left').text()).toBe('Test label')
      })
    })

    describe('Simply-positioned axes', function () {
      describe('Left-positioned axes', function () {
        testAxis(
          GeoChart.constants.AXIS.POSITIONS.left,
          { xTranslation: leftMargin }
        )
      })

      describe('Right-positioned axes', function () {
        testAxis(
          GeoChart.constants.AXIS.POSITIONS.right,
          { xTranslation: chartWidth - rightMargin }
        )
      })

      describe('Horizontally-centered axes', function () {
        testAxis(
          GeoChart.constants.AXIS.POSITIONS.horizontallyCenteredInTheMiddle,
          { xTranslation: (chartWidth - rightMargin + leftMargin) / 2 }
        )
      })

      describe('Top-positioned axes', function () {
        testAxis(
          GeoChart.constants.AXIS.POSITIONS.top,
          { yTranslation: topMargin }
        )
      })

      describe('Bottom-positioned axes', function () {
        testAxis(
          GeoChart.constants.AXIS.POSITIONS.bottom,
          { yTranslation: chartHeight - bottomMargin }
        )
      })

      describe('Vertically-centered axes', function () {
        testAxis(
          GeoChart.constants.AXIS.POSITIONS.verticallyCenteredInTheMiddle,
          { yTranslation: (chartHeight - bottomMargin + topMargin) / 2 }
        )
      })

      function testAxis (axisPositionType, { xTranslation, yTranslation }) {
        testAxisRendered(
          _.merge({}, linearAxisConfig, { position: { type: axisPositionType } }),
          { xTranslation, yTranslation }
        )

        testAxisDomain(
          _.merge({}, linearAxisConfig, { position: { type: axisPositionType } })
        )
      }

      function testAxisRendered (axisConfig, { xTranslation, yTranslation }) {
        it('Should render axis', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [axisConfig]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)
          expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
          expect(wrapper.findAll('.geo-chart-axis .tick')).toHaveLength(tickCount)
        })

        it('Should consider margins', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [axisConfig],
                chart: baseChartOptions
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)
          expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)

          expect(wrapper.find('.geo-chart-axis').attributes()).toHaveProperty('transform', `translate(${xTranslation || 0}, ${yTranslation || 0})`)

          expect(wrapper.findAll('.geo-chart-axis .tick')).toHaveLength(tickCount)
        })
      }

      function testAxisDomain (axisConfig) {
        it('Should render domain in order', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [axisConfig]
              }
            }
          })

          flushD3Transitions()

          const allTicks = wrapper.findAll('.geo-chart-axis .tick')

          expect(allTicks).toHaveLength(tickCount)

          for (let i = 1; i < allTicks.length; i++) {
            const previousTickValue = parseFloat(allTicks.at(i - 1).text())
            const currentTickValue = parseFloat(allTicks.at(i).text())

            expect(previousTickValue).not.toBeNaN()
            expect(currentTickValue).not.toBeNaN()
            expect(currentTickValue).toBeGreaterThan(previousTickValue)
          }
        })

        it('Should render inverted domain in order', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [_.merge({}, axisConfig, {
                  scale: {
                    domain: {
                      start: axisConfig.scale.domain.end,
                      end: axisConfig.scale.domain.start
                    }
                  }
                })]
              }
            }
          })

          flushD3Transitions()

          const allTicks = wrapper.findAll('.geo-chart-axis .tick')

          expect(allTicks).toHaveLength(tickCount)

          for (let i = 1; i < allTicks.length; i++) {
            const previousTickValue = parseFloat(allTicks.at(i - 1).text())
            const currentTickValue = parseFloat(allTicks.at(i).text())

            expect(previousTickValue).not.toBeNaN()
            expect(currentTickValue).not.toBeNaN()
            expect(currentTickValue).toBeLessThan(previousTickValue)
          }
        })
      }
    })

    describe('Anchored-positioned axes', function () {
      const baseAxisConfig = {
        id: 'sample-anchored-axis',
        keyForValues: 'linear-value',
        ticks: {
          count: tickCount
        },
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
          valueForOrigin: 15,
          domain: {
            start: -10,
            end: 20
          }
        }
      }

      const anchoredAxisTickCount = 7
      const anchoredAxisConfig = _.merge({}, linearAxisConfig, {
        ticks: {
          count: anchoredAxisTickCount
        },
        position: {
          type: GeoChart.constants.AXIS.POSITIONS.anchoredToAxis,
          value: 0,
          relativeToAxis: baseAxisConfig.id
        },
        scale: {
          valueForOrigin: 30,
          domain: {
            start: -20,
            end: 40
          }
        }
      })

      describe('Anchored to a horizontal axis', function () {
        const anchoredAxisPositioningParams = {
          yLeadingMargin: topMargin,
          yTrailingMargin: bottomMargin,
          ySpan: chartHeight
        }

        testAnchoredAxis(
          'Anchored to Left-positioned axis',
          GeoChart.constants.AXIS.POSITIONS.left,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Right-positioned axis',
          GeoChart.constants.AXIS.POSITIONS.right,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Horizontally-centered axis',
          GeoChart.constants.AXIS.POSITIONS.horizontallyCenteredInTheMiddle,
          anchoredAxisPositioningParams
        )
      })

      describe('Anchored to a vertical axis', function () {
        const anchoredAxisPositioningParams = {
          xLeadingMargin: leftMargin,
          xTrailingMargin: rightMargin,
          xSpan: chartWidth
        }

        testAnchoredAxis(
          'Anchored to Top-positioned axis',
          GeoChart.constants.AXIS.POSITIONS.top,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Bottom-positioned axis',
          GeoChart.constants.AXIS.POSITIONS.bottom,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Vertically-centered axis',
          GeoChart.constants.AXIS.POSITIONS.verticallyCenteredInTheMiddle,
          anchoredAxisPositioningParams
        )
      })

      function testAnchoredAxis (testCaseName, baseAxisPositionType, anchoredAxisPositioningParams) {
        describe(testCaseName, function () {
          const testCaseBaseAxis = _.merge({}, baseAxisConfig, {
            position: {
              type: baseAxisPositionType
            }
          })

          testAnchoredAxisIsRendered(testCaseBaseAxis, anchoredAxisConfig)

          testAnchoredAxisIsProperlyPositioned(testCaseBaseAxis, anchoredAxisConfig, anchoredAxisPositioningParams)

          testAnchoredAxisDomain(testCaseBaseAxis, anchoredAxisConfig)
        })
      }

      function testAnchoredAxisIsRendered (baseAxisConfig, anchoredAxisConfig) {
        it('Should render axis', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, anchoredAxisConfig]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).findAll('.tick')).toHaveLength(anchoredAxisConfig.ticks.count)
        })
      }

      function testAnchoredAxisIsProperlyPositioned (baseAxisConfig, anchoredAxisConfig, {
        xLeadingMargin,
        xTrailingMargin,
        xSpan,
        yLeadingMargin,
        yTrailingMargin,
        ySpan
      }) {
        it('Should position axis anchored to leading value', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: baseAxisConfig.scale.domain.start
                  }
                })]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', '') // No transform needed for (0, 0)
        })

        it('Should position axis anchored to trailing value', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: baseAxisConfig.scale.domain.end
                  }
                })]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${xSpan || 0}, ${ySpan || 0})`)
        })

        it('Should position axis anchored to median', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end + baseAxisConfig.scale.domain.start) / 2
                  }
                })]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${(xSpan || 0) / 2}, ${(ySpan || 0) / 2})`)
        })

        it('Should position axis anchored to arbitrary value in first half', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end - baseAxisConfig.scale.domain.start) / 4 + baseAxisConfig.scale.domain.start
                  }
                })]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${(xSpan || 0) / 4}, ${(ySpan || 0) / 4})`)
        })

        it('Should position axis anchored to arbitrary value in second half', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end - baseAxisConfig.scale.domain.start) / 4 * 3 + baseAxisConfig.scale.domain.start
                  }
                })]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${(xSpan || 0) / 4 * 3}, ${(ySpan || 0) / 4 * 3})`)
        })

        it('Should consider margins', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end - baseAxisConfig.scale.domain.start) / 4 + baseAxisConfig.scale.domain.start
                  }
                })],
                chart: baseChartOptions
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${((xSpan || 0) - (xLeadingMargin || 0) - (xTrailingMargin || 0)) / 4 + (xLeadingMargin || 0)}, ${((ySpan || 0) - (yLeadingMargin || 0) - (yTrailingMargin || 0)) / 4 + (yLeadingMargin || 0)})`)
        })
      }

      function testAnchoredAxisDomain (baseAxisConfig, anchoredAxisConfig) {
        it('Should render domain in order', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, anchoredAxisConfig]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          const allTicks = axes.at(1).findAll('.tick')

          expect(allTicks).toHaveLength(anchoredAxisConfig.ticks.count)

          for (let i = 1; i < allTicks.length; i++) {
            const previousTickValue = parseFloat(allTicks.at(i - 1).text())
            const currentTickValue = parseFloat(allTicks.at(i).text())

            expect(previousTickValue).not.toBeNaN()
            expect(currentTickValue).not.toBeNaN()
            expect(currentTickValue).toBeGreaterThan(previousTickValue)
          }
        })

        it('Should render inverted domain in order', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  scale: {
                    domain: {
                      start: anchoredAxisConfig.scale.domain.end,
                      end: anchoredAxisConfig.scale.domain.start
                    }
                  }
                })]
              }
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          const allTicks = axes.at(1).findAll('.tick')

          expect(allTicks).toHaveLength(anchoredAxisConfig.ticks.count)

          for (let i = 1; i < allTicks.length; i++) {
            const previousTickValue = parseFloat(allTicks.at(i - 1).text())
            const currentTickValue = parseFloat(allTicks.at(i).text())

            expect(previousTickValue).not.toBeNaN()
            expect(currentTickValue).not.toBeNaN()
            expect(currentTickValue).toBeLessThan(previousTickValue)
          }
        })
      }
    })

    describe('Reactive data change', function () {
      const stubLodashDebounce = stubLodashDebounceFactory()

      beforeEach(function () {
        stubLodashDebounce.setup()
      })

      afterEach(function () {
        stubLodashDebounce.teardown()
      })

      it('Should add new axis', function () {
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
              axisGroups: [initialAxis]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-axis')).toHaveLength(1)
        expect(wrapper.find(`.geo-chart-axis-${initialAxis.id}`).exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-axis-${newAxis.id}`).exists()).toBe(false)

        wrapper.setProps({
          config: {
            axisGroups: [initialAxis, newAxis]
          }
        })
        flushD3Transitions()

        expect(wrapper.findAll('.geo-chart-axis')).toHaveLength(2)
        expect(wrapper.find(`.geo-chart-axis-${initialAxis.id}`).exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-axis-${newAxis.id}`).exists()).toBe(true)
      })

      it('Should update existing axis', function () {
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
              axisGroups: [initialAxis]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-axis .tick')).toHaveLength(initialAxis.ticks.count)

        wrapper.setProps({
          config: {
            axisGroups: [updatedAxis]
          }
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
        expect(wrapper.findAll('.geo-chart-axis .tick')).toHaveLength(updatedAxis.ticks.count)
      })

      it('Should remove axis', function () {
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
              axisGroups: [firstAxis, secondAxis]
            }
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-axis-${firstAxis.id}`).exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-axis-${secondAxis.id}`).exists()).toBe(true)

        wrapper.setProps({
          config: {
            axisGroups: [secondAxis]
          }
        })
        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find(`.geo-chart-axis-${firstAxis.id}`).exists()).toBe(false)
        expect(wrapper.find(`.geo-chart-axis-${secondAxis.id}`).exists()).toBe(true)
      })
    })
  })
})
