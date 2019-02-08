import { flushD3Transitions, stubGetBoundingClientRectFactory, stubLodashDebounceFactory, getTransformTranslateMatches } from './GeoChart.spec-utils' // This has to be imported before D3
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

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

  const stubLodashDebounce = stubLodashDebounceFactory()
  const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
    height: chartConfig.height,
    width: chartConfig.width
  })

  beforeEach(function () {
    stubGetBoundingClientRect.setup()
    stubLodashDebounce.setup()
  })

  afterEach(function () {
    stubGetBoundingClientRect.teardown()
    stubLodashDebounce.teardown()
  })

  it('should render the pie', function () {
    const wrapper = mount(GeoChart, {
      propsData: {
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
  })

  it('should center the pie within chart dimensions', function () {
    const wrapper = mount(GeoChart, {
      propsData: {
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
  })

  it('should re-render the chart with the new data', function () {
    const wrapper = mount(GeoChart, {
      propsData: {
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

    wrapper.setProps({
      config: {
        pieConfig: {
          data: chartData2,
          keyForValues
        }
      }
    })

    flushD3Transitions()
    expect(wrapper.findAll('.geo-chart .geo-chart-pie .geo-chart-pie-slice')).toHaveLength(chartData2.length)
  })

  it('should add specific class for each slice', function () {
    const wrapper = mount(GeoChart, {
      propsData: {
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

    for (let i = 0; i < allSlices.length; i++) {
      expect(allSlices.at(i).find(`.geo-chart-pie-slice--${i}`).exists()).toBe(true)
    }
  })

  it('should add custom class for each slice', function () {
    const wrapper = mount(GeoChart, {
      propsData: {
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

    for (let i = 0; i < allSlices.length; i++) {
      expect(allSlices.at(i).find(`.geo-chart-pie-slice--${i}.my-custom-class-${i}`).exists()).toBe(true)
    }
  })
})
