import _ from 'lodash'

import { flushD3Transitions, stubGetBoundingClientRectFactory, stubLodashDebounceFactory } from './GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

import * as GeoChartAxis from '@/elements/GeoChart/GeoChartAxis'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartAxis', function () {
  describe('Constants', function () {
    it('should export DIMENSIONS', function () {
      expect(GeoChartAxis).toHaveProperty('DIMENSIONS')
    })

    it('should export POSITIONS', function () {
      expect(GeoChartAxis).toHaveProperty('POSITIONS')
    })

    it('should export SIMPLE_POSITIONS', function () {
      expect(GeoChartAxis).toHaveProperty('SIMPLE_POSITIONS')
    })

    it('should not export «anchoredToAxis» as SIMPLE_POSITIONS', function () {
      expect(GeoChartAxis.SIMPLE_POSITIONS).not.toMatchObject({
        anchoredToAxis: 'anchoredToAxis'
      })
    })
  })

  describe('#getAxisDimension', function () {
    it('should return horizontal dimension for vertically aligned axes', function () {
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.top
      })).toBe(GeoChartAxis.DIMENSIONS.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.bottom
      })).toBe(GeoChartAxis.DIMENSIONS.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.verticallyCenteredInTheMiddle
      })).toBe(GeoChartAxis.DIMENSIONS.horizontal)
    })

    it('should return vertical dimension for horizontally aligned axes', function () {
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.left
      })).toBe(GeoChartAxis.DIMENSIONS.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.right
      })).toBe(GeoChartAxis.DIMENSIONS.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.horizontallyCenteredInTheMiddle
      })).toBe(GeoChartAxis.DIMENSIONS.vertical)
    })

    it('should return normal dimension for anchored axes', function () {
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChartAxis.POSITIONS.top
        }
      })).toBe(GeoChartAxis.DIMENSIONS.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChartAxis.POSITIONS.bottom
        }
      })).toBe(GeoChartAxis.DIMENSIONS.vertical)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChartAxis.POSITIONS.verticallyCenteredInTheMiddle
        }
      })).toBe(GeoChartAxis.DIMENSIONS.vertical)

      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChartAxis.POSITIONS.left
        }
      })).toBe(GeoChartAxis.DIMENSIONS.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChartAxis.POSITIONS.right
        }
      })).toBe(GeoChartAxis.DIMENSIONS.horizontal)
      expect(GeoChartAxis.getAxisDimension({
        type: GeoChartAxis.POSITIONS.anchoredToAxis,
        relativeAxisPosition: {
          type: GeoChartAxis.POSITIONS.horizontallyCenteredInTheMiddle
        }
      })).toBe(GeoChartAxis.DIMENSIONS.horizontal)
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
        type: GeoChart.constants.SCALE_TYPES.linear,
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
      it('should not render ticks if tick count is 0', function () {
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 0
          },
          position: { type: GeoChart.constants.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis .tick').exists()).toBe(false)
      })

      it('should render ticks by default', function () {
        const axisConfig = _.omit(
          _.merge({}, linearAxisConfig, {
            position: { type: GeoChart.constants.POSITIONS.left }
          }),
          'ticks'
        )
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis .tick').exists()).toBe(true)
      })

      it('should apply given format to tick\'s labels', function () {
        const getStringForTick = (d, i) => `Tick ${i}`
        const formatMock = jest.fn(getStringForTick)
        const axisConfig = _.merge({}, linearAxisConfig, {
          ticks: {
            format: formatMock,
            count: 3
          },
          position: { type: GeoChart.constants.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
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

      it('should apply given CSS classes to axis', function () {
        const customClass = 'my-class'
        const getCSSClasses = (originalClasses) => [customClass]
        const cssClassesMock = jest.fn(getCSSClasses)
        const axisConfig = _.merge({}, linearAxisConfig, {
          cssClasses: cssClassesMock,
          position: { type: GeoChart.constants.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
          }
        })

        flushD3Transitions()

        expect(wrapper.find('.geo-chart').exists()).toBe(true)
        expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)

        expect(cssClassesMock).toHaveBeenCalledTimes(1)

        expect(cssClassesMock.mock.calls[0][0].length).toBeGreaterThan(0)

        expect(wrapper.find(`.geo-chart-axis.${customClass}`).exists()).toBe(true)
      })

      it('should apply given CSS classes to ticks', function () {
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
          position: { type: GeoChart.constants.POSITIONS.left }
        })
        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [axisConfig]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
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
    })

    describe('Simply-positioned axes', function () {
      describe('Left-positioned axes', function () {
        testAxis(
          GeoChart.constants.POSITIONS.left,
          { xTranslation: leftMargin }
        )
      })

      describe('Right-positioned axes', function () {
        testAxis(
          GeoChart.constants.POSITIONS.right,
          { xTranslation: chartWidth - rightMargin }
        )
      })

      describe('Horizontally-centered axes', function () {
        testAxis(
          GeoChart.constants.POSITIONS.horizontallyCenteredInTheMiddle,
          { xTranslation: (chartWidth - rightMargin + leftMargin) / 2 }
        )
      })

      describe('Top-positioned axes', function () {
        testAxis(
          GeoChart.constants.POSITIONS.top,
          { yTranslation: topMargin }
        )
      })

      describe('Bottom-positioned axes', function () {
        testAxis(
          GeoChart.constants.POSITIONS.bottom,
          { yTranslation: chartHeight - bottomMargin }
        )
      })

      describe('Vertically-centered axes', function () {
        testAxis(
          GeoChart.constants.POSITIONS.verticallyCenteredInTheMiddle,
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
        it('should render axis', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [axisConfig]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.find('.geo-chart').exists()).toBe(true)
          expect(wrapper.find('.geo-chart-axis').exists()).toBe(true)
          expect(wrapper.findAll('.geo-chart-axis .tick')).toHaveLength(tickCount)
        })

        it('should consider margins', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [axisConfig],
                chart: baseChartOptions
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
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
        it('should render domain in order', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [axisConfig]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
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

        it('should render inverted domain in order', function () {
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
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
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
          type: GeoChart.constants.SCALE_TYPES.linear,
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
          type: GeoChart.constants.POSITIONS.anchoredToAxis,
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
          GeoChart.constants.POSITIONS.left,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Right-positioned axis',
          GeoChart.constants.POSITIONS.right,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Horizontally-centered axis',
          GeoChart.constants.POSITIONS.horizontallyCenteredInTheMiddle,
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
          GeoChart.constants.POSITIONS.top,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Bottom-positioned axis',
          GeoChart.constants.POSITIONS.bottom,
          anchoredAxisPositioningParams
        )

        testAnchoredAxis(
          'Anchored to Vertically-centered axis',
          GeoChart.constants.POSITIONS.verticallyCenteredInTheMiddle,
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
        it('should render axis', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, anchoredAxisConfig]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
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
        it('should position axis anchored to leading value', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: baseAxisConfig.scale.domain.start
                  }
                })]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', '') // No transform needed for (0, 0)
        })

        it('should position axis anchored to trailing value', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: baseAxisConfig.scale.domain.end
                  }
                })]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${xSpan || 0}, ${ySpan || 0})`)
        })

        it('should position axis anchored to median', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end + baseAxisConfig.scale.domain.start) / 2
                  }
                })]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${(xSpan || 0) / 2}, ${(ySpan || 0) / 2})`)
        })

        it('should position axis anchored to arbitrary value in first half', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end - baseAxisConfig.scale.domain.start) / 4 + baseAxisConfig.scale.domain.start
                  }
                })]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${(xSpan || 0) / 4}, ${(ySpan || 0) / 4})`)
        })

        it('should position axis anchored to arbitrary value in second half', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end - baseAxisConfig.scale.domain.start) / 4 * 3 + baseAxisConfig.scale.domain.start
                  }
                })]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
            }
          })

          flushD3Transitions()

          expect(wrapper.findAll('.geo-chart').exists()).toBe(true)

          const axes = wrapper.findAll('.geo-chart-axis')
          expect(axes.exists()).toBe(true)
          expect(axes).toHaveLength(2)

          expect(axes.at(1).attributes()).toHaveProperty('transform', `translate(${(xSpan || 0) / 4 * 3}, ${(ySpan || 0) / 4 * 3})`)
        })

        it('should consider margins', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, _.merge({}, anchoredAxisConfig, {
                  position: {
                    value: (baseAxisConfig.scale.domain.end - baseAxisConfig.scale.domain.start) / 4 + baseAxisConfig.scale.domain.start
                  }
                })],
                chart: baseChartOptions
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
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
        it('should render domain in order', function () {
          const wrapper = mount(GeoChart, {
            propsData: {
              config: {
                axisGroups: [baseAxisConfig, anchoredAxisConfig]
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
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

        it('should render inverted domain in order', function () {
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
              },
              height: `${chartHeight}px`,
              width: `${chartWidth}px`
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

      it('should add new axis', function () {
        const initialAxis = _.merge({}, linearAxisConfig, {
          position: { type: GeoChart.constants.POSITIONS.left }
        })
        const newAxis = _.merge({}, linearAxisConfig, {
          id: 'new-axis',
          position: { type: GeoChart.constants.POSITIONS.left }
        })

        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [initialAxis]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
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

      it('should update existing axis', function () {
        const initialAxis = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 5
          },
          position: { type: GeoChart.constants.POSITIONS.left }
        })
        const updatedAxis = _.merge({}, linearAxisConfig, {
          ticks: {
            count: 1
          },
          position: { type: GeoChart.constants.POSITIONS.right }
        })

        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [initialAxis]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
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

      it.only('should remove axis', function () {
        const firstAxis = _.merge({}, linearAxisConfig, {
          id: 'fist-axis',
          position: { type: GeoChart.constants.POSITIONS.left }
        })
        const secondAxis = _.merge({}, linearAxisConfig, {
          id: 'second-axis',
          position: { type: GeoChart.constants.POSITIONS.right }
        })

        const wrapper = mount(GeoChart, {
          propsData: {
            config: {
              axisGroups: [firstAxis, secondAxis]
            },
            height: `${chartHeight}px`,
            width: `${chartWidth}px`
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
