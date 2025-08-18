import {
  flushD3Transitions,
  stubGetBoundingClientRectFactory,
  stubGetBBoxFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  getTransformTranslateMatches,
  stubCreateSVGPointFactory
} from './GeoChart.spec-utils' // This has to be imported before D3
import { mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

describe('GeoChartPie', function () {
  const keyForValues = 'value'
  const chartData = [
    { value: 100 },
    { value: 30 },
    { value: 200 },
    { value: 666 },
    { value: 0 }
  ]

  const chartConfig = {
    height: 300,
    width: 500
  }

  const stubGetBBox = stubGetBBoxFactory()
  const stubGetScreenCTM = stubGetScreenCTMFactory()
  const stubCreateSVGPoint = stubCreateSVGPointFactory()
  const stubLodashDebounce = stubLodashDebounceFactory()
  const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
    height: chartConfig.height,
    width: chartConfig.width
  })

  beforeEach(function () {
    stubGetBoundingClientRect.setup()
    stubLodashDebounce.setup()
    stubGetBBox.setup()
    stubCreateSVGPoint.setup()
    stubGetScreenCTM.setup()
  })

  afterEach(function () {
    stubGetBoundingClientRect.teardown()
    stubLodashDebounce.teardown()
    stubGetBBox.teardown()
    stubCreateSVGPoint.teardown()
    stubGetScreenCTM.teardown()
  })

  it('Should render the pie', function () {
    const wrapper = mount(GeoChart, {
      props: {
        config: {
          pieConfig: {
            data: chartData,
            keyForValues
          }
        },
        height: `${chartConfig.height}px`,
        width: `${chartConfig.width}px`
      }
    })

    flushD3Transitions()

    expect(wrapper.find('.geo-chart').exists()).toBe(true)

    expect(wrapper.find('.geo-chart .geo-chart-pie').exists()).toBe(true)
    expect(wrapper.findAll('.geo-chart .geo-chart-pie .geo-chart-pie-slice')).toHaveLength(chartData.length)

    wrapper.unmount()
  })

  it('Should center the pie within chart dimensions', function () {
    const wrapper = mount(GeoChart, {
      props: {
        config: {
          pieConfig: {
            data: chartData,
            keyForValues
          }
        },
        height: `${chartConfig.height}px`,
        width: `${chartConfig.width}px`
      }
    })

    flushD3Transitions()

    expect(wrapper.find('.geo-chart').exists()).toBe(true)

    const pie = wrapper.find('.geo-chart .geo-chart-pie')
    const transformMatches = getTransformTranslateMatches(pie)

    expect(parseInt(transformMatches[1])).toBe(chartConfig.width / 2)
    expect(parseInt(transformMatches[2])).toBe(chartConfig.height / 2)

    wrapper.unmount()
  })

  xit('Should re-render the chart with the new data', async function () {
    const wrapper = mount(GeoChart, {
      props: {
        config: {
          pieConfig: {
            data: chartData,
            keyForValues
          }
        },
        height: `${chartConfig.height}px`,
        width: `${chartConfig.width}px`
      }
    })

    flushD3Transitions()

    expect(wrapper.find('.geo-chart').exists()).toBe(true)
    expect(wrapper.findAll('.geo-chart .geo-chart-pie .geo-chart-pie-slice')).toHaveLength(chartData.length)

    const chartData2 = [
      { value: 100 },
      { value: 30 }
    ]

    await wrapper.setProps({
      config: {
        pieConfig: {
          data: chartData2,
          keyForValues
        }
      }
    })

    flushD3Transitions()
    expect(wrapper.findAll('.geo-chart .geo-chart-pie .geo-chart-pie-slice')).toHaveLength(chartData2.length)

    wrapper.unmount()
  })

  it('Should add specific class for each slice', function () {
    const wrapper = mount(GeoChart, {
      props: {
        config: {
          pieConfig: {
            data: chartData,
            keyForValues
          }
        },
        height: `${chartConfig.height}px`,
        width: `${chartConfig.width}px`
      }
    })

    flushD3Transitions()

    expect(wrapper.find('.geo-chart').exists()).toBe(true)

    expect(wrapper.find('.geo-chart .geo-chart-pie').exists()).toBe(true)
    const allSlices = wrapper.findAll('.geo-chart .geo-chart-pie .geo-chart-pie-slice')

    expect(allSlices.every((slice, i) => slice.classes().includes(`geo-chart-pie-slice--${i}`))).toBe(true)

    wrapper.unmount()
  })

  it('Should add custom class for each slice', function () {
    const wrapper = mount(GeoChart, {
      props: {
        config: {
          pieConfig: {
            data: chartData,
            keyForValues,
            cssClasses (originalClasses, d, i) {
              return [...originalClasses, `my-custom-class-${i}`]
            }
          }
        },
        height: `${chartConfig.height}px`,
        width: `${chartConfig.width}px`
      }
    })

    flushD3Transitions()

    expect(wrapper.find('.geo-chart').exists()).toBe(true)

    expect(wrapper.find('.geo-chart .geo-chart-pie').exists()).toBe(true)
    const allSlices = wrapper.findAll('.geo-chart .geo-chart-pie .geo-chart-pie-slice')

    expect(allSlices.every((slice, i) => slice.classes().includes(`geo-chart-pie-slice--${i}`) && slice.classes().includes(`my-custom-class-${i}`))).toBe(true)

    wrapper.unmount()
  })

  xit('Should display tooltip on hover', async function () {
    const tooltipText = (d, i) => d.value.toString()
    const wrapper = mount(GeoChart, {
      props: {
        config: {
          pieConfig: {
            data: chartData,
            keyForValues,
            tooltip: {
              content: tooltipText
            },
            cssClasses (originalClasses, d, i) {
              return [...originalClasses, `my-custom-class-${i}`]
            }
          }
        },
        height: `${chartConfig.height}px`,
        width: `${chartConfig.width}px`
      }
    })

    flushD3Transitions()

    expect(document.getElementsByClassName('geo-chart-tooltip')).toHaveLength(1)

    const tooltipDiv = document.getElementsByClassName('geo-chart-tooltip')[0]
    expect(window.getComputedStyle(tooltipDiv).opacity).toBe('0')

    const allSlices = wrapper.findAll('.geo-chart .geo-chart-pie .geo-chart-pie-slice')

    for (let i = 0; i < allSlices.length; i++) {
      const slice = allSlices.at(i)
      await slice.trigger('mouseover')
      await slice.trigger('mousemove')
      expect(window.getComputedStyle(tooltipDiv).opacity).toBe('1')
      expect(tooltipDiv.textContent).toBe(tooltipText(chartData[i], i))
    }

    wrapper.unmount()
  })
})
